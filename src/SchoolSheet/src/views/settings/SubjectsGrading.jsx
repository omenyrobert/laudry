import React, { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import InputField from '../../components/InputField'
import { FaPen } from 'react-icons/fa'
import Button from '../../components/Button'
import ButtonSecondary from '../../components/ButtonSecondary'
import Subjects from '../../components/settings/Subjects'
import Grades from '../../components/settings/Grades'
import Division from '../../components/settings/Division'
import Button2 from '../../components/Button2'

function SubjectsGrading() {
  const [modal, setModal] = useState(false)

  const showModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }
  return (
    <>
      <div className="flex -ml-5 h-[92vh] overflow-y-hidden">
        <div className="w-1/3 p-2">
          <Subjects />
        </div>
        <div className="w-2/3 p-2 relative">
          <div onClick={showModal} className="w-32 ml-[80%] absolute z-50 mt-2">
            <Button2 value={'Divisions'} />
          </div>
          <Grades />
        </div>
      </div>
      {modal ? (
        <div className="flex justify-between absolute z-50 top-0 left-0 right-0 h-screen w-full bg-black/50">
          <div className="w-4/12 cursor-pointer" onClick={closeModal}></div>
          <div className="w-8/12 bg-white">
            <div className="flex justify-between p-2">
              <div>
                <h5 className="text-xl font-medium ml-5 text-secondary">
                  Divisions
                </h5>
              </div>
              <div>
                <p
                  onClick={closeModal}
                  className="px-2 cursor-pointer border border-gray2 rounded-full shadow"
                >
                  X
                </p>
              </div>
            </div>
            <Division />
          </div>
        </div>
      ) : null}
    </>
  )
}
export default SubjectsGrading
