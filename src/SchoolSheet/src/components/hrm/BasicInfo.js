import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import InputField from "../InputField";
import Select from "react-select";
import { FaPen } from "react-icons/fa";
import InputSelect from "../InputSelect";
import Button from "../Button";
import axiosInstance from "../../axios-instance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Loader from "../Loader";
import ButtonLoader from "../ButtonLoader";
import ButtonSecondary from "../ButtonSecondary"

function BasicInfo({ staffInfo, staffId, fetchStaffInfo }) {
	const [staffType, setStaffType] = useState(staffInfo.staffType);
	const [firstName, setFirstName] = useState(staffInfo.first_name);
	const [middleName, setMiddleName] = useState(staffInfo.middle_name);
	const [lastName, setLastName] = useState(staffInfo.last_name);
	const [phoneNumbers, setPhoneNumbers] = useState(staffInfo.phone_number);
	const [email, setEmail] = useState(staffInfo.email);
	const [nationality, setNationality] = useState(staffInfo.nationality);
	const [residence, setResidence] = useState(staffInfo.address);
	const [dateOfBirth, setDateOfBirth] = useState(
		new Date(staffInfo.date_of_birth)
	);
	const [maritalStatus, setMaritalStatus] = useState(staffInfo.marital_status);
	const [gender, setGender] = useState(staffInfo.gender);

	useEffect(() => {
		if (staffInfo) {
			setStaffType({
				value: staffInfo?.staffType?.type,
				label: staffInfo?.staffType?.type,
				...staffInfo.staffType,
			});
			setFirstName(staffInfo.first_name);
			setMiddleName(staffInfo.middle_name);
			setLastName(staffInfo.last_name);
			setPhoneNumbers(staffInfo.phone_number);
			setEmail(staffInfo.email);
			setNationality(staffInfo.nationality);
			setResidence(staffInfo.address);
			setDateOfBirth(new Date(staffInfo.date_of_birth));
			setMaritalStatus(staffInfo.marital_status);
			setGender(staffInfo.gender);
		}
	}, [staffInfo]);

	const maritalOptions = [
		{ value: "Single", label: "Single" },
		{ value: "Devorced", label: "Devorced" },
		{ value: "Married", label: "Married" },
	];

	const [showBasic, setShowBasic] = useState(false);
	const openBasic = () => {
		setShowBasic(true);
	};
	const closeBasic = () => {
		setShowBasic(false);
	};

	const [options, setOptions] = useState();
	const fetchStaffTypes = () => {
		axiosInstance
			.get("/staffTypes")
			.then((res) => {
				const { status, payload } = res.data;
				if (status) {
					const newDatas = payload.map((data) => ({
						value: data.id,
						label: data.type,
						...data,
					}));
					setOptions(newDatas);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchStaffTypes();
	}, []);

	const [updating, setUpdating] = useState(false);

	const updateBasicInfo = async () => {
		try {
			const data = {
				id: staffId,
				staff_type: staffType?.id,
				first_name: firstName,
				middle_name: middleName,
				last_name: lastName,
				phone_number: phoneNumbers,
				email: email,
				address: residence,
				nationality,
				date_of_birth: dateOfBirth,
				marital_status: maritalStatus?.value,
			};
			setUpdating(true);
			let res = await axiosInstance.put(`/staff/profile/${staffId}`, data);
			const { status, payload } = res.data;
			if (status) {
				setUpdating(false);
				fetchStaffInfo();
				closeBasic();
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: payload,
				});
				setUpdating(false);
			}
		} catch (error) { }
	};
	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-2xl text-primary font-bold mt-5">
						{staffInfo?.first_name} {staffInfo?.middle_name}{" "}
						{staffInfo?.last_name}
					</p>
					<p className="text-gray5">{staffInfo?.staff_type?.type}</p>
				</div>
				<div
					onClick={openBasic}
					className="text-sm  flex text-primary cursor-pointer  p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Edit Basic Info
				</div>
				{showBasic ? (
					<div className=" bg-black/50 flex absolute h-full right-0 z-50 top-0 left-0">
						<div onClick={closeBasic} className="w-2/12"></div>
						<div className="w-8/12 mt-[2vw]">
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div>
									<p>Edit Basic Info</p>
								</div>
								<div>
									<p className="cursor-pointer" onClick={closeBasic}>
										X
									</p>
								</div>
							</div>
							<div className="flex bg-white">
								<div className="w-1/3 p-2">
									<label className="text-gray4">Staff Type</label>
									<Select
										placeholder={"Select Staff Type"}
										defaultValue={staffType}
										onChange={setStaffType}
										className="mt-1"
										options={options}
									/>
									<InputField
										type="text"
										placeholder="Enter First Name"
										label="First Name"
										name="firstName"
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
									/>
									<InputField
										type="text"
										placeholder="Enter Middle Name"
										label="Middle Name"
										name="middleName"
										onChange={(e) => setMiddleName(e.target.value)}
										value={middleName}
									/>
									<InputField
										type="text"
										placeholder="Enter Last Name"
										label="Last Name"
										name="lastName"
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
									/>

								</div>
								<div className="w-1/3 p-2 -mt-5">
									<InputField
										type="text"
										placeholder="eg 0700000, 0780000000"
										label="Contacts"
										name="phoneNumbers"
										onChange={(e) => setPhoneNumbers(e.target.value)}
										value={phoneNumbers}
									/>
									<InputField
										type="date"
										label="Date Of Birth"
										name="dateOfBirth"
										onChange={(e) => setDateOfBirth(e.target.value)}
										value={dateOfBirth}
									/>
									<InputField
										type="email"
										placeholder="Email Address"
										label="Email Address"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
									/>
									<InputField
										type="text"
										placeholder="Enter Place of Residence"
										label="Place of Residence"
										name="residence"
										onChange={(e) => setResidence(e.target.value)}
										value={residence}
									/>
								</div>
								<div className="w-1/3 p-2 -mt-5">

									<InputField
										type="text"
										placeholder="Enter Nationality"
										label="Nationality"
										name="nationality"
										onChange={(e) => setNationality(e.target.value)}
										value={nationality}
									/>
									<label className="text-gray4">Marital Status</label>
									<Select
										placeholder={"Select Marital Status"}
										defaultValue={maritalStatus}
										onChange={setMaritalStatus}
										className="mt-1"
										options={maritalOptions}
									/>
									<br />

									<InputSelect
										selectedOption={gender}
										onChange={setGender}
										className="mt-1"
									/>

								</div>
							</div>
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div onClick={closeBasic}>
									<ButtonSecondary value={"Close"} />
								</div>
								<div>
									<div className="w-32">
										{updating ? (
											<ButtonLoader />
										) : (
											<div onClick={updateBasicInfo} className=" w-auto">
												<Button value={"Update "} />
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div onClick={closeBasic} className="w-2/12"></div>
					</div>
				) : null}
			</div>

			<hr className="my-5 text-gray2" />
			<div className="flex justify-between">
				<div>
					<p className="text-gray5 font-light">{staffInfo?.email}</p>
					<p className="text-gray5 font-light mt-2">{staffInfo?.gender}</p>
					<p className="text-gray5 font-light mt-2">
						{staffInfo?.marital_status}
					</p>
					<p className="text-gray5 font-light mt-2">
						{new Date(staffInfo?.date_of_birth).toDateString()} -
						{new Date().getFullYear() -
							new Date(staffInfo?.date_of_birth).getFullYear()}{" "}
						years
					</p>
				</div>
				<div>
					<p className="font-light">Location:</p>
					<p className="text-gray5 font-light">{staffInfo?.address}</p>
					<p className="mt-2">Contacts</p>
					<p className="text-gray5 font-light">{staffInfo?.phone_number}</p>
					<p className="mt-2">Nationality</p>
					<p className="text-gray5 font-light">{staffInfo?.nationality}</p>
				</div>
			</div>

			<br />
		</>
	);
}
export default BasicInfo;
