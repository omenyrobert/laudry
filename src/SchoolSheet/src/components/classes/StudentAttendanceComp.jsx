import React, { useEffect, useState } from 'react'
import '../../assets/styles/main.css'
import StudentsTableAttendance from '../students/StudentsTableAttendance'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { BsSearch } from 'react-icons/bs'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import Button2 from '../../components/Button2'
import axiosInstance from '../../axios-instance'
import withReactContent from 'sweetalert2-react-content'
// import { FaFilter } from "react-icons/fa";
import ButtonAlt from '../../components/ButtonAlt'
import { useDispatch, useSelector } from 'react-redux'
import {
  getStudents,
  getSections,
  getStreams,
  getHouses,
  getClasses,
  getStudentTypes,
  getSearchStudents,
  getStudentCount,
  getClassLevels,
} from '../../store/schoolSheetSlices/schoolStore'
import Loader from '../../components/Loader'

const StudentAttendanceComp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState(false)
  const [student, setStudent] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    house: '',
    studentClass: '',
    section: '',
    stream: '',
    classLevel: '',
  })
  const [searchInput, setSearchInput] = useState('')
  const [searchedStudents, setSearchedStudents] = useState([])
  const [classLevelOpts, setClassLevelOpts] = useState([])
  const {
    studentsCount,
    students,
    loading,
    sections,
    studentTypes,
    houses,
    streams,
    classes,
    searchingStudents,
    classLevels,
  } = useSelector((state) => state.schoolStore)

  useEffect(() => {
    const ppts = classLevels.map((level) => {
      return {
        label: level.name,
        value: level.name,
        ...level,
      }
    })
    setClassLevelOpts(ppts)
  }, [classLevels])

  const sectionOptions = []
  const studentTypeOptions = []
  const houseOptions = []
  const streamOptions = []
  const classOptions = []

  sections.forEach((section) => {
    let newSection = {}
    newSection.value = section.section
    newSection.label = section.section
    sectionOptions.push(newSection)
  })
  studentTypes.forEach((studentType) => {
    let newStudentType = {}
    newStudentType.value = studentType.type
    newStudentType.label = studentType.type
    studentTypeOptions.push(newStudentType)
  })
  houses.forEach((house) => {
    let newHouse = {}
    newHouse.label = house.house
    newHouse.value = house.type
    houseOptions.push(newHouse)
  })
  streams.forEach((stream) => {
    let newStream = {}
    newStream.label = stream.stream
    newStream.value = stream.stream
    streamOptions.push(newStream)
  })
  classes.forEach((clas) => {
    let newClass = {}
    newClass.label = clas.class
    newClass.value = clas.class
    classOptions.push(newClass)
  })

  //deleting student
  const deleteStudentInfo = (student) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete('/students/' + student.id)
          .then(() => {
            setPage(0)
            Swal.fire('Deleted!', 'Student file has been deleted.', 'success')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  const searchStudents = () => {
    if (search === false) {
      setSearch(true)
    }
    /** @type any[] */
    const studentData = student
      ? students?.students
      : searchedStudents.length === 0
        ? searchingStudents?.students
        : searchedStudents
    const searchResults = studentData.filter((student) => {
      const classLevelName =
        student?.student_levels?.length > 0
          ? student?.student_levels[0]?.name
          : ''
      const isClassLevelValid = classLevelName
        ? classLevelName.includes(filters.classLevel)
        : false

      const houseName =
        student?.houses?.length > 0 ? student.houses[0]?.house : ''
      const isHouseValid = houseName ? houseName.includes(filters.house) : false

      const studentTypeName =
        student?.student_types?.length > 0 ? student.student_types[0]?.type : ''
      const isStudentTypeValid = studentTypeName
        ? studentTypeName.includes(filters.type)
        : false

      const className =
        student?.classes?.length > 0 ? student.classes[0]?.class : ''
      const isClassValid = className
        ? className.includes(filters.studentClass)
        : false

      const sectionName =
        student?.sections?.length > 0 ? student.sections[0]?.section : ''
      const isSectionValid = sectionName
        ? sectionName.includes(filters.section)
        : false

      const streamName =
        student?.streams?.length > 0 ? student.streams[0]?.stream : ''
      const isStreamValid = streamName
        ? streamName.includes(filters.stream)
        : false

      return (
        isClassLevelValid &&
        isHouseValid &&
        isStudentTypeValid &&
        isClassValid &&
        isSectionValid &&
        isStreamValid
      )
    })
    setSearchedStudents(searchResults)
  }

  function clearFilters() {
    setFilters({
      query: '',
      type: '',
      house: '',
      studentClass: '',
      section: '',
      stream: '',
      classLevel: '',
    })
    setSearch(false)
    navigate(0)
  }

  useEffect(() => {
    if (
      filters.type === '' &&
      filters.house === '' &&
      filters.studentClass === '' &&
      filters.section === '' &&
      filters.stream === '' &&
      filters.classLevel === ''
    ) {
      setSearch(false)
    } else {
      searchStudents()
    }
  }, [filters])

  const printStudents = () => {
    const documentWindow = window.open('')
    const studentSheet = document.getElementById('studentTable')
    const styles = document.querySelectorAll('style')
    const links = document.querySelectorAll('link')
    // Write n links
    links.forEach((element, _) => {
      documentWindow.document.writeln(element.outerHTML)
    })
    // Write n styles
    styles.forEach((element, _) => {
      documentWindow.document.writeln(element.outerHTML)
    })
    documentWindow.document.writeln(studentSheet.innerHTML)

    setTimeout(() => {
      documentWindow.print()
    }, 1000)
  }

  //toggle filter
  const [showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  // Pangination
  const [page, setPage] = useState(0)
  const [searchPage, setSearchPage] = useState(0)

  const nextPage = () => {
    student ? setPage(page + 1) : setSearchPage(searchPage + 1)
  }

  const previousPage = () => {
    student ? setPage(page - 1) : setSearchPage(searchPage - 1)
  }

  const canNextPage = () => {
    const currentPage = student ? page + 1 : searchPage + 1
    const lastPage = student
      ? Math.ceil(students?.count / 20)
      : Math.ceil(searchingStudents?.count / 20)
    return currentPage !== lastPage
  }

  const canPreviousPage = () => {
    return student ? page !== 0 : searchPage !== 0
  }

  const handleSearch = async () => {
    if (searchInput) {
      setStudent(false)
      setSearch(true)
      let data = { searchPage: searchPage, searchInput: searchInput }
      dispatch(getSearchStudents(data))
    } else {
      navigate(0)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStudent(true)
        dispatch(getStreams())
        dispatch(getHouses())
        dispatch(getClasses())
        dispatch(getSections())
        dispatch(getStudents({
          page: page,
        }))
        dispatch(getStudentTypes())
        dispatch(getStudentCount())
        dispatch(getClassLevels())
      } catch (error) {
        console.log(error)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text:
            'An Error Occured while trying to fetch data for your Form. Please Refresh Page',
        })
      }
    }
    fetchData()
  }, [page, dispatch])

  // Export `studentData` to csv
  const exportToCSV = () => {
    const csvRows = []
    const studentData = student ? students?.students : searchedStudents
    const headers = Object.keys(studentData[0])
    csvRows.push(headers.join(','))
    for (const row of studentData) {
      const values = headers.map((header) => {
        const value = row[header]
        console.log(value, header, row)
        if (header === 'studentType') {
          const escaped = ('' + value.type).replace(/"/g, '\\"')
          return `"${escaped}"`
        } else if (header === 'studentHouse') {
          const escaped = ('' + value.house).replace(/"/g, '\\"')
          return `"${escaped}"`
        } else if (header === 'studentClass') {
          const escaped = ('' + value.class).replace(/"/g, '\\"')
          return `"${escaped}"`
        } else if (header === 'studentStream') {
          if (value) {
            const escaped = ('' + value.stream).replace(/"/g, '\\"')
            return `"${escaped}"`
          }
          const escaped = 'null'.replace(/"/g, '\\"')
          return `"${escaped}"`
        }
        const escaped = ('' + row[header]).replace(/"/g, '\\"')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    }
    const csvData = csvRows.join('\n')
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'students.csv')
    link.click()
  }

  return (
    <div className=" mt-2 w-full">
      <div className="">
        <div className="p-3 bg-white shadow-md border border-gray2">
          <div className="flex justify-between">
            <div>
              <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
                Students Attendance
              </h1>
            </div>
            <div className="w-4/12 ">
              <InputField
                type="text"
                placeholder="Search For Student ..."
                name="lastName"
                value={filters.query}
                onChange={(e) => setSearchInput(e.target.value)}
                icon={
                  <BsSearch
                    className="w-3 -ml-7 mt-3 cursor-pointer"
                    type="button"
                    onClick={handleSearch}
                  />
                }
              />
            </div>
            <div className=""></div>
            <div className="flex mt-5">
              <div className="w-1/3"></div>
              <div className="w-1/3 relative mt">
                <div className="w-20" onClick={toggleFilter}>
                  <ButtonAlt value={'Filter'} />
                </div>
                {showFilter ? (
                  <div className="bg-white shadow-lg mt-2 border border-gray2 z-50 rounded-md absolute w-56 p-3 h-auto">
                    <br />
                    <Select
                      placeholder={'Select class Levels'}
                      className="text-sm"
                      onChange={(opt) => {
                        setFilters({ ...filters, classLevel: opt.value })
                      }}
                      options={classLevelOpts}
                    />
                    <br />
                    <Select
                      placeholder={'Select class'}
                      className="text-sm"
                      onChange={(opt) => {
                        setFilters({ ...filters, studentClass: opt.value })
                      }}
                      options={classOptions}
                    />
                    <br />
                    {/* 
                    <Select
                      placeholder={'Sections'}
                      className="text-sm"
                      onChange={(opt) => {
                        setFilters({ ...filters, section: opt.value })
                      }}
                      options={sectionOptions}
                    />
                    <br />
                    <Select
                      placeholder={'Student House'}
                      className="text-sm"
                      onChange={(e) => {
                        setFilters({ ...filters, house: e.value })
                      }}
                      options={houseOptions}
                    />

                    <br />
                    <Select
                      placeholder={'Student Type'}
                      className="text-sm"
                      onChange={(opt) => {
                        setFilters({ ...filters, type: opt.value })
                      }}
                      options={studentTypeOptions}
                    />
                    <br /> */}
                    <Select
                      placeholder={'Select Stream '}
                      className="text-sm"
                      onChange={(opt) => {
                        setFilters({ ...filters, stream: opt.value })
                      }}
                      options={streamOptions}
                    />
                    <br />
                    <div
                      className=""
                      onClick={() => {
                        clearFilters()
                      }}
                    >
                      <Button value={'Clear Filters'} />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="w-1/3 mx-5">
                <div onClick={printStudents} className="w-20">
                  <Button value={'Pdf'} />
                </div>
              </div>
              <div className="w-1/3 mx-5">
                <div onClick={exportToCSV} className="w-20">
                  <Button value={'CSV'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading.students || loading.searchStudents ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : null}
        {search ? (
          <StudentsTableAttendance
            deleteStudentInfo={deleteStudentInfo}
            studentData={
              searchedStudents.length === 0
                ? searchingStudents?.students
                : searchedStudents
            }
            nextPage={nextPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            searchPage={page}
            count={studentsCount}
            page={page}
            setPage={setPage}
          />
        ) : null}
        {student ? (
          <StudentsTableAttendance
            page={page}
            deleteStudentInfo={deleteStudentInfo}
            studentData={students?.students}
            nextPage={nextPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            searchPage={page}
            count={studentsCount}
            setPage={setPage}
          />
        ) : null}
      </div>
    </div>
  )
}

export default StudentAttendanceComp
