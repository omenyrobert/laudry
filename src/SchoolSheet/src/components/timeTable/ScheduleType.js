import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";

let db = new Localbase("db");

function ScheduleType() {



	// post schedule Type
	const [scheduleType, setscheduleType] = useState("")
	const postscheduleType = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			scheduleType: scheduleType,
		};
		if (scheduleType) {
			db.collection("scheduleTypesTbl")
				.add(formData)
				.then((response) => {
					setscheduleType("");
					fetchInomeTypes();
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

	// fetch schedule typess
	const [scheduleTypesData, setscheduleTypesData] = useState([]);
	const fetchInomeTypes = () => {
		db.collection("scheduleTypesTbl")
			.get()
			.then((scheduleTypes) => {
				const newData = scheduleTypes;
				setscheduleTypesData(newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [scheduleTypeEdit, setscheduleTypeEdit] = useState("");
	const [scheduleTypeId, setscheduleTypeId] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (scheduleType) => {
		setEditData(true);
		setscheduleTypeEdit(scheduleType?.scheduleType);
		setscheduleTypeId(scheduleType.id);
	};
	const updatescheduleType = () => {
		db.collection("scheduleTypesTbl")
			.doc({ id: scheduleTypeId })
			.update({
				scheduleType: scheduleTypeEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchInomeTypes();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
	};

	// delete

	//deleting schedule types
	const deletescheduleType = (scheduleTypeItem) => {
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
				db.collection("scheduleTypesTbl")
					.doc({ id: scheduleTypeItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchInomeTypes();

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

	// fetching schedule types
	useEffect(() => {
		fetchInomeTypes();
	}, []);




	return (
		<>
			<h5 className="text-lg font-medium text-secondary">Schedule Types</h5>
			<div className="w-full h-[80vh]">
				<div className=" bg-white ">
					
						<InputField
							type="text"
							placeholder="Enter Schedule Type"
							label="Schedule Type"
							value={scheduleType}
							onChange={(e)=>setscheduleType(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					
				
						<div onClick={postscheduleType}>
						<Button value={"Add Schedule Type"} />
						</div>
						
					
				</div>
				
				<table className="mt-10 w-[95%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>


						{/* edit popup start */}
						{ editData ? 
						<div className="absolute shadow-lg rounded flex w-[400px] p-5 bg-white">
							<div className="w-2/3 pr-5">
								<InputField
									type="text"
									placeholder="Enter schedule Type"
									label="schedule Type"
									value={scheduleTypeEdit}
									onChange={(e)=>setscheduleTypeEdit(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="flex justify-between w-1/3 mt-[55px]">
								<div onClick={updatescheduleType}>
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
						: null }
						{/* edit popup end */}




						{scheduleTypesData.map((scheduleTypeItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={scheduleType.id}
								>
									<td className="text-xs p-3 text-gray5">
										{scheduleTypeItem.scheduleType}
									</td>
									<td className="text-xs p-3 text-gray5">
										<div className="flex">
											<MdDeleteOutline onClick={()=>deletescheduleType(scheduleTypeItem)} className="text-red w-4 h-4" />
											<BsPencilSquare
												onClick={()=> openEditData(scheduleTypeItem)}
												className="text-warning h-4 w-4 ml-5"
											/>
										</div>
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
export default ScheduleType;
