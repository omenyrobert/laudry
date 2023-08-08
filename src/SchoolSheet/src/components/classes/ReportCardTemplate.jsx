import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getReports,
	getGrades,
	getSchools,
	getTerms,
	getAssessmentsByTerm,
	getDivisions,
	getExamTypes,
} from "../../store/schoolSheetSlices/schoolStore";
import {
	assessSubjects,
	assignGrade,
	findDivision,
} from "../../utils/assessment";
import { UPLOADS_URL } from "../../axios-instance";
import Button from "../Button";
import { BsTelephoneFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

function ReportCardTemplate({ closeCard, studentData }) {
	const dispatch = useDispatch();
	// const [name, setName] = useState("");
	// const [motto, setMotto] = useState("");
	// const [location, setLocation] = useState("");
	// const [phones, setPhones] = useState("");
	// const [emails, setEmails] = useState("");
	const [term, setTerm] = useState(null);
	const [assessData, setAssessData] = useState([]);
	const [report, setReport] = useState(null);
	const [points, setPoints] = useState(null);

	const {
		schools,
		assessments,
		grades,
		terms,
		assessmentsByTerm,
		reports,
		divisions,
		examTypes,
	} = useSelector((state) => state.schoolStore);

	// get assessments
	useEffect(() => {
		dispatch(getGrades());
		dispatch(getSchools());
		dispatch(getTerms());
		dispatch(getReports());
		dispatch(getDivisions());
		dispatch(getExamTypes());
	}, [dispatch]);

	useEffect(() => {
		if (assessmentsByTerm) {
			const data = assessmentsByTerm.filter((assessment) => {
				return assessment.studentId === studentData.id.toString();
			});
			console.log(data)
			const _data = assessSubjects(data);
			console.log(_data)
			const pointsData = _data.map(
				(dt) => assignGrade(dt.markGrade, grades, dt.subject).points
			);
			console.log(pointsData)
			const sumOfPoints = pointsData.reduce(
				(accumulator, currentValue) => accumulator + currentValue,
				0
			);
			setPoints(sumOfPoints);
			setAssessData(_data);
		}
	}, [assessments, assessmentsByTerm, grades, studentData.id]);

	// set Term
	useEffect(() => {
		const _term =
			terms.length > 0 && terms.filter((term) => term.is_selected === 1)[0];
		setTerm(_term);
	}, [terms]);

	useEffect(() => {
		if (term && term.id) {
			dispatch(getAssessmentsByTerm(term.id));
		}
	}, [dispatch, term]);

	// set Report
	useEffect(() => {
		const report =
			reports.length > 0 &&
			reports.filter((report) => {
				return (
					report.term === (term?.id ? term.id : "") &&
					report.studentId === (studentData?.id ? studentData.id : "")
				);
			})[0];
		setReport(report);
	}, [reports, studentData, term]);

	const handleGeneratePDF = () => {
		const documentWindow = window.open("", "PRINT", "height=600,width=1200");
		const content = document.getElementById("ledger-table").outerHTML;

		documentWindow.document.write(content);

		// Get All stylesheets
		const stylesheets = document.querySelectorAll("link");
		// Append them to the head of the new window
		stylesheets.forEach((stylesheet) => {
			documentWindow.document.write(stylesheet.outerHTML);
		});
		// Get all style tags
		const styleTags = document.querySelectorAll("style");
		// Append them to the head of the new window
		styleTags.forEach((styleTag) => {
			documentWindow.document.write(styleTag.outerHTML);
		});

		setTimeout(() => {
			documentWindow.print();
		}, 1000);
	};

	return (
		<>
			<div className="absolute bg-black/50 w-full overflow-hidden h-screen top-0 left-0 z-50">
				<div className="flex justify-between mt-2">
					<div></div>
					<div onClick={handleGeneratePDF}>
						<Button value={"Print"} />
					</div>
					<div onClick={closeCard}>
						<h1 className="font-bold text-3xl text-center cursor-pointer text-white">
							X
						</h1>
					</div>
					<div></div>
				</div>

				<div className="flex justify-center">
					<div className="bg-white w-[80vw] h-[90vh] mt-2  overflow-y-auto">
						<div className="flex bg-primary text-white py-5 px-6">
							<div className="flex w-full">
								<div className="w-28">
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
									<h1 className="text-xl  font-semibold">{schools[0]?.name}</h1>
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

							<div className="w-[300px]">
								<h1 className="font-bold text-xl text-center ">Report Card</h1>
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
						<div className=" flex text-sm border-b text-white bg-primary border-gray1 mx-2 px-2 cursor-pointer">
							<div className="w-1/4 p-2">Subjects</div>
							{examTypes?.map((type) => {
								return (
									<>
										<div className="w-1/4 p-2">{type.examType}</div>
									</>
								);
							})}
							<div className="w-1/4 p-2">Total</div>
							<div className="w-1/4 p-2">Point</div>
						</div>

						{/* {assessData} */}
						{assessData.map((data) => {
							const { examTypes } = data;
							const gradeObj = assignGrade(data.markGrade, grades);
							return (
								<div className=" flex text-sm border-b text-gray5 border-gray1 mx-2 px-2 cursor-pointer">
									<div className="w-1/4 p-2">{data.subject}</div>
									{examTypes.map((examType) => (
										<div className="w-1/4 flex  ">
											<div className="p-1">{examType.markPercent}</div>
										</div>
									))}
									<div className="w-1/4 flex  ">
										<div className="p-1">{`${Math.floor(data.markGrade)}%`}</div>{" "}
										<div className="p-1">{gradeObj.grade}</div>
									</div>
									<div className="w-1/4 flex  ">
										<div className="p-1">Points</div>{" "}
										<div className="p-1">{gradeObj.points}</div>
									</div>
								</div>
							);
						})}

						<div className="mx-4  bg-gray1 font-medium mt-5">
							<div className=" p-2 m-1 w-1/2 text-primary text-lg font-bold">Division: {points && findDivision(points, divisions)?.division}</div>
							<div className=" p-2 mx-1 -mt-5 w-1/2 text-sm">{points} Points</div>
						</div>
						<div className="flex mx-4  bg-gray1 font-medium">
							<div className=" p-2 m-1 w-1/2">Comments From Class Teacher
								<p className="text-sm text-gray5">{report?.comment}</p></div>
							<div className=" p-2 m-1 w-1/2">Next Stream : <span className="text-primary">{report?.stream}</span></div>
							<div className=" p-2 m-1 w-1/2">Next Class: <span className="text-primary">{report?.classField}</span></div>

						</div>
					</div>
				</div>

				<div id="ledger-table">
					<div className="bg-white w-[100vw] mt-2">
						<div className="bg-primary text-white p-2">
							<div className="flex">

								<div className="w-[200px]">
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
								<div className="ml-5 w-full truncate text-white">
									<h1 className="text-xl  font-semibold">{schools[0]?.name}</h1>
									<h1 className="">{schools[0]?.motto}</h1>

								</div>


								<div className="w-[300px]">
									<h1 className="font-bold text-2xl text-center ">Report Card</h1>
								</div>
							</div>


							<div className="flex mt-5 ml-[120px] -mt-[40px] text-sm">
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
						<div className=" flex text-sm border-b text-white bg-primary border-gray1 mx-2 px-2 cursor-pointer">
							<div className="w-1/4 p-2">Subjects</div>
							{examTypes?.map((type) => {
								return (
									<>
										<div className="w-1/4 p-2">{type.examType}</div>
									</>
								);
							})}
							<div className="w-1/4 p-2">Total</div>
							<div className="w-1/4 p-2">Point</div>
						</div>

						{/* {assessData} */}
						{assessData.map((data) => {
							const { examTypes } = data;
							const gradeObj = assignGrade(data.markGrade, grades);
							return (
								<div className=" flex text-sm border-b text-gray5 border-gray1 mx-2 px-2 cursor-pointer">
									<div className="w-1/4 p-2">{data.subject}</div>
									{examTypes.map((examType) => (
										<div className="w-1/4 flex  ">
											<div className="p-1">{examType.markPercent}</div>
										</div>
									))}
									<div className="w-1/4 flex  ">
										<div className="p-1">{`${Math.floor(data.markGrade)}%`}</div>{" "}
										<div className="p-1">{gradeObj.grade}</div>
									</div>
									<div className="w-1/4 flex  ">
										<div className="p-1">Points</div>{" "}
										<div className="p-1">{gradeObj.points}</div>
									</div>
								</div>
							);
						})}

						<div className="mx-4  bg-gray1 font-medium mt-5">
							<div className=" p-2 m-1 w-1/2 text-primary text-lg font-bold">Division: {points && findDivision(points, divisions)?.division}</div>
							<div className=" p-2 mx-1 -mt-5 w-1/2 text-sm">{points} Points</div>
						</div>
						<div className="flex mx-4  bg-gray1 font-medium">
							<div className=" p-2 m-1 w-1/2">Comments From Class Teacher
								<p className="text-sm text-gray5">{report?.comment}</p></div>
							<div className=" p-2 m-1 w-1/2">Next Stream : <span className="text-primary">{report?.stream}</span></div>
							<div className=" p-2 m-1 w-1/2">Next Class: <span className="text-primary">{report?.classField}</span></div>

						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ReportCardTemplate;
