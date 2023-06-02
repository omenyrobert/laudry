import React, { useState } from "react";
import InputField from "../InputField";
import Button2 from "../Button2";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../assets/styles/main.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getAssessments } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import Button from "../Button";

function AssessmentForm({
	closeAdd,
	studentId,
	studentData,
	openEditData,
	assessData,
	examTypesData,
	subjectsData,
}) {
	const dispatch = useDispatch();
	const [selectedExam, setSelectedExam] = useState(null);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [finalMark, setFinalMark] = useState(null);

	const [formData, setFormData] = useState({
		mark: "",
		comment: "",
	});
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		const finalMk = (formData.mark / 100) * selectedExam.percent;
		setFinalMark(finalMk);
	};
	const postAssessment = async (e) => {
		e.preventDefault();

		try {
			let body = {
				studentId: studentId,
				examType: selectedExam.value,
				subject: selectedSubject.value,
				mark: formData.mark,
				finalMark: finalMark,
				comment: formData.comment,
				term: 1,
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

	return (
		<>
			<div className="bg-white p-3 h-[90vh]">
				<div className="bg-gray1 p-2 font-semibold flex justify-between text-primary">
					<div>
						{studentData.firstName} {studentData.middleName}
						{studentData.lastName}
					</div>
					<div>Term here</div>
					<div className="cursor-pointer" onClick={closeAdd}>
						X
					</div>
				</div>
				<div className="p-2 flex">
					<div className="w-1/5 p-1">
						<br />
						<br />
						subject here
					</div>
					<div className="w-1/5 p-1">
						<br />
						<br />
						<Select
							placeholder="Select Exam Type"
							label="Exam Type"
							defaultValue={selectedExam}
							onChange={setSelectedExam}
							options={examTypesData}
						/>
					</div>

					<div className="w-1/5 p-1">
						<InputField
							label="Marks"
							placeholder="Enter Marks in %"
							name="mark"
							value={formData.mark}
							onChange={onChange}
						/>
					</div>
					<div className="w-2/5 p-1">
						<InputField
							label="Comment"
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
					<div className="w-1/4">Grade</div>
					<div className="w-1/4">Final Mark </div>
					<div className="w-1/4">Grade</div>
					<div className="w-1/4">Comment</div>
					<div className="w-1/4">Action</div>
				</div>

				{assessData.map((student) => {
					if (student.studentId === studentId) {
						return (
							<div
								className="flex hover:bg-gray1 p-2 text-xs cursor-pointer mx-5"
								key={student.id}
							>
								<div className="w-1/4">{student?.examType}</div>
								<div className="w-1/4">{student?.mark}</div>
								<div className="w-1/4"> {student.mark} </div>
								<div className="w-1/4">{student.finalMark}</div>
								<div className="w-1/4">grade</div>
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

				<div className=" flex text-sm bg-gray1 cursor-pointer">
					<div className="w-1/4  border-gray2 border p-2">Math</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">BOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">MOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">EOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">76%</div> <div className="p-1">d2 </div>
					</div>
				</div>
				<div className=" flex text-sm bg-gray1 cursor-pointer">
					<div className="w-1/4  border-gray2 border p-2">Math</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">BOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">MOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">EOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">76%</div> <div className="p-1">d2 </div>
					</div>
				</div><div className=" flex text-sm bg-gray1 cursor-pointer">
					<div className="w-1/4  border-gray2 border p-2">Math</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">BOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">MOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">EOT</div> <div className="p-1">9/15</div>
					</div>
					<div className="w-1/4 flex  border-gray2 p-2 border">
						<div className="p-1">76%</div> <div className="p-1">d2 </div>
					</div>
				</div>

				<div className="flex mt-4">
					<div className="p-2 w-1/3 mt-5">
						<Select
							placeholder="Select Action"
							label="Exam Type"
							defaultValue={selectedExam}
							onChange={setSelectedExam}
							options={examTypesData}
						/>
					</div>
					<div className="p-2 w-1/3">
						<InputField placeholder="General Comment" />
					</div>
					<div className="p-2 w-1/3 mt-5">
						<Select
							placeholder="Select Class"
							label="Exam Type"
							defaultValue={selectedExam}
							onChange={setSelectedExam}
							options={examTypesData}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default AssessmentForm;
