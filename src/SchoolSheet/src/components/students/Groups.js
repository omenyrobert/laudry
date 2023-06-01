import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import ButtonSecondary from "../ButtonSecondary";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import axiosInstance from "../../axios-instance";

let db = new Localbase("db");

function Groups() {

	const [groupsData, setGroupsData] = useState([]);

	// posting groups
	const [group, setGroup] = useState("");

	const postgroups = () => {
		let formData = {
			house: group,
		};

		if (group) {

			axiosInstance.post('/houses', formData)
				.then((response) => {
					const { status, payload } = response.data;
					if (status === false) {
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "error",
							title: "Oops...",
							text: payload,
						});
						return;
					}

					setGroup("");

					// fetch after
					fetchgroups();

					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch((error) => { });


		}
	};

	// fetch groups
	const fetchgroups = () => {

		axiosInstance.get('/houses')
			.then((response) => {
				const { status, payload } = response.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						title: "Oops...",
						text: payload,
					});
					return;
				}
				setGroupsData(payload);
			})
			.catch((error) => { });
	};

	// fetching groups
	useEffect(() => {
		fetchgroups();
	}, []);

	//deleting groups
	const deletegroups = (groups) => {
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
				/*db.collection("groupsTbl")
					.doc({ id: groups.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchgroups();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
					});*/

				axiosInstance.delete('/houses/' + groups.id)
					.then((response) => {
						const { status, payload } = response.data;
						if (status === false) {
							const MySwal = withReactContent(Swal);
							MySwal.fire({
								icon: "error",
								title: "Oops...",
								text: payload,
							});
							return;
						}
						// fetch after
						fetchgroups();
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => { });
			}
		});
	};

	// updating groups
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (group) => {
		setEditData(true);
		setGroupEdit(group?.house);
		setGroupsId(group.id);
	};

	const [editData, setEditData] = useState(false);
	const [groupEdit, setGroupEdit] = useState("");
	const [groupsId, setGroupsId] = useState("");


	const updategroups = () => {

		let formData = {
			house: groupEdit,
			id: groupsId
		}

		axiosInstance.put('/houses/' + groupsId, formData)
			.then((response) => {
				const { status, payload } = response.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						title: "Oops...",
						text: payload,
					});
					return;
				}
				// fetch after
				fetchgroups();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			})
			.catch((error) => { });
	};






	return (
		<>
			<h5 className="text-lg font-medium text-secondary">Groups/House</h5>
			<div className="w-full h-[80vh]">
				<div className="flex justify-between bg-white pl-4 shadow-lg">
					<div className="w-1/2">
						<InputField
							type="text"
							placeholder="Enter House name"
							label="House Name"
							value={group}
							onChange={(e) => setGroup(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="mt-8 mr-5">
						<br />
						<div onClick={postgroups}>
							<Button2 value={"Add House"} />
						</div>

					</div>
				</div>

				<table className="mt-10 w-[95%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">House</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>


						{/* edit popup start */}
						{editData ?
							<div className="absolute shadow-lg rounded flex w-[500px] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="text"
										placeholder="Enter House Name"
										label="House Name"
										onChange={(e) => setGroupEdit(e.target.value)}
										value={groupEdit}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="flex justify-between w-1/3 mt-[55px]">
									<div onClick={updategroups}>
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
							: null}
						{/* edit popup end */}




						{groupsData.map((group) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={group.id}
								>
									<td className="text-xs p-3 text-gray5">
										{group.house}
									</td>
									<td className="text-xs p-3 text-gray5">
										<div className="flex">
											<MdDeleteOutline onClick={() => deletegroups(group)} className="text-red w-4 h-4" />
											<BsPencilSquare
												onClick={() => openEditData(group)}
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
export default Groups;
