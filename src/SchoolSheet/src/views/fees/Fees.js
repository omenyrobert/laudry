import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { BsSearch } from "react-icons/bs";
import Localbase from "localbase";
import FeesTable from "../../components/fees/FeesTable";
import ButtonAlt from "../../components/ButtonAlt";
import Select from "react-select";

let db = new Localbase("db");

function Fees() {
	const [studentData, setStudentData] = useState([]);
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

	// search by class filter:
	const [allStudents, setAllStudents] = useState(true);
	const [SearchAllStudents, setSearchAllStudents] = useState(false);
	const handleSearchStudent = () => {
		setAllStudents(false);
		setSearchAllStudents(true);
	};

	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const SearchStudents = (e) => {
		e.preventDefault();
		setSearchResults(
			studentData?.filter((student) =>
				student.studentClass.value.toLowerCase().includes(query.toLowerCase())
			)
		);
		setQuery("");
	};

	// filter by percentage:
	const [feesData, setFeesData] = useState([]);
	const [percent, setPercent] = useState(0);
	const [searchAllPercent, setSearchAllPercent] = useState(false);
	const handleSearchPercent = () => {
		setAllStudents(false);
		setSearchAllPercent(true);
	};

	const fetchFeesInfo = () => {
		db.collection("feesInfo")
			.get()
			.then((student) => {
				const newData = student;
				setFeesData(newData);
			});
	};
	useEffect(() => {
		fetchFeesInfo();
	}, []);

	const [percentResults, setPercentResults] = useState();
	const [checkInput, setCheckInput] = useState("");

	const SearchPercentage = (e) => {
		e.preventDefault();
		if (checkInput === "below") {
			setPercentResults(
				studentData?.filter((student) => {
					let value = (student.paid / feesData.feesAmount) * 100;
					if (value < percent) {
						return student;
					}
					return null;
				})
			);
			setPercent();
		} else if (checkInput === "above") {
			setPercentResults(
				studentData?.filter((student) => {
					let value = (student.paid / feesData.feesAmount) * 100;
					if (value > percent) {
						return student;
					}
					return null;
				})
			);
			setPercent();
		}
		return null;
	};

	function clearFilters() {
		setFilters({
			query: "",
			type: "",
			house: "",
			studentClass: "",
			section: "",
			stream: "",
		});
		setSearch(false);
	}

	const [filters, setFilters] = useState({
		query: "",
		type: "",
		house: "",
		studentClass: "",
		section: "",
		stream: "",
	});

	const [streams, setStreams] = useState([]);

	const [search, setSearch] = useState(false);
	const [studentTypes, setStudentTypes] = useState([]);
	const [studentClasses, setStudentClasses] = useState([]);
	const [studentHouses, setStudentHouses] = useState([]);

	//toggle filter
	const [showFilter, setShowFilter] = useState(false);

	const toggleFilter = () => {
		setShowFilter(!showFilter);
	};
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
	return (
		<>
			<p className="text-secondary text-xl font-medium">Fees Payments</p>
			<br />
			<div className="flex p-2 bg-white shadow-lg rounded-md">
				<div className="w-4/12 flex pl-5">
					<div className="w-1/3">
						<InputField
							type="number"
							placeholder="Enter Percentage"
							name="percent"
							onChange={(e) => setPercent(e.target.value)}
							value={percent}
						/>
					</div>
					<div className="w-1/3 flex">
						<div className="ml-3">
							<p className="text-xs mt-5">Below</p>
							<input
								type="checkbox"
								className="ml-1"
								name="below"
								value="below"
								onChange={(e) => setCheckInput(e.target.value)}
							/>
						</div>
						<div className="ml-4">
							<p className="text-xs mt-5">Above</p>
							<input
								type="checkbox"
								className="ml-1"
								name="above"
								value="above"
								onChange={(e) => setCheckInput(e.target.value)}
							/>
						</div>
					</div>

					<div
						className="w-18 mt-5 pl-2"
						onClick={() => {
							handleSearchPercent();
							SearchPercentage();
						}}
					>
						<Button value={"filter"} />
					</div>
				</div>
				<div className="w-4/12">
					<form
						onSubmit={(e) => {
							handleSearchStudent();
							SearchStudents(e);
						}}
					>
						<InputField
							type="text"
							placeholder="Search For Class ..."
							name="class"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
						/>
					</form>
				</div>
				<div className="flex w-4/12 mt-5 ml-2">
					<div>
						<Button value={"PDF"} />
					</div>
					<div className="ml-2">
						<Button value={"CSV"} />
					</div>

					<div className="relative ml-2">
						<div className="w-20" onClick={toggleFilter}>
							<ButtonAlt value={"Filter"} />
						</div>
						{showFilter ? (
							<div className="bg-white shadow-lg mt-2 border -ml-36 border-gray2 z-50 rounded-md absolute w-56 p-3 h-auto">
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
				</div>
			</div>
			{allStudents ? <FeesTable studentData={studentData} /> : null}
			{SearchAllStudents ? <FeesTable studentData={searchResults} /> : null}
			{searchAllPercent ? <FeesTable studentData={percentResults} /> : null}
		</>
	);
}

export default Fees;
