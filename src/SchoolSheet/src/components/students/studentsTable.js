import React from "react";
import "../../assets/styles/main.css";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const StudentsTable = (props) => {
	const { studentData, deleteStudentInfo, nextPage, previousPage, canNextPage, canPreviousPage } = props;

	return (
		<div id="studentTable">
			<div className="h-[70vh] overflow-y-auto">
				<table className="mt-4 w-full table-auto" >
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Full Name</th>
						<th className="p-2 text-primary text-sm text-left">Gender</th>
						<th className="p-2 text-primary text-sm text-left">Student Type</th>

						<th className="p-2 text-primary text-sm text-left">Contacts</th>

						<th className="p-2 text-primary text-sm text-left">Class</th>

						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{studentData?.map((student) => {
							return (
								<tr
									className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
									key={student.id}
								>
									<td className="flex pl-2">
										<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
											{student.firstName[0]} {student.lastName[0]}
										</div>
										<div>
											<p className="text-sm p-3 -mt-1 text-gray5">
												{student.firstName} {student.middleName} {student.lastName}
											</p>
											<p className="text-red text-xs -mt-3 ml-3">{student.nin}</p>
										</div>
									</td>

									<td className="text-xs p-3 text-gray5">{student.gender}</td>
									<td className="text-xs p-3 text-gray5">
										{student.student_types?.map((t, i) => {
											return i === student.student_types.length - 1 ? <span>{t.type}</span> : null
										})}
									</td>

									<td className="text-xs p-3 text-gray5">{student.email}</td>
									<td className="text-xs p-3 text-gray5">
										{student.classes?.map((c, i) => {
											return i === student.classes.length - 1 ? <span>{c.class}</span> : null
										})}
									</td>

									<td className="text-xs p-3 w-28 text-gray5 flex justify-between">
										<MdDeleteOutline
											className="text-red  w-4 h-4"
											onClick={() => {
												deleteStudentInfo(student);
											}}
										/>
										<Link
											className="mx-3"
											to={`/editStudentsForm?student=${student.id}`}
										>
											<BsPencilSquare className="text-warning h-4 w-4" />
										</Link>
										<Link className="" to={`/showStudentsForm?student=${student.id}`} >
											<BsEye className="text-primary h-4 w-4" />
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			<Pagination previousPage={previousPage} nextPage={nextPage} canNextPage={canNextPage} canPrevPage={canPreviousPage} />
		</div>

	);
}

export default StudentsTable;
