import React, { useState, useEffect } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import InputField from '../InputField'
import { FaPen } from 'react-icons/fa'
import Button from '../Button'
import ButtonSecondary from '../ButtonSecondary'
// import { GrDown } from "react-icons/gr";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../../assets/styles/main.css'
// import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../axios-instance'
import {
  getClasses,
  getStreams,
} from '../../store/schoolSheetSlices/schoolStore'
import ButtonLoader from '../ButtonLoader'
import Loader from '../Loader'

const ClassesComp = () => {
  const dispatch = useDispatch()

  const [selectedStream, setSelectedStream] = useState([])

  const { streams, classes } = useSelector((state) => state.schoolStore)

  const handleStreamChange = (streamId) => {
    let streamIds = selectedStream
    streamIds.push(streamId)
    setSelectedStream(streamIds)
  }

  const filter = (dataToFilter = [], dataSelected = []) => {
    return dataToFilter.filter((datum) => !dataSelected.includes(datum.id))
  }

  let streamOptions = filter(streams, selectedStream)

  // posting classes
  const [isposting, setIsPosting] = useState(false)
  const [sclass, setSclass] = useState('')

  const postClass = async () => {
    try {
      setIsPosting(true)
      let formData = {
        name: sclass,
        stream: selectedStream,
      }
      if (sclass) {
        const response = await axiosInstance.post('/class', formData)
        const { data } = response
        const { status } = data
        if (status) {
          setSclass('')
          setSelectedStream([])
          dispatch(getClasses())
          setIsPosting(false)
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 500,
          })
        }
      }
    } catch (error) {
      console.log(error)
      setIsPosting(false)
    }
  }

  // update
  const updateClass = async () => {
    try {
      let form_data = {
        name: sclassEdit,
        classId: classId,
        stream: selectedStream,
      }
      const response = await axiosInstance.put('/class', form_data)
      const { data } = response
      const { status } = data
      if (status) {
        setSelectedStream([])
        dispatch(getClasses())
        closeEditData()
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // delete
  const deleteClass = (sclass) => {
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
          const response = await axiosInstance.delete(`/class/${sclass.id}`)
          const { data } = response
          const { status } = data
          if (status) {
            dispatch(getClasses())
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

  // fetching stream

  const [editData, setEditData] = useState(false)
  const [classId, setclassId] = useState('')
  const [sclassEdit, setsclassEdit] = useState('')
  // const [Edit, setEdit] = useState("");

  const closeEditData = () => {
    setEditData(false)
  }
  const openEditData = (sclass) => {
    setEditData(true)
    setsclassEdit(sclass?.class)
    setclassId(sclass.id)
  }

  useEffect(() => {
    dispatch(getClasses())
    dispatch(getStreams())
  }, [dispatch])

  const [select1, setSelect1] = useState(false)

  const showSelect = () => {
    streamOptions = filter(streams, selectedStream)
    setSelect1(true)
  }

  const closeSelect = () => {
    setTimeout(() => {
      setSelect1(false)
    }, 200)
  }

  const [select2, setSelect2] = useState(false)

  const showSelect2 = () => {
    setSelect2(true)
  }

  const closeSelect2 = () => {
    setTimeout(() => {
      setSelect2(false)
    }, 200)
  }

  return (
    <>
      <h5 className="text-xl font-medium text-secondary">Classes</h5>
      <div className="w-full">
        <div className="flex justify-between bg-white pl-5 shadow-lg">
          <div className="w-[65%]">
            <InputField
              type="text"
              placeholder="Enter class"
              label="Class"
              value={sclass}
              onChange={(e) => setSclass(e.target.value)}
            />
          </div>

          <div className="mt-6 mr-8">
            <br />
            {isposting ? (
              <ButtonLoader />
            ) : (
              <div onClick={postClass} className="w-auto">
                <Button value={'Add Class'} />
              </div>
            )}
          </div>
        </div>
        <div className="h-[70vh] overflow-y-auto">
          <table className="mt-10 w-[98%] table-auto">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <th className="p-2 text-primary text-sm text-left">Class</th>
              {/* <th className="p-2 text-primary text-sm text-left">Stream</th> */}

              <th className="p-2 text-primary text-sm text-left">Action</th>
            </thead>
            <tbody>
              {/* edit popup start */}
              {editData ? (
                <div className="absolute shadow-2xl rounded flex w-[45vw] p-5 bg-white">
                  <div className="w-2/5 p-2">
                    <InputField
                      type="text"
                      placeholder="Enter Class"
                      label="Class"
                      name="Charge"
                      value={sclassEdit}
                      onChange={(e) => setsclassEdit(e.target.value)}
                    />
                  </div>
                  <div className="w-2/5 p-2">
                    <br />
                    <label className="text-gray4">Stream</label>
                    <br />
                    <input
                      onFocus={showSelect2}
                      onBlur={closeSelect2}
                      type="search"
                      placeholder="Select Streams"
                      className="p-3 w-[15vw] relative bg-gray1 text-sm rounded-md"
                    />
                    {select2 ? (
                      <div className="absolute z-50 w-[15vw] bg-white shadow-md rounded-md h-52 overflow-y-auto">
                        {streamOptions.map((stream) => {
                          return (
                            <div className="p-2 hover:bg-gray1 flex cursor-pointer">
                              <div>
                                <input
                                  type="checkbox"
                                  className="cursor-pointer"
                                  onClick={() => handleStreamChange(stream.id)}
                                />
                              </div>
                              <div className="text-gray5 ml-5">
                                {stream.stream}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                  <div className=" w-1/5  p-2">
                    <div>
                      <p
                        className="text-black text-lg -mt-5 ml-[100px] cursor-pointer"
                        onClick={closeEditData}
                      >
                        X
                      </p>
                    </div>
                    <br />
                    <div onClick={updateClass} className="mt-3">
                      <ButtonSecondary value={'Update'} />
                    </div>
                  </div>
                </div>
              ) : null}
              {/* edit popup end */}

              {classes.map((sclass) => {
                return (
                  <tr
                    className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
                    key={sclass.id}
                  >
                    <td className="text-xs p-3 text-gray5">
                      {sclass.class}{' '}
                      {sclass.streams.map((stream) => {
                        return (
                          <span className="p-1 bg-white shadow rounded m-1">
                            {stream.stream}
                          </span>
                        )
                      })}
                    </td>
                    {/* <td className="text-xs p-3 text-gray5">{sclass.stream.stream}</td> */}

                    <td className="text-xs p-3 text-gray5 flex">
                      <MdDeleteOutline
                        onClick={() => deleteClass(sclass)}
                        className="text-red w-4 h-4"
                      />

                      <BsPencilSquare
                        className="text-warning h-4 w-4 ml-5"
                        onClick={() => openEditData(sclass)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {classes.length === 0 ? <Loader /> : null}
      </div>
    </>
  )
}
export default ClassesComp
