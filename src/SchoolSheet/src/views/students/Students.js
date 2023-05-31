import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import StudentsTable from "../../components/students/studentsTable";
import EditStudentsForm from "../../components/students/EditStudentsForm";
import ShowStudentsForm from "../../components/students/ShowStudentsForm";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";
import Localbase from "localbase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button2 from "../../components/Button2";

let db = new Localbase("db");
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
	{},
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
	{},
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
	{},
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
	{},
];

function Students() {
	const [editData, setEditData] = useState(false);
	const [showData, setShowData] = useState(false);

	const [studentData, setStudentData] = useState([]);
	const [studentInfoEdit, setStudentInfoEdit] = useState();
	const [studentId, setStudentId] = useState("");
	const [studentInfoShow, setStudentInfoShow] = useState([]);

	const [SearchAllStudents, setSearchAllStudents] = useState(false);
	const [search, setSearch] = useState(false);

	// fetch student info
	const fetchStudentInfo = () => {
		db.collection("studentInfo")
			.get()
			.then((student) => {
				const newData = student;
				setStudentData(newData);
			});
	};

	useEffect(() => {
		fetchStudentInfo();
	}, []);

	//deleting student
	const deleteStudentInfo = (student) => {
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
				db.collection("studentInfo")
					.doc({ id: student.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchStudentInfo();

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

	const handleSearch = () => {
		setSearch(true);
	};

	const handleClickSearchAllStudents = () => {
		setSearchAllStudents(true);
	};

	const handleClickAllStudents = () => {
		setSearch(false);
		setSearchAllStudents(false);
	};



	const closeEditData = () => {
		setEditData(false);
	};

	const openEditData = (student) => {
		setEditData(true);
		setStudentInfoEdit(student);
		setStudentId(student.id);
	};

	const closeShowData = () => {
		setShowData(false);
	};

	const openShowData = (student) => {
		setShowData(true);
		setStudentInfoShow(student);
	};

	// search by name
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const SearchStudents = (e) => {
		e.preventDefault();
		setSearchResults(
			studentData?.filter(
				(student) =>
					student.lastName.toLowerCase().includes(query.toLowerCase()) ||
					student.firstName.toLowerCase().includes(query.toLowerCase()) ||
					student.middleName.toLowerCase().includes(query.toLowerCase())
			)
		);
		setQuery("");
	};

	// search by class
	const [queryClass, setQueryClass] = useState({});
	const [searchClassResults, setClassSearchResults] = useState([]);
	const searchStudentsByClass = () => {
		setClassSearchResults(
			studentData?.filter(
				(student) =>
					student?.studentClass.value
						.toLowerCase()
						.includes(queryClass?.value.toLowerCase()) ||
					student?.studentType.value
						.toLowerCase()
						.includes(queryClass?.value.toLowerCase()) ||
					student?.studentSection.value
						.toLowerCase()
						.includes(queryClass?.value.toLowerCase()) ||
					student?.studentHouse.value
						.toLowerCase()
						.includes(queryClass?.value.toLowerCase())
			)
		);
		setQueryClass({});
	};

	return (
		<div className="h-screen overflow-y-auto mt-2 w-full">
			<h1 className="text-secondary font-semibold text-2xl ml-3">Students</h1>
			<div className="rounded-md shadow-md h-screen overflow-y-auto p-2">
				<div className="flex justify-between w-full bg-white p-5 rounded-md shadow-lg">
					<div className="flex w-42">

						<Link to="/addStudentForm">
							<Button2 value={"Student"} />
						</Link>
					</div>
					<div className="w-2/12 -mt-5">
						<form
							onSubmit={(e) => {
								handleClickSearchAllStudents();
								SearchStudents(e);
							}}
						>
							<InputField
								type="text"
								placeholder="Search For Student ..."
								name="lastName"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
							/>
						</form>
					</div>
					<div className="w-8/12 flex ml-2">
						<div className="ml-2 w-1/5">
							<Select
								placeholder={"Select class"}
								className="text-sm"
								onChange={setQueryClass}
								options={classes}
							/>
						</div>
						<div className="ml-2 w-1/5">
							<Select
								placeholder={"Student Type"}
								className="text-sm"
								onChange={setQueryClass}
								options={studentTypes}
							/>
						</div>
						<div className="ml-2 w-1/5">
							<Select
								placeholder={"Sections"}
								className="text-sm"
								onChange={setQueryClass}
								options={sections}
							/>
						</div>
						<div className="ml-2 w-1/5">
							<Select
								placeholder={"Student House"}
								className="text-sm"
								onChange={setQueryClass}
								options={houses}
							/>
						</div>
						<div
							className="ml-2 w-1/5"
							onClick={() => {
								handleSearch();
								searchStudentsByClass();
							}}
						>
							<Button value={"Filter"} />
						</div>
					</div>
				</div>
				{editData ? (
					<EditStudentsForm
						closeEditData={closeEditData}
						studentId={studentId}
						studentInfoEdit={studentInfoEdit}
						fetchStudentInfo={fetchStudentInfo}
						handleClickAllStudents={handleClickAllStudents}
					/>
				) : null}

				<StudentsTable
					openEditData={openEditData}
					openShowData={openShowData}
					deleteStudentInfo={deleteStudentInfo}
					studentData={studentData}
				/>

				{SearchAllStudents ? (
					<StudentsTable
						openEditData={openEditData}
						openShowData={openShowData}
						deleteStudentInfo={deleteStudentInfo}
						studentData={searchResults}
					/>
				) : null}
				{search ? (
					<StudentsTable
						openEditData={openEditData}
						openShowData={openShowData}
						deleteStudentInfo={deleteStudentInfo}
						studentData={searchClassResults}
					/>
				) : null}


				{showData ? (
					<ShowStudentsForm
						closeShowData={closeShowData}
						studentInfoShow={studentInfoShow}
					/>
				) : null}
			</div>
		</div>
	);
}

export default Students;
