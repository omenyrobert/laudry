import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import ExamsTypes from "../../components/classes/ExamsTypes";
import AssessmentForm from "../../components/classes/AssessmentForm";
import EditAssessmentForm from "../../components/classes/EditAssessmentForm";
import InputField from "../../components/InputField";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	getSubjects,
	getStudents,
	getTerms,
	getAssessmentsByTerm
} from "../../store/schoolSheetSlices/schoolStore";
import { assessSubjects } from "../../utils/assessment";

function Assessment() {
	const dispatch = useDispatch();
	const [studentId, setStudentId] = useState("");
	const [studentInfoEdit, setStudentInfoEdit] = useState();
	const [studentInfo, setStudentInfo] = useState();
	const [add, setAdd] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [term, setTerm] = useState(null);
	const [stream, setStream] = useState("");

	const { examTypes, subjects, students, terms, assessmentsByTerm  } = useSelector((state) => state.schoolStore);

	const openAdd = (student) => {
		const { streams } = student;
		setAdd(true);
		setStudentId(student.id);
		setStudentInfo(student);
		setSelectedSubject(student.selectedSubject);
		setStream(streams && streams.length > 0 ? streams[0].stream : "");
	};
	  
	const closeAdd = () => {
		setAdd(false);
	};

	const [studentData, setStudentData] = useState([]);

	useEffect(() => {
		setStudentData(students);
	}, [students]);

	// fetch exams and subjects
	const [examTypesData, setExamTypesData] = useState([]);
	const [subjectsData, setSubjectsData] = useState([]);

	useEffect(() => {
		dispatch(getSubjects());
		dispatch(getStudents());
		dispatch(getTerms());
	}, [dispatch]);

	useEffect(() => {
		const _examTypes = examTypes.map((res) => ({
			value: res.examType,
			label: res.examType,
			percent: res.mark,
			id: res.id
		}));
		setExamTypesData(_examTypes);

		const _subjects = subjects.map((res) => ({
			value: res.subject,
			label: res.subject,
		}));
		setSubjectsData(_subjects);
	}, [examTypes, subjects]);

	const [assessData, setAssessData] = useState([]);
	const [assessAll, setAssessAll] = useState([]);
	const { assessments } = useSelector((state) => state.schoolStore);

	useEffect(() => {
		if (assessmentsByTerm) {
			const updatedAssessments = assessmentsByTerm.map((assessment) => {
				const matchingExamType = 
				examTypes.find((examType) => examType.id === parseFloat(assessment.examType));
				if (matchingExamType) {
				  return {
					...assessment,
					examType: matchingExamType.examType,
				  };
				}
				return assessment;
			  });
			const data = updatedAssessments.filter((assessment) => {
				return assessment.studentId === studentId.toString()
			});
			setAssessAll(assessSubjects(data));
			const studentAssessment = data.filter(
				(assessment) => { 
					return assessment.subject === selectedSubject
				});
			setAssessData(studentAssessment);
		}
	}, [assessments, assessmentsByTerm, examTypes, selectedSubject, studentId]);

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

			<div className="w-full flex overflow-y-auto">
				<div className="w-4/12 bg-white p-3">
					<div className="bg-white p-3 overflow-y-auto h-[83vh]">
						<InputField
							placeholder="Search student..."
							icon={<BsSearch className="mt-3 mr-4" />}
						/>
						<table className="mt-4 w-full table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">Full Name</th>

								<th className="p-2 text-primary text-sm text-left">Class</th>

								<th className="p-2 text-primary text-sm text-left">Action</th>
							</thead>
							<tbody>
								{studentData?.length > 0 && studentData?.map((student) => {
									const { classes } = student;
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
												{classes.length > 0 && classes[0].class}
											</td>

											<td className="text-sm p-3">
												<p
													className="p-2 relative rounded assess bg-primary3 text-primary"
												>
													Assess
												</p>
												<div className="absolute subjects bg-white h-40 overflow-y-auto w-32 shadow-md -ml-5 -mt-5 z-50">
													
													{subjects && subjects.length > 0 && subjects.map((subject) => {
														return (
														<div className="p-2 hover:bg-gray1"
															onClick={() => openAdd({...student, selectedSubject: subject.subject})} 
														>
															{subject.subject} 
														</div>);
													})}
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="w-8/12 ml-5">
					
					{add ? (
						<AssessmentForm
							closeAdd={closeAdd}
							studentId={studentId}
							studentData={studentInfo}
							openEditData={openEditData}
							assessData={assessData}
							examTypesData={examTypesData}
							subjectsData={subjectsData}
							assessSubject={selectedSubject}
							assessAll={assessAll}
							term={term}
							stream={stream}
						/>
					) : null}
				</div>
			</div>

			{editData ? (
				<EditAssessmentForm
					studentId={studentId}
					studentData={studentInfoEdit}
					closeEditData={closeEditData}
					examTypesData={examTypesData}
					subjectsData={subjectsData}
					editDataId={editDataId}
				/>
			) : null}
		</div>
	);
}

export default Assessment;
