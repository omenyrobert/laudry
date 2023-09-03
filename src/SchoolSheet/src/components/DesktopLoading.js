import React from 'react'
import { FaBriefcase } from "react-icons/fa";

const DesktopLoading = () => {
  return (
    <div className="w-full flex bg-gray1 justify-center items-center h-screen">
      <div>
        <div className='flex'>
          <div>
            <FaBriefcase className="text-secondary text-3xl mt-2" />
          </div>
          <div>
            <p className='font-semibold text-3xl text-secondary ml-2 mt-1'>School SoftOffice</p>
          </div>
        </div>
        <br />
        <div className="loader w-20  h-20 m-auto"></div>
        <br />

        <p className="text-xl font-bold ">Please wait. Loading...</p>
      </div>

    </div>
  )
}

export default DesktopLoading