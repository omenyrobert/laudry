import React from 'react';

function ShowStudentsForm(props) {
    const { studentInfoShow, closeShowData } = props;

    return (
        <div className='w-3/4 shadow-lg absolute z-50 bg-white border-gray2 -mt-[12vh] border-2 rounded-md h-[85vh] overflow-y-auto'>
            <div className='flex bg-gray1 p-3 justify-between'>
                <div>
                    <p className='text-primary font-semibold text-md'>
                        Student's Info
                    </p>
                </div>
                <div>
                    <p className='cursor-pointer' onClick={closeShowData}>
                        X
                    </p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/2 p-5'>
                    <div className='bg-secondary p-3 rounded '>
                        <div className='flex'>
                            <div className='mt-[50px] ml-10'>
                                <p className='text-2xl font-semibold'>
                                    {studentInfoShow.firstName}{' '}
                                    {studentInfoShow.middleName}{' '}
                                    {studentInfoShow.lastName}
                                </p>
                                <br />
                                <p className='font-light'>
                                    {studentInfoShow.dateOfBirth} -{' '}
                                    {Math.abs(
                                        new Date().getFullYear() -
                                            new Date(
                                                studentInfoShow.dateOfBirth
                                            ).getFullYear()
                                    )}
                                    yrs
                                </p>
                                <div className='flex justify-between'>
                                    <p className='text-sm font-light'>
                                        {studentInfoShow.gender.value}
                                    </p>
                                    <p className='text-sm font-light'>
                                        {studentInfoShow.residence}
                                    </p>
                                </div>
                            </div>
                            <div className='bg-gray2 rounded-full h-40 w-40 ml-10'></div>
                        </div>
                    </div>
                    <br />
                    <p>Phone Number</p>
                    <p className='text-gray5'>{studentInfoShow.phoneNumber}</p>
                    <hr className='text-gray3 mt-2' />
                    <br />
                    <p className=''>Email</p>
                    <p className='text-gray5'>{studentInfoShow.email}</p>
                    <hr className='text-gray3 mt-2' />

                    <br />
                    <p>Next Of Kin</p>
                    <p className='text-gray5'>{studentInfoShow.fatherName}</p>
                    <p className='text-gray5'>Father</p>
                    <p className='text-gray5'>
                        {studentInfoShow.fatherContact}
                    </p>
                    <hr className='text-gray3 mt-2' />

                    <br />
                    <p>Next Of Kin</p>
                    <p className='text-gray5'>{studentInfoShow.motherName}</p>
                    <p className='text-gray5'>Mother</p>
                    <p className='text-gray5'>
                        {studentInfoShow.motherContact}
                    </p>
                    <hr className='text-gray3 mt-2' />
                </div>
                <div className='w-1/2 p-5'>
                    <div className='flex'>
                        <div>
                            <p className='text-primary text-2xl'>
                                Years At School
                            </p>
                        </div>
                        <div>
                            <p className='bg-primary3 text-primary p-2 text-center rounded-full w-10 ml-5'>
                                08
                            </p>
                        </div>
                    </div>
                    <div className='bg-gray1 rounded-md p-2 flex'>
                        <div className='w-1/2'>
                            <p className='text-primary text-sm mt-10'>
                                Term 1 from 3rd March to 14 April
                            </p>
                        </div>
                        <div className='w-1/2 ml-2'>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray1 rounded-md p-2 flex mt-5'>
                        <div className='w-1/2'>
                            <p className='text-primary text-sm mt-10'>
                                Term 1 from 3rd March to 14 April
                            </p>
                        </div>
                        <div className='w-1/2 ml-2'>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray1 rounded-md p-2 flex mt-5'>
                        <div className='w-1/2'>
                            <p className='text-primary text-sm mt-10'>
                                Term 1 from 3rd March to 14 April
                            </p>
                        </div>
                        <div className='w-1/2 ml-2'>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray1 rounded-md p-2 flex mt-5'>
                        <div className='w-1/2'>
                            <p className='text-primary text-sm mt-10'>
                                Term 1 from 3rd March to 14 April
                            </p>
                        </div>
                        <div className='w-1/2 ml-2'>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray1 rounded-md p-2 flex mt-5'>
                        <div className='w-1/2'>
                            <p className='text-primary text-sm mt-10'>
                                Term 1 from 3rd March to 14 April
                            </p>
                        </div>
                        <div className='w-1/2 ml-2'>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                            <div className='flex text-xs'>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    Math
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    81
                                </div>
                                <div className='p-2 bg-white border border-gray2 w-1/3'>
                                    D1
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowStudentsForm;
