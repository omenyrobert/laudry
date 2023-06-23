import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAssessments, getGrades, getSchools } from "../../store/schoolSheetSlices/schoolStore";
import { assessSubjects, assignGrade } from "../../utils/assessment";
import { UPLOADS_URL } from "../../axios-instance"

function ReportCardTemplate({ closeCard, studentData }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [motto, setMotto] = useState('');
    const [location, setLocation] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [assessData, setAssessData] = useState([]);

    const { schools, assessments, grades } = useSelector((state) => state.schoolStore);

    // get assessments
	useEffect(() => {
        dispatch(getAssessments());
        dispatch(getGrades());
        dispatch(getSchools());
	}, [dispatch]);

    useEffect(() => {
		if (assessments) {
			const data = assessments.filter((assessment) => {
				return assessment.studentId === studentData.id.toString()
			});
			setAssessData(assessSubjects(data));
		}
	}, [assessments, studentData.id]);

    return (
        <>
            <div className='bg-white z-10 w-full h-[82vh] overflow-y-auto'>
                <div className='flex justify-between bg-primary text-white py-5 px-6'>
                    <div className='flex'>
                        <div className=''>
                            <img
                                className='w-28 h-28 object-cover rounded'
                                src={studentData.photo}
                                alt='student_image'
                            />
                            <img
                                src={schools && schools.length > 0 && schools[0].logo ? UPLOADS_URL + schools[0].logo : "avatar.jpeg"}
                                className="w-28 h-28 object-cover rounded"
                                alt="school_logo"
						    />
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
                            alt='student_image'
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
                                    {studentData?.classes[0]?.class}
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
                                    {studentData?.student_types[0]?.type}
                                </h1>
                            </div>
                        </div>
                        <div className='flex ml-14 mt-5'>
                            <div className='w-[200px]'>
                                <h1 className='text-gray5 text-md'>House:</h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-gray5 text-md'>
                                    {studentData?.houses[0]?.house}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex bg-primary mx-4'>
                    <div className=' p-2 m-1 w-1/2 text-white'>SUBJECT</div>
                    <div className='p-2 m-1 w-1/2 text-white'>
                        <div className='flex'>
                            <div className='w-3/12'>Exam Type</div>
                            <div className='w-4/12 flex'>
                                <div className='w-1/2'>Marks</div>
                                <div className='w-1/2'></div>
                            </div>
                            <div className='w-2/12'>Grade</div>
                            <div className='w-3/12'>Comment</div>
                        </div>
                    </div>
                </div>
                {assessData.map((data) => {
					const gradeObj = assignGrade(data.markGrade, grades);
					return (
						<div className='flex mx-4 text-gray5 text-xs'>
							<div className='p-2 m-1 w-1/2'>{data.subject}</div>
                            <div  className='w-3/12'>
                                <div className='flex'>
                                    <div className='w-1/2 '>
                                        <div className="p-1">BOT</div> <div className="p-1">{data.BOT}</div>
                                    </div>
                                    <div className='w-1/2'>
                                        <div className="p-1">MOT</div> <div className="p-1">{data.MOT}</div>
                                    </div>
                                    <div className='w-1/2'>
                                        <div className="p-1">EOT</div> <div className="p-1">{data.EOT}</div>
                                    </div>
                                </div>
                            </div>
							<div  className='p-2 m-1 w-1/2'>
								<div className="p-1">{`${Math.floor(data.markGrade)}%`}</div> 
							</div>
							<div  className='w-1/2'>
								<div className="p-1">{gradeObj.grade}</div>
							</div>
						</div>
					);
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
