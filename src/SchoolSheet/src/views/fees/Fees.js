import React, { useEffect, useState } from 'react';
import '../../assets/styles/main.css';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { BsSearch } from 'react-icons/bs';
import FeesTable from '../../components/fees/FeesTable';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents, getClasses } from '../../store/schoolSheetSlices/schoolStore';
import { extraLatestArrayIndex } from '../../utils/global';
import Select from 'react-select';
import { usePrint } from "../../hooks/print"

const Fees = () => {
    const dispatch = useDispatch();
    const { students, classes } = useSelector((state) => state.schoolStore)
    const [classOpts, setClassOpts] = useState([]);
    const { printContent } = usePrint();

    useEffect(() => {
        if (classes) {
            const _classes = classes.map((class_) => {
                return {
                    value: class_?.class,
                    label: class_?.class,
                    ...class_,
                };
            });
            setClassOpts(_classes);
        }
    }, [classes]);


    useEffect(() => {
        dispatch(getStudents());
        dispatch(getClasses());
    }, [dispatch]);

    // search by class filter:
    const [allStudents, setAllStudents] = useState(true);
    const [SearchAllStudents, setSearchAllStudents] = useState(false);
    const handleSearchStudent = () => {
        setAllStudents(false);
        setSearchAllStudents(true);
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
        let amountPaid = parseFloat(JSON.parse(balance)?.amount);
        let amountToPay = extraLatestArrayIndex(fees)?.amount;
        let percentage = (amountPaid / amountToPay) * 100;
        return percentage;
    }

    const SearchPercentage = (e) => {
        e.preventDefault();
        if (checkInput === 'below') {
            setPercentResults(
                students?.filter((student) => {
                    return handleFilter(student?.feesBalance, student?.fees) < parseFloat(percent) ? student : null
                })
            );
            setPercent();
        } else if (checkInput === 'above') {
            setPercentResults(
                students?.filter((student) => {
                    return handleFilter(student?.feesBalance, student?.fees) > parseFloat(percent) ? student : null
                })
            );
            setPercent();
        }
    };




    // implement search 

    const [query, setQuery] = useState({
        class: '',
        name: '',
        percentage: {
            percent: null,
            checkInput: null,
        }

    });
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query.name === '' && query.class === '' && query.percentage.percent === null) {
            setSearchResults(students);
            return;
        }

        const results = students?.filter((student) => {
            const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
            const isNameValid = fullName.toLowerCase().includes(query.name.toLowerCase());
            const className = student?.classes[0]?.class;
            const isClassValid = className ? className.toLowerCase().includes(query.class.toLowerCase()) : false;
            const percentage = handleFilter(student?.feesBalance, student?.fees);
            let isPercentageValid = false;
            if (query.percentage.checkInput === 'below') {
                isPercentageValid = percentage < parseFloat(query.percentage.percent);
            } else if (query.percentage.checkInput === 'above') {
                isPercentageValid = percentage > parseFloat(query.percentage.percent);
            } else {
                isPercentageValid = true;
            }
            return isNameValid && isClassValid && isPercentageValid;
        });
        setSearchResults(results);

    }, [students, query]);



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
                            min="0"
                            max="100"
                            onChange={(e) => {
                                setPercent(e.target.value);
                                setQuery({
                                    ...query,
                                    percentage: {
                                        ...query.percentage,
                                        percent: e.target.value,
                                    },
                                });
                            }}
                            value={percent}
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
                                checked={query.percentage.checkInput === 'below'}

                                onChange={(e) => {
                                    setQuery({
                                        ...query,
                                        percentage: {
                                            ...query.percentage,
                                            checkInput: e.target.value,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className='flex ml-4'>
                            <p className='text-xs mt-9'>Above</p>
                            <input
                                type='radio'
                                className='ml-1 cursor-pointer'
                                name='above'
                                value='above'
                                checked={query.percentage.checkInput === 'above'}
                                onChange={(e) => {
                                    setQuery({
                                        ...query,
                                        percentage: {
                                            ...query.percentage,
                                            checkInput: e.target.value,
                                        },
                                    });
                                }}

                            />
                        </div>
                    </div>

                </div>
                <div className='w-1/3 flex justify-between'>
                    <InputField
                        type='text'
                        placeholder='Search For Student ...'
                        name='name'
                        onChange={(e) => {
                            setQuery({ ...query, name: e.target.value });
                        }}
                        value={query.name}
                        icon={
                            <BsSearch
                                className='w-3 -ml-7 mt-3'
                                type='submit'
                            />
                        }
                    />

                    <Select
                        placeholder={'Filter By Class'}
                        name='class'
                        className='mt-6'
                        options={classOpts}
                        onChange={(e) => {
                            setQuery({ ...query, class: e.class });
                        }}
                    />

                </div>
                <div className='w-1/3 flex justify-between pl-5'>
                    <div onClick={() => {
                        setQuery({
                            class: '',
                            name: '',
                            percentage: {
                                percent: null,
                                checkInput: null,
                            }
                        })
                    }} className='pl-2 pt-5'>
                        <Button value={'Clear Filters'} />
                    </div>
                    <div
                        onClick={() => {
                            printContent('fees-table-1')
                        }}
                        className=' pl-2 pt-5'>
                        <Button value={'Print'} />
                    </div>
                </div>
            </div>
            {searchResults ? <FeesTable studentData={searchResults} /> : null}
        </>
    );
}

export default Fees;
