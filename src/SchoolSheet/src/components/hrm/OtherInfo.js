import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";
import Localbase from "localbase";

let db = new Localbase("db");

function OtherInfo() {
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
	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						0thers Info
					</p>
				</div>
				<div></div>
			</div>
			<div className="flex">
				<div className="w-1/4 p-2">
					<label>Classes</label>
					<br />
					<p className="text-gray5 text-sm mt-1">Primary 1</p>
					<p className="text-gray5 text-sm mt-1">Primary 2</p>
					<p className="text-gray5 text-sm mt-1">Primary 3</p>
				</div>
				<div className="w-1/4 p-2">
					<label>Subjects</label>
                    <br />
					<p className="text-gray5 text-sm mt-1">Math</p>
					<p className="text-gray5 text-sm mt-1">English</p>
					<p className="text-gray5 text-sm mt-1">SST</p>
				</div>
				<div className="w-1/4 p-2">
					<label>Recomendation & Other Documents</label>
                    <p className="text-gray5 text-sm">National ID</p>
                    <p className="text-gray5 text-sm">Recomendation</p>
				</div>
				<div className="w-1/4 p-2">
					<label>Special Skills</label>
					<p className="text-gray5 text-sm">Attedance Times</p>
					<p className="text-gray5 text-sm">Salary</p>
				</div>
			</div>
		</>
	);
}

export default OtherInfo;
