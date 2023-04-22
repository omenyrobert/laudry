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

function Slots() {
	// post Slots
	const [Slots, setSlots] = useState("");
	const postSlots = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			Slots: Slots,
		};
		if (Slots) {
			db.collection("SlotssTbl")
				.add(formData)
				.then((response) => {
					setSlots("");
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

	// fetch Slotsss
	const [SlotssData, setSlotssData] = useState([]);
	const fetchInomeTypes = () => {
		db.collection("SlotssTbl")
			.get()
			.then((Slotss) => {
				const newData = Slotss;
				setSlotssData(newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [SlotsEdit, setSlotsEdit] = useState("");
	const [SlotsId, setSlotsId] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (Slots) => {
		setEditData(true);
		setSlotsEdit(Slots?.Slots);
		setSlotsId(Slots.id);
	};
	const updateSlots = () => {
		db.collection("SlotssTbl")
			.doc({ id: SlotsId })
			.update({
				Slots: SlotsEdit,
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

	//deleting Slotss
	const deleteSlots = (SlotsItem) => {
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
				db.collection("SlotssTbl")
					.doc({ id: SlotsItem.id })
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

	// fetching Slotss
	useEffect(() => {
		fetchInomeTypes();
	}, []);

	return (
		<>
			<h5 className="text-lg font-medium text-secondary">Slots</h5>
			<div className="w-full h-[80vh]">
				<div className=" bg-white ">
					<div className="flex">
						<div className="p-1 w-1/2">
							<InputField
								type="time"
								label="Start Time"
								value={Slots}
								onChange={(e) => setSlots(e.target.value)}
							/>
						</div>
						<div className="p-1 w-1/2">
							<InputField
								type="time"
								label="End Time"
								value={Slots}
								onChange={(e) => setSlots(e.target.value)}
							/>
						</div>
						<div className="p-1 w-1/2 mt-14">
							<div onClick={postSlots}>
								<Button value={"Add Slot"} />
							</div>
						</div>
					</div>
				</div>

				<table className="mt-10 w-[95%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Start Time</th>
						<th className="p-2 text-primary text-sm text-left">End Time</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-lg rounded flex w-[400px] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="time"
										label="Start Time"
										value={SlotsEdit}
										onChange={(e) => setSlotsEdit(e.target.value)}
									/>
								</div>
								<div className="w-2/3 pr-5">
									<InputField
										type="time"
										label="End Time"
										value={SlotsEdit}
										onChange={(e) => setSlotsEdit(e.target.value)}
									/>
								</div>
								<div className="flex justify-between w-1/3 mt-[55px]">
									<div onClick={updateSlots}>
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

						{SlotssData.map((SlotsItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={Slots.id}
								>
									<td className="text-xs p-3 text-gray5">{SlotsItem.Slots}</td>
									<td className="text-xs p-3 text-gray5">{SlotsItem.Slots}</td>
									<td className="text-xs p-3 text-gray5">
										<div className="flex">
											<MdDeleteOutline
												onClick={() => deleteSlots(SlotsItem)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												onClick={() => openEditData(SlotsItem)}
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
export default Slots;
