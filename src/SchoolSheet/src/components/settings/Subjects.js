import React, { useEffect, useState } from "react";
import Button from "../Button";
import { v4 as uuid } from 'uuid';
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";

let db = new Localbase("db");

function Subject() {


	const [editData, setEditData] = useState(false);
	const [editSubject, setEditSubject] = useState("");
	const [subjectId, setSubjectId] = useState("");

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (subject) => {
		setEditData(true);
		setEditSubject(subject.subject);
		setSubjectId(subject.id)
	};



	const [subjectData, setSubjectData] = useState([]);

	// posting subject
	const [subject, setSubject] = useState("");
	const postSubject = () => {
		let stId = uuid();
		let formData = {
			id: stId,
			subject: subject,
		};
		if (subject) {
			db.collection("subjects")
				.add(formData)
				.then((response) => {
					setSubject("");

					// fetch after
					fetchSubject();

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

	// fetch subject
	const fetchSubject = () => {
		db.collection("subjects")
			.get()
			.then((subject) => {
				const newData = subject;
				setSubjectData(newData);
			});
	};

	// fetching subject
	useEffect(() => {
		fetchSubject();
	}, []);

	//deleting subject
	const deleteSubject = (subject) => {
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
				db.collection("subjects")
					.doc({ id: subject.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchSubject();

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

	// updating subject
	const updateSubject = () => {
		db.collection("subjects")
			.doc({ id: subjectId })
			.update({
				subject: editSubject,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchSubject();
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
			<h5 className="text-xl font-medium ml-5 text-secondary">Subject</h5>
			<div className="w-full h-[80vh] ml-5">
				<div className="flex justify-between bg-white pl-5 shadow-lg rounded-md">
					<div className="w-1/2">
						<InputField
							type="text"
							placeholder="Enter Subject"
							label="Subject"
							value={subject}
							onChange={e=> setSubject(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>

					<div className="mt-8 mr-5 w-[150px]">
						<br />
						<div onClick={postSubject}>
						<Button value={"Add"} />
						</div>
						
					</div>
				</div>
				
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Subject</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded flex w-[400px] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="text"
										placeholder="Enter Subject"
										label="Subject"
										onChange={e=>setEditSubject(e.target.value)}
										value={editSubject}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="flex justify-between w-1/3 mt-[55px]">
									<div onClick={updateSubject}>
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

						{subjectData.map((subject) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={subject.id}
								>
									<td className="text-xs p-3 text-gray5">{subject.subject}</td>

									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline onClick={()=>deleteSubject(subject)} className="text-red w-4 h-4" />
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(subject)}
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
export default Subject;
