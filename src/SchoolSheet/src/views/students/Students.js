import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import StudentsTable from "../../components/students/studentsTable";
import EditStudentsForm from "../../components/students/EditStudentsForm";
import ShowStudentsForm from "../../components/students/ShowStudentsForm";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { BsSearch, BsPrinterFill, BsFillCaretDownFill } from "react-icons/bs";
import Select from "react-select";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button2 from "../../components/Button2";
import axiosInstance from "../../axios-instance";
import withReactContent from "sweetalert2-react-content";
import { FaFilter } from "react-icons/fa";

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

function Students() {
	const [studentData, setStudentData] = useState([]);
	const [search, setSearch] = useState(false);
	const [studentTypes, setStudentTypes] = useState([]);
	const [studentClasses, setStudentClasses] = useState([]);
	const [studentHouses, setStudentHouses] = useState([]);
	const [filters, setFilters] = useState({
		query: "",
		type: "",
		house: "",
		studentClass: "",
		section: "",
	});
	const [searchedStudents, setSearchedStudents] = useState([]);

	useEffect(() => {
		try {
			fetchStudentInfo();
			fetchStudentType();
			fetchSchoolClasses();
			fetchSchoolHouses();
		} catch (error) {
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				icon: "error",
				title: "Oops...",
				text: "An Error Occured while trying to fetch data for your Form. Please Refresh Page",
			});
		}
	}, []);

	const fetchStudentType = () => {
		axiosInstance.get("/student-types").then((response) => {
			//console.log("response", response)
			const { payload } = response.data;

			const studenttypesArr = [];
			for (let i = 0; i < payload.length; i++) {
				studenttypesArr.push({
					label: payload[i].type,
					value: payload[i].type,
					...payload[i],
				});
			}
			setStudentTypes(studenttypesArr);
		});
	};

	const fetchSchoolClasses = () => {
		axiosInstance.get("/class").then((response) => {
			const { payload } = response.data;
			const studentClassesArr = [];
			for (let i = 0; i < payload.length; i++) {
				studentClassesArr.push({
					label: payload[i].class,
					value: payload[i].class,
					...payload[i],
				});
			}
			setStudentClasses(studentClassesArr);
		});
	};

	const fetchSchoolHouses = () => {
		axiosInstance.get("/houses").then((response) => {
			const { payload } = response.data;
			const studentHousesArr = [];

			for (let i = 0; i < payload.length; i++) {
				studentHousesArr.push({
					label: payload[i].house,
					value: payload[i].house,
					...payload[i],
				});
			}
			setStudentHouses(studentHousesArr);
		});
	};

	// fetch student info
	const fetchStudentInfo = () => {
		axiosInstance.get("/students").then((response) => {
			const { payload } = response.data;
			setStudentData(payload);
		});
	};

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
				axiosInstance
					.delete("/students/" + student.id)
					.then((response) => {
						// fetch after
						fetchStudentInfo();
						Swal.fire("Deleted!", "Student file has been deleted.", "success");
					})
					.catch((error) => {
						//console.log(error);
					});
			}
		});
	};

	const searchStudents = () => {
		if (search === false) {
			setSearch(true);
		}
		console.log("filters", filters);
		const searchResults = studentData.filter((student) => {
			const studentName =
				student.firstName + " " + student.middleName + " " + student.lastName;

			const searchName = studentName
				.toLowerCase()
				.includes(filters.query.toLowerCase());
			const searchType = student.studentType.type
				.toLowerCase()
				.includes(filters.type.toLowerCase());
			const searchHouse = student.studentHouse.house
				.toLowerCase()
				.includes(filters.house.toLowerCase());
			const searchClass = student.studentClass.class
				.toLowerCase()
				.includes(filters.studentClass.toLowerCase());
			//const searchSection = student.section.toLowerCase().includes(filters.section.toLowerCase())

			return searchName && searchType && searchHouse && searchClass;
		});
		setSearchedStudents(searchResults);
	};

	function clearFilters() {
		setFilters({
			query: "",
			type: "",
			house: "",
			studentClass: "",
			section: "",
		});
		setSearch(false);
	}

	useEffect(() => {
		if (
			filters.query === "" &&
			filters.type === "" &&
			filters.house === "" &&
			filters.studentClass === "" &&
			filters.section === ""
		) {
			setSearch(false);
		} else {
			searchStudents();
		}
	}, [filters]);

	const [showFilter, setShowFilter] = useState(false);

	const toggleFilter = () => {
		setShowFilter(!showFilter);
	};

	return (
		<div className=" mt-2 w-full">
			<h1 className="text-secondary font-semibold text-2xl ml-3">Students</h1>
			<div className="">
				<div className="p-3 bg-white shadow-md border border-gray2">
					<div className="flex justify-between">
						<div className="w-4/12">
							<form
								className="w-full"
								onSubmit={(e) => {
									//
								}}
							>
								<InputField
									type="text"
									placeholder="Search For Student ..."
									name="lastName"
									value={filters.query}
									onChange={(e) =>
										setFilters({ ...filters, query: e.target.value })
									}
									icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
								/>
							</form>
						</div>
						<div className="w-5/12"></div>
						<div className="w-3/12 flex justify-between">
							<div className="mt-5 w-auto">
								<div className="border relative cursor-pointer border-primary p-2 w-28 rounded-md flex justify-center">
									<div className="flex" onClick={toggleFilter}>
										<span>
											<FaFilter className="text-primary" />
										</span>
										<span className="ml-2 -mt-1">Filter</span>
										<span className="ml-2">
											<BsFillCaretDownFill />
										</span>
									</div>
									{showFilter ? (
										<div className="bg-white shadow-lg mt-10 border border-gray2 z-50 rounded-md absolute w-52 p-3 h-auto">
											<Select
												placeholder={"Select class"}
												className="text-sm"
												onChange={(opt) => {
													setFilters({ ...filters, studentClass: opt.value });
												}}
												options={studentClasses}
											/>
											<br />
											<Select
												placeholder={"Student Type"}
												className="text-sm"
												onChange={(opt) => {
													setFilters({ ...filters, type: opt.value });
												}}
												options={studentTypes}
											/>
											<br />
											<Select
												placeholder={"Select Stream "}
												className="text-sm"
												onChange={(opt) => {
													setFilters({ ...filters, type: opt.value });
												}}
												options={studentTypes}
											/>
											<br />
											<Select
												placeholder={"Sections"}
												className="text-sm"
												onChange={(opt) => {
													setFilters({ ...filters, section: opt.value });
												}}
												options={sections}
											/>
											<br />
											<Select
												placeholder={"Student House"}
												className="text-sm"
												onChange={(e) => {
													setFilters({ ...filters, house: e.value });
												}}
												options={studentHouses}
											/>
											<br />
											<div
												className=""
												onClick={() => {
													clearFilters();
												}}
											>
												<Button value={"Clear Filters"} />
											</div>
										</div>
									) : null}
								</div>
							</div>
							<div className="mt-5 w-auto">
								<div className="border cursor-pointer border-primary p-2 w-28 rounded-md flex justify-center">
									<div className="flex">
										<span>
											<BsPrinterFill className="text-primary" />
										</span>
										<span className="ml-2 -mt-1">Print</span>
									</div>
								</div>
							</div>
							<div className="mt-5 w-auto">
								<Link to="/addStudentForm">
									<Button2 value={"Student"} />
								</Link>
							</div>
						</div>
					</div>
				</div>

				{search ? (
					<StudentsTable
						deleteStudentInfo={deleteStudentInfo}
						studentData={searchedStudents}
					/>
				) : (
					<StudentsTable
						deleteStudentInfo={deleteStudentInfo}
						studentData={studentData}
					/>
				)}
			</div>
		</div>
	);
}

export default Students;
