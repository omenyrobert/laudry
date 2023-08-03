import React, { useEffect, useState } from 'react'
import Button from '../Button'
import ButtonSecondary from '../ButtonSecondary'
import InputField from '../InputField'
import { FaPen } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubjects,
  getClassLevels,
} from '../../store/schoolSheetSlices/schoolStore'
import axiosInstance from '../../axios-instance'
import ButtonLoader from '../ButtonLoader'
import Select from 'react-select'

function Subject() {
  const dispatch = useDispatch()
  const { subjects, classLevels } = useSelector((state) => state.schoolStore)
  const [editData, setEditData] = useState(false)
  const [editSubject, setEditSubject] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [classLevelOpts, setClassLevelOpts] = useState([])
  const [selectedClassLevels, setSelectedClassLevels] = useState([])
  const [selectedEditClassLevels, setSelectedEditClassLevels] = useState([])

  useEffect(() => {
    const classLevelOpts = classLevels.map((classLevel) => {
      return {
        value: classLevel.id,
        label: classLevel.name,
        ...classLevel,
      }
    })
    setClassLevelOpts(classLevelOpts)
  }, [classLevels])

  const closeEditData = () => {
    setEditData(false)
  }

  const openEditData = (subject) => {
    setEditData(true)
    setEditSubject(subject?.subject)
    setSubjectId(subject.id)
  }

  // posting subject
  const [isposting, setIsPosting] = useState(false)
  const [subject, setSubject] = useState('')
  const postSubject = async () => {
    try {
      setIsPosting(true)
      let formData = {
        subject: subject,
        classLevels: selectedClassLevels,
      }

      const response = await axiosInstance.post('/subjects', formData)
      const { data } = response
      const { status } = data

      if (status) {
        dispatch(getSubjects())
        setSubject('')
        setSelectedClassLevels([])
        setIsPosting(false)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        })
      }
    } catch (error) {
      console.log(error)
      setIsPosting(false)
    }
  }

  // fetching subject
  useEffect(() => {
    dispatch(getSubjects())
    dispatch(getClassLevels())
  }, [dispatch])

  //deleting subject
  const deleteSubject = (subject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/subjects/${subject.id}`)
          const { data } = response
          const { status } = data
          if (status) {
            dispatch(getSubjects())
            Swal.fire({
              icon: 'success',
              showConfirmButton: false,
              timer: 500,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  // updating subject
  const updateSubject = async () => {
    try {
      let formData = {
        subjectId: subjectId,
        subject: editSubject,
        classLevels: selectedEditClassLevels,
      }
      const subject = await axiosInstance.put('/subjects', formData)
      const { data } = subject
      const { status } = data
      if (status) {
        dispatch(getSubjects())
        setEditSubject('')
        setSelectedEditClassLevels([])
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        })
        closeEditData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" bg-white pl-5 shadow-lg rounded-md h-auto p-3">
      <h5 className="text-xl font-medium ml-5 text-secondary">Subject</h5>
      <div className="w-full">
        <div className="flex justify-between ">
          <div className="w-2/3">
            <InputField
              type="text"
              placeholder="Enter Subject"
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="w-1/3 ml-2 mt-8 ">
            <div className="w-[100px]">
              <br />
              {isposting ? (
                <ButtonLoader />
              ) : (
                <div onClick={postSubject}>
                  <Button value={'Add'} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-[70vh] overflow-y-auto">
          <table className="mt-10 w-[98%] table-auto">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <th className="p-2 text-primary text-sm text-left">Subject</th>
              <th className="p-2 text-primary text-sm text-left">Action</th>
            </thead>
            <tbody>
              {/* edit popup start */}
              {editData ? (
                <div className="absolute z-50 shadow-2xl rounded w-[30vw] bg-white">
                  <div className="flex justify-between p-2 bg-gray1 text-primary font-bold">
                    <div>Edit Subject</div>
                    <div>
                      <p
                        className="text-black text-lg ml-5 cursor-pointer"
                        onClick={closeEditData}
                      >
                        X
                      </p>
                    </div>
                  </div>
                  <div className="flex p-2">
                    <div className="w-5/12 pr-2">
                      <InputField
                        type="text"
                        placeholder="Enter Subject"
                        label="Subject"
                        onChange={(e) => setEditSubject(e.target.value)}
                        value={editSubject}
                      />
                    </div>
                    <div className="w-5/12 mt-14">
                      <Select
                        placeholder={'Select class Levels'}
                        className="text-sm"
                        options={classLevelOpts}
                        onChange={(e) => setSelectedEditClassLevels(e)}
                        isMulti
                      />
                    </div>
                    <div className=" w-2/12 mt-[55px] ml-4">
                      <div onClick={updateSubject}>
                        <ButtonSecondary value={'Update'} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* edit popup end */}

              {subjects.map((subject) => {
                return (
                  <tr
                    className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
                    key={subject.id}
                  >
                    <td className="text-xs p-3 text-gray5">
                      {subject.subject}{' '}
                      {subject.classLevels?.map((classLevel) => {
                        return (
                          <span className="text-xs text-gray5">
                            {classLevel.name},
                          </span>
                        )
                      })}
                    </td>

                    <td className="text-xs p-3 text-gray5 flex">
                      <MdDeleteOutline
                        onClick={() => deleteSubject(subject)}
                        className="text-red w-4 h-4"
                      />
                      <BsPencilSquare
                        className="text-warning h-4 w-4 ml-5"
                        onClick={() => openEditData(subject)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Subject
