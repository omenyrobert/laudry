import React, { useState, useEffect } from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Button from '../Button'
import InputField from '../InputField'
import ButtonSecondary from '../ButtonSecondary'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from '../../axios-instance'
import ButtonLoader from '../ButtonLoader'
import Loader from '../Loader'

const CustomersTable = (props) => {
  const {
    customersData,
  } = props


  const [modal, setModal] = useState(false)

  const openModal = (customer) => {
    setModal(true);
    setName(customer.supplierName);
    setEmail(customer.emails);
    setLocation(customer.address);
    setPhone(customer.contacts)
  }

  const closeModal = () => {
    setModal(false);
  }

  const [modal2, setModal2] = useState(false)
  const [customerId, setCustomerId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const openModal2 = (customer) => {
    setModal2(true);
    setName(customer.name)
    setCustomerId(customer.id)
    setIsEdit(true)
  }

  // adding payments
  const [adding, setAdding] = useState(false)
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");



  const [loadingp, setLoadingp] = useState(false)
  const [payments, setPayments] = useState([])



  const closeModal2 = () => {
    setModal2(false);
  }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [posting, setPosting] = useState("");
  const [loading, setLoading] = useState(false)




  return (
    <div id="studentTable">
      <div className="h-[70vh] overflow-y-auto">
        <table id="dmsk" className="mt-4 w-full table-auto">
          <thead className='bg-gray1'>
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">Phone Number</th>
            <th className="p-2 text-primary text-sm text-left">email</th>
            <th className="p-2 text-primary text-sm text-left">Location</th>
            <th className="p-2 text-primary text-sm text-left">Action</th>
          </thead>
          <tbody>
            {customersData?.map((customer) => {
              return (
                <Customer customer={customer} openModal2={openModal2} openModal={openModal} />
              )
            })}
          </tbody>
        </table>


        {modal ? <div className='z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex'>
          <div className='w-3/12' onClick={closeModal}>

          </div>
          <div className='w-6/12'>
            <div className='rounded-lg bg-white mt-[10vh]'>
              <div className='flex text-xl justify-between font-semibold text-primary p-2 bg-gray1'>
                <div>
                  <p>Edit Customer</p>
                </div>
                <div>
                  <p onClick={closeModal} className='cursor-pointer'>X</p>
                </div>

              </div>
              <div className='flex'>
                <div className='w-1/2 p-2'>
                  <InputField value={name} onChange={(e) => setName(e.target.value)} label="Name Of Customer" placeholder="Enter Name" />
                  <InputField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter Email" />
                </div>
                <div className='w-1/2 p-2'>
                  <InputField value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone Number" placeholder="Phone Number" />
                  <InputField value={location} onChange={(e) => setLocation(e.target.value)} label="Location" placeholder="Enter Location" />
                </div>
              </div>

              <div className='flex justify-between text-primary p-2 bg-gray1'>
                <div onClick={closeModal}>
                  <ButtonSecondary value={"Close"} />
                </div>
                <div className='20'>
                  {posting ? <ButtonLoader /> : <div onClick={() => { }}>
                    <Button value={"Update "} />
                  </div>}

                </div>

              </div>

            </div>
            <div className='h-1/4' onClick={closeModal}>

            </div>

          </div>
          <div className='w-3/12' onClick={closeModal}>

          </div>

        </div> : null}

        {modal2 ? <div className='z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex'>
          <div className='w-2/12' onClick={closeModal2}>

          </div>
          <div className='w-8/12'>
            <div className='rounded-lg bg-white mt-[5vh]'>
              <div className='flex text-xl justify-between text-primary p-2 bg-gray1'>
                <div>
                  <p>Customers Payments</p>
                </div>
                <div>
                  {name}
                </div>
                <div>
                  <p onClick={closeModal2} className='cursor-pointer'>X</p>
                </div>

              </div>
              <div className=''>
                <div className='flex '>
                  <div className='w-32 p-2 m-2 bg-primary text-white'>
                    2,000,000
                  </div>
                  <div className='w-32 p-2 m-2 bg-gray2'>
                    950,000
                  </div>
                  <div className='w-32 p-2 m-2 bg-gray2'>
                    1,800,000
                  </div>
                  <div className='w-32 p-2 m-2 bg-gray2'>
                    2,000,000
                  </div>

                </div>
                <div className='flex'>
                  <div className='p-2'>
                    2,000,000
                  </div>
                  <div className='p-2'>
                    12-10-2023
                  </div>

                </div>
                <div className='flex -mt-5'>
                  <div className='w-1/3 p-2'>
                    <InputField value={date} onChange={(e) => setDate(e.target.value)} type="date" />
                  </div>
                  <div className='w-1/3 p-2'>
                    <InputField value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                  </div>
                  <div className='w-42 mt-6 p-2'>
                    {adding ? <ButtonLoader /> :
                      <div onClick={() => { }}>
                        <Button value={"Add Payment"} />
                      </div>}


                  </div>

                </div>
                <div className='flex bg-gray2 mx-3'>
                  <div className='w-1/3 p-2'>
                    Date
                  </div>
                  <div className='w-1/3 p-2'>
                    Paid
                  </div>
                  <div className='w-1/3 p-2'>
                    Balance
                  </div>
                </div>
                {loadingp ? <div className='w-full h-52 flex justify-center items-center'> <Loader /> </div> : null}

                <div className='h-[calc(100vh-300px)] overflow-y-auto'>
                  {[].map((pay) => {
                    return (
                      <div className='flex mx-3 border-b cursor-pointer text-sm text-gray5 border-gray1 hover:bg-gray1'>
                        <div className='w-1/3 p-2'>
                          {pay.date}
                        </div>
                        <div className='w-1/3 p-2'>
                          {pay.paid}
                        </div>
                        <div className='w-1/3 p-2'>
                          {pay.balance}
                        </div>
                      </div>
                    )
                  })}
                </div>


              </div>

            </div>
            <div className='h-1/4' onClick={closeModal2}>

            </div>

          </div>
          <div className='w-2/12' onClick={closeModal2}>

          </div>

        </div> : null}

      </div>
    </div>
  )
}

export default CustomersTable


export const Customer = ({ customer, openModal2, openModal }) => {
  return (
    <tr
      className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
      key={customer.id}
    >
      <td className="text-sm p-3 text-gray5" >
        {customer.name}
      </td>

      <td className="text-sm p-3 text-gray5">
        {customer.phone}
      </td>
      <td className="text-sm p-3 text-gray5">
        {customer.email}
      </td>
      <td className="text-sm p-3 text-gray5">
        {customer.location}
      </td>

      <td className="text-xs flex p-3 text-gray5">
        <BsTrash onClick={() => { }} className='text-red' />
        <BsPencilSquare onClick={() => openModal(customer)} className='text-yellow mx-5' />
        <p onClick={() => openModal2(customer)} className='px-1 bg-primary rounded-full -mt-1 cursor-pointor font-bold text-white'>A</p>
      </td>

    </tr>
  )
}