import React, { useEffect, useState } from 'react';
import Localbase from 'localbase';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputField from '../InputField';
import Button from '../Button';
let db = new Localbase('db');

function FeesTable(props) {
    const { studentData } = props;
    const [cash, setCash] = useState(false);
    const [bankslip, setBankslip] = useState(false);
    const [cheque, setCheque] = useState(false);
    const [bank, setBank] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [payments, setPayments] = useState(false);
    const [studentId, setStudentId] = useState();
    // const [paidAmount, setPaidAmount] = useState();

    // toggle cash
    const openCash = (student) => {
        setCash(true);
        setBankslip(false);
        setCheque(false);
        setBank(false);
        setMobile(false);
        setStudentId(student.id);
    };
    const closeCash = () => {
        setCash(false);
    };
    const [cashForm, setCashForm] = useState({
        date: '',
        amount: '',
        paidBy: '',
        contact: '',
    });
    const onChangeCash = (e) => {
        setCashForm({ ...cashForm, [e.target.name]: e.target.value });
    };
    const postCashPayment = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            studentId: studentId,
            date: cashForm.date,
            amount: cashForm.amount,
            paidBy: cashForm.paidBy,
            contact: cashForm.contact,
            bank: '',
            branch: '',
            bankSlipNo: '',
            accountNo: '',
            accountName: '',
            mobileNo: '',
            mobileName: '',
            method: 'cash',
        };
        if (cashForm) {
            db.collection('paymentsTbl')
                .add(data)
                .then((response) => {
                    setCashForm('');
                    fetchPayments();
                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                    closeCash();
                })
                .catch(console.error());
        }
    };

    // toogle bankslip
    const openBankSlip = (student) => {
        setBankslip(true);
        setCash(false);
        setCheque(false);
        setBank(false);
        setMobile(false);
        setStudentId(student.id);
    };
    const closeBankSlip = () => {
        setBankslip(false);
    };
    const [bankSlipForm, setBankSlipForm] = useState({
        date: '',
        amount: '',
        bank: '',
        branch: '',
        bankSlipNo: '',
        paidBy: '',
        contact: '',
    });
    const onChangeBankSlip = (e) => {
        setBankSlipForm({ ...bankSlipForm, [e.target.name]: e.target.value });
    };
    const postBankSlipPayment = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            studentId: studentId,
            date: bankSlipForm.date,
            amount: bankSlipForm.amount,
            bank: bankSlipForm.bank,
            branch: bankSlipForm.branch,
            bankSlipNo: bankSlipForm.bankSlipNo,
            paidBy: bankSlipForm.paidBy,
            contact: bankSlipForm.contact,
            accountNo: '',
            accountName: '',
            mobileNo: '',
            mobileName: '',
            method: 'Bank Slip',
        };
        if (bankSlipForm) {
            db.collection('paymentsTbl')
                .add(data)
                .then((response) => {
                    setBankSlipForm('');
                    fetchPayments();
                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                    closeBankSlip();
                })
                .catch(console.error());
        }
    };

    // toggle checkque
    const openChecque = (student) => {
        setBankslip(false);
        setCash(false);
        setCheque(true);
        setBank(false);
        setMobile(false);
        setStudentId(student.id);
    };
    const closeChecque = () => {
        setCheque(false);
    };
    const [chequeForm, setChequeForm] = useState({
        date: '',
        amount: '',
        bank: '',
        accountNo: '',
        accountName: '',
        paidBy: '',
        contact: '',
    });
    const onChangeCheque = (e) => {
        setChequeForm({ ...chequeForm, [e.target.name]: e.target.value });
    };
    const postChequePayment = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            studentId: studentId,
            date: chequeForm.date,
            amount: chequeForm.amount,
            bank: chequeForm.bank,
            accountNo: chequeForm.accountNo,
            accountName: chequeForm.accountName,
            paidBy: chequeForm.paidBy,
            contact: chequeForm.contact,
            branch: '',
            bankSlipNo: '',
            mobileNo: '',
            mobileName: '',
            method: 'Checque',
        };
        if (chequeForm) {
            db.collection('paymentsTbl')
                .add(data)
                .then((response) => {
                    setChequeForm('');
                    fetchPayments();
                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                    closeChecque();
                })
                .catch(console.error());
        }
    };

    // toggle bank transfer
    const openBank = (student) => {
        setBank(true);
        setBankslip(false);
        setCash(false);
        setCheque(false);
        setMobile(false);
        setStudentId(student.id);
    };
    const closeBank = () => {
        setBank(false);
    };
    const [bankForm, setBankForm] = useState({
        date: '',
        amount: '',
        bank: '',
        accountNo: '',
        accountName: '',
        paidBy: '',
        contact: '',
    });
    const onChangeBank = (e) => {
        setBankForm({ ...bankForm, [e.target.name]: e.target.value });
    };
    const postBankPayment = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            studentId: studentId,
            date: bankForm.date,
            amount: bankForm.amount,
            bank: bankForm.bank,
            accountNo: bankForm.accountNo,
            accountName: bankForm.accountName,
            paidBy: bankForm.paidBy,
            contact: bankForm.contact,
            branch: '',
            bankSlipNo: '',
            mobileNo: '',
            mobileName: '',
            method: 'Bank Transfer',
        };
        if (bankForm) {
            db.collection('paymentsTbl')
                .add(data)
                .then((response) => {
                    setBankForm('');
                    fetchPayments();
                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                    closeBank();
                })
                .catch(console.error());
        }
    };

    // toggle Mobile
    const openMobile = (student) => {
        setMobile(true);
        setBankslip(false);
        setCash(false);
        setCheque(false);
        setBank(false);
        setStudentId(student.id);
    };
    const closeMobile = () => {
        setMobile(false);
    };
    const [mobileForm, setMobileForm] = useState({
        date: '',
        amount: '',
        mobileNo: '',
        mobileName: '',
        paidBy: '',
        contact: '',
    });
    const onChangeMobile = (e) => {
        setMobileForm({ ...mobileForm, [e.target.name]: e.target.value });
    };
    const postMobilePayment = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            studentId: studentId,
            date: mobileForm.date,
            amount: mobileForm.amount,
            mobileNo: mobileForm.mobileNo,
            mobileName: mobileForm.mobileName,
            paidBy: mobileForm.paidBy,
            contact: mobileForm.contact,
            bank: '',
            branch: '',
            bankSlipNo: '',
            accountNo: '',
            accountName: '',
            method: 'Mobile Money',
        };
        if (bankForm) {
            db.collection('paymentsTbl')
                .add(data)
                .then((response) => {
                    setMobileForm('');
                    fetchPayments();
                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                    closeMobile();
                })
                .catch(console.error());
        }
    };

    //payments
    const openPayments = (student) => {
        setPayments(true);
        setMobile(false);
        setBankslip(false);
        setCash(false);
        setCheque(false);
        setBank(false);
        setStudentId(student.id);
    };

    const closePayments = () => {
        setPayments(false);
    };
    const [paymentsForm, setPaymentsForm] = useState();

    const fetchPayments = () => {
        db.collection('paymentsTbl')
            .get()
            .then((student) => {
                const newData = student;
                setPaymentsForm(newData);
            });
    };
    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <table className='mt-4 w-full table-auto'>
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
                <th className='p-2 text-primary text-sm text-left'>
                    Full Name
                </th>
                <th className='p-2 text-primary text-sm text-left'>
                    Place Of Residence
                </th>
                <th className='p-2 text-primary text-sm text-left'>Parents</th>
                <th className='p-2 text-primary text-sm text-left'>
                    Student Type
                </th>
                <th className='p-2 text-primary text-sm text-left'>Class</th>
                <th className='p-2 text-primary text-sm text-left'>Fees</th>
                <th className='p-2 text-primary text-sm text-left'>Paid</th>
                <th className='p-2 text-primary text-sm text-left'>Balance</th>
                <th className='p-2 text-primary text-sm text-left'>Action</th>
            </thead>
            <tbody>
                {cash ? (
                    <div className='w-[600px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50'>
                        <div className='flex justify-between p-3 bg-gray1'>
                            <div>
                                <p className='text-primary font-semibold'>
                                    Register Cash Payment
                                </p>
                            </div>
                            <div>
                                <p
                                    className='cursor-pointer'
                                    onClick={closeCash}
                                >
                                    X
                                </p>
                            </div>
                        </div>
                        <div className='px-5'>
                            <InputField
                                type='date'
                                label='Date'
                                name='date'
                                onChange={onChangeCash}
                                value={cashForm.date}
                            />

                            <InputField
                                type='number'
                                label='Amount'
                                name='amount'
                                onChange={onChangeCash}
                                value={cashForm.amount}
                            />
                            <InputField
                                type='text'
                                label='Paid By'
                                name='paidBy'
                                onChange={onChangeCash}
                                value={cashForm.paidBy}
                            />
                            <InputField
                                type='text'
                                label='Contact'
                                name='contact'
                                onChange={onChangeCash}
                                value={cashForm.contact}
                            />
                            <div onClick={postCashPayment}>
                                <Button value={'Add Payment'} />
                            </div>

                            <br />
                        </div>
                    </div>
                ) : null}
                {bankslip ? (
                    <div className='w-[800px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50'>
                        <div className='flex justify-between p-3 bg-gray1'>
                            <div>
                                <p className='text-primary font-semibold'>
                                    Register Bankslip
                                </p>
                            </div>
                            <div>
                                <p
                                    className='cursor-pointer'
                                    onClick={closeBankSlip}
                                >
                                    X
                                </p>
                            </div>
                        </div>

                        <div className='px-5 flex'>
                            <div className='w-1/2'>
                                <InputField
                                    type='date'
                                    label='Date'
                                    name='date'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.date}
                                />

                                <InputField
                                    type='number'
                                    label='Amount'
                                    name='amount'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.amount}
                                />
                                <InputField
                                    type='text'
                                    label='Bank'
                                    name='bank'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.bank}
                                />
                            </div>
                            <div className='w-1/2 ml-5'>
                                <InputField
                                    type='text'
                                    label='Branch'
                                    name='branch'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.branch}
                                />
                                <InputField
                                    type='text'
                                    label='Bank slip No'
                                    name='bankSlipNo'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.bankSlipNo}
                                />
                                <InputField
                                    type='text'
                                    label='Paid By'
                                    name='paidBy'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.paidBy}
                                />
                                <InputField
                                    type='text'
                                    label='Contact'
                                    name='contact'
                                    onChange={onChangeBankSlip}
                                    value={bankSlipForm.contact}
                                />
                                <div onClick={postBankSlipPayment}>
                                    <Button value={'Add Payment'} />
                                </div>
                            </div>

                            <br />
                        </div>
                        <br />
                    </div>
                ) : null}
                {bank ? (
                    <div className='w-[800px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50'>
                        <div className='flex justify-between p-3 bg-gray1'>
                            <div>
                                <p className='text-primary font-semibold'>
                                    Register Bank Transfer
                                </p>
                            </div>
                            <div>
                                <p
                                    className='cursor-pointer'
                                    onClick={closeBank}
                                >
                                    X
                                </p>
                            </div>
                        </div>
                        <div className='px-5 flex mb-5'>
                            <div className='w-1/2'>
                                <InputField
                                    type='date'
                                    label='Date'
                                    name='date'
                                    onChange={onChangeBank}
                                    value={bankForm.date}
                                />

                                <InputField
                                    type='number'
                                    label='Amount'
                                    name='amount'
                                    onChange={onChangeBank}
                                    value={bankForm.amount}
                                />
                                <InputField
                                    type='text'
                                    label='Bank'
                                    name='bank'
                                    onChange={onChangeBank}
                                    value={bankForm.name}
                                />
                            </div>
                            <div className='w-1/2 ml-5'>
                                <InputField
                                    type='text'
                                    label='From Account No'
                                    name='accountNo'
                                    onChange={onChangeBank}
                                    value={bankForm.accountNo}
                                />
                                <InputField
                                    type='text'
                                    label='Account Name'
                                    name='accountName'
                                    onChange={onChangeBank}
                                    value={bankForm.accountNo}
                                />
                                <InputField
                                    type='text'
                                    label='Paid By'
                                    name='paidBy'
                                    onChange={onChangeBank}
                                    value={bankForm.paidBy}
                                />
                                <InputField
                                    type='text'
                                    label='Contact'
                                    name='contact'
                                    onChange={onChangeBank}
                                    value={bankForm.contact}
                                />
                                <div onClick={postBankPayment}>
                                    <Button value={'Add Payment'} />
                                </div>
                            </div>

                            <br />
                        </div>
                    </div>
                ) : null}
                {mobile ? (
                    <div className='w-[600px] absolute bg-white rounded-md shadow-lg -mt-10 border-2 border-gray1 z-50'>
                        <div className='flex justify-between p-3 bg-gray1'>
                            <div>
                                <p className='text-primary font-semibold'>
                                    Register Mobile Money Payment
                                </p>
                            </div>
                            <div>
                                <p
                                    className='cursor-pointer'
                                    onClick={closeMobile}
                                >
                                    X
                                </p>
                            </div>
                        </div>
                        <div className='px-5'>
                            <InputField
                                type='date'
                                label='Date'
                                name='date'
                                onChange={onChangeMobile}
                                value={mobileForm.date}
                            />
                            <InputField
                                type='number'
                                label='Amount'
                                name='amount'
                                onChange={onChangeMobile}
                                value={mobileForm.amount}
                            />
                            <InputField
                                type='text'
                                label='From Mobile No'
                                name='mobileNo'
                                onChange={onChangeMobile}
                                value={mobileForm.mobileNo}
                            />
                            <InputField
                                type='text'
                                label='Names'
                                name='mobileName'
                                onChange={onChangeMobile}
                                value={mobileForm.mobileName}
                            />

                            <InputField
                                type='text'
                                label='Paid By'
                                name='paidBy'
                                onChange={onChangeMobile}
                                value={mobileForm.paidBy}
                            />
                            <InputField
                                type='text'
                                label='Contact'
                                name='contact'
                                onChange={onChangeMobile}
                                value={mobileForm.contact}
                            />
                            <div onClick={postMobilePayment}>
                                <Button value={'Add Payment'} />
                            </div>

                            <br />
                        </div>
                    </div>
                ) : null}

                {cheque ? (
                    <div className='w-[600px] absolute bg-white rounded-md shadow-lg border-2 border-gray1 z-50'>
                        <div className='flex justify-between p-3 bg-gray1'>
                            <div>
                                <p className='text-primary font-semibold'>
                                    Register Checque Payment
                                </p>
                            </div>
                            <div>
                                <p
                                    className='cursor-pointer'
                                    onClick={closeChecque}
                                >
                                    X
                                </p>
                            </div>
                        </div>
                        <div className='px-5 flex mb-5'>
                            <div className='w-1/2'>
                                <InputField
                                    type='date'
                                    label='Date'
                                    name='date'
                                    onChange={onChangeCheque}
                                    value={chequeForm.date}
                                />

                                <InputField
                                    type='number'
                                    label='Amount'
                                    name='amount'
                                    onChange={onChangeCheque}
                                    value={chequeForm.amount}
                                />
                                <InputField
                                    type='text'
                                    label='Bank'
                                    name='bank'
                                    onChange={onChangeCheque}
                                    value={chequeForm.bank}
                                />
                            </div>
                            <div className='w-1/2 ml-5'>
                                <InputField
                                    type='text'
                                    label='Account Name'
                                    name='accountName'
                                    onChange={onChangeCheque}
                                    value={chequeForm.accountName}
                                />
                                <InputField
                                    type='text'
                                    label='Account No'
                                    name='accountNo'
                                    onChange={onChangeCheque}
                                    value={chequeForm.accountNo}
                                />
                                <InputField
                                    type='text'
                                    label='Paid By'
                                    name='paidBy'
                                    onChange={onChangeCheque}
                                    value={chequeForm.paidBy}
                                />
                                <InputField
                                    type='text'
                                    label='Contact'
                                    name='contact'
                                    onChange={onChangeCheque}
                                    value={chequeForm.contact}
                                />
                                <div onClick={postChequePayment}>
                                    <Button value={'Add Payment'} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {payments ? (
                    <div className='w-3/4 absolute h-[60vh] overflow-y-auto bg-white rounded-md shadow-lg border-2 border-gray2 z-50'>
                        <div className='flex justify-between p-3 bg-gray1'>
                            <div>
                                <p className='text-primary font-semibold'>
                                    Payment history
                                </p>
                            </div>
                            <div>
                                <p
                                    className='cursor-pointer'
                                    onClick={closePayments}
                                >
                                    X
                                </p>
                            </div>
                        </div>
                        <div className='px-5 flex bg-gray2 p-2 text-xs mt-2 cursor-pointer w-full'>
                            <div className='w-1/4 p-2'>Date</div>
                            <div className='w-1/4 p-2'>Fees</div>
                            <div className='w-1/4 p-2'>Amount</div>
                            <div className='w-1/4 p-2'>Balance</div>
                            <div className='w-1/4 p-2'>Method</div>
                            <div className='w-1/4 p-2'>Paid By</div>
                            <div className='w-1/4 p-2'>Contact</div>
                        </div>
                        {paymentsForm.map((student) => {
                            if (student.studentId === studentId) {
                                return (
                                    <div
                                        className='px-5 flex border-b text-gray5 border-gray2 hover:border-b-2 cursor-pointer text-xs w-full'
                                        key={student.id}
                                    >
                                        <div className='w-1/4 truncate p-2'>
                                            {student.date}
                                        </div>
                                        <div className='w-1/4 truncate p-2'>
                                            790,000
                                        </div>
                                        <div className='w-1/4 truncate p-2'>
                                            {student.amount}
                                        </div>
                                        <div className='w-1/4 truncate p-2'>
                                            550,000
                                        </div>
                                        <div className='w-1/4 truncate p-2'>
                                            {student.method}
                                        </div>
                                        <div className='w-1/4 truncate p-2'>
                                            {student.paidBy}
                                        </div>
                                        <div className='w-1/4 truncate p-2'>
                                            {student.contact}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        <br />
                    </div>
                ) : null}

                {studentData.map((student) => {
                    return (
                        <tr
                            className='shadow-sm border-b hover:border-l-2 hover:border-l-primary border-gray1 cursor-pointer hover:shadow-md'
                            key={student.id}
                        >
                            <td className='flex'>
                                <div className='rounded-full ml-2 h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3'>
                                    {student.firstName[0]} {student.lastName[0]}
                                </div>
                                <div>
                                    <p className='text-sm p-3 -mt-1 text-gray5'>
                                        {student.firstName} {student.middleName}{' '}
                                        {student.lastName}
                                    </p>
                                    <p className='text-secondary text-xs -mt-3 ml-3'>
                                        {student.nin}
                                    </p>
                                </div>
                            </td>

                            <td className='text-xs p-3 text-gray5'>
                                {student.residence}
                            </td>
                            <td className='flex flex-col'>
                                <p className='text-xs p-3 text-gray5'>
                                    {student.fatherContact}
                                </p>
                                <p className='text-xs text-gray5 -mt-3 ml-3'>
                                    {student.motherContact}
                                </p>
                            </td>
                            <td className='text-xs p-3 text-gray5'>
                                {student.studentType.value}
                            </td>
                            <td className='text-xs p-3 text-gray5'>
                                {student.studentClass.value}
                            </td>
                            <td className='text-xs p-3 text-gray5'>
                                1,040,000{/* fetch fees */}
                            </td>
                            <td className='text-xs p-3 text-gray5'>520,000</td>
                            <td className='text-xs p-3 text-gray5'>
                                {Math.abs()} {/* balance */}
                            </td>
                            <td className='text-xs p-3  flex'>
                                <p className='bg-primary3 p-2 rounded-md text-primary2 hoverbtn'>
                                    Enter Payment
                                </p>
                                <div className='bg-white rounded-md shadow-lg w-40 hoverContent absolute z-10 mt-2'>
                                    <p
                                        onClick={() => openCash(student)}
                                        className='cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1'
                                    >
                                        Cash
                                    </p>
                                    <hr className='text-gray4' />
                                    <p
                                        onClick={() => openBankSlip(student)}
                                        className='cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1'
                                    >
                                        Bank Slip
                                    </p>
                                    <hr className='text-gray4' />
                                    <p
                                        onClick={() => openChecque(student)}
                                        className='cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1'
                                    >
                                        Cheque
                                    </p>
                                    <hr className='text-gray4' />
                                    <p
                                        onClick={() => openBank(student)}
                                        className='cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1'
                                    >
                                        Bank Transfer
                                    </p>
                                    <hr className='text-gray4' />
                                    <p
                                        onClick={() => openMobile(student)}
                                        className='cursor-pointer text-xs text-gray5 p-2 hover:bg-gray1'
                                    >
                                        Mobile Money
                                    </p>
                                    <hr className='text-gray4' />
                                </div>
                                <p
                                    onClick={() => openPayments(student)}
                                    className='bg-secondary11 ml-2 pt-2 px-3 rounded-md'
                                >
                                    Payments
                                </p>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default FeesTable;
