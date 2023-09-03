import React, { useEffect, useState } from "react";
import '../../assets/styles/main.css';
import { useDispatch, useSelector } from "react-redux";
import ReportCardTemplate from '../../components/classes/ReportCardTemplate';
import { getStudents, getStreams, getStudentCount, getClassLevels } from "../../store/schoolSheetSlices/schoolStore"
import InputField from "../../components/InputField";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";

function ReportCards(props) {
  const dispatch = useDispatch();
  const [studentInfo, setStudentInfo] = useState();
  const [classes, setClasses] = useState([]);
  const [streamOpts, setStreamOpts] = useState([]);
  const [classLevelOpts, setClassLevelOpts] = useState([]);

  const { studentsCount, students, streams, loading, classLevels } = useSelector((state) => state.schoolStore);

  useEffect(() => {
    const _classLevels = classLevels?.map((res) => ({
      value: res.name,
      label: res.name,
      ...res
    }));
    setClassLevelOpts(_classLevels);
  }, [classLevels])

  useEffect(() => {
    const _streams = streams?.map((res) => ({
      value: res.stream,
      label: res.stream,
      ...res
    }));
    setStreamOpts(_streams);
  }, [streams])


  useEffect(() => {
    if (students) {
      const _classes = students?.students?.map((student) => {
        return {
          value: student?.classes[0]?.class,
          label: student?.classes[0]?.class,
        };
      });

      // remove duplicates
      const uniqueClasses = [...new Set(_classes?.map((item) => item.value))];
      uniqueClasses.splice(uniqueClasses.indexOf(null), 1);
      uniqueClasses.splice(uniqueClasses.indexOf(undefined), 1);

      const finalClasses = uniqueClasses?.map((item) => {
        return {
          value: item,
          label: item,
        };
      });

      setClasses(finalClasses);
    }
  }, [students]);

  const [card, setCard] = useState(false);
  const openCard = (student) => {
    setCard(true);
    setStudentInfo(student);
  };
  const closeCard = () => {
    setCard(false);
  };

  // implement search
  const [query, setQuery] = useState({
    search: "",
    class: "",
    stream: "",
    classLevel: "",
  });
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (
      query.search === "" &&
      query.class === "" &&
      query.stream === "" &&
      query.classLevel === ""
    ) {
      setFilteredStudents(students?.students);
    } else {
      const _filteredStudents = students?.students?.filter((student) => {
        const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
        const studentClass = student?.classes[0] ? student?.classes[0]?.class : "";
        const stream = student?.streams[0] ? student?.streams[0]?.stream : "";
        const classLevelName = student?.student_levels?.length > 0 ? student?.student_levels[0]?.name : ''
        const searchIsValid = fullName
          .toLowerCase()
          .includes(query.search.toLowerCase());
        const classIsValid = studentClass
          .toLowerCase()
          .includes(query.class.toLowerCase());
        const streamIsValid = stream
          .toLowerCase()
          .includes(query.stream.toLowerCase());
        const classLevelIsValid = classLevelName
          .toLowerCase()
          .includes(query.classLevel.toLowerCase());

        return searchIsValid && classIsValid && streamIsValid && classLevelIsValid;
      }
      );
      setFilteredStudents(_filteredStudents);
    }
  }, [query, students]);


  // implement pangination
  const [page, setPage] = useState(0);
  const [searchCount, setSearchCount] = useState(20);


  useEffect(() => {
    dispatch(getStudents({
      page: page,
      count: searchCount,
    }));
    dispatch(getStreams());
    dispatch(getStudentCount());
    dispatch(getClassLevels());
  }, [dispatch, page, searchCount]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const canNextPage = () => {
    return true
  };

  const canPreviousPage = () => {
    return page > 0;
  };


  return (
    <div>
      <div className="flex bg-white">
        <div className="w-6/12 px-2">
          <InputField
            placeholder="Search for Income"
            type="search"
            icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
            onChange={(e) => {
              setQuery({ ...query, search: e.target.value });
            }}
            value={query.search}
          />
        </div>
        <div className="w-2/12 px-2">
          <div className="mt-5">
            <Select
              placeholder={"Filter By Class Level"}
              name="classlevel"
              onChange={(e) => {
                setQuery({
                  ...query,
                  classLevel: e.value
                });
              }}
              options={classLevelOpts}
            />
          </div>
        </div>
        <div className="w-2/12 px-2">
          <div className="mt-5">
            <Select
              placeholder={"Filter By Class"}
              name="class"
              onChange={(e) => {
                setQuery({
                  ...query,
                  class: e.value
                });
              }}
              options={classes}
            />
          </div>
        </div>
        <div className="w-2/12 px-2">
          <div className="mt-5">
            <Select
              placeholder={"Filter By Stream"}
              name="stream"
              onChange={(e) => {
                setQuery({
                  ...query,
                  stream: e.value
                });
              }}
              options={streamOpts}
            />
          </div>

        </div>
        <div className="mt-5 ml-5">
          <span onClick={(e) => {
            setQuery({
              search: "",
              class: "",
              stream: "",
              classLevel: "",
            })
          }}>
            <Button value={"Clear"} />
          </span>

        </div>
      </div>


      <p className='text-secondary font-semibold text-xl'>Report Cards</p>
      {card ? (
        <ReportCardTemplate
          closeCard={closeCard}
          studentData={studentInfo}
        />
      ) : null}
      <div className="h-[70vh] overflow-y-auto">
        <div className="flex justify-center mt-2">
          {loading?.students || loading?.searchStudents ? <div className="loader"></div> : null}
        </div>

        <table className='mt-4 w-full table-auto'>
          <thead style={{ backgroundColor: '#0d6dfd10' }}>
            <th className='p-2 text-primary text-sm text-left'>
              Full Name
            </th>

            <th className='p-2 text-primary text-sm text-left'>
              Residence
            </th>
            <th className='p-2 text-primary text-sm text-left'>
              Class Level
            </th>

            <th className='p-2 text-primary text-sm text-left'>
              Class
            </th>
            <th className='p-2 text-primary text-sm text-left'>
              Stream
            </th>

            <th className='p-2 text-primary text-sm text-left'>
              Action
            </th>
          </thead>
          <tbody>
            {students?.students ? filteredStudents?.map((student) => {
              const studentType = student?.student_types[0];

              const _class = student?.classes[0]

              return (
                <tr
                  className='shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md'
                  key={student.id}
                >
                  <td className='flex mx-4'>
                    <div className='rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3'>
                      {student.firstName[0]}{' '}
                      {student.lastName[0]}
                    </div>
                    <div>
                      <p className='text-sm p-3 -mt-1 text-gray5'>
                        {student.firstName}{' '}
                        {student?.middleName}{' '}
                        {student.lastName}
                      </p>
                      <p className='text-red text-xs -mt-3 ml-3'>
                        00{student?.id}
                      </p>
                    </div>
                  </td>

                  <td className='text-xs p-3 text-gray5'>
                    {student.residence}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {student.student_levels[0]?.name}
                  </td>
                  <td className='text-xs p-3 text-gray5'>
                    {_class?.class}
                  </td>

                  <td className="text-xs p-3 text-gray5">
                    {student.streams[0]?.stream}
                  </td>


                  <td className='text-xs p-3 text-gray5 flex justify-between'>
                    <div onClick={() => openCard(student)}>
                      <p className='p-2 bg-white rounded text-primary'>
                        Print
                      </p>
                    </div>
                  </td>
                </tr>
              );
            }) : null}
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
  );
}

export default ReportCards;
