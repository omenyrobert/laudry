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
import ButtonAlt from "../../components/ButtonAlt";

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
		stream: "",
	});
	const [searchedStudents, setSearchedStudents] = useState([]);
	const [streams, setStreams] = useState([]);

	useEffect(() => {
		try {
			fetchStudentInfo();
			fetchStudentType();
			fetchSchoolClasses();
			fetchSchoolHouses();
			fetchStreams();
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

	const fetchStreams = () => {
		axiosInstance.get("/streams").then((response) => {
			const { payload } = response.data;
			const studentStreamsArr = [];
			for (let i = 0; i < payload.length; i++) {
				studentStreamsArr.push({
					label: payload[i].stream,
					value: payload[i].stream,
					...payload[i],
				});
			}
			setStreams(studentStreamsArr);
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
			console.log("payload", payload);
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
			const searchSection = student.studentSection
				.toLowerCase()
				.includes(filters.section.toLowerCase());
			const searchStream = student.studentStream.stream
				.toLowerCase()
				.includes(filters.stream.toLowerCase());

			return (
				searchName &&
				searchType &&
				searchHouse &&
				searchClass &&
				searchSection &&
				searchStream
			);
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
			filters.section === "" &&
			filters.stream === ""
		) {
			setSearch(false);
		} else {
			searchStudents();
		}
	}, [filters]);

	const printStudents = () => {
		const documentWindow = window.open("");
		const studentSheet = document.getElementById("studentTable");
		const styles = document.querySelectorAll("style");
		// Write n styles
		styles.forEach((element, _) => {
			documentWindow.document.writeln(element.outerHTML);
		});
		documentWindow.document.writeln(studentSheet.innerHTML);
		documentWindow.print();
	};

	//toggle filter
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
						<div className="w-4/12 ">
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
						<div className=""></div>
						<div className="flex mt-5">
							<div className="w-1/3"></div>
							<div className="w-1/3 relative mt">
								<div className="w-20" onClick={toggleFilter}>
									<ButtonAlt value={"Filter"} />
								</div>
								{showFilter ? (
									<div className="bg-white shadow-lg mt-2 border border-gray2 z-50 rounded-md absolute w-56 p-3 h-auto">
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
												setFilters({ ...filters, stream: opt.value });
											}}
											options={streams}
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
							<div className="w-1/3 mx-5">
								<div onClick={printStudents} className="w-20">
									<Button value={"Print"} />
								</div>
							</div>
							<div className="w-2/5">
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
