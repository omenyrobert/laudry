import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";

import InputField from "../../components/InputField";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import AttedanceComp from "../../components/hrm/AttendanceComp";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import Button2 from "../../components/Button2";

let db = new Localbase("db");

function StaffAttendance() {
	const [type, setType] = useState({
		attendanceType: "",
		arrival: "",
		departure: "",
	});
	const [editData, setEditData] = useState(false);
	const [typeEdit, setTypeEdit] = useState("");
	const [typeId, setTypeId] = useState("");
	const [arrivalEdit, setArrivalEdit] = useState("");
	const [departureEdit, setDepartureEdit] = useState("");

	const [attendanceTypes, setAttendanceTypes] = useState([]);

	const onChange = (e) => {
		setType({ ...type, [e.target.name]: e.target.value });
	};

	const postType = () => {
		let stId = Math.random().toString(10)
		let formData = {
			id: stId,
			attendanceType: type.attendanceType,
			arrival: type.arrival,
			departure: type.departure,
		};
		if (type) {
			db.collection("attendanceTypes")
				.add(formData)
				.then((response) => {
					setType("");
					// fetch after
					fetchAttendanceTypes();

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

	// fetch stypes
	const fetchAttendanceTypes = () => {
		db.collection("attendanceTypes")
			.get()
			.then((attendanceType) => {
				const newData = attendanceType;
				setAttendanceTypes(newData);
			});
	};

	//deleting stypes
	const deleteType = (type) => {
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
				db.collection("attendanceTypes")
					.doc({ id: type.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchAttendanceTypes();

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

	// updating stypes
	const updateType = () => {
		db.collection("attendanceTypes")
			.doc({ id: typeId })
			.update({
				attendanceType: typeEdit,
				arrival: arrivalEdit,
				departure: departureEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchAttendanceTypes();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
	};

	// fetching stypes
	useEffect(() => {
		fetchAttendanceTypes();
	}, []);

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (type) => {
		setEditData(true);
		setTypeEdit(type.attendanceType);
		setArrivalEdit(type.arrival);
		setDepartureEdit(type.departure);
		setTypeId(type.id);
	};

	const [attendance, setAttendance] = useState(false);
	const openAttendance = () => {
		setAttendance(true);
	};
	const closeAttendance = () => {
		setAttendance(false);
	};

	return (
		<div className="w-full relative -ml-7">
			{attendance ? (
				<div className="w-[100vw] z-50 flex h-full bg-black overflow-y-auto absolute bg-opacity-60">
					<div className="bg-white w-1/3 h-full border border-gray1">
						<div className="flex justify-between font-medium text-primary bg-gray1 p-3">
							<div>Attedance Times</div>
							<div>
								<p onClick={closeAttendance} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="p-5">
							<div className=" -mt-2 flex">
								<div className="w-1/2 p-2">
									<InputField
										type="text"
										placeholder="Enter Attendance Name"
										label="Attendance Name"
										name="attendanceType"
										onChange={onChange}
									/>
								</div>
								<div className="w-1/2 p-2">
									<InputField
										type="time"
										placeholder=""
										label="Arrival Time"
										name="arrival"
										onChange={onChange}
									/>
								</div>
							</div>
							<div className="flex -mt-2">
								<div className="w-1/2 p-2">
									<InputField
										type="time"
										label="Departure time"
										name="departure"
										onChange={onChange}
									/>
								</div>
								<div className="w-1/2 p-2 mt-10">
									<div onClick={postType}>
										<Button value={"Add Attendance Time"} />
									</div>
								</div>
							</div>
							<table className="mt-10 w-[98%] table-auto">
								<thead style={{ backgroundColor: "#0d6dfd10" }}>
									<th className="p-2 text-primary text-sm text-left">
										Attendance Time{" "}
									</th>
									<th className="p-2 text-primary text-sm text-left">
										Arrival
									</th>
									<th className="p-2 text-primary text-sm text-left">
										Departure
									</th>
									<th className="p-2 text-primary text-sm text-left">Action</th>
								</thead>
								<tbody>
									{/* edit popup start */}
									{editData ? (
										<div className="absolute shadow-2xl rounded w-[400px] p-5 bg-white">
											<div className="flex justify-between p-3">
												<div>
													<p className="text-primary font-semibold text-md">
														Update Attendance Time
													</p>
												</div>
												<div>
													<p className="cursor-pointer" onClick={closeEditData}>
														X
													</p>
												</div>
											</div>
											<div className="pr-5">
												<InputField
													type="text"
													placeholder="Enter Attendance Name"
													label="Attendance Name"
													name="attendanceType"
													onChange={(e) => setTypeEdit(e.target.value)}
													value={typeEdit}

												/>
												<InputField
													type="time"
													placeholder=""
													label="Arrival Time"
													name="arrival"
													onChange={(e) => setArrivalEdit(e.target.value)}
													value={arrivalEdit}

												/>
												<InputField
													type="time"
													label="Departure time"
													name="departure"
													onChange={(e) => setDepartureEdit(e.target.value)}
													value={departureEdit}

												/>
												<div onClick={updateType}>
													<ButtonSecondary value={"Update"} />
												</div>
											</div>
											{/* <div className='flex justify-between w-1/3  mt-[55px]'>
                                <div>
                                    <p
                                        className='text-black text-lg cursor-pointer'
                                        onClick={closeEditData}
                                    >
                                        X
                                    </p>
                                </div>
                            </div> */}
										</div>
									) : null}
									{/* edit popup end */}
									{attendanceTypes.map((type) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={type.id}
											>
												<td className="text-xs p-3 text-gray5">
													{type.attendanceType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{type.arrival}
												</td>
												<td className="text-xs p-3 text-gray5">
													{type.departure}
												</td>

												<td className="text-xs p-3 text-gray5 flex">
													<MdDeleteOutline
														onClick={() => deleteType(type)}
														className="text-red w-4 h-4"
													/>
													<BsPencilSquare
														className="text-warning h-4 w-4 ml-5"
														onClick={() => openEditData(type)}
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
					<div className="w-2/3 ml-5" onClick={closeAttendance}></div>
				</div>
			) : null}

			<div className="rounded-md ml-5 shadow-md bg-white  p-5 h-screen overflow-y-auto mt-2 w-full">
				<div className="flex justify-between">
					<div onClick={openAttendance} className="w-64">
						<Button2 value={"Add Attendance Time"} />
					</div>
					<div>
						<p className="text-secondary text-xl mt-2  font-semibold">
							Staff Attendance
						</p>
					</div>
				</div>

				<br />
				<AttedanceComp />
			</div>
		</div>
	);
}

export default StaffAttendance;
