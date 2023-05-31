import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import ExamsTypes from "../../components/classes/ExamsTypes";
import AssessmentForm from "../../components/classes/AssessmentForm";
import Localbase from "localbase";
import EditAssessmentForm from "../../components/classes/EditAssessmentForm";
import InputField from "../../components/InputField";
import { BsSearch } from "react-icons/bs";

let db = new Localbase("db");

function Assessment() {
	const [studentId, setStudentId] = useState("");
	const [studentInfoEdit, setStudentInfoEdit] = useState();
	const [studentInfo, setStudentInfo] = useState();
	const [add, setAdd] = useState(false);
	const openAdd = (student) => {
		setAdd(true);
		setStudentId(student.id);
		setStudentInfo(student);
	};
	const closeAdd = () => {
		setAdd(false);
	};

	const [studentData, setStudentData] = useState([]);
	const fetchStudentInfo = () => {
		db.collection("studentInfo")
			.get()
			.then((student) => {
				const newData = student;
				setStudentData(newData);
			});
	};

	useEffect(() => {
		fetchStudentInfo();
	}, []);

	// fetch exams and subjects
	const [examTypesData, setExamTypesData] = useState([]);
	const [subjectsData, setSubjectsData] = useState([]);
	useEffect(() => {
		db.collection("examTypesTbl")
			.get()
			.then((staff) => {
				const newData = staff.map((res) => ({
					value: res.examType,
					label: res.examType,
					percent: res.mark,
				}));
				setExamTypesData(newData);
			});

		db.collection("subjects")
			.get()
			.then((staff) => {
				const newData = staff.map((res) => ({
					value: res.subject,
					label: res.subject,
				}));
				setSubjectsData(newData);
			});
	}, []);

	const [assessData, setAssessData] = useState([]);
	const fetchAssessment = () => {
		db.collection("assessTbl")
			.get()
			.then((student) => {
				const newData = student;
				setAssessData(newData);
			});
	};

	useEffect(() => {
		fetchAssessment();
	}, []);

	const [editData, setEditData] = useState(false);
	const [editDataId, setEditDataId] = useState(false);
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (student) => {
		setEditData(true);
		setStudentInfoEdit(student);
		setEditDataId(student.id);
	};

	return (
		<div>
			<div className="flex justify-between mr-5 mt-5">
				<div>
					<p className="text-secondary font-semibold text-xl">Assessment</p>
				</div>
				<div>
					<ExamsTypes />
				</div>
			</div>

			<div className="w-full flex">
				<div className="w-4/12 bg-white p-3">
					<InputField placeholder="Search student..." icon={<BsSearch className="mt-3 mr-4"/>} />
					<table className="mt-4 w-full table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Full Name</th>

							<th className="p-2 text-primary text-sm text-left">Class</th>

							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{studentData.map((student) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={student.id}
									>
										<td className="flex">
											<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
												{student.firstName[0]} {student.lastName[0]}
											</div>
											<div>
												<p className="text-sm p-3 -mt-1 text-gray5">
													{student.firstName} {student.middleName}{" "}
													{student.lastName}
												</p>
												<p className="text-red text-xs -mt-3 ml-3">
													{student.nin}
												</p>
											</div>
										</td>

										<td className="text-xs p-3 text-gray5">
											{student.studentType.value}
										</td>

										<td className="text-xs p-3 text-gray5 flex justify-between">
											<p
												onClick={() => openAdd(student)}
												className="p-2 rounded bg-primary3 text-primary"
											>
												Assess
											</p>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="w-8/12 ml-5">
					<p className="text-secondary font-bold text-xl">
						Assess Student Name
					</p>
					{add ? (
						<AssessmentForm
							closeAdd={closeAdd}
							studentId={studentId}
							studentData={studentInfo}
							openEditData={openEditData}
							assessData={assessData}
							fetchAssessment={fetchAssessment}
							examTypesData={examTypesData}
							subjectsData={subjectsData}
						/>
					) : null}
				</div>
			</div>

			{editData ? (
				<EditAssessmentForm
					studentData={studentInfoEdit}
					closeEditData={closeEditData}
					fetchAssessment={fetchAssessment}
					examTypesData={examTypesData}
					subjectsData={subjectsData}
					editDataId={editDataId}
				/>
			) : null}
		</div>
	);
}

export default Assessment;
