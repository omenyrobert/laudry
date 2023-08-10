import React from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'

const StudentsTableAttendance = (props) => {
  const {
    setPage,
    count,
    studentData,
    deleteStudentInfo,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    searchPage,
    page,
  } = props

  return (
    <div id="studentTable">
      <div className="h-[70vh] overflow-y-auto">
        <table id="dmsk" className="mt-4 w-full table-auto">
          <thead style={{ backgroundColor: '#0d6dfd10' }}>
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">Gender</th>
            <th className="p-2 text-primary text-sm text-left">Class Level</th>
            <th className="p-2 text-primary text-sm text-left">Class</th>
            <th className="p-2 text-primary text-sm text-left">Streams</th>
            <th className="p-2 text-primary text-sm text-left">Check In</th>
            <th className="p-2 text-primary text-sm text-left">Check Out</th>
            <th className="p-2 text-primary text-sm text-left">Roll Call</th>
          </thead>
          <tbody>
            {studentData?.map((student) => {
              return (
                <tr
                  className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                  key={student.id}
                >
                  <td className="flex pl-2">
                    <div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                      {student.firstName[0]} {student.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm p-3 -mt-1 text-gray5">
                        {student.firstName} {student.middleName}{' '}
                        {student.lastName}
                      </p>
                      <p className="text-red text-xs -mt-3 ml-3">
                        00{student.id}
                      </p>
                    </div>
                  </td>
                  <td className="text-xs p-3 text-gray5">{student.gender}</td>
                  <td className="text-xs p-3 text-gray5">
                    {student.student_levels[0]?.name}
                  </td>

                  <td className="text-xs p-3 text-gray5">
                    {student.classes?.map((c, i) => {
                      return i === student.classes.length - 1 ? (
                        <span>{c.class}</span>
                      ) : null
                    })}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {student.streams[0]?.stream}
                  </td>

                  <td className="text-xs w-28 text-gray5 ">
                    <div className="border border-gray4 h-10 rounded p-2"></div>
                  </td>
                  <td className="text-xs w-28 text-gray5 ">
                    <div className="border mx-5 border-gray4 h-10 rounded p-2"></div>
                  </td>
                  <td className="text-xs w-20 text-gray5 ">
                    <div className="border w-16 border-gray4  h-10 rounded p-2"></div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPrevPage={canPreviousPage}
        searchPage={searchPage}
        count={count}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default StudentsTableAttendance
