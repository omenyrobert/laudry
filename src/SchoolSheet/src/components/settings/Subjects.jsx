import React, { useEffect, useState } from "react";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";

function Subject() {
	const dispatch = useDispatch();
	const [editData, setEditData] = useState(false);
	const [editSubject, setEditSubject] = useState("");
	const [subjectId, setSubjectId] = useState("");

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (subject) => {
		setEditData(true);
		setEditSubject(subject?.subject);
		setSubjectId(subject.id);
	};

	// posting subject
	const [isposting, setIsPosting] = useState(false);
	const [subject, setSubject] = useState("");
	const postSubject = async () => {
		try {
			setIsPosting(false);
			let formData = {
				subject: subject,
			};

			const response = await axiosInstance.post("/subjects", formData);
			const { data } = response;
			const { status } = data;

			if (status) {
				dispatch(getSubjects());
				setSubject("");
				setIsPosting(false);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch (error) {
			console.log(error);
			setIsPosting(false);
		}
	};

	// fetching subject
	useEffect(() => {
		dispatch(getSubjects());
	}, [dispatch]);

	//deleting subject
	const deleteSubject = (subject) => {
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
						`/subjects/${subject.id}`
					);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getSubjects());
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

	// updating subject
	const updateSubject = async () => {
		try {
			let formData = {
				subjectId: subjectId,
				subject: editSubject,
			};
			const subject = await axiosInstance.put("/subjects", formData);
			const { data } = subject;
			const { status } = data;
			if (status) {
				dispatch(getSubjects());
				setEditSubject("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { subjects } = useSelector((state) => state.schoolStore);

	return (
		<div className=" bg-white pl-5 shadow-lg rounded-md h-auto p-3">
			<h5 className="text-xl font-medium ml-5 text-secondary">Subject</h5>
			<div className="w-full">
				<div className="flex justify-between ">
					<div className="w-1/2">
						<InputField
							type="text"
							placeholder="Enter Subject"
							label="Subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>

					<div className="mt-8 mr-5 w-[100px]">
						<br />
						{isposting ? (
							<ButtonLoader />
						) : (
							<div onClick={postSubject}>
								<Button value={"Add"} />
							</div>
						)}
					</div>
				</div>
				<div className="h-[70vh] overflow-y-auto">
					<table className="mt-10 w-[98%] table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Subject</th>
							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{/* edit popup start */}
							{editData ? (
								<div className="absolute shadow-2xl rounded flex w-[30vw] p-5 bg-white">
									<div className="w-7/12 pr-2">
										<InputField
											type="text"
											placeholder="Enter Subject"
											label="Subject"
											onChange={(e) => setEditSubject(e.target.value)}
											value={editSubject}
										/>
									</div>
									<div className="flex justify-between w-5/12 mt-[55px]">
										<div onClick={updateSubject}>
											<ButtonSecondary value={"Update"} />
										</div>
										<div>
											<p
												className="text-black text-lg ml-5 cursor-pointer"
												onClick={closeEditData}
											>
												X
											</p>
										</div>
									</div>
								</div>
							) : null}
							{/* edit popup end */}

							{subjects.map((subject) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={subject.id}
									>
										<td className="text-xs p-3 text-gray5">
											{subject.subject}
										</td>

										<td className="text-xs p-3 text-gray5 flex">
											<MdDeleteOutline
												onClick={() => deleteSubject(subject)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												className="text-warning h-4 w-4 ml-5"
												onClick={() => openEditData(subject)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
export default Subject;
