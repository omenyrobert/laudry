import React, { useEffect, useState } from 'react'
import '../../assets/styles/main.css'
import ExamsTypes from '../../components/classes/ExamsTypes'
import AssessmentForm from '../../components/classes/AssessmentForm'
import EditAssessmentForm from '../../components/classes/EditAssessmentForm'
import InputField from '../../components/InputField'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubjects,
  getStudents,
  getTerms,
  getAssessmentsByTerm,
  getClasses,
  getStreams,
  getStudentCount,
  getClassLevels
} from '../../store/schoolSheetSlices/schoolStore'
import { assessSubjects } from '../../utils/assessment'
import Select from 'react-select'
import Button from '../../components/Button'
import Pagination from '../../components/Pagination'

function Assessment() {
  const dispatch = useDispatch()
  const [studentId, setStudentId] = useState('')
  const [studentInfoEdit, setStudentInfoEdit] = useState()
  const [studentInfo, setStudentInfo] = useState()
  const [add, setAdd] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [term, setTerm] = useState(null)
  const [stream, setStream] = useState('')
  const [classOptions, setClassOptions] = useState([])
  const [streamOpts, setStreamOpts] = useState([])
  const [classLevelOpts, setClassLevelOpts] = useState([])

  const {
    examTypes,
    subjects,
    students,
    terms,
    assessmentsByTerm,
    classes,
    streams,
    studentsCount,
    loading,
    classLevels
  } = useSelector((state) => state.schoolStore)

  useEffect(() => {
    const _streams = streams.map((res) => ({
      value: res.stream,
      label: res.stream,
      ...res,
    }))
    setStreamOpts(_streams)
  }, [streams])


  useEffect(() => {
    const _classLevels = classLevels.map((res) => ({
      value: res.name,
      label: res.name,
      ...res,
    }))
    setClassLevelOpts(_classLevels)
  }, [classLevels])

  const openAdd = (student) => {
    const { __streams } = student
    setAdd(true)
    setStudentId(student.id)
    setStudentInfo(student)
    setSelectedSubject(student.selectedSubject)
    setStream(streams && __streams?.length > 0 ? __streams[0]?.stream : '')
  }

  const closeAdd = () => {
    setAdd(false)
  }

  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    setStudentData(students?.students ? students.students : [])
  }, [students])

  // fetch exams and subjects
  const [examTypesData, setExamTypesData] = useState([])
  const [subjectsData, setSubjectsData] = useState([])

  useEffect(() => {
    const _classes = classes.map((res) => ({
      value: res.class,
      label: res.class,
      ...res,
    }))
    setClassOptions(_classes)
  }, [classes])

  useEffect(() => {
    const _examTypes = examTypes.map((res) => ({
      value: res.examType,
      label: res.examType,
      percent: res.mark,
      id: res.id,
    }))
    setExamTypesData(_examTypes)

    const _subjects = subjects.map((res) => ({
      value: res.subject,
      label: res.subject,
    }))
    setSubjectsData(_subjects)
  }, [examTypes, subjects])

  const [assessData, setAssessData] = useState([])
  const [assessAll, setAssessAll] = useState([])
  const { assessments } = useSelector((state) => state.schoolStore)

  useEffect(() => {
    if (assessmentsByTerm) {
      const updatedAssessments = assessmentsByTerm.map((assessment) => {
        const matchingExamType = examTypes.find(
          (examType) => examType.id === parseFloat(assessment.examType),
        )
        if (matchingExamType) {
          return {
            ...assessment,
            examType: matchingExamType.examType,
          }
        }
        return assessment
      })
      const data = updatedAssessments.filter((assessment) => {
        return assessment.studentId === studentId.toString()
      })
      setAssessAll(assessSubjects(data))
      const studentAssessment = data.filter((assessment) => {
        return assessment.subject === selectedSubject
      })
      setAssessData(studentAssessment)
    }
  }, [assessments, assessmentsByTerm, examTypes, selectedSubject, studentId])

  const [editData, setEditData] = useState(false)
  const [editDataId, setEditDataId] = useState(false)
  const closeEditData = () => {
    setEditData(false)
  }
  const openEditData = (student) => {
    setEditData(true)
    setStudentInfoEdit(student)
    setEditDataId(student.id)
  }

  // set Term
  useEffect(() => {
    const _term =
      terms.length > 0 && terms.filter((term) => term.is_selected === 1)[0]
    setTerm(_term)
  }, [terms])

  useEffect(() => {
    if (term && term.id) {
      dispatch(getAssessmentsByTerm(term.id))
    }
  }, [dispatch, term])

  // implement search
  const [search, setSearch] = useState('')
  const [searchedData, setSearchedData] = useState([])
  const [query, setQuery] = useState({
    search: '',
    studentClass: '',
    stream: '',
    classLevel: ''
  })

  useEffect(() => {
    if (
      query.search === '' &&
      query.studentClass === '' &&
      query.stream === '' &&
      query.classLevel === ''
    ) {
      setSearchedData(studentData)
      return
    }
    const data = studentData.filter((student) => {
      const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`
      const classData = student.classes.length > 0 && student.classes[0].class
      const isClass = classData ? classData.includes(query.studentClass) : false
      const isNameValid = fullName
        .toLowerCase()
        .includes(query.search.toLowerCase())
      const studentStream = student.streams
        ? student.streams.length > 0 && student.streams[0].stream
        : null
      const isStream = studentStream
        ? studentStream.includes(query.stream)
        : false

      const classLevelName = student?.student_levels?.length > 0 ? student?.student_levels[0]?.name : ''
      console.log(classLevelName, student.student_levels)
      const isClassLevelValid = classLevelName
        ? classLevelName.toLowerCase()
          .includes(query.classLevel.toLowerCase())
        : false

      return isNameValid && isClass && isStream && isClassLevelValid
    })
    setSearchedData(data)
  }, [query, studentData])

  // implement pangination
  const [page, setPage] = useState(0)
  const [searchCount, setSearchCount] = useState(30)

  useEffect(() => {
    dispatch(getStudents({
      page,
      count: searchCount,
    }))
    dispatch(getSubjects())
    dispatch(getTerms())
    dispatch(getClasses())
    dispatch(getStreams())
    dispatch(getStudentCount())
    dispatch(getClassLevels())
  }, [dispatch, page, searchCount])

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const canNextPage = () => {
    return true
  }

  const canPreviousPage = () => {
    return page > 0
  }

  const [filters, setFilters] = useState(false)

  const showFilters = () => {
    setFilters(true)
  }
  const closeFilters = () => {
    setFilters(false)
  }

  return (
    <div>
      <div className="flex justify-between mr-5 bg-white mt-5">
        <div>
          <p className="text-secondary font-semibold text-xl -mt-4 ml-2">
            Assessment
          </p>
        </div>
        <div>
          <ExamsTypes />
        </div>
      </div>

      <div className="flex bg-white p-2 -mt-14 w-full">
        <div className="w-5/12">
          <InputField
            placeholder="Search student..."
            value={query.search}
            onChange={(e) => {
              setQuery({ ...query, search: e.target.value })
            }}
            icon={<BsSearch className="mt-3 mr-4" />}
          />
        </div>
        {/* Filter */}
        <div className="w-2/12 ml-2 mt-5 relative">
          <div
            onClick={showFilters}
            className="p-2 cursor-pointer rounded border border-primary text-primary w-full "
          >
            Filter
          </div>
          {filters ? (
            <div className="w-full z-50 absolute p-2 bg-white shadow-lg border border-gray2">
              <Select
                placeholder={'Select Class Level'}
                name="class"
                className="mt-6"
                options={classLevelOpts}
                onChange={(e) => {
                  setQuery({ ...query, classLevel: e.value })
                }}
              />
              <br />
              <Select
                placeholder={'Select Class'}
                name="class"
                className="mt-6"
                options={classOptions}
                onChange={(e) => {
                  setQuery({ ...query, class: e.class })
                }}
              />
              <br />
              <Select
                placeholder={'Select Stream'}
                name="class"
                className="mt-6"
                options={streamOpts}
                onChange={(e) => {
                  setQuery({ ...query, stream: e.stream })
                }}
              />
              <div
                onClick={closeFilters}
                className="p-2 cursor-pointer bg-primary text-center mt-2 text-white rounded"
              >
                close
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-1/12 ml-5 mt-4">
          <span
            onClick={(e) => {
              setQuery({
                search: '',
                studentClass: '',
                stream: '',
                classLevel: ''
              })
            }}
          >
            <Button value={'Clear'} />
          </span>
        </div>
      </div>
      <div className="w-full flex overflow-y-auto">
        <div className="w-4/12 bg-white p-3">
          <div className="bg-white p-3 overflow-y-auto h-[78vh]">
            <table className="mt-4 w-full table-auto">
              <thead style={{ backgroundColor: '#0d6dfd10' }}>
                <th className="p-2 text-primary text-sm text-left">
                  Full Name
                </th>

                <th className="p-2 text-primary text-sm text-left">Class</th>

                <th className="p-2 text-primary text-sm text-left">Action</th>
              </thead>
              <div className="flex justify-center mt-2">
                {loading.students || loading.searchStudents ? (
                  <div className="loader"></div>
                ) : null}
              </div>

              <tbody>
                {searchedData?.length > 0 &&
                  searchedData?.map((student) => {
                    const { classes } = student
                    return (
                      <tr
                        className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
                        key={student.id}
                      >
                        <td className="flex">
                          <div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                            {student.firstName[0]} {student.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm p-3 -mt-1 text-gray5">
                              {student.firstName} {student.middleName}{' '}
                              {student.lastName}
                            </p>
                            <p className="text-red text-xs -mt-3 ml-3">
                              {student.nin}
                            </p>
                          </div>
                        </td>

                        <td className="text-xs p-3 text-gray5">
                          {classes.length > 0 && classes[0].class}
                        </td>

                        <td className="text-sm p-3">
                          <p
                            className="p-2 relative rounded assess bg-primary3 text-primary"
                            onClick={() => openAdd({ ...student })}
                          >
                            Assess
                          </p>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <Pagination
            previousPage={previousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
            canPrevPage={canPreviousPage}
            count={studentsCount}
            page={page}
            setPage={setPage}
            searchCount={searchCount}
            setSearchCount={setSearchCount}
          />
        </div>

        <div className="w-8/12 ml-5">
          {add ? (
            <AssessmentForm
              closeAdd={closeAdd}
              studentId={studentId}
              studentData={studentInfo}
              openEditData={openEditData}
              assessData={assessData}
              examTypesData={examTypesData}
              subjectsData={subjectsData}
              assessSubject={selectedSubject}
              assessAll={assessAll}
              term={term}
              stream={stream}
              subjects={subjects}
              setSelectedSubject={setSelectedSubject}
              selectedSubject={selectedSubject}
            />
          ) : null}
        </div>
      </div>

      {editData ? (
        <EditAssessmentForm
          studentId={studentId}
          studentData={studentInfoEdit}
          closeEditData={closeEditData}
          examTypesData={examTypesData}
          subjectsData={subjectsData}
          editDataId={editDataId}
        />
      ) : null}
    </div>
  )
}

export default Assessment

/**
 * 
 * 
                        <div className="absolute subjects bg-white h-40 overflow-y-auto w-32 shadow-md -ml-5 -mt-5 z-50">

                          {subjects && subjects.length > 0 && subjects.map((subject) => {
                            return (
                              <div className="p-2 hover:bg-gray1"
                                onClick={() => openAdd({ ...student })}
                              >
                                {subject.subject}
                              </div>);
                          })}
                        </div>
 */
