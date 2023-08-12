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
	const [nextTerm, setNextTerm] = useState(null);
	const [assessData, setAssessData] = useState([]);
	const [report, setReport] = useState(null);
	const [points, setPoints] = useState(null);
	const [totalMarks, setTotalMarks] = useState(null);
	const [avgPoints, setAvgPoints] = useState(null);

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
			const _data = assessSubjects(data);
			const pointsData = _data.map(
				(dt) => {

					return assignGrade(dt.markGrade, grades, dt.subject).points
				}
			);
			const totalMarkss = _data.reduce(
				(accumulator, currentValue) => accumulator + currentValue.markGrade,
				0
			);
			setTotalMarks(totalMarkss)
			// remove undefined and and null
			const filteredPoints = pointsData.filter((point) => {
				return point !== undefined && point !== null;
			});
			const sumOfPoints = filteredPoints.reduce(
				(accumulator, currentValue) => accumulator + currentValue,
				0
			);
			const averagePoints = sumOfPoints / filteredPoints.length;
			setAvgPoints(averagePoints);
			setPoints(sumOfPoints);
			setAssessData(_data);
		}
	}, [assessments, assessmentsByTerm, grades, studentData.id]);

	// set Term
	useEffect(() => {
		const _term =
			terms.length > 0 && terms.filter((term) => term.is_selected === 1)[0];
		setTerm(_term);

		const _termindex = terms.indexOf(_term);
		let _nextTermIndex = _termindex - 1;
		if (_nextTermIndex === -1) {
			_nextTermIndex = terms.length - 1;
		}
		const _nextTerm = terms[_nextTermIndex];
		setNextTerm(_nextTerm);

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
			<div className="absolute bg-black/50 w-full top-0 left-0 z-50">
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

				<div className="flex justify-center" id="ledger-table">
					<div className="bg-white w-[100vw]  mt-2 ">
						<h1 className="text-2xl text-primary text-center mt-5 uppercase font-bold">
							{schools[0]?.name} report card
						</h1>
						<div className="flex text-white py-5 px-6">
							<div className="flex justify-between w-full">
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
								<div className="ml-5">
				
									<div className=" text-black">
										<div className="font-thin flex justify-center">
											<div>
												<MdLocationPin className="text-sm mt-1" />
											</div>
											<div className="ml-1">{schools[0]?.location}</div>
										</div>
										<div className="flex justify-between">
											<div className="font-thin flex justify-center">
												<div>
													<BsTelephoneFill className="text-sm mt-1 flex" />
												</div>{" "}
												<div className="ml-1">{schools[0]?.phoneNumbers}</div>{" "}
											</div>
											<div className="font-thin justify-center ml-5 flex">
												<div>
													<BsEnvelopeFill className="text-sm mt-1" />
												</div>
												<div className="ml-2">{schools[0]?.emails}</div>
											</div>
										</div>

										<h1 className="font-thin text-center">
											{schools[0]?.sites}
										</h1>
										<h1 className="font-bold text-2xl mt-1 text-primary text-center">
											Termly Report
										</h1>
									</div>
								</div>
								<div>
									<img
										className="w-28 h-28 object-cover rounded-md border border-gray1"
										src={
											studentData?.photo
												? UPLOADS_URL + studentData?.photo
												: "avata.jpeg"
										}
										alt="student_image"
									/>
								</div>
							</div>
						</div>
						<hr className="text-primary -mt-5" />

						<div className="m-5">
							<h1 className=" text-lg">
								Students Name: {studentData.firstName} {studentData.middleName}{" "}
								{studentData.lastName}
							</h1>
							<div className="flex mt-2">
								<div className="w-1/4 flex">
									<h1 className="">Class:</h1>
									<h1 className="text-gray5 ml-5">
										{studentData?.classes[0]?.class}
									</h1>
								</div>
								<div className="w-1/4 flex">
									<h1 className="">Term:</h1>
									<h1 className="text-gray5 ml-5">
										{studentData?.terms[0]?.term}
									</h1>
								</div>
								<div className="w-1/4 flex">
									<h1 className="">Year:</h1>
									<h1 className="text-gray5 ml-5">
										{new Date().getFullYear()}
									</h1>
								</div>
								<div className="w-1/4 flex">
									<h1 className="">Date:</h1>
									<h1 className="text-gray5 ml-5">
										{new Date().getDay()}-{new Date().getMonth()}-
										{new Date().getFullYear()}
									</h1>
								</div>
							</div>
							<div className="flex mt-2">
								<div className="w-1/4 flex">
									<h1 className="">Admission no:</h1>
									<h1 className="text-gray5 ml-5">
										{schools[0]?.name[0]}00{studentData?.id}
									</h1>
								</div>
								
								<div className="w-1/4 flex">
									<h1 className="">Stream:</h1>
									<h1 className="text-gray5 ml-5">
										{studentData?.streams[0]?.stream}
									</h1>
								</div>
							
							</div>

							
						</div>
						<p className="text-lg font-medium ml-5">END OF TERM PERFORMANCE</p>

						<div className=" flex text-sm border-b text-white bg-primary border-gray1 mx-5 px-2 cursor-pointer">
							<div className="w-1/4 p-2">Subjects</div>
							{/* {examTypes?.map((type) => {
								return (
									<>
										<div className="w-1/4 p-2">{type.examType}</div>
									</>
								);
							})} */}
							<div className="w-1/4 p-2">FULL MARKS</div>
							<div className="w-1/4 p-2">GRADE</div>
							<div className="w-1/4 p-2">POINTS</div>
							<div className="w-1/4 p-2">REMARKS</div>
						</div>

						{/* {assessData} */}
						{assessData.map((data) => {
							const { examTypes } = data;
							const gradeObj = assignGrade(
								data.markGrade,
								grades,
								data.subject
							);
							// console.log("gradeObj", gradeObj, data.subject)
							return (
								<div className=" flex text-sm border-b text-gray5 border-gray1 mx-2 px-2 cursor-pointer">
									<div className="w-1/4 p-2">{data.subject}</div>
									<div className="p-2 w-1/4">{`${Math.floor(
										data.markGrade
									)}%`}</div>{" "}
									<div className="p-2 w-1/4">
										{gradeObj.grade ? gradeObj.grade : "No Grade"}
									</div>
									<div className="p-2 w-1/4">{gradeObj.points}</div>
									<div className="p-2 w-1/4">
										{data.markGrade <= 35 ? "Poor" : null}
										{data.markGrade <= 60 && data.markGrade >= 36
											? "Fair"
											: null}
										{data.markGrade <= 85 && data.markGrade >= 61
											? "Good"
											: null}
										{data.markGrade >= 86 ? "Excellent" : null}
									</div>
								</div>
							);
						})}
						<div className=" flex text-sm border-b text-primary font-semibold bg-gray1 border-gray1 mx-5 px-2 cursor-pointer">
							<div className="w-1/4 p-1">Total</div>

							<div className="w-1/4 p-1"> {
								totalMarks
							} </div>
							<div className="w-1/4 p-1"></div>
							<div className="w-1/4 p-1">{points}: POINTS</div>
							<div className="w-1/4 p-1"></div>
						</div>

						<div className="mx-4  bg-gray2 font-medium mt-5 flex">
							<div className=" p-2 mx-1 w-1/3 ">
								AVERAGE MARK: <span className="text-gray5">{avgPoints}</span>{" "}
							</div>
							<div className=" p-2 mx-1  w-1/3 ">
								TOTAL POINTS: <span className="text-gray5">{points}</span>{" "}
							</div>
							<div className=" p-2 mx-1 w-1/3 ">
								DIVISION:{" "}
								<span className="text-gray5">
									{points && findDivision(points, divisions)?.division}{" "}
								</span>
							</div>
						</div>
						<br />
						<p className="m-5 uppercase font-semibold text-lg">
							progressive assessment record
						</p>
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
							<div className="w-1/4 p-2">Grade</div>
							<div className="w-1/4 p-2">Point</div>
						</div>
						{/* {assessData} */}
						{assessData.map((data) => {
							const { examTypes } = data;
							const gradeObj = assignGrade(
								data.markGrade,
								grades,
								data.subject
							);
							return (
								<div className=" flex text-sm border-b text-gray5 border-gray1 mx-2 px-2 cursor-pointer">
									<div className="w-1/4 p-1">{data.subject}</div>
									{examTypes.map((examType) => (
										<div className="w-1/4 p-1">{examType.markPercent}</div>
									))}
									<div className="w-1/4 p-1">
										{`${Math.floor(data.markGrade)}%`}
									</div>
									<div className="w-1/4 p-1">
										{gradeObj.grade ? gradeObj.grade : "No Grade"}
									</div>
									<div className="w-1/4 p-1">{gradeObj.points}</div>
								</div>
							);
						})}
						<div className=" bg-gray1 m-3 p-5">
							<p>Class Teacher{"'"}s comment:{" "}
								<span className="underline font-bold " >
									{report?.classTeachersComment}
								</span>
							</p>
							<p className="mt-2">Class Teacher{"'"}s signiture:
								<img
									src={UPLOADS_URL + report?.classTeachersSignature}
									alt="class teachers signature"
									width="60px"
									height="50px"

								/>
							</p>

							<hr className="text-gray4 my-4" />
							<p>Head Teacher{"'"}s comment:{" "}
								<span className="underline font-bold " >
									{report?.headTeachersComment}
								</span>
							</p>
							<p className="mt-2">Head Teacher{"'"}s signiture:

								<img
									src={UPLOADS_URL + report?.classTeachersSignature}
									alt="class teachers signature"
									width="60px"
									height="50px"

								/>
							</p>
						</div>


						<br />
						<div className="flex m-5 justify-between">
							<p>Next Term Begins:
								<span className="underline font-bold " >
									{nextTerm?.from}
								</span>
							</p>
							<p>Next Term Ends:
								<span className="underline font-bold " >
									{nextTerm?.to}
								</span>

							</p>
							<p>Next term{"'"}s fees</p>
						</div>
						<div className="flex m-5 justify-between">
							<p>Next Class:
								<span className="underline font-bold " >
									{report?.classField}
								</span>

							</p>
							<p>Next Streams:
								<span className="underline font-bold " >
									{report?.stream}
								</span>

							</p>
						</div>
						<div className="p-2 w-full bg-primary">
						
							<p className="text-center text-white text-lg font-medium"> 	{schools[0]?.motto} - See You Next Term</p>
						</div>

						<br />
						<br />
					</div>
				</div>
			</div>
		</>
	);
}

export default ReportCardTemplate;
