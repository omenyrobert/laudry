import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye } from "react-icons/bs";
import EditUser from "./EditUser";
import ShowUser from "./ShowUser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from "../../axios-instance";
import Loader from "../Loader"

function UserTable() {
	const [editData, setEditData] = useState(false);
	const [showData, setShowData] = useState(false);
	const users = [
		{
			id: 1,
			identifier: "CN0001",
			first_name: "Alice",
			middle_name: "Barlow",
			last_name: "Namu",
			location: "kira",
			email: "mac@gmail.com",
			phone: "0777076500",
		},
		{
			id: 2,
			identifier: "CN0002",
			first_name: "Tom",
			middle_name: "mac",
			last_name: "Lugya",
			location: "kira",
			email: "mac@gmail.com",
			phone: "0777076500",
		},
		{
			id: 3,
			identifier: "CN0003",
			first_name: "Lubwama",
			middle_name: "mc",
			last_name: "Julius",
			location: "kira",
			email: "mac@gmail.com",
			phone: "0777076500",
		},
		{
			id: 4,
			identifier: "CN0004",
			first_name: "Omeny",
			middle_name: "",
			last_name: "Robert",
			location: "kira",
			email: "lu@gmail.com",
			phone: "0777076500",
		},
		{
			id: 5,
			identifier: "CN0005",
			first_name: "Seguya",
			middle_name: "Barlow",
			last_name: "Godfrey",
			location: "kira",
			email: "matt@gmail.com",
			phone: "0777076500",
		},
		{
			id: 6,
			identifier: "CN0006",
			first_name: "Mattania",
			middle_name: "",
			last_name: "Muwaguzi",
			location: "kira",
			email: "kat@gmail.com",
			phone: "0777076500",
		},
	];

	const closeEditData = () => {
		setEditData(false);
	};
	const [userData, setUserData] = useState("")
	const openEditData = (user) => {
		setEditData(true);
		console.log(user);
		setUserData(user)
	};

	const closeShowData = () => {
		setShowData(false);
	};
	const openShowData = (user) => {
		setShowData(true);
		setUserData(user)

	};

	const [loading, setLoading] = useState(false)

	const [userArray, setUserArray] = useState([])
	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			setLoading(true)
			let res = await axiosInstance.get("/staff");
			if (res.status) {
				// console.log('ree', res)
				setLoading(false)
				setUserArray(res.data.payload)
			}
		} catch (error) {
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	const deleteUser = (user) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const response = await axiosInstance.delete(
						`/user/${user.id}`
					);
					const { data } = response;
					const { status } = data;
					if (status) {
						fetchUsers()
						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};



	return (
		<>
			{/* edit popup start */}
			{editData ? <EditUser closeEditData={closeEditData} userData={userData} /> : null}
			{/* edit popup end */}



			{/* show user popup start */}
			{showData ? <ShowUser closeShowData={closeShowData} userData={userData} /> : null}
			{/* show user popup end */}
			{" "}
			<div className="h-[70vh] overflow-y-auto">

				{loading ? <div className="flex justify-center items-center h-52"> <Loader /> </div> : null}
				<table className="mt-4 w-[98%] table-auto ml-5">
					<thead style={{ backgroundColor: "#f9f9f9" }}>
						<th className="p-2 text-primary text-sm text-left">Full Name</th>
						<th className="p-2 text-primary text-sm text-left">Location</th>
						<th className="p-2 text-primary text-sm text-left">Phone</th>
						<th className="p-2 text-primary text-sm text-left">Email</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{userArray.map((user) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={user.id}
								>
									<td className="flex">
										<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
											{user.first_name[0]}
										</div>
										<div>
											<p className="text-sm p-3 -mt-1 text-gray5">
												{user.first_name} {user.middle_name}{" "}
												{user.last_name}
											</p>

										</div>
									</td>
									<td className="text-xs p-3 text-gray5">
										{user?.location}
									</td>


									<td className="text-xs p-3 text-gray5">
										{user?.phone}
									</td>

									<td className="text-xs p-3 text-gray5">{user.email}</td>

									<td className="text-xs p-3 w-28 text-gray5 flex justify-between">
										<MdDeleteOutline
											onClick={() => deleteUser(user)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											onClick={() => openEditData(user)}
											className="text-warning h-4 w-4"
										/>
										<BsEye className="text-primary h-4 w-4" onClick={() => openShowData(user)} />
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

export default UserTable;
