import React, { useState, useEffect } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import InputField from '../InputField'
import { FaPen } from 'react-icons/fa'
import Button from '../Button'
import ButtonSecondary from '../ButtonSecondary'
import Swal from 'sweetalert2'
import {
  getStreams,
  getClassLevels,
  getClasses,
} from '../../store/schoolSheetSlices/schoolStore'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import axiosInstance from '../../axios-instance'
import ButtonLoader from '../ButtonLoader'
import Loader from '../Loader'
import { useFeedback } from "../../hooks/feedback"
import * as store from "../../store/schoolSheetSlices/schoolStore"
import Select from 'react-select';

const ClassLevels = () => {
  const dispatch = useDispatch()
  const [editData, setEditData] = useState(false)
  const [streamEdit, setstreamEdit] = useState('')
  const [streamId, setstreamId] = useState('')
  const { streams, classLevels, classes } = useSelector((state) => state.schoolStore)
  const { toggleFeedback } = useFeedback()

  // posting 
  const [isposting, setIsPosting] = useState(false)
  const [classLevel, setClassLevel] = useState('')

  const postClassLevel = async () => {
    if (classLevel === "") {
      toggleFeedback("error", {
        title: "Error",
        text: "Please enter class level",
      })
      return
    }
    const formData = {
      name: classLevel,
    }
    try {
      setIsPosting(true)
      const response = await axiosInstance.post("/class-levels", formData)
      const { data } = response
      const { status, payload } = data
      if (status === false) {
        toggleFeedback("error", {
          title: "Error",
          text: payload,
        })
        setIsPosting(false)
        return
      }
      dispatch(getClassLevels())
      toggleFeedback("success", {
        title: "Success",
        text: "Class level added successfully",
      })
      setClassLevel("")
      setIsPosting(false)

    } catch (error) {
      console.log(error)
      setIsPosting(false)
      toggleFeedback("error", {
        title: "Error",
        text: "Something went wrong",
      })
    }
  }

  // fetching stream
  useEffect(() => {
    dispatch(getClassLevels())
    dispatch(getClasses())
  }, [dispatch])



  // updating streams
  const updateStream = async () => {
    try {
      let formData = {
        streamId: streamId,
        stream: streamEdit,
      }
      const stream = await axiosInstance.put('/streams', formData)
      const { data } = stream
      const { status } = data
      if (status) {
        dispatch(getStreams())
        setstreamEdit('')
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

  const closeEditData = () => {
    setEditData(false)
  }
  const openEditData = (stream) => {
    setEditData(true)
    setstreamEdit(stream?.stream)
    setstreamId(stream.id)
  }


  return (
    <>
      <h5 className="text-xl font-medium text-secondary">Class Levels</h5>
      <div className="w-full">
        <div className="flex justify-between bg-white pl-4 shadow-lg">
          <div className="w-[80%]">
            <InputField
              type="text"
              placeholder="Enter Class Level"
              label="Class Level"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
            />
          </div>
          <div className="mt-8 mr-5">
            <br />
            {isposting ? (
              <ButtonLoader />
            ) : (

              <div onClick={postClassLevel}>
                <Button value={'Add'} />
              </div>
            )}
          </div>
        </div>
        <div className="h-[70vh] overflow-y-auto">
          <table className="mt-10 w-full table-auto">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <th className="p-2 text-primary text-sm text-left">
                Class Levels
              </th>
              <th className="p-2 text-primary text-sm text-left">Action</th>
            </thead>
            <tbody>
              {/* edit popup start */}
              {editData ? (
                <div className="absolute shadow-lg rounded flex w-auto p-5 bg-white">
                  <div className="w-2/3 pr-5">
                    <InputField
                      type="text"
                      placeholder="Enter Stream Name"
                      label="Stream Name"
                      onChange={(e) => setstreamEdit(e.target.value)}
                      value={streamEdit}
                    />
                  </div>
                  <div className="flex justify-between w-1/3 mt-[55px]">
                    <div onClick={updateStream}>
                      <ButtonSecondary value={'Update'} />
                    </div>
                    <div className="ml-5">
                      <p
                        className="text-black text-lg cursor-pointer"
                        onClick={closeEditData}
                      >
                        X
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* edit popup end */}

              {classLevels?.map((classLevel) => {
                return (
                  <ClassLevel key={classLevel.id} classLevel={classLevel} classes={classes} />
                )
              })}
            </tbody>
          </table>
        </div>
        {streams.length === 0 ? <Loader /> : null}
      </div>
    </>
  )
}
export default ClassLevels


function ClassLevel({ classLevel, classes }) {
  const dispatch = useDispatch()
  const { toggleFeedback } = useFeedback()
  const [isDeleting, setIsDeleting] = useState(false)
  const [editData, setEditData] = useState(false)
  const [classLevelName, setClassLevelName] = useState(classLevel.name)
  const [selectedClasses, setSelectedClasses] = useState([])
  const [levelOptions, setLevelOptions] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const options = classes?.map((sclass) => {
      return {
        value: sclass.id,
        label: sclass.class,
        ...sclass
      }
    })
    setLevelOptions(options)
  }, [classes])






  const deleteClassLevel = async (classLevel) => {
    try {
      setIsDeleting(true)
      const response = await axiosInstance.delete(`/class-levels/${classLevel.id}`)
      const { data } = response
      const { status, payload } = data
      if (status) {
        dispatch(store.getClassLevels())
        toggleFeedback("success", {
          title: "Success",
          text: "Class level deleted successfully",
        })
      } else {
        toggleFeedback("error", {
          title: "Error",
          text: payload,
        })
      }
    } catch (error) {
      console.log(error)
      toggleFeedback("error", {
        title: "Error",
        text: "Something went wrong",
      })
    }
    setIsDeleting(false)
  }

  const updateClassLevel = async () => {
    // get ids of selected classes
    const classIds = selectedClasses?.map((sclass) => sclass.id)
    const formData = {
      name: classLevelName,
      classes: classIds,
      id: classLevel.id
    }

    try {
      setIsUpdating(true)
      const response = await axiosInstance.put("/class-levels", formData)
      const { data } = response
      const { status, payload } = data
      if (status === false) {
        toggleFeedback("error", {
          title: "Error",
          text: payload,
        })
        setIsUpdating(false)
        return
      }
      dispatch(getClassLevels())
      toggleFeedback("success", {
        title: "Success",
        text: "Class level updated successfully",
      })
      setEditData(false)
      setIsUpdating(false)
    } catch (error) {
      console.log(error)
      setIsUpdating(false)
      toggleFeedback("error", {
        title: "Error",
        text: "Something went wrong",
      })
    }
  }








  return (
    <>
      {/* edit popup start */}
      {editData ? (
        <div className="absolute shadow-2xl rounded flex w-[45vw] p-5 bg-white">
          <div className="w-2/5 p-2">
            <InputField
              type="text"
              placeholder="Enter Class Level"
              label="Class"
              name="Charge"
              value={classLevelName}
              onChange={(e) => setClassLevelName(e.target.value)}
            />
          </div>
          <div className="w-2/5 p-2">
            <br />
            <label className="text-gray4">Stream</label>
            <br />
            <Select
              isMulti
              options={levelOptions}
              value={selectedClasses}
              onChange={(e) => setSelectedClasses(e)}
            />

          </div>
          <div className=" w-1/5  p-2">
            <div>
              <p
                className="text-black text-lg -mt-5 ml-[100px] cursor-pointer"
                onClick={(e) => {
                  setEditData(false)
                }}
              >
                X
              </p>
            </div>
            <br />
            {
              isUpdating ? (<div className="loader2 text-red mt-3"></div>) : (
                <div onClick={(e) => {
                  updateClassLevel()
                }} className="mt-3">
                  <ButtonSecondary value={'Update'} />
                </div>
              )
            }

          </div>
        </div>
      ) : null}
      {/* edit popup end */}
      <tr
        className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
        key={classLevel.id}
      >
        <td className="text-xs p-3 text-gray5">
          {classLevel.name}{" "}
          {
            classLevel.classes?.map((sclass) => {
              return (
                <span className="text-gray4 text-xs ml-2">{sclass.class}</span>
              )
            }
            )
          }
        </td>
        <td className="text-xs p-3 text-gray5">
          <div className="flex">
            {
              isDeleting ? (<div className="loader2 text-red"></div>) : (<MdDeleteOutline
                onClick={() => deleteClassLevel(classLevel)}
                className="text-red w-4 h-4"
              />
              )
            }

            <BsPencilSquare
              onClick={() => {
                setEditData(true)
              }}
              className="text-warning h-4 w-4 ml-5"
            />
          </div>
        </td>


      </tr>
    </>
  )
}