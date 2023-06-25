import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import StudentsTable from "../../components/students/studentsTable";
// import EditStudentsForm from "../../components/students/EditStudentsForm";
// import ShowStudentsForm from "../../components/students/ShowStudentsForm";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button2 from "../../components/Button2";
import axiosInstance from "../../axios-instance";
import withReactContent from "sweetalert2-react-content";
// import { FaFilter } from "react-icons/fa";
import ButtonAlt from "../../components/ButtonAlt";
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from "../../store/schoolSheetSlices/schoolStore";
import Loader from "../../components/Loader"

const Students = () => {
	const dispatch = useDispatch();
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
	const { sections } = useSelector((state) => state.schoolStore);

	const sectionOptions = [];

	sections.forEach((section) => {
		let newSection = {};
		newSection.value = section.id;
		newSection.label = section.section;
		sectionOptions.push(newSection);
	})

	useEffect(() => {
		const fetchData = async () => {

			try {
				await fetchMoreStudents();
				await fetchStudentType();
				await fetchSchoolClasses();
				await fetchSchoolHouses();
				await fetchStreams();
			} catch (error) {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: "An Error Occured while trying to fetch data for your Form. Please Refresh Page",
				});
			}
		}
		fetchData();
	}, []);

	const fetchStudentType = async () => {
		const response = await axiosInstance.get("/student-types")
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

	};

	const fetchSchoolClasses = async () => {
		const response = await axiosInstance.get("/class")
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
	};

	const fetchStreams = async () => {
		const response = await axiosInstance.get("/streams")
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

	};

	const fetchSchoolHouses = async () => {
		const response = await axiosInstance.get("/houses")
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
		const searchResults = studentData.filter((student) => {
			const studentName =
				student.firstName + " " + student.middleName + " " + student.lastName;
			console.log(student)

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
			// console.log("===================")
			// console.log("Filters:", filters)
			// console.log("Student: ", student)
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
			stream: ""
		});
		setSearch(false);
	}

	useEffect(() => {
		dispatch(getSections());
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
	}, [filters, dispatch]);

	const printStudents = () => {
		const documentWindow = window.open("");
		const studentSheet = document.getElementById("studentTable");
		const styles = document.querySelectorAll("style");
		const links = document.querySelectorAll("link");
		// Write n links
		links.forEach((element, _) => {
			documentWindow.document.writeln(element.outerHTML);
		});
		// Write n styles
		styles.forEach((element, _) => {
			documentWindow.document.writeln(element.outerHTML);
		});
		documentWindow.document.writeln(studentSheet.innerHTML);

		setTimeout(() => {
			documentWindow.print();
		}, 1000);
	};

	//toggle filter
	const [showFilter, setShowFilter] = useState(false);

	const toggleFilter = () => {
		setShowFilter(!showFilter);
	};

	// Implement infinite scrolling pagination
	const [page, setPage] = useState(0)
	const [hasMore, setHasMore] = useState(true)

	const fetchMoreStudents = async () => {
		const offset = 50
		const response = await axiosInstance.get(`/students/fetch/paginated?limit=${offset}&page=${page}`)

		const { payload } = response.data
		if (payload.length === 0 || payload.length < offset) {
			setStudentData([...studentData, ...payload])
			setHasMore(false)
		} else {
			setStudentData([...studentData, ...payload])
			setPage(page + 1)
		}

	}




	// Export `studentData` to csv
	const exportToCSV = () => {
		const csvRows = []
		const headers = Object.keys(studentData[0])
		csvRows.push(headers.join(","))
		for (const row of studentData) {
			const values = headers.map(header => {
				const value = row[header]
				console.log(value, header, row)
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
					if (value) {
						const escaped = ("" + value.stream).replace(/"/g, '\\"')
						return `"${escaped}"`
					}
					const escaped = ("null").replace(/"/g, '\\"')
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
			
			<div className="">
				<div className="p-3 bg-white shadow-md border border-gray2">
					
					<div className="flex justify-between">
					<div>
						<h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">Students</h1>
					</div>
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
											options={sectionOptions}
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
									<Button value={"Pdf"} />
								</div>
							</div>
							<div className="w-1/3 mx-5">
								<div onClick={exportToCSV} className="w-20">
									<Button value={"CSV"} />
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
				{hasMore ? (
					<div className="flex justify-center">
						<Loader/>
						<button
							onClick={fetchMoreStudents}
							className="bg-secondary text-white p-2 rounded-md mt-2"
						>
							Load More
						</button>
					</div>
				) : (
					<div className="flex justify-center">
						<p className="text-gray2">No more students to load</p>
					</div>
				)}
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
