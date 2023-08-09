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
import axiosInstance from '../../axios-instance'
import {
  getGrades,
  getSubjects,
  getClassLevels,
} from '../../store/schoolSheetSlices/schoolStore'
import ButtonLoader from '../ButtonLoader'
import Select from 'react-select'

function Grades() {
  const dispatch = useDispatch()
  const [editData, setEditData] = useState(false)
  const { grades, subjects, classLevels } = useSelector(
    (state) => state.schoolStore,
  )
  const [classLevelOpts, setClassLevelOpts] = useState([])
  const [subjectOpts, setSubjectOpts] = useState([])
  const [selectedClassLevels, setSelectedClassLevels] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])

  useEffect(() => {
    const classLevelOptions = classLevels.map((classLevel) => {
      return {
        value: classLevel.id,
        label: classLevel.name,
        ...classLevel,
      }
    })
    setClassLevelOpts(classLevelOptions)
  }, [classLevels])

  useEffect(() => {
    const subjectOptions = subjects.map((subject) => {
      return {
        value: subject.id,
        label: subject.subject,
        ...subject,
      }
    })
    setSubjectOpts(subjectOptions)
  }, [subjects])

  useEffect(() => {
    dispatch(getGrades())
    dispatch(getSubjects())
    dispatch(getClassLevels())
  }, [dispatch])

  const closeEditData = () => {
    setEditData(false)
  }

  // posting grade
  const [grade, setGrade] = useState('')
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [points, setPoints] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const postGrade = async () => {
    try {
      setIsPosting(true)
      let formData = {
        from: from,
        to: to,
        grade: grade,
        points,
        classLevels: selectedClassLevels,
        subjects: selectedSubjects,
      }
      const response = await axiosInstance.post('/grades', formData)
      const { data } = response
      const { status } = data
      if (status) {
        dispatch(getGrades())
        setFrom('')
        setTo('')
        setGrade('')
        setPoints('')
        setSelectedClassLevels([])
        setSelectedSubjects([])
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

  //deleting grade
  const deleteGrade = (grade) => {
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
          const response = await axiosInstance.delete(`/grades/${grade.id}`)
          const { data } = response
          const { status } = data
          if (status) {
            dispatch(getGrades())
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

  // updating grade
  const [gradeEdit, setGradeEdit] = useState('')
  const [toEdit, setToEdit] = useState('')
  const [fromEdit, setFromEdit] = useState('')
  const [gradeId, setGradeId] = useState('')
  const [pointsEdit, setPointsEdit] = useState('')
  const [selectedEditClassLevels, setSelectedEditClassLevels] = useState([])
  const [selectedEditSubjects, setSelectedEditSubjects] = useState([])

  const openEditData = (grade) => {
    setEditData(true)
    setGradeEdit(grade?.grade)
    setToEdit(grade.to)
    setFromEdit(grade.from)
    setGradeId(grade.id)
    setPointsEdit(grade.points)
    setSelectedEditClassLevels(
      grade.classLevels.map((classLevel) => {
        return {
          value: classLevel.id,
          label: classLevel.name,
          ...classLevel,
        }
      }),
    )
    setSelectedEditSubjects(
      grade.subjects.map((subject) => {
        return {
          value: subject.id,
          label: subject.subject,
          ...subject,
        }
      }),
    )
  }
  const [updating, setUpdating] = useState(false)

  const updateGrade = async () => {
    try {
      setUpdating(true)
      let formData = {
        from: fromEdit,
        to: toEdit,
        grade: gradeEdit,
        points: pointsEdit,
        classLevels: selectedEditClassLevels,
        subjects: selectedEditSubjects,
      }
      const grade = await axiosInstance.put(`/grades/${gradeId}`, formData)
      const { data } = grade
      const { status } = data
      if (status) {
        dispatch(getGrades())
        setGradeEdit('')
        setToEdit('')
        setFromEdit('')
        setPointsEdit('')
        setSelectedEditClassLevels([])
        setSelectedEditSubjects([])
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        })
        closeEditData()
        setUpdating(false)
      }
    } catch (error) {
      console.log(error)
      setUpdating(false)
    }
    setUpdating(false)
  }

  return (
    <div className=" bg-white shadow-lg rounded-md p-5">
      <h5 className="text-xl font-medium text-secondary my-2">Grading</h5>
      <div className="w-full">
        <div className="flex justify-between -mt-5">
          <div className="w-1/4">
            <InputField
              type="number"
              placeholder="Enter starting marks"
              label="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            {/* <Select
              placeholder={'Select class Levels'}
              className="text-sm"
              options={classLevelOpts}
              onChange={(e) => setSelectedClassLevels(e)}
              value={selectedClassLevels}
              isMulti
            /> */}
          </div>
          <div className="w-1/4 ml-2">
            <InputField
              type="number"
              placeholder="Enter end marks"
              label="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />

            {/* <Select
              placeholder={'Select Subjects'}
              className="text-sm"
              options={subjectOpts}
              onChange={(e) => setSelectedSubjects(e)}
              value={selectedSubjects}
              isMulti
            /> */}
          </div>
          <div className="w-1/4 ml-2">
            <InputField
              type="text"
              placeholder="Enter grade"
              label="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="w-1/4 ml-2">
            <InputField
              type="text"
              placeholder="Enter points"
              label="Points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
            <div className="w-20 ml-2">
              {isPosting ? (
                <ButtonLoader />
              ) : (
                <div onClick={postGrade}>
                  <Button value={'Add'} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[65vh] mt-5 overflow-y-auto relative">
          <table className="w-[98%] table-auto">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <th className="p-2 text-primary text-sm text-left">
                Class Level
              </th>
              <th className="p-2 text-primary text-sm text-left">Subjects</th>
              <th className="p-2 text-primary text-sm text-left">From</th>
              <th className="p-2 text-primary text-sm text-left">To</th>

              <th className="p-2 text-primary text-sm text-left">Grade</th>
              <th className="p-2 text-primary text-sm text-left">Points</th>
              <th className="p-2 text-primary text-sm text-left">Action</th>
            </thead>
            <tbody>
              {/* edit popup start */}
              {editData ? (
                <div className="absolute shadow-2xl rounded  w-full bg-white">
                  <div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
                    <div>Edit Grade</div>
                    <div>
                      <p className="cursor-pointer" onClick={closeEditData}>
                        X
                      </p>
                    </div>
                  </div>
                  <div className="flex p-3">
                    <div className="w-1/4 pr-2">
                      <InputField
                        type="number"
                        placeholder="Enter starting marks"
                        label="From"
                        value={fromEdit}
                        onChange={(e) => setFromEdit(e.target.value)}
                      />
                    </div>
                    <div className="w-1/4 pr-2">
                      <InputField
                        type="number"
                        placeholder="Enter end marks"
                        label="To"
                        value={toEdit}
                        onChange={(e) => setToEdit(e.target.value)}
                      />
                    </div>
                    <div className="w-1/4 pr-2">
                      <InputField
                        type="text"
                        placeholder="Enter grade"
                        label="Grade"
                        value={gradeEdit}
                        onChange={(e) => setGradeEdit(e.target.value)}
                      />
                    </div>
                    <div className="w-1/4 pr-2">
                      <InputField
                        type="text"
                        placeholder="Enter points"
                        label="Points"
                        value={pointsEdit}
                        onChange={(e) => setPointsEdit(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex p-3">
                    <div className="w-4/12 pr-2">
                      <Select
                        placeholder={'Select class Levels'}
                        className="text-sm"
                        options={classLevelOpts}
                        onChange={(e) => setSelectedEditClassLevels(e)}
                        value={selectedEditClassLevels}
                        isMulti
                      />
                    </div>
                    <div className="w-4/12 pr-2">
                      <Select
                        placeholder={'Select Subjects'}
                        className="text-sm"
                        options={subjectOpts}
                        onChange={(e) => setSelectedEditSubjects(e)}
                        value={selectedEditSubjects}
                        isMulti
                      />
                    </div>
                    <div className="w-2/12"></div>
                    <div className="w-2/12"></div>
                  </div>
                  <div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
                    <div>
                      <div onClick={closeEditData}>
                        <ButtonSecondary value={'Update'} />
                      </div>
                    </div>
                    <div className="w-32">
                      {updating ? (
                        <ButtonLoader />
                      ) : (
                        <div onClick={updateGrade}>
                          <Button value={'Update'} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
              {/* edit popup end */}

              {grades.map((grade) => {
                return (
                  <tr
                    className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
                    key={grade.id}
                  >
                    <td className="text-xs p-3 text-gray5  ">
                      <div className="max-w-56 overflow-x-auto flex">
                        {grade.classLevels.map((classl) => {
                          return (
                            <div className="bg-gray1 shadow border border-gray2 rounded p-1 m-1">
                              {classl.name}
                            </div>
                          )
                        })}
                      </div>
                    </td>
                    <td className="text-xs p-3 text-gray5">
                      <div className="max-w-56 overflow-x-auto flex">
                        {grade.subjects.map((subject) => {
                          return (
                            <div className="bg-gray1 shadow border border-gray2 rounded p-1 m-1">
                              {subject.subject}
                            </div>
                          )
                        })}
                      </div>
                    </td>
                    <td className="text-xs p-3 text-gray5">{grade.from}</td>
                    <td className="text-xs p-3 text-gray5">{grade.to}</td>
                    <td className="text-xs p-3 text-gray5">{grade.grade}</td>
                    <td className="text-xs p-3 text-gray5">{grade.points}</td>
                    <td className="text-xs p-3 text-gray5 flex">
                      <MdDeleteOutline
                        onClick={(e) => deleteGrade(grade)}
                        className="text-red w-4 h-4"
                      />
                      <BsPencilSquare
                        className="text-warning h-4 w-4 ml-5"
                        onClick={() => openEditData(grade)}
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
export default Grades
