import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../InputField";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getStaffTypes } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import Modal from "react-modal";
import Button2 from "../Button2";

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

const StaffTypes = () => {
	const dispatch = useDispatch();
	const [type, setType] = useState("");
	const [editData, setEditData] = useState(false);
	const [typeEdit, setTypeEdit] = useState("");
	const [typeId, setTypeId] = useState("");

	const postStaffType = async () => {
		try {
			let formData = {
				staffType: type,
			};
			if (type) {
				const response = await axiosInstance.post("/staffTypes", formData);
				const { data } = response;
				const { status } = data;
				if (status) {
					setType("");
					dispatch(getStaffTypes());
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

	const deleteStaffType = (type) => {
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
					const response = await axiosInstance.delete(`/staffTypes/${type.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getStaffTypes());
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
	const updateStaffType = async () => {
		try {
			let formData = {
				staffType: typeEdit,
				typeId: typeId,
			};
			const response = await axiosInstance.put(`/staffTypes`, formData);
			const { data } = response;
			const { status } = data;
			if (status) {
				dispatch(getStaffTypes());
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

	useEffect(() => {
		dispatch(getStaffTypes());
	}, [dispatch]);

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (type) => {
		setEditData(true);
		setTypeEdit(type?.type);
		setTypeId(type?.id);
	};

	const { staffTypes } = useSelector((state) => state.schoolStore);

	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<div className="w-full ">
			<div
				onClick={openModal}
				className="w-40 relative pt-8  float-right"
			>
				<Button2 value={"Staff Types"} />
			</div>

			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="flex justify-between bg-gray1 py-3 px-8">
					<div>
						<p className="text-primary text-xl font-semibold">Staff Types</p>
					</div>
					<div>
						<p onClick={closeModal} className="cursor-pointer">
							X
						</p>
					</div>
				</div>

				<div className="flex m-3">
					<div className="w-72">
						<InputField
							type="text"
							placeholder="Enter staff Type"
							label="Staff Type"
							value={type}
							onChange={(e) => setType(e.target.value)}
						/>
					</div>
					<div onClick={postStaffType} className="w-32 ml-5 mt-14 float-right">
						<Button value={"Add "} />
					</div>
				</div>

				<table className="mt-10 w-[95%] m-3 table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-lg rounded flex w-[400px] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="text"
										placeholder="Enter Staff Type"
										label="Staff Type"
										name="Staff_type"
										value={typeEdit}
										onChange={(e) => setTypeEdit(e.target.value)}
									/>
								</div>
								<div className="flex justify-between w-1/3 mt-[55px]">
									<div onClick={updateStaffType}>
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

						{staffTypes.map((type) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={type.id}
								>
									<td className="text-xs p-3 text-gray5">{type.type}</td>
									<td className="text-xs p-3 text-gray5">
										<div className="flex">
											<MdDeleteOutline
												className="text-red w-4 h-4"
												onClick={() => deleteStaffType(type)}
											/>
											<BsPencilSquare
												onClick={() => openEditData(type)}
												className="text-warning h-4 w-4 ml-5"
											/>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</Modal>
		</div>
	);
};

export default StaffTypes;
