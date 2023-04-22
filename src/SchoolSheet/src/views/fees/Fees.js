import React, { useEffect, useState } from 'react';
import '../../assets/styles/main.css';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { BsSearch } from 'react-icons/bs';
import Localbase from 'localbase';
import FeesTable from '../../components/fees/FeesTable';

let db = new Localbase('db');

function Fees() {
    const [studentData, setStudentData] = useState([]);
    const fetchStudentInfo = () => {
        db.collection('studentInfo')
            .get()
            .then((student) => {
                const newData = student;
                setStudentData(newData);
            });
    };

    useEffect(() => {
        fetchStudentInfo();
    }, []);

    // search by class filter:
    const [allStudents, setAllStudents] = useState(true);
    const [SearchAllStudents, setSearchAllStudents] = useState(false);
    const handleSearchStudent = () => {
        setAllStudents(false);
        setSearchAllStudents(true);
    };

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const SearchStudents = (e) => {
        e.preventDefault();
        setSearchResults(
            studentData?.filter((student) =>
                student.studentClass.value
                    .toLowerCase()
                    .includes(query.toLowerCase())
            )
        );
        setQuery('');
    };

    // filter by percentage:
    const [feesData, setFeesData] = useState([]);
    const [percent, setPercent] = useState(0);
    const [searchAllPercent, setSearchAllPercent] = useState(false);
    const handleSearchPercent = () => {
        setAllStudents(false);
        setSearchAllPercent(true);
    };

    const fetchFeesInfo = () => {
        db.collection('feesInfo')
            .get()
            .then((student) => {
                const newData = student;
                setFeesData(newData);
            });
    };
    useEffect(() => {
        fetchFeesInfo();
    }, []);

    const [percentResults, setPercentResults] = useState();
    const [checkInput, setCheckInput] = useState('');

    const SearchPercentage = (e) => {
        e.preventDefault();
        if (checkInput === 'below') {
            setPercentResults(
                studentData?.filter((student) => {
                    let value = (student.paid / feesData.feesAmount) * 100;
                    if (value < percent) {
                        return student;
                    }
                    return null;
                })
            );
            setPercent();
        } else if (checkInput === 'above') {
            setPercentResults(
                studentData?.filter((student) => {
                    let value = (student.paid / feesData.feesAmount) * 100;
                    if (value > percent) {
                        return student;
                    }
                    return null;
                })
            );
            setPercent();
        }
        return null;
    };

    return (
        <>
            <div className='flex p-2 bg-white shadow-lg rounded-md'>
                <div className='w-1/3 flex pl-5'>
                    <div className='w-1/3'>
                        <InputField
                            type='number'
                            placeholder='Enter Percentage'
                            name='percent'
                            onChange={(e) => setPercent(e.target.value)}
                            value={percent}
                        />
                    </div>
                    <div className='w-1/3 flex'>
                        <div className='flex ml-3'>
                            <p className='text-xs mt-9'>Below</p>
                            <input
                                type='checkbox'
                                className='ml-1'
                                name='below'
                                value='below'
                                onChange={(e) => setCheckInput(e.target.value)}
                            />
                        </div>
                        <div className='flex ml-4'>
                            <p className='text-xs mt-9'>Above</p>
                            <input
                                type='checkbox'
                                className='ml-1'
                                name='above'
                                value='above'
                                onChange={(e) => setCheckInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div
                        className='w-1/3 pl-2'
                        onClick={() => {
                            handleSearchPercent();
                            SearchPercentage();
                        }}
                    >
                        <p className='text-white bg-primary w-24 mt-6 text-center px-4 py-2 rounded-md font-semibold text-sm cursor-pointer'>
                            Filter
                        </p>
                    </div>
                </div>
                <div className='w-1/3'>
                    <form
                        onSubmit={(e) => {
                            handleSearchStudent();
                            SearchStudents(e);
                        }}
                    >
                        <InputField
                            type='text'
                            placeholder='Search For Class ...'
                            name='class'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            icon={
                                <BsSearch
                                    className='w-3 -ml-7 mt-3'
                                    type='submit'
                                />
                            }
                        />
                    </form>
                </div>
                <div className='w-1/3 flex pl-5'>
                    <div className='w-1/3'>
                        <InputField
                            type='number'
                            placeholder='from'
                            name='last_name'
                        />
                    </div>
                    <div className='w-1/3 pl-2'>
                        <InputField
                            type='number'
                            placeholder='to'
                            name='last_name'
                        />
                    </div>
                    <div className='w-1/3 pl-2 pt-5'>
                        <Button value={'Filter'} />
                    </div>
                </div>
            </div>
            {allStudents ? <FeesTable studentData={studentData} /> : null}
            {SearchAllStudents ? (
                <FeesTable studentData={searchResults} />
            ) : null}
            {searchAllPercent ? (
                <FeesTable studentData={percentResults} />
            ) : null}
        </>
    );
}

export default Fees;
