import React, { useState } from "react";
import InputField from "../components/InputField";
import Button2 from "../components/Button2";
import { BsSearch } from "react-icons/bs";
import UserTable from "../components/user/UserTable";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import axiosInstance from "../axios-instance";
import ButtonLoader from "../components/ButtonLoader";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const Users = () => {
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const [posting, setPosting] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")



  const postUser = async () => {

    if (firstName !== "" && lastName !== "" && email !== "" && phone !== "" && location !== "") {
      try {
        setPosting(true)
        let formData = {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email,
          phone: phone,
          location: location
        }
        let res = await axiosInstance.post("/staff", formData);
        if (res.status) {
          setFirstName("");
          setMiddleName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setLocation("");
          setPosting(false)
          closeModal();
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            icon: "success",
            showConfirmButton: false,
            timer: 500,
          });
        }

      } catch (error) {
        setPosting(false)
      } finally {
        setPosting(false)
      }
    }
  }




  return (
    <div className="w-full bg-white rounded-md shadow pr-5">
      <div className="flex w-full justify-between">
        <div className=''>
          <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
            User
          </h1>
        </div>
        <div className="w-4/12 ">

          <InputField
            type="text"
            placeholder="Search For Student ..."
            name="lastName"
            icon={
              <BsSearch
                className="w-3 -ml-7 mt-3 cursor-pointer"
                type="button"
              />
            }
          />
        </div>
        <div className="mt-5" onClick={openModal}>
          <Button2 value={"Add User"} />
        </div>
      </div>


      {modal ? <div className='z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex'>
        <div className='w-3/12' onClick={closeModal}>

        </div>
        <div className='w-6/12'>
          <div className='rounded-lg bg-white mt-[10vh]'>
            <div className='flex text-xl justify-between font-semibold text-primary p-2 bg-gray1'>
              <div>
                <p>Add User</p>
              </div>
              <div>
                <p onClick={closeModal} className='cursor-pointer'>X</p>
              </div>

            </div>
            <div className='flex'>
              <div className='w-1/2 p-2'>
                <InputField value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" placeholder="Enter First Name" />
                <InputField value={middleName} onChange={(e) => setMiddleName(e.target.value)} label="Middle Name" placeholder="Enter Middle Name" />
              </div>
              <div className='w-1/2 p-2'>
                <InputField value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" placeholder="Last Name" />
                <InputField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter Email" />
              </div>

            </div>

            <div className='flex justify-between p-2 bg-gray1'>
              <div onClick={closeModal}>
                <ButtonSecondary value={"Close"} />

              </div>
              <div className="w-32">

                {posting ? <ButtonLoader /> : <div onClick={postUser}>
                  <Button value={"Add User"} />
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

      <UserTable />
    </div>
  )
}

export default Users