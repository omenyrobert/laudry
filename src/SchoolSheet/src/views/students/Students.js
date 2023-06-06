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
		stream: ""
	});
	const [searchedStudents, setSearchedStudents] = useState([])
	const [streams, setStreams] = useState([])

	useEffect(() => {
		try {
			fetchStudentInfo();
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
		axiosInstance.get("/students")
			.then((response) => {
				const { payload } = response.data;
				console.log("payload", payload)
				setStudentData(payload);
			})
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

			const searchName = studentName.toLowerCase().includes(filters.query.toLowerCase())
			const searchType = student.studentType.type.toLowerCase().includes(filters.type.toLowerCase())
			const searchHouse = student.studentHouse.house.toLowerCase().includes(filters.house.toLowerCase())
			const searchClass = student.studentClass.class.toLowerCase().includes(filters.studentClass.toLowerCase())
			const searchSection = student.studentSection.toLowerCase().includes(filters.section.toLowerCase())
			const searchStream = student.studentStream.stream.toLowerCase().includes(filters.stream.toLowerCase())

			return searchName && searchType && searchHouse && searchClass && searchSection && searchStream

		})
		setSearchedStudents(searchResults)
	}

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
		if (filters.query === "" && filters.type === "" && filters.house === "" && filters.studentClass === "" && filters.section === "" && filters.stream === "") {
			setSearch(false)
		} else {
			searchStudents();
		}
	}, [filters]);

	const printStudents = () => {
		const documentWindow = window.open("")
		const studentSheet = document.getElementById("studentTable")
		const styles = document.querySelectorAll("style")
		// Write n styles
		styles.forEach((element, _) => {
			documentWindow.document.writeln(element.outerHTML)
		})
		documentWindow.document.writeln(studentSheet.innerHTML)
		documentWindow.print()
	}

	// Implement infinite scrolling pagination
	const [page, setPage] = useState(0)
	const [hasMore, setHasMore] = useState(true)

	const fetchMoreStudents = () => {
		const offset = 50
		axiosInstance.get(`/students/paginated?limit=${offset}&page=${page}`)
			.then((response) => {
				const { payload } = response.data
				if (payload.length === 0) {
					setHasMore(false)
				} else {
					setStudentData([...studentData, ...payload])
					setPage(page + 1)
				}
			})
	}


	const handleScroll = (e) => {
		const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
		if (scrollHeight - scrollTop === clientHeight) {
			fetchMoreStudents()
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])


	// Export `studentData` to csv
	const exportToCSV = () => {
		const csvRows = []
		const headers = Object.keys(studentData[0])
		csvRows.push(headers.join(","))
		for (const row of studentData) {
			const values = headers.map(header => {
				const value = row[header]
				if (header === "studentType") {
					const escaped = ("" + value.type).replace(/"/g, '\\"')
					return `"${escaped}"`
				} else if (header === "studentHouse") {
					const escaped = ("" + value.house).replace(/"/g, '\\"')
					return `"${escaped}"`
				} else if (header === "studentClass") {
					const escaped = ("" + value.class).replace(/"/g, '\\"')
					return `"${escaped}"`
				} else if (header === "studentStream") {
					const escaped = ("" + value.stream).replace(/"/g, '\\"')
					return `"${escaped}"`
				}
				const escaped = ("" + row[header]).replace(/"/g, '\\"')
				return `"${escaped}"`
			})
			csvRows.push(values.join(","))
		}
		const csvData = csvRows.join("\n")
		const blob = new Blob([csvData], { type: "text/csv" })
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement("a")
		link.setAttribute("href", url)
		link.setAttribute("download", "students.csv")
		link.click()
	}





	return (
		<div className=" mt-2 w-full">
			<h1 className="text-secondary font-semibold text-2xl ml-3">Students</h1>
			<div className="">
				<div className="p-3 bg-white shadow-md border border-gray2">
					<div className="flex">
						<div className="flex w-4/12">

							<Link to="/addStudentForm">
								<Button2 value={"Student"} />
							</Link>
							<div onClick={printStudents} className="ml-10">
								<Button value={"Print"} />
							</div>
							<div onClick={exportToCSV} className="ml-10">
								<Button value={"Export CSV"} />
							</div>

						</div>
						<div className="w-3/12">
							<Select
								placeholder={"Sections"}
								className="text-sm"
								onChange={(opt) => {
									setFilters({ ...filters, section: opt.value })
								}}
								options={sections}
							/>
						</div>
						<div className="w-3/12 ml-5">
							<Select
								placeholder={"Student House"}
								className="text-sm"
								onChange={(e) => {
									setFilters({ ...filters, house: e.value })
								}}
								options={studentHouses}
							/>
						</div>
						<div
							className="w-32 ml-5"
							onClick={() => {
								clearFilters()
							}}
						>
							<Button value={"Clear Filters"} />
						</div>
					</div>
					<div className="flex ">
						<div className="flex w-[400px]">

							<form className="w-full"
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

						<div className="ml-5 mt-5 w-1/4">
							<Select
								placeholder={"Select class"}
								className="text-sm"
								onChange={(opt) => {
									setFilters({ ...filters, studentClass: opt.value })
								}}
								options={studentClasses}
							/>
						</div>
						<div className="ml-5 mt-5 w-1/4">
							<Select
								placeholder={"Student Type"}
								className="text-sm"
								onChange={(opt) => {
									setFilters({ ...filters, type: opt.value })
								}}
								options={studentTypes}
							/>
						</div>
						<div className="ml-5 mt-5 w-1/4">
							<Select
								placeholder={"Select Stream "}
								className="text-sm"
								onChange={(opt) => {
									setFilters({ ...filters, stream: opt.value })
								}}
								options={streams}
							/>
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
