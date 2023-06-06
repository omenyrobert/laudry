import React, { useEffect, useState } from 'react';
import Localbase from 'localbase';

let db = new Localbase('db');

function ReportCardTemplate({ closeCard, studentData }) {
    const [name, setName] = useState('');
    const [motto, setMotto] = useState('');
    const [location, setLocation] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');

    const fetchAboutInfo = async () => {
        console.log('fetched');
        const aboutInfo = await db.collection('aboutInfoTbl').get();
        // setName(aboutInfo[0].name);
        // setMotto(aboutInfo[0].motto);
        // setLocation(aboutInfo[0].location);
        // setPhones(aboutInfo[0].phones);
        // setEmails(aboutInfo[0].emails);
    };

    // fetching section
    useEffect(() => {
        fetchAboutInfo();
    }, []);

    const [assessData, setAssessData] = useState([]);
    const fetchAssessment = () => {
        db.collection('assessTbl')
            .get()
            .then((student) => {
                const newData = student;
                setAssessData(newData);
            });
    };

    // fetching subject
    useEffect(() => {
        fetchAssessment();
    }, []);

    return (
        <>
            <div className='bg-white z-10 w-full h-[82vh] overflow-y-auto'>
                <div className='flex justify-between bg-primary text-white py-5 px-6'>
                    <div className='flex'>
                        <div className=''>
                            <img
                                className='w-28 h-28 object-cover rounded'
                                src=''
                                alt=''
                            />
                            {/* school logo */}
                        </div>
                        <div className='ml-5'>
                            <h1 className='text-2xl  font-semibold'>{name}</h1>
                            <h1 className=''>{motto}</h1>
                            <div className='flex mt-5'>
                                <h1 className='font-thin'>{phones}</h1>
                                <h1 className='font-thin'>{emails}</h1>
                                <h1 className=' ml-5 font-thin'>{location}</h1>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className='font-bold text-3xl text-center'>
                            Report Card
                        </h1>
                    </div>
                    <div onClick={closeCard}>
                        <h1 className='font-bold text-3xl text-center cursor-pointer'>
                            X
                        </h1>
                    </div>
                </div>
                <div className='flex p-5'>
                    <div className=''>
                        <img
                            className='w-32 h-32 object-cover rounded'
                            src={studentData.photo}
                            alt=''
                        />
                    </div>
                    <div className='ml-5'>
                        <h1 className='text-primary font-bold text-2xl'>
                            {studentData.firstName} {studentData.middleName}{' '}
                            {studentData.lastName}
                        </h1>
                        <div className='flex mt-5'>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>Class:</h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>
                                    {studentData?.studentClass?.value}
                                </h1>
                            </div>
                        </div>
                        <div className='flex mt-5'>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>Section:</h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>Boarding</h1>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 '>
                        <div className='flex ml-14 mt-5'>
                            <div className='w-[200px]'>
                                <h1 className='text-gray5 text-md'>
                                    Student Type:
                                </h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>
                                    {studentData?.studentSection?.value}
                                </h1>
                            </div>
                        </div>
                        <div className='flex ml-14 mt-5'>
                            <div className='w-[200px]'>
                                <h1 className='text-gray5 text-md'>House:</h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>
                                    {studentData?.studentHouse?.value}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex bg-primary mx-4'>
                    <div className=' p-2 m-1 w-1/2 text-white'>SUBJECT</div>
                    <div className='p-2 m-1 w-1/2 text-white'>
                        <div className='flex'>
                            <div className='w-3/12'>Exam</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>Marks</div>
                                <div className='w-1/2'></div>
                            </div>
                            <div className='w-2/12'>Grade</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                {assessData.map((assess) => {
                    if (studentData.id === assess.studentId) {
                        return (
                            <>
                                <div
                                    className='flex mx-4 text-gray5 text-xs'
                                    key={assess.id}
                                >
                                    <div className=' p-2 m-1 w-1/2'>
                                        {assess.subject?.value}
                                    </div>
                                    <div className=' p-2 m-1 w-1/2'>
                                        <div className='flex'>
                                            <div className='w-3/12'>
                                                {assess?.examType?.value}
                                            </div>
                                            <div className='w-4/12 flex'>
                                                <div className='w-1/2'>
                                                    {assess.finalMark}
                                                </div>
                                                <div className='w-1/2'>
                                                    {assess.finalMark}/
                                                    {assess?.examType?.percent}
                                                </div>
                                            </div>
                                            <div className='w-2/12'>
                                                {/* {assess.comment} */}
                                            </div>
                                            <div className='w-3/12'>
                                                {assess.comment}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='text-gray2 mx-5' />
                            </>
                        );
                    }
                    return null;
                })}

                <div className='flex mx-4 text-gray5 bg-primary3 text-sm font-medium'>
                    <div className=' p-2 m-1 w-1/2'>Total</div>
                    <div className=' p-2 m-1 w-1/2'>
                        <div className='flex'>
                            <div className='w-3/12'>FINAL</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>95%</div>
                                <div className='w-1/2'>10/15</div>{' '}
                            </div>
                            <div className='w-2/12'>D1</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                <hr className='text-gray4 mx-4 mt-5' />
                {/* <div className='flex mx-4 text-gray5 text-xs'>
                    <div className=' p-2 m-1 w-1/2'>SST</div>
                    <div className=' p-2 m-1 w-1/2'>
                        <div className='flex'>
                            <div className='w-3/12'>HOLIDAY PACKAGE</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>95%</div>
                                <div className='w-1/2'>10/15</div>{' '}
                            </div>
                            <div className='w-2/12'>D1</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                <hr className='text-gray2 mx-5' />
                <div className='flex mx-4 text-gray5 text-xs'>
                    <div className=' p-2 m-1 w-1/2'>SST</div>
                    <div className=' p-2 m-1 w-1/2'>
                        <div className='flex'>
                            <div className='w-3/12'>BOT</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>95%</div>
                                <div className='w-1/2'>10/15</div>{' '}
                            </div>
                            <div className='w-2/12'>D1</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                <hr className='text-gray2 mx-5' />
                <div className='flex mx-4 text-gray5 text-xs'>
                    <div className=' p-2 m-1 w-1/2'>SST</div>
                    <div className=' p-2 m-1 w-1/2'>
                        <div className='flex'>
                            <div className='w-3/12'>MID</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>95%</div>
                                <div className='w-1/2'>10/15</div>{' '}
                            </div>
                            <div className='w-2/12'>D1</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                <hr className='text-gray2 mx-5' />
                <div className='flex mx-4 text-gray5 text-xs'>
                    <div className=' p-2 m-1 w-1/2'>SST</div>
                    <div className=' p-2 m-1 w-1/2'>
                        <div className='flex'>
                            <div className='w-3/12'>END</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>95%</div>
                                <div className='w-1/2'>10/15</div>{' '}
                            </div>
                            <div className='w-2/12'>D1</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                <div className='flex mx-4 text-gray5 bg-primary3 text-sm font-medium'>
                    <div className=' p-2 m-1 w-1/2'>Total</div>
                    <div className=' p-2 m-1 w-1/2'>
                        <div className='flex'>
                            <div className='w-3/12'>FINAL</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>95%</div>
                                <div className='w-1/2'>10/15</div>{' '}
                            </div>
                            <div className='w-2/12'>D1</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div> */}
                <div className='flex mx-4 text-gray5 bg-gray1 text-sm font-medium mt-5'>
                    <div className=' p-2 m-1 w-1/2'>Final Grading</div>
                    <div className=' p-2 m-1 w-1/2'>First Grade</div>
                </div>
                <div className='flex mx-4 text-gray5 bg-gray1 text-sm font-medium'>
                    <div className=' p-2 m-1 w-1/2'>
                        Comments From Class Teacher
                    </div>
                    <div className=' p-2 m-1 w-1/2'>commment here</div>
                </div>
            </div>
            ;
        </>
    );
}

export default ReportCardTemplate;
