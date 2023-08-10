import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbChevronDown } from 'react-icons/tb'
import { FaUsers } from 'react-icons/fa'
import { MdNavigateNext } from 'react-icons/md'
import { HiOutlineArrowSmRight } from 'react-icons/hi'

function ClassesLinks() {
  const location = useLocation()
  const [link, setLink] = useState(false)
  const toggleLink = () => {
    setLink(!link)
  }

  return (
    <>
      <div
        className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
        onClick={toggleLink}
      >
        <div className="w-4/5 flex">
          <FaUsers className="w-4 h-4 mt-[2px] linkicon" />
          <p className="text-sm font-light linktext ml-6">Classes</p>
        </div>
        <div className="w-1/5">
          {link ? (
            <TbChevronDown className="w-5" />
          ) : (
            <MdNavigateNext className="w-5" />
          )}
        </div>
      </div>
      {link ? (
        <div className="ml-4">
          {/* strudents */}

          <Link
            to="/studentAttendance"
            className={
              location.pathname === '/studentAttendance'
                ? 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white'
                : 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer'
            }
          >
            <div className="flex">
              <HiOutlineArrowSmRight className="w-5 mt-[3px]" />
              <p
                className={
                  location.pathname === '/studentAttendance'
                    ? 'text-sm font-light text-white ml-5'
                    : 'text-sm font-light linktext ml-5'
                }
              >
                Student Attendance
              </p>
            </div>
          </Link>

          {/* assesment */}

          <Link
            to="/assessment"
            className={
              location.pathname === '/assessment'
                ? 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white'
                : 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer'
            }
          >
            <div className="flex">
              <HiOutlineArrowSmRight className="w-5 mt-[3px]" />
              <p
                className={
                  location.pathname === '/assessment'
                    ? 'text-sm font-light text-white ml-5'
                    : 'text-sm font-light linktext ml-5'
                }
              >
                Assessment
              </p>
            </div>
          </Link>

          {/* report card generation */}

          <Link
            to="/reportCards"
            className={
              location.pathname === '/reportCards'
                ? 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white'
                : 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer'
            }
          >
            <div className="flex">
              <HiOutlineArrowSmRight className="w-5 mt-[3px]" />
              <p
                className={
                  location.pathname === '/reportCards'
                    ? 'text-sm font-light text-white ml-5'
                    : 'text-sm font-light linktext ml-5'
                }
              >
                Report Cards
              </p>
            </div>
          </Link>

          {/* Mark sheet */}

          <Link
            to="/markSheet"
            className={
              location.pathname === '/markSheet'
                ? 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white'
                : 'flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer'
            }
          >
            <div className="flex">
              <HiOutlineArrowSmRight className="w-5 mt-[3px]" />
              <p
                className={
                  location.pathname === '/markSheet'
                    ? 'text-sm font-light text-white ml-5'
                    : 'text-sm font-light linktext ml-5'
                }
              >
                Mark Sheets
              </p>
            </div>
          </Link>
        </div>
      ) : null}
    </>
  )
}

export default ClassesLinks
