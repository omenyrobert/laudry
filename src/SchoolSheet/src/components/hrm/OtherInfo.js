import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSections } from "../../store/schoolSheetSlices/schoolStore";
import Select from "react-select";
import axiosInstance from "../../axios-instance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
function OtherInfo(props) {
	const dispatch = useDispatch();
	const [init] = useState(true);
	const [studentClasses, setStudentClasses] = useState([]);
	const [studentClass, setStudentClass] = useState("");
	const fetchSchoolClasses = () => {
		axiosInstance.get("/class").then((response) => {
			console.log("response", response);
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

	useEffect(() => {
		dispatch(getSections());
		try {
			fetchSchoolClasses();
		} catch (error) {
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				icon: "error",
				title: "Oops...",
				text: "An Error Occured while trying to fetch data for your Form. Please Refresh Page",
			});
		}
	}, [init, dispatch]);
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
				<div className="w-1/3 p-2">
					<Select
						placeholder={"Select Class"}
						defaultValue={studentClass}
						name="studentClass"
						onChange={setStudentClass}
						options={studentClasses}
					/>
					<br />
					<div className="flex border-b border-gray1 p-2">
						<div className="text-gray5 text-sm w-2/3">Primary 1</div>
						<div className="w-1/3">
							<p className="text-red text-sm cursor-pointer">X</p>
						</div>
					</div>
					<div className="flex border-b border-gray1 p-2">
						<div className="text-gray5 text-sm w-2/3">Primary 1</div>
						<div className="w-1/3">
							<p className="text-red text-sm cursor-pointer">X</p>
						</div>
					</div>
				</div>
				<div className="w-1/3 p-2">
					<label>Subjects</label>
					<br />
					<p className="text-gray5 text-sm mt-1">Math</p>
					<p className="text-gray5 text-sm mt-1">English</p>
					<p className="text-gray5 text-sm mt-1">SST</p>
				</div>
				<div className="w-1/3 p-2">
					<label>Recomendation & Other Documents</label>
					<p className="text-gray5 text-sm">National ID</p>
					<p className="text-gray5 text-sm">Recomendation</p>
				</div>
			</div>
		</>
	);
}

export default OtherInfo;
