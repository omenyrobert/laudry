import React, { useEffect, useState } from "react";
import Button from "../Button";
import { v4 as uuid } from "uuid";
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";

let db = new Localbase("db");

function Grades() {
	const [editData, setEditData] = useState(false);

	const closeEditData = () => {
		setEditData(false);
	};

	// posting grade
	const [grade, setGrade] = useState("");
	const [to, setTo] = useState("");
	const [from, setFrom] = useState("");

	const postGrade = () => {
		let stId = uuid();
		let formData = {
			id: stId,
			grade: grade,
			to: to,
			from: from,
		};
		if (grade) {
			db.collection("grading")
				.add(formData)
				.then((response) => {
					setGrade("");
					setTo("");
					setFrom("");

					// fetch after
					fetchgrade();

					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch(console.error());
		}
	};

	// fetch grade
	const [gradeData, setGradeData] = useState([]);
	const fetchgrade = () => {
		db.collection("grading")
			.get()
			.then((grade) => {
				const newData = grade;
				setGradeData(newData);
			});
	};

	// fetching stream
	useEffect(() => {
		fetchgrade();
	}, []);

	//deleting stream
	const deleteGrade = (stream) => {
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
				db.collection("grading")
					.doc({ id: stream.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchgrade();

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

	// updating grade
	const [gradeEdit, setGradeEdit] = useState("");
	const [toEdit, setToEdit] = useState("");
	const [fromEdit, setFromEdit] = useState("");
	const [gradeId, setGradeId] = useState("");

	const openEditData = (grade) => {
		setEditData(true);
		setGradeEdit(grade?.grade);
		setToEdit(grade.to);
		setFromEdit(grade.from);
		setGradeId(grade.id);
	};
	const updateGrade = () => {
		db.collection("grading")
			.doc({ id: gradeId })
			.update({
				grade: gradeEdit,
				to: toEdit,
				from: fromEdit
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchgrade();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
	};

	return (
		<>
			<h5 className="text-lg font-medium">Grading</h5>
			<div className="w-full h-[80vh]">
				<div className="flex justify-between bg-white pl-5 shadow-lg rounded-md">
					<div className="w-1/4">
						<InputField
							type="number"
							placeholder="Enter starting marks"
							label="From"
							value={from}
							onChange={(e) => setFrom(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 ml-2">
						<InputField
							type="number"
							placeholder="Enter end marks"
							label="To"
							value={to}
							onChange={(e) => setTo(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-1/4 ml-2">
						<InputField
							type="text"
							placeholder="Enter grade"
							label="Grade"
							value={grade}
							onChange={(e) => setGrade(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="mt-8 mr-5 w-1/4 ml-2">
						<br />
						<div onClick={postGrade}>
							<Button value={"Add"} />
						</div>
					</div>
				</div>
				
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">From</th>
						<th className="p-2 text-primary text-sm text-left">To</th>
						<th className="p-2 text-primary text-sm text-left">Grade</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded flex w-[800px] p-5 bg-white">
								<div className="w-3/12 pr-5">
									<InputField
										type="number"
										placeholder="Enter starting marks"
										label="From"
										value={fromEdit}
										onChange={(e) => setFromEdit(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="w-3/12 pr-2">
									<InputField
										type="number"
										placeholder="Enter end marks"
										label="To"
										value={toEdit}
										onChange={(e) => setToEdit(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="w-4/12 pr-2">
									<InputField
										type="text"
										placeholder="Enter grade"
										label="Grade"
										value={gradeEdit}
										onChange={(e) => setGradeEdit(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="flex justify-between w-2/12 mt-[55px]">
									<div onClick={updateGrade}>
										<ButtonSecondary value={"Update"} />
									</div>
									<div>
										<p
											className="text-black text-lg cursor-pointer"
											onClick={closeEditData}
										>
											X
										</p>
									</div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{gradeData.map((grade) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={grade.id}
								>
									<td className="text-xs p-3 text-gray5">{grade.from}</td>
									<td className="text-xs p-3 text-gray5">{grade.to}</td>
									<td className="text-xs p-3 text-gray5">{grade.grade}</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline
											onClick={(e) => deleteGrade(grade)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(grade)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
export default Grades;
