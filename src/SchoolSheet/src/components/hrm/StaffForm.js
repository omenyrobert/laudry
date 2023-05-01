import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../Button";
import Button2 from "../Button2";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { BsSearch } from "react-icons/bs";
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux';
import { getStaffTypes, getStaffMembers } from '../../store/schoolSheetSlices/schoolStore';
import axiosInstance from '../../axios-instance';
=======
import ButtonSecondary from "../ButtonSecondary";
>>>>>>> f1b1283dd1e707765aa8ec4684b6b08a8f5b4735


const StaffForm = (props) => {
	const dispatch = useDispatch();

	const [addStaff, setAddStaff] = useState(false);

	const openStaffForm = () => {
		setAddStaff(true);
	};

	const closeStaffForm = () => {
		setAddStaff(false);
	};

	const [selectedStaffTypeOption, setSelectedStaffTypeOption] = useState(null);
	const typeOptions = [];
	const { staffTypes } = useSelector((state) => state.schoolStore);

<<<<<<< HEAD
	staffTypes.forEach((type) => {
		let newOption = {};
		newOption.label = type.type;
		newOption.value = type.id;
		typeOptions.push(newOption);
	});

	const handleStaffTypeChange = (selected) => {
		setSelectedStaffTypeOption(selected);
	};

=======
	// fetching stypes
>>>>>>> f1b1283dd1e707765aa8ec4684b6b08a8f5b4735
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

	// post staff info
<<<<<<< HEAD
	const postStaffInfo = async (e) => {
		try {
			e.preventDefault();
			let postData = {
				staffType: selectedStaffTypeOption.value,
				firstName: formData.firstName,
				middleName: formData.middleName,
				lastName: formData.lastName,
				email: formData.email
			};
			const response = await axiosInstance.post('/staff', postData);
			const { data } = response;
			const { status } = data;
			if (status) {
				setFormData('');
				dispatch(getStaffMembers());
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeStaffForm();
			}
		} catch (error) {
			console.log(error);
=======
	const postStaffInfo = (e) => {
		e.preventDefault();
		let stId = uuid();
		let data = {
			id: stId,
			staffType: staffTypes,
			firstName: formData.firstName,
			middleName: formData.middleName,
			lastName: formData.lastName,
			email: formData.email,
		};
		if (formData) {
			db.collection("staffInfo")
				.add(data)
				.then((response) => {
					console.log("staffInfo", response);
					setFormData("");
					fetchStaffInfo();
					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					closeStaffForm();
				})
				.catch(console.error());
>>>>>>> f1b1283dd1e707765aa8ec4684b6b08a8f5b4735
		}
	};

	return (
		<>
			<div className="flex bg-white p-2">
				<div className="w-10/12">
					<div className="flex">
						<div className="w-2/12">
							<h5 className="text-xl font-medium mt-5 ml-5 text-primary">
								Staff Members
							</h5>
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
				<div className="w-1/12 mt-5">
					<div className="w-[210px]" onClick={openStaffForm}>
						<Button2 value={"Add Staff Member"} />
					</div>
				</div>
			</div>

			{addStaff ? (
				<div className="bg-white  shadow-lg rounded-md h-[393px] overflow-y-auto absolute w-[1000px] -ml-32 shadow-3xl border-2 border-gray3 ">
					<div className="p-3 bg-gray1 flex justify-between">
						<div>
							<p className="text-primary text-lg font-semibold">
								Add Staff Member
							</p>
						</div>
						<div>
							<p onClick={closeStaffForm} className="cursor-pointer">
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
<<<<<<< HEAD
							<div className="mt-14" onClick={postStaffInfo}>
=======
						</div>
					</div>
					<div className="p-3 bg-gray1 flex justify-between">
						<div onClick={closeStaffForm}>
							<ButtonSecondary value={"Close"} />
						</div>
						<div>
							<div onClick={postStaffInfo}>
>>>>>>> f1b1283dd1e707765aa8ec4684b6b08a8f5b4735
								<Button value={"Add Staff"} />
							</div>
						</div>
					</div>
<<<<<<< HEAD

=======
>>>>>>> f1b1283dd1e707765aa8ec4684b6b08a8f5b4735
				</div>
			) : null}
		</>
	);
}

export default StaffForm;
