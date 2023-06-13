import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";

function StudentsTypes() {
	const [studentTypesData, setStudentTypesData] = useState([]);

	// posting StudentTypes
	const [studentType, setStudentType] = useState("");
	const [isPosting, setIsPosting] = useState(false);
	const postStudentTypes = () => {
		setIsPosting(true);
		let formData = {
			type: studentType,
		};

		if (studentType) {
			axiosInstance
				.post("/student-types", formData)
				.then((response) => {
					setStudentType("");

					// fetch after
					fetchStudentTypes();
					setIsPosting(false);
					const { status, payload } = response.data;
					if (status === false) {
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "error",
							title: "Oops...",
							text: payload,
						});
						return;
					}

					// show alert
					setIsPosting(false);
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch((error) => {
					setIsPosting(false);
				});
		}
	};

	// fetch studentTypes
	const fetchStudentTypes = () => {
		axiosInstance
			.get("/student-types")
			.then((response) => {
				const { status, payload } = response.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						title: "Oops...",
						text: payload,
					});
					return;
				}
				setStudentTypesData(payload);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// fetching studentTypes
	useEffect(() => {
		fetchStudentTypes();
	}, []);

	//deleting studentTypes
	const deleteStudentTypes = (studentTypes) => {
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
				axiosInstance
					.delete(`/student-types/${studentTypes.id}`)
					.then((response) => {
						const { status, payload } = response.data;
						if (status === false) {
							const MySwal = withReactContent(Swal);
							MySwal.fire({
								icon: "error",
								title: "Oops...",
								text: payload,
							});
							return;
						}
						// fetch after
						fetchStudentTypes();

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

	// updating studentTypes
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (studentType) => {
		setEditData(true);
		setStudentTypeEdit(studentType?.type);
		setStudentTypesId(studentType.id);
	};

	const [editData, setEditData] = useState(false);
	const [studentTypeEdit, setStudentTypeEdit] = useState("");
	const [studentTypesId, setStudentTypesId] = useState("");

	const updateStudentTypes = () => {
		const data = {
			type: studentTypeEdit,
			id: studentTypesId,
		};
		axiosInstance
			.put(`/student-types/${studentTypesId}`, data)
			.then((response) => {
				const { status, payload } = response.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						title: "Oops...",
						text: payload,
					});
					return;
				}
				// fetch after
				fetchStudentTypes();

				Swal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<h5 className="text-lg font-medium ml-5 text-secondary">Student Types</h5>
			<div className="w-full h-[80vh] ml-5">
				<div className="flex justify-between bg-white pl-5 shadow-lg">
					<div className="w-1/2">
						<InputField
							type="text"
							placeholder="Enter Student Type"
							label="Student Type"
							value={studentType}
							onChange={(e) => setStudentType(e.target.value)}
							
						/>
					</div>

					<div className="mt-8 ml-5 w-[150px]">
						<br />
						{isPosting ? (
							<ButtonLoader />
						) : (
							<div onClick={postStudentTypes}>
								<Button value={"Add"} />
							</div>
						)}
					</div>
					<div className="w-1/4"></div>
				</div>

				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Student Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded flex w-[50vw] md:w-[38vw] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="text"
										placeholder="Enter Class"
										label="Class"
										value={studentTypeEdit}
										onChange={(e) => setStudentTypeEdit(e.target.value)}
										
									/>
								</div>
								<div className="flex justify-between w-1/3  mt-[55px]">
									<div onClick={updateStudentTypes}>
										<ButtonSecondary value={"Update"} />
									</div>
									<div>
										<p
											className="text-black text-lg cursor-pointer"
											onClick={closeEditData}
										>
											X
										</p>
									</div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{studentTypesData.map((studentType) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={studentType.id}
								>
									<td className="text-xs p-3 text-gray5">{studentType.type}</td>

									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline
											onClick={() => deleteStudentTypes(studentType)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(studentType)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
export default StudentsTypes;
