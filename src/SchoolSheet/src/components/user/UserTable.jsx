import React, { useState } from "react";
import "../../assets/styles/main.css";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye } from "react-icons/bs";
import EditUser from "./EditUser";
import ShowUser from "./ShowUser";

function UserTable() {
	const [editData, setEditData] = useState(false);
	const [showData, setShowData] = useState(false);
	const patients = [
		{
			id: 1,
			identifier: "CN0001",
			first_name: "Alice",
			middle_name: "Barlow",
			last_name: "Namu",
			date_of_birth: "12-01-2023",
			gender: "Female",
			email: "mac@gmail.com",
			contacts: ["07577577", "0777076500"],
			noks: [
				{ name: "Halima Joyce", phone: "+250 6979678" },
				{ name: "Lugya Tom", phone: "+257 7979678" },
			],
		},
		{
			id: 2,
			identifier: "CN0002",
			first_name: "Tom",
			middle_name: "mac",
			last_name: "Lugya",
			date_of_birth: "12-01-2023",
			gender: "Male",
			email: "mac@gmail.com",
			contacts: ["07577577", "0777076500"],
			noks: [
				{ name: "Halima Joyce", phone: "+250 6979678" },
				{ name: "Lugya Tom", phone: "+257 7979678" },
			],
		},
		{
			id: 3,
			identifier: "CN0003",
			first_name: "Lubwama",
			middle_name: "mc",
			last_name: "Julius",
			date_of_birth: "12-01-2023",
			gender: "Female",
			email: "mac@gmail.com",
			contacts: ["07577577", "0777076500"],
			noks: [
				{ name: "Halima Joyce", phone: "+250 6979678" },
				{ name: "Lugya Tom", phone: "+257 7979678" },
			],
		},
		{
			id: 4,
			identifier: "CN0004",
			first_name: "Omeny",
			middle_name: "",
			last_name: "Robert",
			date_of_birth: "12-01-2023",
			gender: "Male",
			email: "lu@gmail.com",
			contacts: ["07577577", "0777076500"],
			noks: [
				{ name: "Halima Joyce", phone: "+250 6979678" },
				{ name: "Lugya Tom", phone: "+257 7979678" },
			],
		},
		{
			id: 5,
			identifier: "CN0005",
			first_name: "Seguya",
			middle_name: "Barlow",
			last_name: "Godfrey",
			date_of_birth: "12-01-2023",
			gender: "Female",
			email: "matt@gmail.com",
			contacts: ["07577577", "0777076500"],
			noks: [
				{ name: "Halima Joyce", phone: "+250 6979678" },
				{ name: "Lugya Tom", phone: "+257 7979678" },
			],
		},
		{
			id: 6,
			identifier: "CN0006",
			first_name: "Mattania",
			middle_name: "",
			last_name: "Muwaguzi",
			date_of_birth: "12-01-2023",
			gender: "Female",
			email: "kat@gmail.com",
			contacts: ["07577577", "0777076500"],
			noks: [
				{ name: "Halima Joyce", phone: "+250 6979678" },
				{ name: "Lugya Tom", phone: "+257 7979678" },
			],
		},
	];

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (patient) => {
		setEditData(true);
		console.log(patient);
	};

	const closeShowData = () => {
		setShowData(false);
	};
	const openShowData = (patient) => {
		setShowData(true);
		
	};

	return (
		<>
			{/* edit popup start */}
			{editData ? <EditUser closeEditData={closeEditData} /> : null}
			{/* edit popup end */}



			{/* show user popup start */}
			{showData ? <ShowUser closeShowData={closeShowData} /> : null}
			{/* show user popup end */}
			{" "}
			<table className="mt-4 w-full table-auto">
				<thead style={{ backgroundColor: "#0d6dfd10" }}>
					<th className="p-2 text-primary text-sm text-left">Full Name</th>
					<th className="p-2 text-primary text-sm text-left">Date Of Birth</th>
					<th className="p-2 text-primary text-sm text-left">Gender</th>
					<th className="p-2 text-primary text-sm text-left">Contact</th>

					<th className="p-2 text-primary text-sm text-left">Email</th>

					<th className="p-2 text-primary text-sm text-left">Action</th>
				</thead>
				<tbody>
					{patients.map((patient) => {
						return (
							<tr
								className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
								key={patient.id}
							>
								<td className="flex">
									<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary2">
										{patient.first_name[0]} {patient.last_name[0]}
									</div>
									<div>
										<p className="text-sm p-3 -mt-1 text-gray5">
											{patient.first_name} {patient.middle_name}{" "}
											{patient.last_name}
										</p>
										<p className="text-red text-xs -mt-3 ml-3">
											{patient.identifier}
										</p>
									</div>
								</td>
								<td className="text-xs p-3 text-gray5">
									{patient.date_of_birth} -{" "}
									{Math.abs(
										new Date().getFullYear() -
											new Date(patient.date_of_birth).getFullYear()
									)}
									yrs
								</td>
								<td className="text-xs p-3 text-gray5">{patient.gender}</td>

								<td className="text-xs p-3 text-gray5">
									{patient.contacts[0]}
								</td>

								<td className="text-xs p-3 text-gray5">{patient.email}</td>

								<td className="text-xs p-3 text-gray5 flex justify-between">
									<MdDeleteOutline
										
										className="text-red w-4 h-4"
									/> 
									<BsPencilSquare
										onClick={() => openEditData(patient)}
										className="text-warning h-4 w-4"
									/>
									<BsEye className="text-primary h-4 w-4" onClick={() => openShowData(patient)} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		
		</>
	);
}

export default UserTable;
