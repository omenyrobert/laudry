import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";

import Modal from "react-modal";
let db = new Localbase("db");

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
	const [examType, setexamType] = useState("");
	const [mark, setMark] = useState("");
	const postexamType = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			examType: examType,
			mark: mark,
		};
		if (examType || mark) {
			db.collection("examTypesTbl")
				.add(formData)
				.then((response) => {
					setexamType("");
					setMark("");
					fetchexamTypes();
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch(console.error());
		}
	};

	// fetch exam typess
	const [examTypesData, setexamTypesData] = useState([]);
	const fetchexamTypes = () => {
		db.collection("examTypesTbl")
			.get()
			.then((examTypes) => {
				const newData = examTypes;
				setexamTypesData(newData);
			});
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
	const updateexamType = () => {
		db.collection("examTypesTbl")
			.doc({ id: examTypeId })
			.update({
				examType: examTypeEdit,
				mark: markEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchexamTypes();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
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
		}).then((result) => {
			if (result.isConfirmed) {
				db.collection("examTypesTbl")
					.doc({ id: examTypeItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchexamTypes();

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

	// fetching exam types
	useEffect(() => {
		fetchexamTypes();
	}, []);

	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

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
				<div className="flex px-5 py-3 justify-between text-xl font-semibold bg-gray1 text-primary">
					<div>
						<h5 className="">exam Types</h5>
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
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="text"
							placeholder="Enter Marks Out of 100%"
							label="Mark"
							value={mark}
							onChange={(e) => setMark(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
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
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-full pr-5">
										<InputField
											type="text"
											placeholder="Enter Mark"
											label="Mark"
											value={markEdit}
											onChange={(e) => setMarkEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
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

							{examTypesData.map((examTypeItem) => {
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
