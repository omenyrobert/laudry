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
			const _data = assessSubjects(data);
			const pointsData = _data.map(
				(dt) => assignGrade(dt.markGrade, grades).points
			);
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
					<div className="flex p-5 ">
						<div className="w-2/12">
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
						<div className="w-2/12">
							<h1 className="text-primary font-bold text-2xl">
								{studentData.firstName} {studentData.middleName}{" "}
								{studentData.lastName}
							</h1>
							
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
						<div className="flex justify-between w-8/12  p-5">
							<div></div>
							<div>
								<p className="text-primary font-bold text-lg">Term 2</p>
								<p className="text-primary font-semibold "> {studentData?.classes[0]?.class} </p>
							</div>
						</div>
					</div>
					<div className=" flex text-sm border-b text-white bg-primary border-gray1 mx-2 px-2 cursor-pointer">
						<div className="w-1/4 p-2">Subjects</div>
						{examTypes.map((type) => {
							return (
								<>
									<div className="w-1/4 p-2">{type.name}</div>
								</>
							);
						})}
						<div className="w-1/4 p-2">Total</div>
						<div className="w-1/4 p-2">Point</div>
					</div>
					{/* <div>
{assessData[0].examTypes.type}
</div> */}

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

					<div className="mx-4 bg-gray1 font-medium mt-5">
						<div className=" p-2 m-1 w-1/2 font-bold">
							<p className="text-primary text-lg">
								Division: {points && findDivision(points, divisions)?.division}
							</p>
							<p className="text-sm">total Points</p>
						</div>
					</div>
					<div className="flex mx-4 bg-gray1 text-sm font-medium">
						<div className=" p-2 m-1 w-1/2 text-md">
							Comments From Class Teacher
							<p className="text-sm text-gray5">{report?.comment}</p>
						</div>
						<div className=" p-2 m-1 w-1/2 "></div>
						<div className=" p-2 m-1 w-1/2">
							Next Stream:{" "}
							<span className="text-primary">{report?.stream}</span>
						</div>
						<div className=" p-2 m-1 w-1/2">
							Next Class :{" "}
							<span className="text-primary">{report?.classField}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ReportCardTemplate;
