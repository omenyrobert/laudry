import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import StaffForm from "./StaffForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStaffMembers } from '../../store/schoolSheetSlices/schoolStore';

const StaffComp = () => {
	const dispatch = useDispatch();
	const [AllStaff, setAllStaff] = useState(true);

	const { staffMembers } = useSelector((state) => state.schoolStore);

	useEffect(() => {
		dispatch(getStaffMembers());
	}, [dispatch]);

	return (
		<>
			<div className="w-full h-[80vh]">
				<StaffForm />

				{AllStaff ? (
					<table className="mt-10 w-[98%] table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Full Name</th>
							<th className="p-2 text-primary text-sm text-left">
								Date of Birth
							</th>
							<th className="p-2 text-primary text-sm text-left">
								Place Of Residence
							</th>
							<th className="p-2 text-primary text-sm text-left">Staff Type</th>
							<th className="p-2 text-primary text-sm text-left">
								Qualification
							</th>
							<th className="p-2 text-primary text-sm text-left">Experience</th>
							<th className="p-2 text-primary text-sm text-left">Classes</th>
							<th className="p-2 text-primary text-sm text-left">Subjects</th>
							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{staffMembers.map((staff) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={staff.id}
									>
										<td className="flex">
											<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
												{staff.first_name[0]} {staff.last_name[0]}
											</div>
											<div>
												<p className="text-sm p-3 -mt-1 text-gray5">
													{staff.first_name} {staff.middle_name} {staff.last_name}
												</p>
											</div>
										</td>
										<td className="text-xs p-3 text-gray5">
											{/* {staff.dateOfBirth} -{" "}
											{Math.abs(
												new Date().getFullYear() -
												new Date(staff.dateOfBirth).getFullYear()
											)}
											yrs */}
										</td>
										<td className="text-xs p-3 text-gray5">
											{staff.residence}
										</td>
										<td className="text-xs p-3 text-gray5">
											{staff.staff_type.type}
										</td>
										<td className="text-xs p-3 text-gray5">
											{staff.qualification}
										</td>
										<td className="text-xs p-3 text-gray5">
											{staff.workExperience}
										</td>
										<td className="text-xs p-3 text-gray5">{staff.classes}</td>
										<td className="text-xs p-3 text-gray5">{staff.subjects}</td>
										<td className="text-xs p-3 text-gray5 flex justify-between">
											<Link to="/staffEditForm">
												<FaEye className="text-primary w-4 h-4 ml-2" />
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : null}
			</div>
		</>
	);
}
export default StaffComp;
