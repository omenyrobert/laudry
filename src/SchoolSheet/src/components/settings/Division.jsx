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
  getDivisions,
  getClassLevels,
} from '../../store/schoolSheetSlices/schoolStore'
import axiosInstance from '../../axios-instance'
import ButtonLoader from '../ButtonLoader'
import Select from 'react-select'

function Division() {
  const dispatch = useDispatch()
  const [editData, setEditData] = useState(false)
  const [editPoints, setEditPoints] = useState('')
  const [divisionId, setDivisionId] = useState('')
  const { divisions, classLevels } = useSelector((state) => state.schoolStore)
  const [classLevelOpts, setClassLevelOpts] = useState([])
  const [selectedClassLevel, setSelectedClassLevel] = useState([])
  const [selectedEditClassLevel, setSelectedEditClassLevel] = useState([])

  useEffect(() => {
    let classLevelOpts = classLevels.map((level) => {
      return {
        value: level.id,
        label: level.name,
        ...level,
      }
    })

    setClassLevelOpts(classLevelOpts)
  }, [classLevels])



  // posting division
  const [isPosting, setIsPosting] = useState(false)
  const [division, setDivision] = useState('')
  const [points, setPoints] = useState(0)
  const [upperLimit, setUpperLimit] = useState(0)
  const [lowerLimit, setLowerLimit] = useState(0)

  const postDivision = async () => {
    try {
      setIsPosting(true)
      let formData = {
        division,
        points: 1,
        upperLimit: parseFloat(upperLimit),
        lowerLimit: parseFloat(lowerLimit),
        classLevels: selectedClassLevel,
      }

      const response = await axiosInstance.post('/divisions', formData)
      const { data } = response
      const { status, payload } = data

      if (status) {
        dispatch(getDivisions())
        setDivision('')
        setPoints('')
        setUpperLimit('')
        setLowerLimit('')
        setSelectedClassLevel([])
        setIsPosting(false)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        })
      } else {
        setIsPosting(false)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'error',
          showConfirmButton: false,
          timer: 500,
          title: payload,
        })
      }
    } catch (error) {
      console.log(error)
      setIsPosting(false)
    }
  }

  // fetching divisions
  useEffect(() => {
    dispatch(getDivisions())
    dispatch(getClassLevels())
  }, [dispatch])

  //deleting Division
  const deleteDivision = (div) => {
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
          const response = await axiosInstance.delete(`/divisions/${div.id}`)
          const { data } = response
          const { status } = data
          if (status) {
            dispatch(getDivisions())
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


  const closeEditData = () => {
    setEditData(false)
  }
  const [editDivision, setEditDivision] = useState('')
  const [editFrom, setEditFrom] = useState('')
  const [editTo, setEditTo] = useState('')
  const openEditData = (div) => {
    console.log('divs', div)
    setEditData(true)
    setEditDivision(div?.division)
    setEditFrom(div.lowerLimit)
    setEditTo(div.upperLimit)
    setDivisionId(div.id)
    // setClassLevelOpts(div.classLevels);
    // let classLevelOpts = classLevels.map((level) => {
    //   return {
    //     value: level.id,
    //     label: level.name,
    //     ...level,
    //   }
    // })
    // setClassLevelOpts(classLevelOpts)
  }

  // updating division
  const updateDivision = async () => {
    try {
      let formData = {
        id: divisionId,
        division: editDivision,
        from: parseFloat(editFrom),
        to: parseFloat(editTo),
        classLevels: selectedEditClassLevel,
      }
      const subject = await axiosInstance.put('/divisions', formData)
      const { data } = subject
      const { status } = data
      if (status) {
        dispatch(getDivisions())
        setEditDivision('')
        setEditPoints('')
        setSelectedEditClassLevel([])
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
    <div className=" p-2">
      <div className="w-full">
        <div className="flex justify-between -mt-5">
          <div className="w-2/5 p-1">
            <InputField
              type="text"
              placeholder="Enter Division"
              label="Division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            />
          </div>
          <div className="w-2/5 p-1">
            <InputField
              type="text"
              placeholder="Enter Minimum Points"
              label="from"
              value={lowerLimit}
              onChange={(e) => setLowerLimit(e.target.value)}
            />
          </div>
          <div className="w-2/5 p-1">
            <InputField
              type="text"
              placeholder="Enter Maximum Points"
              label="To"
              value={upperLimit}
              onChange={(e) => setUpperLimit(e.target.value)}
            />
          </div>

          <div className="mt-14 mr-5 w-1/3 p-1 ">
            {/* <Select
              placeholder={'Select class Levels'}
              className="text-sm"
              options={classLevelOpts}
              onChange={(e) => setSelectedClassLevel(e)}
              isMulti
            />
            <br /> */}
            {isPosting ? (
              <ButtonLoader />
            ) : (
              <div onClick={postDivision}>
                <Button value={'Add'} />
              </div>
            )}
          </div>
        </div>
        <div className="h-[75vh] overflow-y-auto">
          <table className=" w-[98%] table-auto relative">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <th className="p-2 text-primary text-sm text-left">Division</th>
              <th className="p-2 text-primary text-sm text-left">from</th>
              <th className="p-2 text-primary text-sm text-left">to</th>
              <th className="p-2 text-primary text-sm text-left">
                Class Levels
              </th>
              <th className="p-2 text-primary text-sm text-left">Action</th>
            </thead>
            <tbody>
              {/* edit popup start */}
              {editData ? (
                <div className="absolute shadow-2xl rounded flex w-full p-5 bg-white">
                  <div className="w-2/5 pr-2">
                    <InputField
                      type="text"
                      placeholder="Enter Division"
                      label="Division"
                      onChange={(e) => setEditDivision(e.target.value)}
                      value={editDivision}
                    />
                  </div>
                  <div className="w-2/5 pr-2">
                    <InputField
                      type="text"
                      placeholder="Enter Points"
                      label="From"
                      onChange={(e) => setEditFrom(e.target.value)}
                      value={editFrom}
                    />
                  </div>
                  <div className="w-2/5 pr-2">
                    <InputField
                      type="text"
                      placeholder="Enter Points"
                      label="To"
                      onChange={(e) => setEditTo(e.target.value)}
                      value={editTo}
                    />
                  </div>
                  <div className="w-2/5 pr-2 mt-14">
                    <Select
                      placeholder={'Select class Levels'}
                      className="text-sm"
                      options={classLevelOpts}
                      onChange={(e) => setSelectedEditClassLevel(e)}
                      isMulti
                    />
                  </div>
                  <div className="flex justify-between w-1/5 mt-[55px]">
                    <div onClick={updateDivision}>
                      <ButtonSecondary value={'Update'} />
                    </div>
                    <div>
                      <p
                        className="text-black text-lg ml-5 cursor-pointer"
                        onClick={closeEditData}
                      >
                        X
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* edit popup end */}

              {divisions.map((div) => {
                return (
                  <tr
                    className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
                    key={div.id}
                  >
                    <td className="text-xs p-3 text-gray5">{div.division}</td>
                    <td className="text-xs p-3 text-gray5">{div.lowerLimit}</td>
                    <td className="text-xs p-3 text-gray5">{div.upperLimit}</td>
                    <td className="text-xs p-3 text-gray5">
                      <div className="flex">
                        {div.classLevels.map((clas) => {
                          return (
                            <div className="p-1 bg-gray1 rounded border border-gray2 m-1">
                              {clas.name}
                            </div>
                          )
                        })}
                      </div>
                    </td>
                    <td className="text-xs p-3 text-gray5 flex">
                      <MdDeleteOutline
                        onClick={() => deleteDivision(div)}
                        className="text-red w-4 h-4"
                      />
                      <BsPencilSquare
                        className="text-warning h-4 w-4 ml-5"
                        onClick={() => openEditData(div)}
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
export default Division
