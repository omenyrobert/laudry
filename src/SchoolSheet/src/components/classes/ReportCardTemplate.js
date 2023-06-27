import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getReports,
	getGrades,
	getSchools,
	getTerms,
	getAssessmentsByTerm
} from "../../store/schoolSheetSlices/schoolStore";
import { assessSubjects, assignGrade } from "../../utils/assessment";
import { UPLOADS_URL } from "../../axios-instance";
import Button from "../Button";
import { BsTelephoneFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

function ReportCardTemplate({ closeCard, studentData }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [motto, setMotto] = useState("");
	const [location, setLocation] = useState("");
	const [phones, setPhones] = useState("");
	const [emails, setEmails] = useState("");
	const [term, setTerm] = useState(null);
	const [assessData, setAssessData] = useState([]);
	const [report, setReport] = useState(null);

	const { schools, assessments, grades, terms, assessmentsByTerm, reports } = useSelector(
		(state) => state.schoolStore
	);

	// get assessments
	useEffect(() => {
		// dispatch(getAssessments());
		dispatch(getGrades());
		dispatch(getSchools());
		dispatch(getTerms());
		dispatch(getReports());
	}, [dispatch]);

	useEffect(() => {
		if (assessmentsByTerm) {
			const data = assessmentsByTerm.filter((assessment) => {
				return assessment.studentId === studentData.id.toString();
			});
			setAssessData(assessSubjects(data));
		}
	}, [assessments, assessmentsByTerm, studentData.id]);

	// set Term
	useEffect(() => {
		const _term = terms.length > 0 && 
			terms.filter(term => term.is_selected === 1)[0];
		setTerm(_term);
	}, [terms]);

	useEffect(() => {
		if (term && term.id) {
			dispatch(getAssessmentsByTerm(term.id));
		}
	}, [dispatch, term]);

	// set Report
	useEffect(() => {
		const report = reports.length > 0 && 
			reports.filter(report =>
				report.term === term?.id && report.studentId === studentData?.id.toString())[0];
		setReport(report);
	}, [reports, studentData?.id, term?.id]);

	return (
		<>
			<div className="absolute bg-black/50 w-[87vw] h-screen -mt-20 z-50">
				<div className="flex justify-between mt-2">
					<div></div>
					<div>
						<Button value={"Print"} />
					</div>
					<div onClick={closeCard}>
						<h1 className="font-bold text-3xl text-center cursor-pointer text-white">
							X
						</h1>
					</div>
					<div></div>
				</div>

				<div className="bg-white w-[60vw] h-[90vh] mt-2 ml-[10vw] overflow-y-auto">
					<div className="flex bg-primary text-white py-5 px-6">
						<div className="flex w-10/12">
							<div className="">
								<img
									src={
										schools && schools.length > 0 && schools[0]?.logo
										  ? UPLOADS_URL + schools[0]?.logo
										  : "avatar.jpeg"
									}									  
									className="w-28 h-28 object-cover rounded"
									alt="school_logo"
								/>
							</div>
							<div className="ml-5 text-white">
								<h1 className="text-2xl  font-semibold">{schools[0]?.name}</h1>
								<h1 className="">{schools[0]?.motto}</h1>
								<div className="flex mt-5 text-sm">
									<div className="font-thin flex">
										<div>
											<BsTelephoneFill className="text-sm mt-1 flex" />
										</div>{" "}
										<div className="ml-1">{schools[0]?.phoneNumbers}</div>{" "}
									</div>
									<div className="font-thin ml-5 flex">
										<div>
											<BsEnvelopeFill className="text-sm mt-1" />
										</div>
										<div className="ml-1">{schools[0]?.emails}</div>
									</div>
									<div className=" ml-5 font-thin flex">
										<div>
											<MdLocationPin className="text-sm mt-1" />
										</div>
										<div className="ml-1">{schools[0]?.location}</div>
									</div>
									<h1 className=" ml-5 font-thin">{schools[0]?.sites}</h1>
								</div>
							</div>
						</div>

						<div className="w-2/12">
							<h1 className="font-bold text-3xl text-center">Report Card</h1>
						</div>
					</div>
					<div className="flex p-5">
						<div className="">
							<img
								className="w-32 h-32 object-cover rounded-md border border-gray1"
								src={
									studentData?.photo
										? UPLOADS_URL + studentData?.photo
										: "avata.jpeg"
								}
								alt="student_image"
							/>
						</div>
						<div className="ml-5 w-1/4">
							<h1 className="text-primary font-bold text-2xl">
								{studentData.firstName} {studentData.middleName}{" "}
								{studentData.lastName}
							</h1>
							<div className="flex text-sm">
								<div className="w-1/2">
									<h1 className="">Class:</h1>
								</div>
								<div className="w-1/2">
									<h1 className="text-gray5 ">
										{studentData?.classes[0]?.class}
									</h1>
								</div>
							</div>
							<div className="flex text-sm">
								<div className="w-1/2">
									<h1 className="text-black">Section:</h1>
								</div>
								<div className="w-1/2">
									<h1 className="text-gray5 ">Boarding</h1>
								</div>
							</div>
							<div className="flex text-sm ">
								<div className="w-1/2">
									<h1 className="">Student Type:</h1>
								</div>
								<div className="w-1/2">
									<h1 className="text-gray5 ">
										{studentData?.student_types[0]?.type}
									</h1>
								</div>
							</div>
							<div className="flex text-sm">
								<div className="w-1/2">
									<h1 className="">House:</h1>
								</div>
								<div className="w-1/2">
									<h1 className="text-gray5 ">
										{studentData?.houses[0]?.house}
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div className="flex bg-primary mx-4">
						<div className=" p-2 m-1 w-1/2 text-white">SUBJECT</div>
						<div className="p-2 m-1 w-1/2 text-white">
							<div className="flex">
								<div className="w-3/12">Exam Type</div>
								<div className="w-4/12 flex">
									<div className="w-1/2">Marks</div>
									<div className="w-1/2"></div>
								</div>
								<div className="w-2/12">Grade</div>
								<div className="w-3/12">Comment</div>
							</div>
						</div>
					</div>
					{/* {assessData} */}
					{assessData.map((data) => {
						const gradeObj = assignGrade(data.markGrade, grades);
						return (
							<div className="flex mx-4 text-gray5 text-xs">
								<div className="p-2 m-1 w-1/2">{data.subject}</div>
								<div className="w-3/12">
									<div className="flex">
										<div className="w-1/2 ">
											<div className="p-1">HolidayPackage</div>{" "}
											<div className="p-1">{data.HolidayPackage}</div>
										</div>
										<div className="w-1/2 ">
											<div className="p-1">BOT</div>{" "}
											<div className="p-1">{data.BOT}</div>
										</div>
										<div className="w-1/2">
											<div className="p-1">MOT</div>{" "}
											<div className="p-1">{data.MOT}</div>
										</div>
										<div className="w-1/2">
											<div className="p-1">EOT</div>{" "}
											<div className="p-1">{data.EOT}</div>
										</div>
									</div>
								</div>
								<div className="p-2 m-1 w-1/2">
									<div className="p-1">{`${Math.floor(data.markGrade)}%`}</div>
								</div>
								<div className="w-1/2">
									<div className="p-1">{gradeObj.grade}</div>
								</div>
							</div>
						);
					})}

					<div className="flex mx-4 text-gray5 bg-primary3 text-sm font-medium">
						<div className=" p-2 m-1 w-1/2">Total</div>
						<div className=" p-2 m-1 w-1/2">
							<div className="flex">
								<div className="w-3/12">FINAL</div>
								<div className="w-4/12 flex">
									<div className="w-1/2">95%</div>
									<div className="w-1/2">10/15</div>{" "}
								</div>
								<div className="w-2/12">D1</div>
								<div className="w-3/12">Comment</div>
							</div>
						</div>
					</div>
					<hr className="text-gray4 mx-4 mt-5" />
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
					<div className="flex mx-4 text-gray5 bg-gray1 text-sm font-medium mt-5">
						<div className=" p-2 m-1 w-1/2">Final Grading</div>
						<div className=" p-2 m-1 w-1/2">First Grade</div>
					</div>
					<div className="flex mx-4 text-gray5 bg-gray1 text-sm font-medium">
						<div className=" p-2 m-1 w-1/2">Comments From Class Teacher</div>
						<div className=" p-2 m-1 w-1/2">{report?.comment}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ReportCardTemplate;
