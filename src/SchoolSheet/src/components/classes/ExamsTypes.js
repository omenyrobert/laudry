import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../assets/styles/main.css";
import { useDispatch, useSelector } from "react-redux";
import { getExamTypes } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";

import Modal from "react-modal";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the overlay color here
	},
	content: {
		width: "30vw",
		height: "100vh",
		padding: "0px",
		marginLeft: "68vw",
		marginTop: "-39px",
	},
};

function ExamsTypes() {
	// post exam Type
	const dispatch = useDispatch();
	const [examType, setexamType] = useState("");
	const [mark, setMark] = useState("");
	const postexamType = async () => {
		try {
			let formData = {
				examType: examType,
				mark: mark,
			};

			const response = await axiosInstance.post("/exam-types", formData);
			const { data } = response;
			const { status } = data;

			if (status) {
				dispatch(getExamTypes());
				setexamType("");
				setMark("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// update
	const [editData, setEditData] = useState(false);
	const [examTypeEdit, setexamTypeEdit] = useState("");
	const [markEdit, setMarkEdit] = useState("");
	const [examTypeId, setexamTypeId] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (examType) => {
		setEditData(true);
		setexamTypeEdit(examType?.examType);
		setexamTypeId(examType.id);
		setMarkEdit(examType.mark);
	};
	const updateexamType = async () => {
		try {
			let formData = {
				examType: examTypeEdit,
				id: examTypeId,
				mark: markEdit,
			};
			const subject = await axiosInstance.put("/exam-types", formData);
			const { data } = subject;
			const { status } = data;
			if (status) {
				dispatch(getExamTypes());
				setexamTypeEdit("");
				setMarkEdit("");
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

	// delete

	//deleting exam types
	const deleteexamType = (examTypeItem) => {
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
					const response = await axiosInstance.delete(`/exam-types/${examTypeItem.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getExamTypes());
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

	// fetching exam types
	useEffect(() => {
		dispatch(getExamTypes());
	}, [dispatch]);

	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const { examTypes } = useSelector((state) => state.schoolStore);

	return (
		<>
			<div onClick={openModal} className="w-52">
				<Button2 value={"Exam Types"} />
			</div>
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="flex px-8 py-3 justify-between text-xl font-semibold bg-gray1 text-primary">
					<div>
						<h5 className="">Exam Types</h5>
					</div>
					<div>
						<p onClick={closeModal} className="cursor-pointer">
							X
						</p>
					</div>
				</div>

				<div className="w-full h-full py-3 px-10">
					<div className=" ">
						<InputField
							type="text"
							placeholder="Enter exam Type"
							label="Exam Type"
							value={examType}
							onChange={(e) => setexamType(e.target.value)}

						/>
						<InputField
							type="text"
							placeholder="Enter Marks Out of 100%"
							label="Mark"
							value={mark}
							onChange={(e) => setMark(e.target.value)}

						/>

						<div onClick={postexamType}>
							<Button value={"Add exam Type"} />
						</div>
					</div>

					<table className="mt-10 w-full table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Type</th>
							<th className="p-2 text-primary text-sm text-left">Mark</th>
							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{/* edit popup start */}
							{editData ? (
								<div className="absolute shadow-lg rounded  w-[400px] p-5 bg-white">
									<div className="w-full pr-5">
										<InputField
											type="text"
											placeholder="Enter exam Type"
											label="exam Type"
											value={examTypeEdit}
											onChange={(e) => setexamTypeEdit(e.target.value)}

										/>
									</div>
									<div className="w-full pr-5">
										<InputField
											type="text"
											placeholder="Enter Mark"
											label="Mark"
											value={markEdit}
											onChange={(e) => setMarkEdit(e.target.value)}

										/>
									</div>

									<div className="flex justify-between w-full mt-[55px]">
										<div>
											<p
												className="text-black text-lg cursor-pointer"
												onClick={closeEditData}
											>
												Close
											</p>
										</div>
										<div onClick={updateexamType}>
											<ButtonSecondary value={"Update"} />
										</div>
									</div>
								</div>
							) : null}
							{/* edit popup end */}

							{examTypes && examTypes.map((examTypeItem) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={examType.id}
									>
										<td className="text-xs p-3 text-gray5">
											{examTypeItem.examType}
										</td>
										<td className="text-xs p-3 text-gray5">
											{examTypeItem.mark}
										</td>
										<td className="text-xs p-3 text-gray5">
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteexamType(examTypeItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													onClick={() => openEditData(examTypeItem)}
													className="text-warning h-4 w-4 ml-5"
												/>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</Modal>
		</>
	);
}
export default ExamsTypes;
