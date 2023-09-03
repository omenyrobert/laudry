import React, { useState, useEffect } from "react";
import { TbCheck } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import InputField from "../InputField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Button2 from "../Button2";

let db = new Localbase("db");

function AttedanceComp() {
	const [staffInfo, setStaffInfo] = useState([]);
	// fetch staff info
	const fetchStaffInfo = () => {
		db.collection("staffInfo")
			.get()
			.then((staff) => {
				const newData = staff;
				setStaffInfo(newData);
			});
	};

	const [attendanceList, setAttendanceList] = useState([]);
	// fetch staff info
	const fetchCheckInList = () => {
		db.collection("checkInTbl")
			.get()
			.then((attendance) => {
				const newData = attendance;
				setAttendanceList(newData);
			});
	};

	const fetchCheckOutList = () => {
		db.collection("checkInTbl")
			.get()
			.then((attendance) => {
				const newData = attendance;
				setAttendanceList(newData);
			});
	};

	useEffect(() => {
		fetchStaffInfo();
		fetchCheckInList();
		fetchCheckOutList();
	}, []);

	const [checktime, setCheckTime] = useState("");

	const [staffId, setStaffId] = useState("");

	const [timeBox, setTimeBox] = useState(false);

	const openTimeBox = (staff) => {
		setStaffId(staff.id);
		setTimeBox(true);
	};
	const closeTimeBox = () => {
		setTimeBox(false);
	};

	const checkIn = () => {
		if (checktime) {
			let formData = {
				staffId: staffId,
				checkIn: checktime,
			};
			db.collection("checkInTbl")
				.add(formData)
				.then((response) => {
					setCheckTime("");
					fetchCheckInList();
					closeTimeBox();
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

	const checkOut = () => {
		if (checktime) {
			let formData = {
				staffId: staffId,
				checkIn: checktime,
			};
			db.collection("checkOutTbl")
				.add(formData)
				.then((response) => {
					setCheckTime("");
					fetchCheckOutList();
					closeTimeBox();
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

	const [staffList, setStaffList] = useState(false);

	const openStaffList = () => {
		setStaffList(true);
	};

	const closeStaffList = () => {
		setStaffList(false);
	};

	return (
		<>
			{staffList ? (
				<div className="w-[600px] border border-gray1 absolute bg-white h-[80vh] overflow-y-auto shadow-2xl  z-50">
					<div className="bg-gray1 p-3 text-primary font-semibold rounded flex justify-between">
						<div>Staff Members</div>
						<div>
							<p className="cursor-pointer" onClick={closeStaffList}>
								X
							</p>
						</div>
					</div>
					<table className="mt-10 w-[95%] ml-3 table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Full Name</th>

							<th className="p-2 text-primary text-sm text-left">Staff Type</th>

							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{timeBox ? (
								<div className="absolute w-[350px] ml-28 z-30 shadow-2xl bg-white p-5 border border-gray2 rounded">
									<div className="flex justify-between">
										<div>Attedance</div>
										<div>
											<p className=" cursor-pointer" onClick={closeTimeBox}>
												X
											</p>
										</div>
									</div>

									<InputField
										value={checktime}
										onChange={(e) => setCheckTime(e.target.value)}
										type="time"
									/>
									<div className="flex justify-between">
										<div className="w-[100px]" onClick={checkIn}>
											<Button value={"Check In"} />
										</div>
										<div className="w-[120px]" onClick={checkOut}>
											<ButtonSecondary value={"Check Out"} />
										</div>
									</div>
								</div>
							) : null}

							{staffInfo.map((staff) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={staff.id}
									>
										<td className="flex">
											<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
												{staff.firstName[0]} {staff.lastName[0]}
											</div>
											<div>
												<p className="text-sm p-3 -mt-1 text-gray5">
													{staff.firstName} {staff.middleName} {staff.lastName}
												</p>
											</div>
										</td>

										<td className="text-xs p-3 text-gray5">
											{staff.staffType.value}
										</td>

										<td className="text-xs text-gray5 flex justify-between">
											<div
												onClick={() => openTimeBox(staff)}
												className="text-primary p-2 m-1 bg-primary3 rounded"
											>
												Register
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : null}



			<div className="flex justify-between">
				<div className="flex">
					<div className="text-sm">
						<InputField label="From Date" type="date" />
					</div>
					<div className="text-sm ml-5">
						<InputField label="To Date" type="date" />
					</div>
				</div>
				<div className="w-[300px] ml-2 mt-7">
					<InputField
						placeholder="Search for Student"
						type="search"
						icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
					/>
				</div>

				<div>
					<div className="flex mt-14">
						<div className="ml-10 p-2 text-sm text-secondary flex rounded-md cursor-pointer">
							<FaChevronLeft className="w-4 h-4 mt-[2px] mr-2 " />
							Prev
						</div>
						<div className="text-primary w-[90px] ml-5 p-2 text-sm font-medium">
							11th - 17th
						</div>

						<div className="ml-10 p-2 text-sm text-primary flex rounded-md cursor-pointer">
							Next <FaChevronRight className="w-4 h-4 mt-[3px] ml-1" />
						</div>
					</div>
				</div>
				<div onClick={openStaffList} className="mt-14">
					<Button2 value={"Staff Members"} />
				</div>
			</div>

			<div className="flex bg-secondary p-2 text-sm mt-5">
				<div className="w-1/4">Staff</div>
				<div className="w-1/4">Monday</div>
				<div className="w-1/4">Tuesday </div>
				<div className="w-1/4">Wednesday</div>
				<div className="w-1/4">Thursday</div>
				<div className="w-1/4">Friday</div>
				<div className="w-1/4">Saturday</div>
			</div>
			<div className="flex border-b border-gray2 p-2 ">
				<div className="w-1/4 text-sm">Omeny Robert</div>
				<div className="w-1/4 flex">
					<TbCheck className="w-5  h-5 text-green" />
					<div className="text-xs text-gray5 ml-5">8:00am - 6:00pm</div>
				</div>
				<div className="w-1/4 flex">
					<TbCheck className="w-5 h-5 text-green" />
					<div className="text-xs text-gray5 ml-5">8:00am - 6:00pm</div>
				</div>
				<div className="w-1/4">
					<RxCross1 className="w-5 h-5 text-red" />
				</div>
				<div className="w-1/4 flex">
					<TbCheck className="w-5 h-5 text-green" />
					<div className="text-xs text-gray5 ml-5">8:00am - 6:00pm</div>
				</div>
				<div className="w-1/4 flex">
					<TbCheck className="w-5 h-5 text-green" />
					<div className="text-xs text-gray5 ml-5">8:00am - 6:00pm</div>
				</div>
				<div className="w-1/4 flex">
					<TbCheck className="w-5 h-5 text-green" />
					<div className="text-xs text-gray5 ml-5">8:00am - 6:00pm</div>
				</div>
			</div>
		</>
	);
}
export default AttedanceComp;
