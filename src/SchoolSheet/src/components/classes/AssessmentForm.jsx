import React, { useState, useEffect } from 'react'
import InputField from '../InputField'
import Button2 from '../Button2'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import '../../assets/styles/main.css'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
  getGrades,
  getClasses,
  getStreams,
  getStudents,
  getDivisions,
  getAssessmentsByTerm,
} from '../../store/schoolSheetSlices/schoolStore'
import ButtonLoader from '../ButtonLoader'
import axiosInstance from '../../axios-instance'
import Button from '../Button'
import { assignGrade } from '../../utils/assessment'

const actions = [
  { label: 'Promote', value: 'promoted' },
  { label: 'Repeat', value: 'repeated' },
  { label: 'Promoted on probation', value: 'promoted_on_probation' },
]

function AssessmentForm({
  closeAdd,
  studentId,
  studentData,
  openEditData,
  assessData,
  examTypesData,
  assessSubject,
  subjectsData,
  assessAll,
  term,
  stream,
  setSelectedSubject,
  selectedSubject,
  subjects,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState(null)
  const [finalMark, setFinalMark] = useState(null)
  const [action, setAction] = useState(null)
  const [_class, setClass] = useState(null)
  const [classOptions, setClassOptions] = useState([])
  const [streamOptions, setStreamOptions] = useState([])
  const [streamProm, setStreamProm] = useState(null)
  const [generalComment, setGeneralComment] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const { grades, classes, streams } = useSelector((state) => state.schoolStore)
  const [classTeachersSignature, setClassTeachersSignature] = useState(null)
  const [headTeachersSignature, setHeadTeachersSignature] = useState(null)
  const [headTeachersComment, setHeadTeachersComment] = useState('')

  const [formData, setFormData] = useState({
    mark: '',
    comment: '',
  })
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (e.target.name === 'mark') {
      const finalMk = (formData.mark / 100) * selectedExam.percent
      setFinalMark(finalMk)
    }
  }
  const [asessing, setAssessing] = useState(false)
  const postAssessment = async (e) => {
    
    e.preventDefault()
    const _finalMark = (formData.mark / 100) * selectedExam.percent

    const gradeObj = assignGrade(formData.mark, grades, selectedSubject)
    console.log(gradeObj)

    try {
      setAssessing(true);
      let body = {
        studentId: studentId,
        examType: selectedExam.id,
        subject: assessSubject,
        mark: formData.mark,
        finalMark: _finalMark,
        comment: formData.comment,
        examPercent: selectedExam.percent,
        term: term?.id,
        stream,
        grade: gradeObj.grade,
        points: gradeObj.points,
      }

      if (formData) {
        const response = await axiosInstance.post('/assessments', body)
        const { data } = response
        const { status } = data

        if (status) {
          dispatch(getAssessmentsByTerm(term.id))
          setFormData({
            mark: '',
            comment: '',
          })
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
    }
    setAssessing(false)
  }

  const deleteAssess = (item) => {
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
          const response = await axiosInstance.delete(`/assessments/${item.id}`)
          const { data } = response
          const { status } = data
          if (status) {
            dispatch(getAssessmentsByTerm(term.id))
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

  // get grades
  useEffect(() => {
    dispatch(getGrades())
    dispatch(getClasses())
    dispatch(getStreams())
    dispatch(getDivisions())
  }, [dispatch])

  // get classes
  useEffect(() => {
    const data = classes.map((_class) => ({
      label: _class.class,
      value: _class.class,
    }))
    setClassOptions(data)
  }, [classes])

  // get Stream options
  useEffect(() => {
    const data = streams.map((_stream) => ({
      label: _stream.stream,
      value: _stream.stream,
      id: _stream.id,
    }))
    setStreamOptions(data)
  }, [streams])

  // update student on promotion
  const updateStudent = async () => {
    try {
      setIsPosting(true)
      /* let reportData = {
        action: action.value,
        stream: streamProm.value,
        comment: generalComment,
        classField: _class.value,
        term: term.id,
        studentId: parseFloat(studentId),
        classTeachersComment: generalComment,
      } */
      const reportData = new FormData()
      reportData.append('action', action.value)
      reportData.append('stream', streamProm.value)
      reportData.append('comment', generalComment)
      reportData.append('classField', _class.value)
      reportData.append('term', term.id)
      reportData.append('studentId', parseFloat(studentId))
      reportData.append('classTeachersComment', generalComment)
      reportData.append('classTeachersSignature', classTeachersSignature)
      reportData.append('headTeachersSignature', headTeachersSignature)
      reportData.append('headTeachersComment', headTeachersComment)



      const report = await axiosInstance.post('/reports', reportData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const { data } = report
      const { status } = data

      if (action.value === 'promoted' && status) {
        // TODO: // Add other student Fields
        let formData = {
          id: studentId,
          studentClass: _class.value,
          studentStream: streamProm.value,
        }
        const student = await axiosInstance.put('/students/edit', formData)

        const { data: studentData } = student
        const { status: studentStatus } = studentData
        if (studentStatus) {
          dispatch(getStudents())
          setStreamOptions(null)
          setClassOptions(null)
          setGeneralComment('')
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 500,
          })
          closeAdd()
          setIsPosting(false)
          navigate('/reportCards')
        }
      }
    } catch (error) {
      console.log(error)
      setIsPosting(false)
    }
    setIsPosting(false)
    navigate('/reportCards')
  }

  return (
    <>
      <div className="bg-white p-3 h-[80vh] overflow-y-auto">
        <div className="bg-gray1 p-2 font-semibold flex justify-between text-primary">
          <div>
            {studentData.firstName} {studentData.middleName}
            {studentData.lastName}
          </div>
          <div>
            <Select
              placeholder="Select Subject"
              label="Subject"
              onChange={(e) => {
                setSelectedSubject(e.value)
              }}
              options={subjectsData}
            />
          </div>
          <div>{term?.term}</div>

          <div className="cursor-pointer" onClick={closeAdd}>
            X
          </div>
        </div>
        <div className="flex">
          <div className="w-4/12 p-1">
            <br />
            <Select
              placeholder="Select Exam Type"
              label="Exam Type"
              defaultValue={selectedExam}
              onChange={setSelectedExam}
              options={examTypesData}
            />
          </div>
          <div className="w-3/12 p-1">
            <InputField
              placeholder="Enter Marks in %"
              name="mark"
              value={formData.mark}
              onChange={onChange}
            />
          </div>
          <div className="w-3/12 p-1">
            <InputField
              placeholder="Enter Comment"
              name="comment"
              value={formData.comment}
              onChange={onChange}
            />
          </div>
          <div className="w-2/12 mt-6 ml-1">
            {asessing ? (
              <ButtonLoader />
            ) : (
              <div onClick={postAssessment}>
                <Button value={'Add'} />
              </div>
            )}
          </div>
        </div>

        <div className="m-1 flex bg-gray1 p-2 text-sm ">
          <div className="w-1/4">Exam Type</div>
          <div className="w-1/4">Marks %</div>
          <div className="w-1/4">Final Mark </div>
          <div className="w-1/4">Grade</div>
          <div className="w-1/4">Points</div>
          <div className="w-1/4">Comment</div>
          <div className="w-1/4">Action</div>
        </div>

        {assessData.map((student) => {
          if (student.studentId === studentId.toString()) {
            return (
              <div
                className="flex hover:bg-gray1 p-2 text-xs cursor-pointer mx-5"
                key={student.id}
              >
                <div className="w-1/4">{student?.examType}</div>
                <div className="w-1/4"> {student.mark} </div>
                <div className="w-1/4">{student.finalMark}</div>
                <div className="w-1/4">{student.grade ?? 'No Grade'}</div>
                <div className="w-1/4">{student.points}</div>
                <div className="w-1/4"> {student.comment} </div>
                <div className="w-1/4">
                  <div className="flex">
                    <MdDeleteOutline
                      className="text-red w-4 h-4"
                      onClick={() => deleteAssess(student)}
                    />
                    {/* <BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(student)}
										/> */}
                  </div>
                </div>
              </div>
            )
          }
          return null
        })}

        <div className="overflow-x-auto w-full">
          {assessAll.map((data) => {
            const { examTypes } = data
            const gradeObj = assignGrade(data.markGrade, grades)
            return (
              <div className=" w-[55vw] flex text-sm bg-gray1 cursor-pointer">
                <div className="w-2/12   border-gray2 border p-2">
                  {data.subject}
                </div>
                {examTypes.map((examType) => (
                  <div className="w-2/12  flex  border-gray2 p-2 border">
                    <div className="p-1">{examType.type}</div>{' '}
                    <div className="p-1">{examType.markPercent}</div>
                  </div>
                ))}
                <div className="w-2/12 flex  border-gray2 p-2 border">
                  <div className="p-1">{`${Math.floor(data.markGrade)}%`}</div>{' '}
                  <div className="p-1">{gradeObj.grade}</div>
                </div>
                <div className="w-2/12 flex  border-gray2 p-2 border">
                  <div className="p-1">Pts</div>{' '}
                  <div className="p-1">{gradeObj.points}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-2">
          <div></div>
          <div className="w-20 ">
            {isPosting ? (
              <ButtonLoader />
            ) : (
              <div onClick={updateStudent}>
                {' '}
                <Button value={'Assess'} />
              </div>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="p-2 w-1/3 mt-5">
            <Select
              placeholder="Select Action"
              label="actions"
              defaultValue={action}
              onChange={setAction}
              options={actions}
            />
          </div>
          <div className="p-2 w-1/3 ml-5 mt-5">
            <Select
              placeholder="Select Stream"
              label="streams"
              defaultValue={streamProm}
              onChange={setStreamProm}
              options={streamOptions}
            />
          </div>
          <div className="p-2 w-1/3 ml-5 mt-5">
            <Select
              placeholder="Select Class"
              label="Class"
              defaultValue={_class}
              onChange={setClass}
              options={classOptions}
            />
          </div>
        </div>
        <div className="flex">
          <div className="p-2 w-1/2">
            <InputField
              placeholder="Class Teacher's Comment"
              label="Class Teacher's Comment"
              name="comment"
              value={generalComment}
              onChange={(e) => setGeneralComment(e.target.value)}
            />
          </div>
          <div className="p-2 w-1/2 ml-5 mt-5">
            <InputField
              label="Class Teacher's Signiture"
              type="file"
              onChange={(e) => {
                // console.log(e.target.files[0])
                // set the file 
                setClassTeachersSignature(e.target.files[0])
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <InputField
              label="Head Master's Comment"
              placeholder="Head Master's Comment"
              type="text"
              value={headTeachersComment}
              onChange={(e) => setHeadTeachersComment(e.target.value)}
            />
          </div>
          <div className="w-1/2 ml-5">
            <InputField
              label="Head Master's Signiture"
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0])
                // set the file 
                setHeadTeachersSignature(e.target.files[0])
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AssessmentForm
