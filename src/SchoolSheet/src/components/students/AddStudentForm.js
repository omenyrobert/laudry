import React, { useState, useEffect } from "react";
import Button from "../Button";
import InputField from "../InputField";
import InputSelect from "../InputSelect";
import Select from "react-select";
import { FaRegUserCircle, FaPhone } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from "../../store/schoolSheetSlices/schoolStore";



const AddStudentForm = (props) => {
	const dispatch = useDispatch();
	const [init] = useState(true)
	const navigate = useNavigate();

	const [gender, setGender] = useState("");
	const [studentType, setStudentType] = useState("");
	const [studentClass, setStudentClass] = useState("");
	const [studentHouse, setStudentHouse] = useState("");
	const [studentSection, setStudentSection] = useState("");
	const [feesCategory, setFeesCategory] = useState("");
	const [studentTypes, setStudentTypes] = useState([])
	const [studentClasses, setStudentClasses] = useState([])
	const [studentHouses, setStudentHouses] = useState([])
	const [streams, setStreams] = useState([])
	const [studentStream, setStudentStream] = useState("")

	const { sections } = useSelector((state) => state.schoolStore);

	const sectionOptions = [];

	sections.forEach((section) => {
		let newSection = {};
		newSection.value = section.id;
		newSection.label = section.section;
		sectionOptions.push(newSection);
	})


	useEffect(() => {
		dispatch(getSections());
		try {
			fetchStudentType()
			fetchSchoolClasses()
			fetchSchoolHouses()
			fetchStreams()
		} catch (error) {
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				icon: "error",
				title: "Oops...",
				text: "An Error Occured while trying to fetch data for your Form. Please Refresh Page",
			});
		}
	}, [init, dispatch])




	const fetchStudentType = () => {
		axiosInstance.get("/student-types")
			.then((response) => {
				console.log("response", response)
				const { payload } = response.data;

				const studenttypesArr = []
				for (let i = 0; i < payload.length; i++) {
					studenttypesArr.push({ label: payload[i].type, value: payload[i].type, ...payload[i] })
				}
				setStudentTypes(studenttypesArr)
			})
	}

	const fetchStreams = () => {
		axiosInstance.get("/streams")
			.then((response) => {
				const { payload } = response.data;
				const studentStreamsArr = []
				for (let i = 0; i < payload.length; i++) {
					studentStreamsArr.push({ label: payload[i].stream, value: payload[i].stream, ...payload[i] })
				}
				setStreams(studentStreamsArr)
			})
	}



	const fetchSchoolClasses = () => {
		axiosInstance.get("/class")
			.then((response) => {
				console.log("response", response)
				const { payload } = response.data;
				const studentClassesArr = []
				for (let i = 0; i < payload.length; i++) {
					studentClassesArr.push({ label: payload[i].class, value: payload[i].class, ...payload[i] })
				}
				setStudentClasses(studentClassesArr)
			})
	}

	const fetchSchoolHouses = () => {
		axiosInstance.get("/houses")
			.then((response) => {
				const { payload } = response.data;
				const studentHousesArr = []
				console.log("payload", payload)
				for (let i = 0; i < payload.length; i++) {
					studentHousesArr.push({ label: payload[i].house, value: payload[i].house, ...payload[i] })
				}
				setStudentHouses(studentHousesArr)
			})
	}


	// student info form data
	const [studentInfo, setStudentInfo] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		dateOfBirth: "",
		gender: "",
		nationality: "",
		residence: "",
		photo: "",
		nin: "",
		nationalId: "",
		fatherName: "",
		fatherContact: "",
		motherName: "",
		motherContact: "",
		studentType: "",
		studentSection: "",
		studentHouse: "",
		studentClass: "",
		feesCategory: "",
		studentStream: "",
	});

	const onChange = (e) => {
		setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
	};

	// post student info
	const postStudentInfo = (e) => {
		e.preventDefault();
		let data = {
			firstName: studentInfo.firstName,
			middleName: studentInfo.middleName,
			lastName: studentInfo.lastName,
			email: studentInfo.email,
			phoneNumber: studentInfo.phoneNumber,
			dateOfBirth: studentInfo.dateOfBirth,
			gender: gender.value,
			nationality: studentInfo.nationality,
			residence: studentInfo.residence,
			photo: studentInfo.photo,
			fatherName: studentInfo.fatherName,
			fatherContact: studentInfo.fatherContact,
			motherName: studentInfo.motherName,
			motherContact: studentInfo.motherContact,
			studentType: studentType.id,
			studentSection: studentSection.value,
			studentHouse: [studentHouse.id],
			studentClass: [studentClass.id],
			feesCategory: feesCategory.id,
			studentStream: [studentStream.id],
		};
		if (studentInfo) {


			axiosInstance.post("/students", data)
				.then((response) => {

					//fetchStudentInfo();
					// show alert
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
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					setStudentInfo("");
					navigate("/students")
				})
				.catch((error) => console.error(error));
		} else {
			// show alert
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				icon: "error",
				showConfirmButton: false,
				timer: 500,
			});
		}
	};

	return (
		<div className="bg-white h-[90vh] overflow-y-auto">
			<div className="flex bg-gray1 p-3 justify-between">
				<div>
					<p className="text-primary font-semibold text-md">Add Student</p>
				</div>
				<div>
					<Link to="/students">
						<p>Back</p>
					</Link>
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
							onChange={onChange}
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
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Middle Name"
							label="Middle Name"
							name="middleName"
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>

						<InputField
							type="text"
							placeholder="Enter Place Of Residence"
							label="Place Of Residence"
							name="residence"
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Last Name"
							label="Last Name"
							name="lastName"
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="email"
							placeholder="Enter Email Address"
							label="Email"
							name="email"
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="date"
							label="Date Of Birth"
							name="dateOfBirth"
							onChange={onChange}
						/>

						<InputField
							type="text"
							placeholder="Enter Your Phone Number"
							label="Phone Number"
							name="phoneNumber"
							onChange={onChange}
							icon={<FaPhone className="w-3 -ml-7 mt-3" />}
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
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Father's Contact"
							label="Father's Contacts"
							name="fatherContact"
							onChange={onChange}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter Mother's Name"
							label=" Mother's Name"
							name="motherName"
							onChange={onChange}
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 p-2">
						<InputField
							type="text"
							placeholder="Enter  Mother's Contacts"
							label=" Mother's Cotacts"
							name="motherContact"
							onChange={onChange}
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
							name="studentType"
							onChange={setStudentType}
							options={studentTypes}
						/>
						<br />
						<label className="text-gray4 mt-2">Fees Category </label>
						<Select
							placeholder={"Select Fees Category "}
							defaultValue={feesCategory}
							name="feesCategory"
							onChange={setFeesCategory}
							options={studentTypes}
						/>
					</div>
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">Section </label>
						<Select
							placeholder={"Select Student Section"}
							defaultValue={studentSection}
							name="studentSection"
							onChange={setStudentSection}
							options={sectionOptions}
						/>
						<br />
						{/* <label className='text-gray4 mt-2'>House/Group</label>
                        <Select
                            placeholder={'Select House/Group'}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={houses}
                        /> */}
					</div>
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">House/Group</label>
						<Select
							placeholder={"Select House/Group"}
							defaultValue={studentHouse}
							name="studentHouse"
							onChange={setStudentHouse}
							options={studentHouses}
						/>
					</div>
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">Stream</label>
						<Select
							placeholder={"Select Stream"}
							defaultValue={studentStream}
							name="studentStream"
							onChange={setStudentStream}
							options={streams}
						/>
					</div>
					<div className="w-1/4 p-2">
						<label className="text-gray4 mt-2">Class</label>

						<Select
							placeholder={"Select Class"}
							defaultValue={studentClass}
							name="studentClass"
							onChange={setStudentClass}
							options={studentClasses}
						/>
						<br />
						<br />
					</div>
				</div>
			</div>
			<div className="flex justify-between p-2 ">
				<div></div>
				<div>
					<div onClick={postStudentInfo}>
						<Button value={"Add Student"} />
					</div>
				</div>
			</div>
			<br />
		</div>
	);
}

export default AddStudentForm;
