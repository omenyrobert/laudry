import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import InputField from '../InputField'
import Button from '../Button'
import axiosInstance from '../../axios-instance'
import { useNavigate } from 'react-router-dom'
import ButtonLoader from '../ButtonLoader'
import Pagination from '../Pagination'

const FeesTable = (props) => {
  const {
    studentData,
    setPage,
    count,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    searchPage,
    page,
  } = props
  const [cash, setCash] = useState(false)
  const [bankslip, setBankslip] = useState(false)
  const [cheque, setCheque] = useState(false)
  const [bank, setBank] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [payments, setPayments] = useState(false)
  const [studentId, setStudentId] = useState()
  const navigate = useNavigate()

  // toggle cash
  const openCash = (student) => {
    setCash(true)
    setBankslip(false)
    setCheque(false)
    setBank(false)
    setMobile(false)
    setStudentId(student.id)
  }

  const [cashForm, setCashForm] = useState({
    date: '',
    amount: '',
    paidBy: '',
    contact: '',
  })
  const closeCash = () => {
    setCash(false)
    setCashForm({ ...cashForm, date: '', amount: '', paidBy: '', contact: '' })
  }
  const onChangeCash = (e) => {
    setCashForm({ ...cashForm, [e.target.name]: e.target.value })
  }

  const [posting, setPosting] = useState(false)
  const postPayment = async (e, formData, method) => {
    e.preventDefault()
    try {
      setPosting(true)
      formData.studentId = studentId
      formData.method = method
      if (formData) {
        const response = await axiosInstance.post('fee-payment/add', formData)
        const { status, payload } = response.data
        const MySwal = withReactContent(Swal)
        if (status) {
          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 500,
          })
          if (method === 'Cash') {
            closeCash()
          }
          if (method === 'Bank Slip') {
            closeBankSlip()
          }
          if (method === 'Cheque') {
            closeCheque()
          }
          if (method === 'Bank Transfer') {
            closeBank()
          }
          if (method === 'Mobile Money') {
            closeMobile()
          }
          // navigate(0);
        } else {
          MySwal.fire({
            icon: 'error',
            showConfirmButton: true,
            timer: 500,
            text: payload,
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
    setPosting(false)
  }

  // toogle bankslip
  const openBankSlip = (student) => {
    setBankslip(true)
    setCash(false)
    setCheque(false)
    setBank(false)
    setMobile(false)
    setStudentId(student.id)
  }

  const [bankSlipForm, setBankSlipForm] = useState({
    date: '',
    amount: '',
    bank: '',
    branch: '',
    bankSlipNo: '',
    paidBy: '',
    contact: '',
  })
  const onChangeBankSlip = (e) => {
    setBankSlipForm({ ...bankSlipForm, [e.target.name]: e.target.value })
  }
  const closeBankSlip = () => {
    setBankslip(false)
    setBankSlipForm({
      ...bankSlipForm,
      date: '',
      amount: '',
      bank: '',
      paidBy: '',
      contact: '',
      branch: '',
      bankSlipNo: '',
    })
  }

  // toggle checkque
  const openChecque = (student) => {
    setBankslip(false)
    setCash(false)
    setCheque(true)
    setBank(false)
    setMobile(false)
    setStudentId(student.id)
  }

  const [chequeForm, setChequeForm] = useState({
    date: '',
    amount: '',
    bank: '',
    accountNo: '',
    accountName: '',
    paidBy: '',
    contact: '',
  })
  const closeCheque = () => {
    setCheque(false)
    setCashForm({
      ...chequeForm,
      date: '',
      amount: '',
      accountName: '',
      bank: '',
      paidBy: '',
      contact: '',
      accountNo: '',
    })
  }
  const onChangeCheque = (e) => {
    setChequeForm({ ...chequeForm, [e.target.name]: e.target.value })
  }

  // toggle bank transfer
  const openBank = (student) => {
    setBank(true)
    setBankslip(false)
    setCash(false)
    setCheque(false)
    setMobile(false)
    setStudentId(student.id)
  }

  const [bankForm, setBankForm] = useState({
    date: '',
    amount: '',
    bank: '',
    accountNo: '',
    accountName: '',
    paidBy: '',
    contact: '',
    fromAccountNo: '',
  })
  const closeBank = () => {
    setBank(false)
    setBankForm({
      ...bankForm,
      date: '',
      amount: '',
      bank: '',
      accountNo: '',
      accountName: '',
      paidBy: '',
      contact: '',
      fromAccountNo: '',
    })
  }
  const onChangeBank = (e) => {
    setBankForm({ ...bankForm, [e.target.name]: e.target.value })
  }

  // toggle Mobile
  const openMobile = (student) => {
    setMobile(true)
    setBankslip(false)
    setCash(false)
    setCheque(false)
    setBank(false)
    setStudentId(student.id)
  }

  const [mobileForm, setMobileForm] = useState({
    date: '',
    amount: '',
    mobileNo: '',
    mobileName: '',
    paidBy: '',
    contact: '',
  })

  const closeMobile = () => {
    setMobile(false)
    setMobileForm({
      ...mobileForm,
      date: '',
      mobileNo: '',
      mobileName: '',
      paidBy: '',
      contact: '',
      amount: '',
    })
  }
  const onChangeMobile = (e) => {
    setMobileForm({ ...mobileForm, [e.target.name]: e.target.value })
  }

  //payments
  const openPayments = async (student) => {
    setMobile(false)
    setBankslip(false)
    setCash(false)
    setCheque(false)
    setBank(false)
    setPayments(true)
    setStudentId(student.id)
    fetchStudentPayments(student.id)
  }

  const [paymentsForm, setPaymentsForm] = useState([])

  const closePayments = () => {
    setPayments(false)
    setPaymentsForm([])
  }
  const fetchStudentPayments = async (id) => {
    try {
      const payments = await axiosInstance.post(`/fee-payment/student`, {
        studentId: id,
      })
      const { data } = payments
      const { status, payload } = data
      if (status) {
        setPaymentsForm(payload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="h-[75vh] bg-white overflow-y-auto">
        <table className="mt-4 w-full table-auto">
          <thead style={{ backgroundColor: '#0d6dfd10' }}>
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">
              Place Of Residence
            </th>
            <th className="p-2 text-primary text-sm text-left">Parents</th>
            <th className="p-2 text-primary text-sm text-left">Class Level</th>
            <th className="p-2 text-primary text-sm text-left">Class</th>
            <th className="p-2 text-primary text-sm text-left">Stream</th>
            <th className="p-2 text-primary text-sm text-left">Fees</th>
            <th className="p-2 text-primary text-sm text-left">Paid</th>
            <th className="p-2 text-primary text-sm text-left">Balance</th>
            <th className="p-2 text-primary text-sm text-left">Action</th>
          </thead>
          <tbody>
            {cash ? (
              <div className="w-[600px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50">
                <div className="flex justify-between p-3 bg-gray1">
                  <div>
                    <p className="text-primary font-semibold">
                      Register Cash Payment
                    </p>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={closeCash}>
                      X
                    </p>
                  </div>
                </div>
                <div className="px-5">
                  <InputField
                    type="date"
                    label="Date"
                    name="date"
                    onChange={onChangeCash}
                    value={cashForm.date}
                  />

                  <InputField
                    type="number"
                    label="Amount"
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={onChangeCash}
                    value={cashForm.amount}
                  />
                  <InputField
                    type="text"
                    label="Paid By"
                    name="paidBy"
                    placeholder="Enter Name"
                    onChange={onChangeCash}
                    value={cashForm.paidBy}
                  />
                  <InputField
                    type="text"
                    label="Contact"
                    name="contact"
                    placeholder="Enter Contact"
                    onChange={onChangeCash}
                    value={cashForm.contact}
                  />
                </div>
                <div className="flex justify-between mb-3 mr-3">
                  <div></div>
                  <div>
                    {posting ? (
                      <div className="w-40">
                        <ButtonLoader />
                      </div>
                    ) : (
                      <div
                        className="w-40 mb-5 float-right"
                        onClick={(event) =>
                          postPayment(event, cashForm, 'Cash')
                        }
                      >
                        <Button value={'Add Payment'} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {bankslip ? (
              <div className="w-[800px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50">
                <div className="flex justify-between p-3 bg-gray1">
                  <div>
                    <p className="text-primary font-semibold">
                      Register Bankslip
                    </p>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={closeBankSlip}>
                      X
                    </p>
                  </div>
                </div>

                <div className="px-5 flex">
                  <div className="w-1/2">
                    <InputField
                      type="date"
                      label="Date"
                      name="date"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.date}
                    />

                    <InputField
                      type="number"
                      label="Amount"
                      name="amount"
                      placeholder="Enter Amount"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.amount}
                    />
                    <InputField
                      type="text"
                      label="Bank"
                      name="bank"
                      placeholder="Enter Bank Name"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.bank}
                    />
                  </div>
                  <div className="w-1/2 ml-5">
                    <InputField
                      type="text"
                      label="Branch"
                      name="branch"
                      placeholder="Enter Branch Name"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.branch}
                    />
                    <InputField
                      type="text"
                      label="Bank slip No"
                      name="bankSlipNo"
                      placeholder="Enter Bankslip No"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.bankSlipNo}
                    />
                    <InputField
                      type="text"
                      label="Paid By"
                      name="paidBy"
                      placeholder="Enter Name"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.paidBy}
                    />
                    <InputField
                      type="text"
                      label="Contact"
                      name="contact"
                      placeholder="Enter Contact"
                      onChange={onChangeBankSlip}
                      value={bankSlipForm.contact}
                    />
                  </div>

                  <br />
                </div>
                <div className="flex justify-between mb-3 mr-3">
                  <div></div>
                  <div>
                    {posting ? (
                      <div className="w-40">
                        <ButtonLoader />
                      </div>
                    ) : (
                      <div
                        className="w-40 float-right mb-5"
                        onClick={(event) =>
                          postPayment(event, bankSlipForm, 'Bank Slip')
                        }
                      >
                        <Button value={'Add Payment'} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {bank ? (
              <div className="w-[800px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50">
                <div className="flex justify-between p-3 bg-gray1">
                  <div>
                    <p className="text-primary font-semibold">
                      Register Bank Transfer
                    </p>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={closeBank}>
                      X
                    </p>
                  </div>
                </div>
                <div className="px-5 flex mb-5">
                  <div className="w-1/2">
                    <InputField
                      type="date"
                      label="Date"
                      name="date"
                      onChange={onChangeBank}
                      value={bankForm.date}
                    />

                    <InputField
                      type="number"
                      label="Amount"
                      name="amount"
                      placeholder="Enter Amount"
                      onChange={onChangeBank}
                      value={bankForm.amount}
                    />
                    <InputField
                      type="text"
                      label="Bank"
                      name="bank"
                      placeholder="Enter Bank Name"
                      onChange={onChangeBank}
                      value={bankForm.name}
                    />
                  </div>
                  <div className="w-1/2 ml-5">
                    <InputField
                      type="text"
                      label="From Account No"
                      name="fromAccountNo"
                      placeholder="Enter Account Number"
                      onChange={onChangeBank}
                      value={bankForm.fromAccountNo}
                    />
                    <InputField
                      type="text"
                      label="Account Name"
                      placeholder="Enter Account Name"
                      name="accountName"
                      onChange={onChangeBank}
                      value={bankForm.accountName}
                    />
                    <InputField
                      type="text"
                      label="Paid By"
                      name="paidBy"
                      placeholder="Enter Name"
                      onChange={onChangeBank}
                      value={bankForm.paidBy}
                    />
                    <InputField
                      type="text"
                      label="Contact"
                      name="contact"
                      placeholder="Enter Contact"
                      onChange={onChangeBank}
                      value={bankForm.contact}
                    />
                  </div>

                  <br />
                </div>
                <div className="flex justify-between mb-3 mr-3">
                  <div></div>
                  <div>
                    {posting ? (
                      <div className="w-40">
                        <ButtonLoader />
                      </div>
                    ) : (
                      <div
                        className="w-40"
                        onClick={(event) =>
                          postPayment(event, bankForm, 'Bank Transfer')
                        }
                      >
                        <Button value={'Add Payment'} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {mobile ? (
              <div className="w-[700px] absolute bg-white rounded-md shadow-lg -mt-10 border-2 border-gray1 z-50">
                <div className="flex justify-between p-3 bg-gray1">
                  <div>
                    <p className="text-primary font-semibold">
                      Register Mobile Money Payment
                    </p>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={closeMobile}>
                      X
                    </p>
                  </div>
                </div>
                <div className="px-5 flex ">
                  <div className="w-1/2">
                    <InputField
                      type="date"
                      label="Date"
                      name="date"
                      onChange={onChangeMobile}
                      value={mobileForm.date}
                    />
                    <InputField
                      type="number"
                      label="Amount"
                      name="amount"
                      placeholder="Enter Amount"
                      onChange={onChangeMobile}
                      value={mobileForm.amount}
                    />
                    <InputField
                      type="text"
                      label="From Mobile No"
                      name="mobileNo"
                      placeholder="Enter Number"
                      onChange={onChangeMobile}
                      value={mobileForm.mobileNo}
                    />
                  </div>
                  <div className="w-1/2 ml-3">
                    <InputField
                      type="text"
                      label="Names"
                      name="mobileName"
                      placeholder="Enter Name"
                      onChange={onChangeMobile}
                      value={mobileForm.mobileName}
                    />

                    <InputField
                      type="text"
                      label="Paid By"
                      name="paidBy"
                      placeholder="Enter Paid by Name"
                      onChange={onChangeMobile}
                      value={mobileForm.paidBy}
                    />
                    <InputField
                      type="text"
                      label="Contact"
                      name="contact"
                      placeholder="Enter Contact"
                      onChange={onChangeMobile}
                      value={mobileForm.contact}
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-3 mr-3">
                  <div></div>
                  <div>
                    {posting ? (
                      <div className="w-40">
                        <ButtonLoader />
                      </div>
                    ) : (
                      <div
                        className="w-40"
                        onClick={(event) =>
                          postPayment(event, mobileForm, 'Mobile Money')
                        }
                      >
                        <Button value={'Add Payment'} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {cheque ? (
              <div className="w-[600px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50">
                <div className="flex justify-between p-3 bg-gray1">
                  <div>
                    <p className="text-primary font-semibold">
                      Register Checque Payment
                    </p>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={closeCheque}>
                      X
                    </p>
                  </div>
                </div>
                <div className="px-5 flex mb-5">
                  <div className="w-1/2">
                    <InputField
                      type="date"
                      label="Date"
                      name="date"
                      onChange={onChangeCheque}
                      value={chequeForm.date}
                    />

                    <InputField
                      type="number"
                      label="Amount"
                      name="amount"
                      placeholder="Enter Amount"
                      onChange={onChangeCheque}
                      value={chequeForm.amount}
                    />
                    <InputField
                      type="text"
                      label="Bank"
                      name="bank"
                      placeholder="Enter Bank Name"
                      onChange={onChangeCheque}
                      value={chequeForm.bank}
                    />
                  </div>
                  <div className="w-1/2 ml-5">
                    <InputField
                      type="text"
                      label="Account Name"
                      name="accountName"
                      placeholder="Enter Account Name"
                      onChange={onChangeCheque}
                      value={chequeForm.accountName}
                    />
                    <InputField
                      type="text"
                      label="Account No"
                      name="accountNo"
                      placeholder="Enter Account Number"
                      onChange={onChangeCheque}
                      value={chequeForm.accountNo}
                    />
                    <InputField
                      type="text"
                      label="Paid By"
                      name="paidBy"
                      placeholder="Enter Name"
                      onChange={onChangeCheque}
                      value={chequeForm.paidBy}
                    />
                    <InputField
                      type="text"
                      label="Contact"
                      name="contact"
                      placeholder="Enter Contact"
                      onChange={onChangeCheque}
                      value={chequeForm.contact}
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-3 mr-3">
                  <div></div>
                  <div>
                    {posting ? (
                      <div className="w-40">
                        <ButtonLoader />
                      </div>
                    ) : (
                      <div
                        className="w-40"
                        onClick={(event) =>
                          postPayment(event, chequeForm, 'Cheque')
                        }
                      >
                        <Button value={'Add Payment'} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {payments ? (
              <div className="w-3/4 absolute h-[60vh] overflow-y-auto bg-white rounded-md shadow-lg border-2 border-gray2 z-50">
                <div className="flex justify-between p-3 bg-gray1">
                  <div>
                    <p className="text-primary font-semibold">
                      Payment history
                    </p>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={closePayments}>
                      X
                    </p>
                  </div>
                </div>
                <div className="px-5 flex bg-gray2 p-2 text-xs mt-2 cursor-pointer w-full">
                  <div className="w-1/4 p-2">Date</div>
                  {/* <div className='w-1/4 p-2'>Fees</div> */}
                  <div className="w-1/4 p-2">Amount</div>
                  {/* <div className='w-1/4 p-2'>Balance</div> */}
                  <div className="w-1/4 p-2">Method</div>
                  <div className="w-1/4 p-2">Paid By</div>
                  <div className="w-1/4 p-2">Contact</div>
                </div>
                {paymentsForm?.map((student) => {
                  return (
                    <div
                      className="px-5 flex border-b text-gray5 border-gray2 hover:border-b-2 cursor-pointer text-xs w-full"
                      key={student.id}
                    >
                      <div className="w-1/4 truncate p-2">{student?.date}</div>
                      {/* <div className='w-1/4 truncate p-2'>
                                            790,000
                                        </div> */}
                      <div className="w-1/4 truncate p-2">
                        {Number(student?.amount_paid).toLocaleString()}
                      </div>
                      {/* <div className='w-1/4 truncate p-2'>
                                            550,000
                                        </div> */}
                      <div className="w-1/4 truncate p-2">
                        {student?.method}
                      </div>
                      <div className="w-1/4 truncate p-2">
                        {student?.paid_by}
                      </div>
                      <div className="w-1/4 truncate p-2">
                        {student?.contact}
                      </div>
                    </div>
                  )
                })}
                <br />
              </div>
            ) : null}

            {studentData?.map((student) => {
              return (
                <tr
                  className="shadow-sm border-b hover:border-l-2 hover:border-l-primary border-gray1 cursor-pointer hover:shadow-md"
                  key={student.id}
                >
                  <td className="flex">
                    <div className="rounded-full ml-2 h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                      {student.firstName[0]} {student.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm p-3 -mt-1 text-gray5">
                        {student.firstName} {student.middleName}{' '}
                        {student.lastName}
                      </p>
                      <p className="text-red text-xs -mt-3 ml-3">
                        00{student?.id}
                      </p>
                    </div>
                  </td>

                  <td className="text-xs p-3 text-gray5">
                    {student?.residence}
                  </td>
                  <td className="text-gray5 text-xs">
                    {' '}
                    <span className="p-1 bg-white rounded shadow">
                      {student.fatherName} - {student.fatherContact}{' '}
                    </span>
                    <span className="p-1 bg-white rounded mt-1 ml-2 shadow">
                      {student.motherName} - {student.motherContact}{' '}
                    </span>{' '}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {student.student_levels[0]?.name}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {student.classes?.map((c, i) => {
                      return i === student?.classes.length - 1 ? (
                        <span>{c.class}</span>
                      ) : null
                    })}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {student.streams[0]?.stream}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {student.fees?.map((f, i) => {
                      return i === student?.fees.length - 1 ? (
                        <span>{Number(f.amount).toLocaleString()}</span>
                      ) : null
                    })}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {Number(
                      JSON.parse(student.feesBalance).amount,
                    ).toLocaleString()}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {Number(
                      JSON.parse(student?.feesBalance).balance,
                    ).toLocaleString()}
                  </td>
                  <td className="text-xs p-3  flex">
                    <p className="bg-primary3 p-2 rounded-md text-primary2 hoverbtn">
                      Enter Payment
                    </p>
                    <div className="bg-white rounded-md shadow-lg w-40 hoverContent absolute z-10 mt-2">
                      <p
                        onClick={() => openCash(student)}
                        className="cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1"
                      >
                        Cash
                      </p>
                      <hr className="text-gray4" />
                      <p
                        onClick={() => openBankSlip(student)}
                        className="cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1"
                      >
                        Bank Slip
                      </p>
                      <hr className="text-gray4" />
                      <p
                        onClick={() => openChecque(student)}
                        className="cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1"
                      >
                        Cheque
                      </p>
                      <hr className="text-gray4" />
                      <p
                        onClick={() => openBank(student)}
                        className="cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1"
                      >
                        Bank Transfer
                      </p>
                      <hr className="text-gray4" />
                      <p
                        onClick={() => openMobile(student)}
                        className="cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1"
                      >
                        Mobile Money
                      </p>
                      <hr className="text-gray4" />
                    </div>
                    <p
                      onClick={() => openPayments(student)}
                      className="bg-secondary11 ml-2 pt-2 px-3 rounded-md"
                    >
                      Payments
                    </p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* Pagination */}
      </div>
      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPrevPage={canPreviousPage}
        searchPage={searchPage}
        count={count}
        page={page}
        setPage={setPage}
      />
      <table id="fees-table-1" className="mt-20 w-full table-auto bg-white">
        <thead style={{ backgroundColor: '#0d6dfd10' }}>
          <th className="p-2 text-primary text-sm text-left">Full Name</th>
          <th className="p-2 text-primary text-sm text-left">
            Place Of Residence
          </th>
          <th className="p-2 text-primary text-sm text-left">Parents</th>
          <th className="p-2 text-primary text-sm text-left">Class Level</th>
          <th className="p-2 text-primary text-sm text-left">Class</th>
          <th className="p-2 text-primary text-sm text-left">Stream</th>
          <th className="p-2 text-primary text-sm text-left">Fees</th>
          <th className="p-2 text-primary text-sm text-left">Paid</th>
          <th className="p-2 text-primary text-sm text-left">Balance</th>
        </thead>
        <tbody>
          {studentData?.map((student) => {
            return (
              <tr
                className="shadow-sm border-b hover:border-l-2 hover:border-l-primary border-gray1 cursor-pointer hover:shadow-md"
                key={student.id}
              >
                <td className="flex">
                  <div className="rounded-full ml-2 h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                    {student.firstName[0]} {student.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm p-3 -mt-1 text-gray5">
                      {student.firstName} {student.middleName}{' '}
                      {student.lastName}
                    </p>
                    <p className="text-red text-xs -mt-3 ml-3">
                      00{student?.id}
                    </p>
                  </div>
                </td>

                <td className="text-xs p-3 text-gray5">{student?.residence}</td>
                <td className="text-gray5 text-xs">
                  {' '}
                  <span className="p-1 bg-white rounded shadow">
                    {student.fatherName} - {student.fatherContact}{' '}
                  </span>
                  <span className="p-1 bg-white rounded mt-1 ml-2 shadow">
                    {student.motherName} - {student.motherContact}{' '}
                  </span>{' '}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {student.student_levels[0]?.name}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {student.classes?.map((c, i) => {
                    return i === student?.classes.length - 1 ? (
                      <span>{c.class}</span>
                    ) : null
                  })}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {student.streams[0]?.stream}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {student.fees?.map((f, i) => {
                    return i === student?.fees.length - 1 ? (
                      <span>{Number(f.amount).toLocaleString()}</span>
                    ) : null
                  })}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {Number(
                    JSON.parse(student.feesBalance).amount,
                  ).toLocaleString()}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {student.fees?.map((f, i) => {
                    return i === student?.fees.length - 1 ? (
                      <span>{Number(f.amount).toLocaleString()}</span>
                    ) : null
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FeesTable
