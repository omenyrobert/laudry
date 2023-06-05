import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button2 from "../Button2";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../assets/styles/main.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAssessments, getGrades, getClasses } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import Button from "../Button";
import { assignGrade } from "../../utils/assessment";

const actions = [
	{label: "Promote", value: "promoted"},
	{label: "Repeat", value: 'repeated'},
	{label: "Promoted on probation", value: "promoted_on_probation"}
]


function AssessmentForm({
	closeAdd,
	studentId,
	studentData,
	openEditData,
	assessData,
	examTypesData,
	assessSubject,
	subjectsData,
	assessAll
}) {
	const dispatch = useDispatch();
	const [selectedExam, setSelectedExam] = useState(null);
	const [finalMark, setFinalMark] = useState(null);
	const [action, setAction] = useState(null);
	const [_class, setClass] = useState(null);
	const [classOptions, setClassOptions] = useState([]);
	const { grades, classes } = useSelector((state) => state.schoolStore);

	const [formData, setFormData] = useState({
		mark: "",
		comment: "",
		generalComment: "",
	});
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "mark") {
			const finalMk = (formData.mark / 100) * selectedExam.percent;
			setFinalMark(finalMk);
		}
	};
	const postAssessment = async (e) => {
		e.preventDefault();

		try {
			let body = {
				studentId: studentId,
				examType: selectedExam.value,
				subject: assessSubject,
				mark: formData.mark,
				finalMark: finalMark,
				comment: formData.comment,
				term: 1,
				grade: assignGrade(finalMark, grades),
			};

			if (formData) {
				const response = await axiosInstance.post("/assessments", body);
				const { data } = response;
				const { status } = data;

				if (status) {
					dispatch(getAssessments());
					setFormData({
						mark: "",
						comment: "",
					});
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteAssess = (item) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const response = await axiosInstance.delete(
						`/assessments/${item.id}`
					);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getAssessments());
						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	// get grades
	useEffect(() => {
		dispatch(getGrades());
		dispatch(getClasses());
	}, [dispatch]);

	// get classes
	useEffect(() => {
		const data = classes.map(_class => ({label: _class.class, value: _class.class}));
		setClassOptions(data);
	}, [classes])
	
	return (
		<>
			<div className="bg-white p-3 h-[75vh] overflow-y-auto">
				<div className="bg-gray1 p-2 font-semibold flex justify-between text-primary">
					<div>
						{studentData.firstName} {studentData.middleName}
						{studentData.lastName}
					</div>
					<div>{assessSubject}</div>
					<div>Term here</div>

					<div className="cursor-pointer" onClick={closeAdd}>
						X
					</div>
				</div>
				<div className="p-2 flex">
					<div className="w-1/3 p-1">
						<br />
						<Select
							placeholder="Select Exam Type"
							label="Exam Type"
							defaultValue={selectedExam}
							onChange={setSelectedExam}
							options={examTypesData}
						/>
					</div>
					<div className="w-1/3 p-1">
						<InputField

							placeholder="Enter Marks in %"
							name="mark"
							value={formData.mark}
							onChange={onChange}
						/>
					</div>
					<div className="w-1/3 p-1">
						<InputField

							placeholder="Enter Comment"
							name="comment"
							value={formData.comment}
							onChange={onChange}
						/>
					</div>
				</div>
				<div className="flex justify-between mx-2">
					<div></div>
					<div onClick={postAssessment}>
						<Button2 value={"Add"} />
					</div>
				</div>
				<div className="mt-5 flex bg-gray1 p-2 text-sm mx-5">
					<div className="w-1/4">Exam Type</div>
					<div className="w-1/4">Marks %</div>
					<div className="w-1/4">Final Mark </div>
					<div className="w-1/4">Grade</div>
					<div className="w-1/4">Comment</div>
					<div className="w-1/4">Action</div>
				</div>

				{assessData.map((student) => {
					if (student.studentId === studentId.toString()) {
						return (
							<div
								className="flex hover:bg-gray1 p-2 text-xs cursor-pointer mx-5"
								key={student.id}
							>
								<div className="w-1/4">{student?.examType}</div>
								<div className="w-1/4"> {student.mark} </div>
								<div className="w-1/4">{student.finalMark}</div>
								<div className="w-1/4">{student.grade ?? "No Grade"}</div>
								<div className="w-1/4"> {student.comment} </div>
								<div className="w-1/4">
									<div className="flex">
										<MdDeleteOutline
											className="text-red w-4 h-4"
											onClick={() => deleteAssess(student)}
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(student)}
										/>
									</div>
								</div>
							</div>
						);
					}
					return null;
				})}
				<div className="w-20 float-right">
					<Button value={"Assess"} />
				</div>
				<br />
				<br />


				{assessAll.map((data) => {
					return (
						<div className=" flex text-sm bg-gray1 cursor-pointer">
							<div className="w-1/4  border-gray2 border p-2">{data.subject}</div>
							<div className="w-1/4 flex  border-gray2 p-2 border">
								<div className="p-1">BOT</div> <div className="p-1">{data.BOT}</div>
							</div>
							<div className="w-1/4 flex  border-gray2 p-2 border">
								<div className="p-1">MOT</div> <div className="p-1">{data.MOT}</div>
							</div>
							<div className="w-1/4 flex  border-gray2 p-2 border">
								<div className="p-1">EOT</div> <div className="p-1">{data.EOT}</div>
							</div>
							<div className="w-1/4 flex  border-gray2 p-2 border">
								<div className="p-1">{`${data.totalMark}%`}</div> <div className="p-1">{assignGrade(data.totalMark, grades)}</div>
							</div>
						</div>
					);
				})}
				<div className="flex mt-4">
					<div className="p-2 w-1/3 mt-5">
						<Select
							placeholder="Select Action"
							label="actions"
							defaultValue={action}
							onChange={setAction}
							options={actions}
						/>
					</div>
					<div className="p-2 w-1/3">
						<InputField
							placeholder="General Comment"
							name="comment"
							value={formData.generalComment}
							onChange={onChange} 
						/>
					</div>
					<div className="p-2 w-1/3 mt-5">
						<Select
							placeholder="Select Class"
							label="Class"
							defaultValue={_class}
							onChange={setClass}
							options={classOptions}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default AssessmentForm;
