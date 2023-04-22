import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import InputField from "../InputField";
import Select from "react-select";
import Localbase from "localbase";
import { FaPen } from "react-icons/fa";
import InputSelect from "../InputSelect";
import Button from "../Button";

let db = new Localbase("db");

function BasicInfo() {
	const [staffType, setStaffType] = useState("staffType");
	const [firstName, setFirstName] = useState("firstName");
	const [middleName, setMiddleName] = useState("middleName");
	const [lastName, setLastName] = useState("lastName");
	const [phoneNumbers, setPhoneNumbers] = useState("phoneNumbers");
	const [email, setEmail] = useState("email");
	const [nationality, setNationality] = useState("nationality");
	const [residence, setResidence] = useState("residence");
	const [dateOfBirth, setDateOfBirth] = useState("dateOfBirth");
	const [maritalStatus, setMaritalStatus] = useState("maritalStatus");
	const [gender, setGender] = useState("gender");

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
		db.collection("staffType")
			.get()
			.then((staffType) => {
				const newData = staffType.map((res) => ({
					value: res.staffType,
					label: res.staffType,
				}));
				setOptions(newData);
			});
	};
	useEffect(() => {
		fetchStaffTypes();
	}, []);
	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-2xl text-primary font-bold mt-5">Omeny Robert</p>
					<p className="text-gray5">Deputy</p>
				</div>
				<div
					onClick={openBasic}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Edit Basic Info
				</div>
				{showBasic ? (
					<div className="border absolute z-50 -mt-[200px] border-gray3 bg-white shadow h-[650px] rounded w-[700px] overflow-y-auto">
						<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
							<div>
								<p>Edit Basic Info</p>
							</div>
							<div>
								<p className="cursor-pointer" onClick={closeBasic}>X</p>
							</div>
						</div>
						<div className="flex">
							<div className="w-1/2 p-3">
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
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Enter Middle Name"
									label="Middle Name"
									name="middleName"
									onChange={(e) => setMiddleName(e.target.value)}
									value={middleName}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Enter Last Name"
									label="Last Name"
									name="lastName"
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
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
							</div>
							<div className="w-1/2 p-3 -mt-5">
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
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
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
								<div className="mt-14">
									<Button value={"Update Basic Info"} />
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>

			<hr className="my-5 text-gray2" />
			<div className="flex justify-between">
				<div>
					<p className="text-gray5 font-light">rob@mail.com</p>
					<p className="text-gray5 font-light mt-2">Male</p>
					<p className="text-gray5 font-light mt-2">Single</p>
					<p className="text-gray5 font-light mt-2">07-09-1996 - 27yrs</p>
				</div>
				<div>
					<p className="font-light">Location: Kira</p>
					<p className="text-gray5 font-light">Kira</p>
					<p className="mt-2">
						Contacts
					</p>
					<p className="text-gray5 font-light">
						0798776, 07876767
					</p>
					<p className="mt-2">Nationality</p>
					<p className="text-gray5 font-light">Ugandan</p>
				</div>
			</div>

			<br />
		</>
	);
}
export default BasicInfo;
