import * as React from "react";
import "../../assets/styles/main.css";

function StudentsTable2({ students }) {

	return (
		<table className="mt-4 w-full table-auto">
			<thead style={{ backgroundColor: "#0d6dfd10" }}>
				<th className="p-2 text-primary text-sm text-left">Full Name</th>
				<th className="p-2 text-primary text-sm text-left">Class</th>
				<th className="p-2 text-primary text-sm text-left">Contact</th>
				<th className="p-2 text-primary text-sm text-left">Balance</th>
			</thead>
			<tbody>
				{Array.isArray(students) && students.map((patient) => {
					return (
						<tr
							className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
							key={patient.id}
						>
							<td className="flex pl-2">
								<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold text-primary bg-primary3">
									{patient?.firstName[0]} {patient?.lastName[0]}
								</div>
								<div>
									<p className="text-sm p-3 -mt-1 text-gray5">
										{patient?.firstName} {patient?.middleName}{" "}
										{patient?.lastName}
									</p>
									<p className="text-red text-xs -mt-3 ml-3">
										{patient?.identifier}
									</p>
								</div>
							</td>

							<td className="text-xs p-3 text-gray5">{patient?.classes[0]?.class}</td>

							<td className="text-xs p-3 text-gray5">{patient?.phoneNumber}</td>
							<td className="text-xs p-3 text-gray5">{
								JSON.parse(patient?.feesBalance)?.balance
							}</td>

						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default StudentsTable2;
