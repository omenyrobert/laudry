import React, { useState } from "react";
import InputField from "../InputField";
import Button2 from "../Button2";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";
import { v4 as uuid } from "uuid";
import Select from "react-select";

let db = new Localbase("db");

function AssessmentForm({
	closeAdd,
	studentId,
	studentData,
	openEditData,
	fetchAssessment,
	assessData,
	examTypesData,
	subjectsData,
}) {
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
	const postAssessment = (e) => {
		e.preventDefault();

		let clId = uuid();
		let data = {
			id: clId,
			studentId: studentId,
			examType: selectedExam,
			subject: selectedSubject,
			mark: formData.mark,
			finalMark: finalMark,
			comment: formData.comment,
		};
		if (formData) {
			db.collection("assessTbl")
				.add(data)
				.then((response) => {
					fetchAssessment();
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					// console.log('assess: ', response);
					// setFormData(
					//     Object.fromEntries(
					//         Object.keys(formData).map((key) => [key, ''])
					//     )
					// );
				})
				.catch(console.error());
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
		}).then((result) => {
			if (result.isConfirmed) {
				db.collection("assessTbl")
					.doc({ id: item.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchAssessment();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
					});
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
					<div className="w-1/4 p-1">
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
					<div className="w-1/4 p-1">
						<br />
						<br />
						<Select
							placeholder="Select Subject"
							label="Subject"
							defaultValue={selectedSubject}
							onChange={setSelectedSubject}
							options={subjectsData}
						/>
					</div>

					<div className="w-1/4 p-1">
						<InputField
							label="Marks"
							placeholder="Enter Marks in %"
							name="mark"
							onChange={onChange}
						/>
					</div>
					<div className="w-1/4 p-1">
						<InputField
							label="Comment"
							placeholder="Enter Comment"
							name="comment"
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
					<div className="w-1/4">Exam %</div>
					<div className="w-1/4">Subject</div>
					<div className="w-1/4">Marks</div>
					<div className="w-1/4">Final Mark %</div>
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
								<div className="w-1/4">{student?.examType?.value}</div>
								<div className="w-1/4">{student?.examType?.percent}</div>
								<div className="w-1/4">{student?.subject?.value}</div>
								<div className="w-1/4"> {student.mark} </div>
								<div className="w-1/4">{student.finalMark}</div>
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
