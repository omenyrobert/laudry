import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import StaffForm from "./StaffForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStaffMembers } from "../../store/schoolSheetSlices/schoolStore";
import Loader from "../Loader";
// import ButtonLoader from "../ButtonLoader";

const StaffComp = () => {
	const dispatch = useDispatch();
	const [AllStaff, setAllStaff] = useState(true);
	const [searchedStaff, setSearchedStaff] = useState([]);

	const { staffMembers } = useSelector((state) => state.schoolStore);

	useEffect(() => {
		dispatch(getStaffMembers());
		console.log("staff", staffMembers);
	}, [dispatch]);

	useEffect(() => {
		setSearchedStaff(staffMembers);
	}, [staffMembers]);

	return (
		<>
			<div className="w-full h-full">
				<StaffForm
					searchedStaff={searchedStaff}
					setSearchedStaff={setSearchedStaff}
					AllStaff={staffMembers}
					setAllStaff={setAllStaff}
				/>

				{AllStaff ? (
					<div className="h-[70vh] overflow-y-auto">
						<table className="mt-10 w-[98%]  table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">
									Full Name
								</th>

								<th className="p-2 text-primary text-sm text-left">
									Place Of Residence
								</th>
								<th className="p-2 text-primary text-sm text-left">
									Staff Type
								</th>

								<th className="p-2 text-primary text-sm text-left">Classes</th>
								<th className="p-2 text-primary text-sm text-left"></th>
								<th className="p-2 text-primary text-sm text-left">Subjects</th>
								<th className="p-2 text-primary text-sm text-left"></th>
								<th className="p-2 text-primary text-sm text-left">Action</th>
							</thead>
							<tbody>
								{/* <Loader/> */}

								{searchedStaff.map((staff) => {
									return (
										<tr
											className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
											key={staff.id}
										>
											<td className="flex pl-2">
												<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
													{staff.first_name[0]} {staff.last_name[0]}
												</div>
												<div>
													<p className="text-sm p-3 -mt-1 text-gray5">
														{staff.first_name} {staff.middle_name}{" "}
														{staff.last_name}
													</p>
												</div>
											</td>

											<td className="text-xs p-3 text-gray5">
												{staff.address}
											</td>
											<td className="text-xs p-3 text-gray5">
												{staff?.staff_type?.type}
											</td>

											<td colSpan="3" className="text-xs p-3 text-gray5 flex">
												{staff?.classes.map((item) => (
													<div className="p-1 rounded bg-white m-1 border border-gray2 w-auto">{item.class}</div>
												))}
											</td>
											<td>

											</td>
											<td colSpan="3" className="text-xs p-3 text-gray5 flex">
											{staff?.subjects.map((item) => (
													<div className="p-1 rounded bg-white m-1 border border-gray2 w-auto">{item.subject}</div>
												))}
											</td>
											<td></td>

											<td className="text-xs p-3 text-gray5 flex justify-between">
												<Link to={"/staffEditForm?staffId=" + staff.id}>
													<FaEye className="text-primary w-4 h-4 ml-2" />
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : null}
				<Loader />
			</div>
		</>
	);
};
export default StaffComp;
