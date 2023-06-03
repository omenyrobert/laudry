import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../Button";
import Button2 from "../Button2";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	getStaffTypes,
	getStaffMembers,
} from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import ButtonSecondary from "../ButtonSecondary";
import ButtonLoader from "../ButtonLoader";
import Modal from "react-modal";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the overlay color here
	},
	content: {
		width: "65vw",
		height: "390px",
		padding: "0px",
		marginLeft: "25vw",
		marginTop: "10vw",
	},
};

const StaffForm = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const dispatch = useDispatch();

	const [selectedStaffTypeOption, setSelectedStaffTypeOption] = useState(null);
	const typeOptions = [];
	const { staffTypes } = useSelector((state) => state.schoolStore);

	staffTypes.forEach((type) => {
		let newOption = {};
		newOption.label = type.type;
		newOption.value = type.id;
		typeOptions.push(newOption);
	});

	const handleStaffTypeChange = (selected) => {
		setSelectedStaffTypeOption(selected);
	};

	useEffect(() => {
		dispatch(getStaffTypes());
	}, [dispatch]);

	// staff info form data
	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
	});

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [isPosting, setIsPosting] = useState(false);

	// post staff info
	const postStaffInfo = async (e) => {
		try {
			setIsPosting(true);
			e.preventDefault();
			let postData = {
				staffType: selectedStaffTypeOption.value,
				firstName: formData.firstName,
				middleName: formData.middleName,
				lastName: formData.lastName,
				email: formData.email,
			};
			const response = await axiosInstance.post("/staff", postData);
			const { data } = response;
			const { status } = data;
			if (status) {
				setFormData("");
				dispatch(getStaffMembers());
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeModal();
				setIsPosting(false);
			}
		} catch (error) {
			console.log(error);
			setIsPosting(false);
		}
	};

	return (
		<>
			<div className="flex bg-white p-2 mr-2">
				<div className="w-10/12">
					<div className="flex">
						<div className="w-[210px] mt-5">
							<div className="w-[210px]" onClick={openModal}>
								<Button2 value={"Add Staff Member"} />
							</div>
						</div>
						<div className="w-6/12 px-2">
							<InputField
								placeholder="Search for Income"
								type="search"
								icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
							/>
						</div>
						<div className="w-4/12 px-2">
							<InputField placeholder="Filter By Type" />
						</div>{" "}
					</div>
				</div>
			</div>

			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div>
					<div className="p-3 bg-gray1 flex justify-between">
						<div>
							<p className="text-primary text-lg font-semibold">
								Add Staff Member
							</p>
						</div>
						<div>
							<p onClick={closeModal} className="cursor-pointer">
								X
							</p>
						</div>
					</div>
					<div className="flex p-3">
						<div className="w-1/3 p-2">
							<br />
							<label className="text-gray4">Staff Type</label>

							<Select
								placeholder={"Select Staff Type"}
								defaultValue={selectedStaffTypeOption}
								onChange={handleStaffTypeChange}
								className="mt-1"
								options={typeOptions}
							/>

							<InputField
								type="text"
								placeholder="Enter Middle Name"
								label="Middle Name"
								name="middleName"
								onChange={onChange}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>

							<br />
						</div>
						<div className="w-1/3 p-2">
							<InputField
								type="email"
								placeholder="Email Address"
								label="Email Address"
								name="email"
								onChange={onChange}
							/>
							<InputField
								type="text"
								placeholder="Enter Last Name"
								label="Last Name"
								name="lastName"
								onChange={onChange}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>
						</div>
						<div className="w-1/3 p-2">
							<InputField
								type="text"
								placeholder="Enter First Name"
								label="First Name"
								name="firstName"
								onChange={onChange}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>
						</div>
					</div>
					<div className="p-3 bg-gray1 flex justify-between">
						<div onClick={closeModal}>
							<ButtonSecondary value={"Close"} />
						</div>
						<div>
							<div className="w-32">
								{isPosting ? (
									<ButtonLoader />
								) : (
									<div onClick={postStaffInfo}>
										{" "}
										<Button value={"Add Staff"} />{" "}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default StaffForm;
