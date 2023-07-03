import React, { useEffect, useState } from 'react';
import '../../assets/styles/main.css';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { BsSearch } from 'react-icons/bs';
import FeesTable from '../../components/fees/FeesTable';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../store/schoolSheetSlices/schoolStore';
import { extraLatestArrayIndex } from '../../utils/global';

const Fees = () => {
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.schoolStore)

    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

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
            students?.filter((student) =>
                student.studentClass.value
                    .toLowerCase()
                    .includes(query.toLowerCase())
            )
        );
        setQuery('');
    };

    // filter by percentage:
    const [percent, setPercent] = useState(0);
    const [searchAllPercent, setSearchAllPercent] = useState(false);

    const handleSearchPercent = (e) => {
        setAllStudents(false);
        setSearchAllPercent(true);
        SearchPercentage(e);
    };

    const [percentResults, setPercentResults] = useState([]);
    const [checkInput, setCheckInput] = useState('');

    const handleFilter = (balance, fees) => {
        let amountPaid = parseFloat(JSON.parse(balance).amount);
        let amountToPay = extraLatestArrayIndex(fees).amount;
        let percentage = (amountPaid / amountToPay) * 100;
        return percentage;
    }

    const SearchPercentage = (e) => {
        e.preventDefault();
        if (checkInput === 'below') {
            setPercentResults(
                students?.filter((student) => {
                    return handleFilter(student.feesBalance, student.fees) < parseFloat(percent) ? student : null
                })
            );
            setPercent();
        } else if (checkInput === 'above') {
            setPercentResults(
                students?.filter((student) => {
                    return handleFilter(student.feesBalance, student.fees) > parseFloat(percent) ? student : null
                })
            );
            setPercent();
        }
    };

    return (
        <>
            <p className='text-secondary text-xl font-medium'>Fees Payments</p>
            <br />
            <div className='flex p-2 bg-white shadow-lg rounded-md'>
                <div className='w-1/3 flex pl-5'>
                    <div className='w-1/3'>
                        <InputField
                            type='number'
                            placeholder='Enter Percentage'
                            name='percent'
                            onChange={(e) => setPercent(e.target.value)}
                            value={percent}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className='w-1/3 flex'>
                        <div className='flex ml-3'>
                            <p className='text-xs mt-9'>Below</p>
                            <input
                                type='radio'
                                className='ml-1 cursor-pointer'
                                name='below'
                                value='below'
                                onChange={(e) => setCheckInput(e.target.value)}
                                checked={checkInput === 'below'}
                            />
                        </div>
                        <div className='flex ml-4'>
                            <p className='text-xs mt-9'>Above</p>
                            <input
                                type='radio'
                                className='ml-1 cursor-pointer'
                                name='above'
                                value='above'
                                onChange={(e) => setCheckInput(e.target.value)}
                                checked={checkInput === 'above'}
                            />
                        </div>
                    </div>

                    <div
                        className='w-1/3 pl-2'
                        onClick={(e) => {
                            handleSearchPercent(e);
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
                            // handleSearchStudent();
                            // SearchStudents(e);
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
            {allStudents ? <FeesTable studentData={students} /> : null}
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
