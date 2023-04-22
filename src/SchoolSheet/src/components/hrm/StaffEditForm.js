import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../Button";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Localbase from "localbase";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { BsCameraFill, BsFillPencilFill } from "react-icons/bs";
import BasicInfo from "./BasicInfo";

let db = new Localbase("db");

function StaffEditForm(props) {
	const { closeEditData, staffId, fetchStaffInfo, handleClickAllStaff } = props;

	const staffInfoEdit = {
		classes: [
			{
				id: 1,
				sclass: "Primary 1",
			},
			{
				id: 2,
				sclass: "Primary 2",
			},
			{
				id: 3,
				sclass: "Primary 3",
			},
		],
		subjects: [
			{
				id: 1,
				subjectName: "Math",
			},
			{
				id: 2,
				sclass: "SST",
			},
			{
				id: 3,
				sclass: "Nursery",
			},
		],
	};

	const [passportPhoto, setPassportPhoto] = useState("passportPhoto");
	const [qualification, setQualification] = useState("qualification");
	const [institution, setInstitution] = useState("institution");
	const [collegeCert, setCollegeCert] = useState("collegeCert");
	const [toDate, setToDate] = useState("toDate");
	const [nationalId, setNationalId] = useState("nationalId");

	const [fromDate, setFromDate] = useState("fromDate");
	const [otherDocs, setOtherDocs] = useState("otherDocs");
	const [prevSchool, setPrevSchool] = useState("prevSchool");
	const [grossSalary, setGrossSalary] = useState("grossSalary");
	const [specialSkills, setSpecialSkills] = useState("specialSkills");
	const [attendanceTime, setAttendanceTime] = useState("attendanceTime");
	const [workExperience, setWorkExperience] = useState("workExperience");
	const [nextOfKin1, setNextOfKin1] = useState("nextOfKin1");
	const [nextOfKin1Name, setNextOfKin1Name] = useState("nextOfKin1Name");
	const [nextOfKin1Contact, setNextOfKin1Contact] =
		useState("nextOfKin1Contact");
	const [nextOfKin2, setNextOfKin2] = useState("nextOfKin2");
	const [nextOfKin2Name, setNextOfKin2Name] = useState("nextOfKin2Name");
	const [nextOfKin2Contact, setNextOfKin2Contact] =
		useState("nextOfKin2Contact");

	// fetch stypes

	const [classesData, setClassesData] = useState([]);
	const fetchClasses = () => {
		db.collection("classes")
			.get()
			.then((classes) => {
				setClassesData(classes);
			});
	};
	const [subjectData, setSubjectData] = useState();
	const fetchSubject = () => {
		db.collection("subjects")
			.get()
			.then((subject) => {
				setSubjectData(subject);
			});
	};
	// fetching
	useEffect(() => {
		fetchClasses();
		fetchSubject();
	}, []);

	const [selectedClass, setSelectedClass] = useState(...staffInfoEdit.classes);
	function handleCheckboxChangeEdit(event) {
		const classroomName = event.target.value;
		const isChecked = event.target.checked;
		// Update selectedClass array with selected values
		// there's an issue with this functions
		if (!isChecked) {
			setSelectedClass(selectedClass.filter((name) => name !== classroomName));
		} else {
			setSelectedClass([...selectedClass, classroomName]);
		}
	}

	const [selectedSubject, setSelectedSubject] = useState(
		...staffInfoEdit.subjects
	);
	function handleSubjectChangeEdit(event) {
		const subjectName = event.target.value;
		// setSelectedSubject(subjectName);
		const isChecked = event.target.checked;
		// Update selectedSubject array with selected values
		if (isChecked) {
			setSelectedSubject([...selectedSubject, subjectName]);
		} else {
			setSelectedSubject(
				selectedSubject.filter((name) => name !== subjectName)
			);
		}
	}

	const updateStaffInfo = () => {
		let data = {
			passportPhoto: passportPhoto,
			nationalId: nationalId,
			qualification: qualification,
			institution: institution,
			collegeCert: collegeCert,
			toDate: toDate,
			fromDate: fromDate,
			otherDocs: otherDocs,
			prevSchool: prevSchool,
			grossSalary: grossSalary,
			specialSkills: specialSkills,
			attendanceTime: attendanceTime,
			workExperience: workExperience,
			classes: [...selectedClass],
			subjects: [...selectedSubject],
			nextOfKin1: nextOfKin1,
			nextOfKin1Name: nextOfKin1Name,
			nextOfKin1Contact: nextOfKin1Contact,
			nextOfKin2: nextOfKin2,
			nextOfKin2Name: nextOfKin2Name,
			nextOfKin2Contact: nextOfKin2Contact,
		};
		db.collection("staffInfo")
			.doc({ id: staffId })
			.update(data)
			.then((response) => {
				// fetch after
				fetchStaffInfo();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
				handleClickAllStaff();
			});
	};

	return (
		<>
			<div className="bg-white h-[90vh] overflow-y-auto  ">
				<div className="p-3 bg-gray1 flex justify-between">
					<div>
						<p className="text-primary text-lg font-semibold">
							Staff Member Info
						</p>
					</div>
					<div>
						<p
							onClick={closeEditData}
							className="font-semibold text-primary cursor-pointer"
						>
							Back
						</p>
					</div>
				</div>
				<div className="flex p-3">
					<div className="w-1/3 p-2">
						<div className="flex justify-center">
							<div className="w-1/2 flex">
								<div>
									<img
										src="avata.jpeg"
										className="w-full object-cover rounded-full  border border-gray1 shadow"
									/>
								</div>
								<div className="relative">
									<div className="bg-primary w-8 rounded-full h-8  absolute -ml-10 mt-10">
										<BsCameraFill className="w-4 m-2 text-center text-white h-4" />
									</div>
								</div>
							</div>
						</div>

						<BasicInfo />

						<br />
					</div>

					<div className="w-1/3 p-2">
						
					</div>

					<div className="w-1/3 p-2">
						<p className="text-secondary text-lg font-semibold ml-5 mt-5">
							Experience
						</p>

						<InputField
							type="text"
							label="Passport Photo"
							name="passportPhoto"
							onChange={(e) => setPassportPhoto(e.target.value)}
							value={passportPhoto}
						/>
						<InputField
							type="text"
							label="National Id Copy"
							name="nationalId"
							onChange={(e) => setNationalId(e.target.value)}
							value={nationalId}
						/>
					</div>
				</div>
				<hr className="text-gray2" />

				<div className="flex p-3">
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter Qualification"
							label="Qualification"
							name="qualification"
							onChange={(e) => setQualification(e.target.value)}
							value={qualification}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="date"
							label="To Date"
							name="toDate"
							onChange={(e) => setToDate(e.target.value)}
							value={toDate}
						/>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter Institution"
							label="Institution"
							name="institution"
							onChange={(e) => setInstitution(e.target.value)}
							value={institution}
						/>

						<InputField
							type="date"
							label="From Date"
							name="fromDate"
							onChange={(e) => setFromDate(e.target.value)}
							value={fromDate}
						/>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							label="College Certificate Copy"
							name="collegeCert"
							onChange={(e) => setCollegeCert(e.target.value)}
							value={collegeCert}
						/>
						<InputField
							type="text"
							label="Other Documents"
							name="otherDocs"
							onChange={(e) => setOtherDocs(e.target.value)}
							value={otherDocs}
						/>
					</div>
				</div>
				<p className="text-secondary text-lg font-semibold ml-5 mt-5">
					Experience
				</p>
				<hr className="text-gray2" />
				<div className="flex p-3">
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter Previous School"
							label="Previous School"
							onChange={(e) => setPrevSchool(e.target.value)}
							value={prevSchool}
						/>
						<InputField
							type="text"
							placeholder="Select Attedance Time"
							label="Attedance Time"
							name="attendanceTime"
							onChange={(e) => setAttendanceTime(e.target.value)}
							value={attendanceTime}
						/>
						<br />
						<label>Classes can Teach</label>
						<div className="h-32 overflow-y-auto">
							{classesData?.map((classroom) => (
								<div key={classroom.id} className="flex gap-2">
									<input
										type="checkbox"
										value={classroom.sclass}
										checked={selectedClass === classroom.sclass}
										onChange={handleCheckboxChangeEdit}
									/>
									<label className="text-sm text-gray5">
										{classroom.sclass}
									</label>
								</div>
							))}
						</div>
						<br />
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="number"
							placeholder="Enter Gross Salary"
							label="Gross Salary"
							name="grossSalary"
							onChange={(e) => setGrossSalary(e.target.value)}
							value={grossSalary}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
						<InputField
							type="text"
							placeholder="Enter Teaching Experience"
							label="Teaching Experience"
							name="workExperience"
							onChange={(e) => setWorkExperience(e.target.value)}
							value={workExperience}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
						<br />
						<label>Subjects can Teach</label>
						<div className="h-32 overflow-y-auto">
							{subjectData?.map((subject) => (
								<div key={subject.id} className="flex gap-2">
									<input
										type="checkbox"
										value={subject.subject}
										checked={selectedSubject === subject.subject}
										onChange={handleSubjectChangeEdit}
									/>
									<label className="text-sm text-gray5">
										{subject.subject}
									</label>
								</div>
							))}
						</div>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter Special Skills"
							label="Special Skills"
							name="specialSkills"
							onChange={(e) => setSpecialSkills(e.target.value)}
							value={specialSkills}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
				</div>
				<hr className="text-gray2" />
				<p className="text-secondary text-lg font-semibold ml-5">Next Of Kin</p>
				<div className="flex p-3">
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter Next Of Kin Type 1"
							label="Next Of Kin Type 1"
							name="nextOfKin1"
							onChange={(e) => setNextOfKin1(e.target.value)}
							value={nextOfKin1}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter NOK Name 1"
							label="NOK Name 1"
							name="nextOfKin1Name"
							onChange={(e) => setNextOfKin1Name(e.target.value)}
							value={nextOfKin1Name}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter NOK Contacts 1"
							label="NOK Contacts 1"
							name="nextOfKin1Contact"
							onChange={(e) => setNextOfKin1Contact(e.target.value)}
							value={nextOfKin1Contact}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
				</div>
				<div className="flex p-3">
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter Next Of Kin Type 2"
							label="Next Of Kin Type 2"
							name="nextOfKin2"
							onChange={(e) => setNextOfKin2(e.target.value)}
							value={nextOfKin2}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter NOK Name 2"
							label="NOK Name 2"
							name="nextOfKin2Name"
							onChange={(e) => setNextOfKin2Name(e.target.value)}
							value={nextOfKin2Name}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/3 p-2">
						<InputField
							type="text"
							placeholder="Enter NOK Contacts 2"
							label="NOK Contacts 2"
							name="nextOfKin2Contact"
							onChange={(e) => setNextOfKin2Contact(e.target.value)}
							value={nextOfKin2Contact}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
						<div onClick={updateStaffInfo}>
							<Button value={"Update Staff"} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default StaffEditForm;
