import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import InputSelect from "../InputSelect";
import Button from "../Button";
import Select from "react-select";
import { FaRegUserCircle, FaPhone } from "react-icons/fa";
import Localbase from "localbase";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axiosInstance from "../../axios-instance"

let db = new Localbase("db");

function EditStudentsForm(props) {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const studentInfoEdit = searchParams.get("student");

	const { closeEditData, studentId, fetchStudentInfo, handleClickAllStudents } =
		props;

	const [firstName, setFirstName] = useState(studentInfoEdit.firstName);
	const [middleName, setMiddleName] = useState(studentInfoEdit.middleName);
	const [lastName, setLastName] = useState(studentInfoEdit.lastName);
	const [email, setEmail] = useState(studentInfoEdit.email);
	const [phoneNumber, setPhoneNumber] = useState(studentInfoEdit.phoneNumber);
	const [dateOfBirth, setDateOfBirth] = useState(studentInfoEdit.dateOfBirth);
	const [fatherName, setFatherName] = useState(studentInfoEdit.fatherName);
	const [fatherContact, setFatherContact] = useState(
		studentInfoEdit.fatherContact
	);
	const [motherName, setMotherName] = useState(studentInfoEdit.motherName);
	const [motherContact, setMotherContact] = useState(
		studentInfoEdit.motherContact
	);
	const [nationality, setNationality] = useState(studentInfoEdit.nationality);
	const [residence, setResidence] = useState(studentInfoEdit.residence);
	const [nin, setNin] = useState(studentInfoEdit.nin);
	const [photo, setPhoto] = useState(null);
	const [nationalId, setNationalId] = useState(studentInfoEdit.nationalId);

	const [gender, setGender] = useState(studentInfoEdit.gender);
	const [studentType, setStudentType] = useState(studentInfoEdit.studentType);
	const [studentClass, setStudentClass] = useState(
		studentInfoEdit.studentClass
	);
	const [studentHouse, setStudentHouse] = useState(
		studentInfoEdit.studentHouse
	);
	const [studentSection, setStudentSection] = useState(
		studentInfoEdit.studentSection
	);
	const [feesCategory, setFeesCategory] = useState(
		studentInfoEdit.feesCategory
	);

	const studentTypes = [
		{
			label: "Normal",
			value: "Normal",
		},
		{
			label: "Ugandan",
			value: "Ugandan",
		},
		{
			label: "International",
			value: "International",
		},
	];

	const houses = [
		{
			label: "Lion",
			value: "Lion",
		},
		{
			label: "Rabbit",
			value: "Rabit",
		},
		{
			label: "Elephant",
			value: "Elephant",
		},
	];

	const sections = [
		{
			label: "Boarding",
			value: "Boarding",
		},
		{
			label: "day",
			value: "Day",
		},
		{
			label: "Hostel",
			value: "Hostel",
		},
	];

	const classes = [
		{
			label: "s1 green",
			value: "s1 green",
		},
		{
			label: "s2 blue",
			value: "s2 blue",
		},
		{
			label: "s3 yellow",
			value: "s3 yellow",
		},
	];
	/** 
	* Brief description of the function here.
	* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	* @param {Event} e - 
	*/
	function selectPhoto(e) {
		/** @type  */
		const { files } = e.target;
		if (files && files[0]) {
			setPhoto(files[0]);
		}
	}

	const updateStudentInfo = () => {
		let data = {
			id: studentId,
			firstName: firstName,
			middleName: middleName,
			lastName: lastName,
			email: email,
			phoneNumber: phoneNumber,
			dateOfBirth: dateOfBirth,
			gender: gender,
			nationality: nationality,
			residence: residence,
			fatherName: fatherName,
			fatherContact: fatherContact,
			motherName: motherName,
			motherContact: motherContact,
			studentType: studentType,
			studentSection: studentSection,
			studentHouse: studentHouse,
			studentClass: studentClass,
			feesCategory: feesCategory,
		};

		const formdata = new FormData();
		// loop through the data object and get key and value
		for (const key in data) {
			formdata.append(key, data[key]);
		}

		if (photo) {
			formdata.append("photo", photo);
		}

		axiosInstance.put(`students/edit`, formdata, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
			.then((response) => {
				// fetch after
				fetchStudentInfo();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
				handleClickAllStudents();
			})
			.catch((error) => {
				console.log(error);
			})

	};

	return (
		<div className="bg-white h-full">
			<div className="flex bg-gray1 p-3 justify-between">
				<div>
					<p className="text-primary font-semibold text-md">Update Student</p>
				</div>
				<div>
					<Link to="/students">Back</Link>
				</div>
			</div>
			<div>
				<p className="text-secondary text-lg font-semibold ml-5 mt-2">
					Student Identity
				</p>
				<div className="flex px-2 -mt-5">
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter First Name"
							label="First Name"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
						<InputSelect
							type="text"
							placeholder="Select Gender"
							label="Gender"
							name="gender"
							selectedOption={gender}
							onChange={setGender}
						/>

						<InputField
							type="text"
							placeholder="Enter Nationality"
							label="Nationality"
							name="nationality"
							onChange={(e) => setNationality(e.target.value)}
							value={nationality}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Middle Name"
							label="Middle Name"
							name="middleName"
							onChange={(e) => setMiddleName(e.target.value)}
							value={middleName}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="file"
							label="Photo"
							onChange={selectPhoto}
						/>
						<InputField
							type="text"
							placeholder="Enter Place Of Residence"
							label="Place Of Residence"
							name="residence"
							onChange={(e) => setResidence(e.target.value)}
							value={residence}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Last Name"
							label="Last Name"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="email"
							placeholder="Enter Email Address"
							label="Email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="text"
							placeholder="Enter National Id"
							label="NIN number"
							name="nin"
							onChange={(e) => setNin(e.target.value)}
							value={nin}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="date"
							label="Date Of Birth"
							name="dateOfBirth"
							onChange={(e) => setDateOfBirth(e.target.value)}
							value={dateOfBirth}
						/>
						<InputField
							type="text"
							placeholder="Enter Your Phone Number"
							label="Phone Number"
							name="phoneNumber"
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phoneNumber}
							icon={<FaPhone className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="file"
							placeholder="Enter Email Address"
							label="National Id Copy"
							name="nationalId"
							onChange={(e) => setNationalId(e.target.value)}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
				</div>
				<hr className="text-gray2" />
				<p className="text-secondary text-lg font-semibold ml-5 mt-5">
					Student Biography
				</p>
				<div className="flex px-2 -mt-5">
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Father's Name"
							label="Father's Name"
							name="fatherName"
							onChange={(e) => setFatherName(e.target.value)}
							value={fatherName}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Father's Contacts"
							label="Father's Contact"
							onChange={(e) => setFatherContact(e.target.value)}
							value={fatherContact}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Mother's Name"
							label=" Mother's Name"
							name="motherName"
							onChange={(e) => setMotherName(e.target.value)}
							value={motherName}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter  Mother's Contacts"
							label=" Mother's Contact"
							onChange={(e) => setMotherContact(e.target.value)}
							value={motherContact}
						/>
					</div>
				</div>
				<p className="text-secondary text-lg font-semibold ml-5 mt-5">
					Academic Section
				</p>
				<div className="flex px-2 -mt-1">
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">Student Type</label>
						<Select
							placeholder={"Select Student Type"}
							defaultValue={studentType}
							onChange={setStudentType}
							options={studentTypes}
						/>
						<br />
						<label className="text-gray4 mt-2">Fees Category </label>
						<Select
							placeholder={"Select Fees Category "}
							defaultValue={feesCategory}
							onChange={setFeesCategory}
							options={studentTypes}
						/>
					</div>
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">Section </label>
						<Select
							placeholder={"Select Student Section"}
							defaultValue={studentSection}
							onChange={setStudentSection}
							options={sections}
						/>
						<br />
						<label className="text-gray4 mt-2">House/Group</label>
						<Select
							placeholder={"Select House/Group"}
							defaultValue={studentHouse}
							onChange={setStudentHouse}
							options={houses}
						/>
					</div>
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">Class</label>

						<Select
							placeholder={"Select House/Group"}
							defaultValue={studentClass}
							onChange={setStudentClass}
							options={classes}
						/>
						<br />
						<br />
					</div>
				</div>
			</div>
			<div className="flex justify-between p-2">
				<div></div>
				<div onClick={updateStudentInfo}>
					<Button value={"Update Student"} />
				</div>
			</div>
		</div>
	);
}

export default EditStudentsForm;
