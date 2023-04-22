import React, { useState } from 'react';
import Button from '../Button';
import InputField from '../InputField';
import InputSelect from '../InputSelect';
import Select from 'react-select';
import { FaRegUserCircle, FaPhone } from 'react-icons/fa';
import Localbase from 'localbase';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

let db = new Localbase('db');

function AddStudentForm(props) {
    const { handleClickAllStudents, fetchStudentInfo } = props;

    const [gender, setGender] = useState('');
    const [studentType, setStudentType] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentHouse, setStudentHouse] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [feesCategory, setFeesCategory] = useState('');

    const studentTypes = [
        {
            label: 'Normal',
            value: 'Normal',
        },
        {
            label: 'Ugandan',
            value: 'Ugandan',
        },
        {
            label: 'International',
            value: 'International',
        },
    ];

    const houses = [
        {
            label: 'Lion',
            value: 'Lion',
        },
        {
            label: 'Rabbit',
            value: 'Rabit',
        },
        {
            label: 'Elephant',
            value: 'Elephant',
        },
    ];

    const sections = [
        {
            label: 'Boarding',
            value: 'Boarding',
        },
        {
            label: 'day',
            value: 'Day',
        },
        {
            label: 'Hostel',
            value: 'Hostel',
        },
    ];

    const classes = [
        {
            label: 's1 green',
            value: 's1 green',
        },
        {
            label: 's2 blue',
            value: 's2 blue',
        },
        {
            label: 's3 yellow',
            value: 's3 yellow',
        },
    ];

    // student info form data
    const [studentInfo, setStudentInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        residence: '',
        photo: '',
        nin: '',
        nationalId: '',
        fatherName: '',
        fatherContact: '',
        motherName: '',
        motherContact: '',
        studentType: '',
        studentSection: '',
        studentHouse: '',
        studentClass: '',
        feesCategory: '',
    });

    const onChange = (e) => {
        setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
    };

    // post student info
    const postStudentInfo = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            firstName: studentInfo.firstName,
            middleName: studentInfo.middleName,
            lastName: studentInfo.lastName,
            email: studentInfo.email,
            phoneNumber: studentInfo.phoneNumber,
            dateOfBirth: studentInfo.dateOfBirth,
            gender: gender,
            nationality: studentInfo.nationality,
            residence: studentInfo.residence,
            photo: studentInfo.photo,
            nin: studentInfo.nin,
            nationalId: studentInfo.nationalId,
            fatherName: studentInfo.fatherName,
            fatherContact: studentInfo.fatherContact,
            motherName: studentInfo.motherName,
            motherContact: studentInfo.motherContact,
            studentType: studentType,
            studentSection: studentSection,
            studentHouse: studentHouse,
            studentClass: studentClass,
            feesCategory: feesCategory,
        };
        if (studentInfo) {
            db.collection('studentInfo')
                .add(data)
                .then((response) => {
                    setStudentInfo('');
                    fetchStudentInfo();
                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                    handleClickAllStudents();
                })
                .catch(console.error());
        }
    };

    return (
        <div className='w-full shadow-lg  z-50 bg-white border-gray3 mt-2 border-2 rounded-md h-[82vh] overflow-y-auto'>
            <div className='flex bg-gray1 p-3 justify-between'>
                <div>
                    <p className='text-primary font-semibold text-md'>
                        Add Student
                    </p>
                </div>
                <div>
                    <p
                        className='cursor-pointer'
                        onClick={handleClickAllStudents}
                    >
                        X
                    </p>
                </div>
            </div>
            <div>
                <p className='text-secondary text-lg font-semibold ml-5 mt-2'>
                    Student Identity
                </p>
                <div className='flex px-2 -mt-5'>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder='Enter First Name'
                            label='First Name'
                            name='firstName'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                        <InputSelect
                            type='text'
                            placeholder='Select Gender'
                            label='Gender'
                            name='gender'
                            selectedOption={gender}
                            onChange={setGender}
                        />

                        <InputField
                            type='text'
                            placeholder='Enter Nationality'
                            label='Nationality'
                            name='nationality'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder='Enter Middle Name'
                            label='Middle Name'
                            name='middleName'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                        <InputField
                            type='file'
                            label='Photo'
                            name='photo'
                            onChange={onChange}
                        />
                        <InputField
                            type='text'
                            placeholder='Enter Place Of Residence'
                            label='Place Of Residence'
                            name='residence'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder='Enter Last Name'
                            label='Last Name'
                            name='lastName'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                        <InputField
                            type='email'
                            placeholder='Enter Email Address'
                            label='Email'
                            name='email'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                        <InputField
                            type='text'
                            placeholder='Enter National Id'
                            label='NIN number'
                            name='nin'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='date'
                            label='Date Of Birth'
                            name='dateOfBirth'
                            onChange={onChange}
                        />

                        <InputField
                            type='text'
                            placeholder='Enter Your Phone Number'
                            label='Phone Number'
                            name='phoneNumber'
                            onChange={onChange}
                            icon={<FaPhone className='w-3 -ml-7 mt-3' />}
                        />
                        {/* {phones.map((phone, index) => (
                            <div className='flex'>
                                <div className='w-11/12'>
                                    <InputField
                                        type='text'
                                        key={index}
                                        value={phone.phoneNumber}
                                        placeholder='Enter Your Phone Number'
                                        label='Phone Number'
                                        name='phoneNumber'
                                        onChange={onChange}
                                        icon={
                                            <FaPhone className='w-3 -ml-7 mt-3' />
                                        }
                                    />
                                </div>
                                <div className='w-1/12'>
                                    <p
                                        onClick={() => removePhones(index)}
                                        className='text-red mt-[65px] ml-5 cursor-pointer'
                                    >
                                        <FaRegTrashAlt />
                                    </p>
                                </div>
                            </div>
                        ))} */}
                        {/* <button
                            onClick={addPhone}
                            className='text-primary text-xs flex -mt-5'
                        >
                            Add Phone
                        </button> */}
                        <InputField
                            type='file'
                            placeholder='Enter National Id Copy'
                            label='National Id Copy'
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                    </div>
                </div>
                <hr className='text-gray2' />
                <p className='text-secondary text-lg font-semibold ml-5 mt-5'>
                    Student Biography
                </p>
                <div className='flex px-2 -mt-5'>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder="Enter Father's Name"
                            label="Father's Name"
                            name='fatherName'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder="Enter Father's Contact"
                            label="Father's Contacts"
                            name='fatherContact'
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder="Enter Mother's Name"
                            label=" Mother's Name"
                            name='motherName'
                            onChange={onChange}
                            icon={
                                <FaRegUserCircle className='w-3 -ml-7 mt-3' />
                            }
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <InputField
                            type='text'
                            placeholder="Enter  Mother's Contacts"
                            label=" Mother's Cotacts"
                            name='motherContact'
                            onChange={onChange}
                        />
                    </div>
                </div>
                <p className='text-secondary text-lg font-semibold ml-5 mt-5'>
                    Academic Section
                </p>
                <div className='flex px-2 -mt-1'>
                    <div className='w-1/4 p-2'>
                        <label className='text-gray4 mt-2'>Student Type</label>
                        <Select
                            placeholder={'Select Student Type'}
                            defaultValue={studentType}
                            name='studentType'
                            onChange={setStudentType}
                            options={studentTypes}
                        />
                        <br />
                        <label className='text-gray4 mt-2'>
                            Fees Category{' '}
                        </label>
                        <Select
                            placeholder={'Select Fees Category '}
                            defaultValue={feesCategory}
                            name='feesCategory'
                            onChange={setFeesCategory}
                            options={studentTypes}
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <label className='text-gray4 mt-2'>Section </label>
                        <Select
                            placeholder={'Select Student Section'}
                            defaultValue={studentSection}
                            name='studentSection'
                            onChange={setStudentSection}
                            options={sections}
                        />
                        <br />
                        {/* <label className='text-gray4 mt-2'>House/Group</label>
                        <Select
                            placeholder={'Select House/Group'}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={houses}
                        /> */}
                    </div>
                    <div className='w-1/4 p-2'>
                        <label className='text-gray4 mt-2'>House/Group</label>
                        <Select
                            placeholder={'Select House/Group'}
                            defaultValue={studentHouse}
                            name='studentHouse'
                            onChange={setStudentHouse}
                            options={houses}
                        />
                    </div>
                    <div className='w-1/4 p-2'>
                        <label className='text-gray4 mt-2'>Class</label>

                        <Select
                            placeholder={'Select Class'}
                            defaultValue={studentClass}
                            name='studentClass'
                            onChange={setStudentClass}
                            options={classes}
                        />
                        <br />
                        <br />
                        <div onClick={postStudentInfo}>
                            <Button value={'Add Student'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudentForm;
