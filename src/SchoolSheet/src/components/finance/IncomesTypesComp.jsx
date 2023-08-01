import React, { useState, useEffect } from "react";
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
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";

let db = new Localbase("db");

function IncomesTypeComp() {
	// post Income Type
	const [incomeType, setIncomeType] = useState("");

	const [loading, setLoading] = useState(false)
	const postIncomeType = () => {
		let formData = {
			name: incomeType,
			type: "income"
		};
		if (incomeType) {
			setLoading(true)
			axiosInstance.post("/transaction-types", formData)
				.then((response) => {
					setIncomeType(null);
					fetchInomeTypes();
					setLoading(false)
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

	// fetch income typess
	const [incomeTypesData, setIncomeTypesData] = useState([]);

	const fetchInomeTypes = () => {
		axiosInstance.get("/transaction-types/income")
			.then((response) => {
				setIncomeTypesData(response.data.payload);
			})
			.catch(console.error());
	};

	// update
	const [editData, setEditData] = useState(false);
	const [incomeTypeEdit, setincomeTypeEdit] = useState("");
	const [incomeTypeId, setincomeTypeId] = useState("");
	const [editLoading, setEditLoading] = useState(false)
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (incomeType) => {
		setEditData(true);
		setincomeTypeEdit(incomeType?.name);
		setincomeTypeId(incomeType.id);
	};

	const updateIncomeType = () => {

		let formData = {
			name: incomeTypeEdit,
			type: "income",
			id: incomeTypeId
		}
		setEditLoading(true)
		axiosInstance.put("/transaction-types", formData)
			.then((response) => {
				const { status, payload } = response.data

				const MySwal = withReactContent(Swal);

				if (status === false) {
					setEditLoading(false)
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
						text: payload,
						title: "Ooops..."
					});
					return
				}
				fetchInomeTypes();
				setEditLoading(false)
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			})
			.catch(console.error());

	};

	// delete

	//deleting income types
	const deleteIncomeType = (incomeTypeItem) => {
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
				axiosInstance.delete(`/transaction-types/${incomeTypeItem.id}`)
					.then((response) => {
						const { status, payload } = response.data

						const MySwal = withReactContent(Swal);

						if (status === false) {
							MySwal.fire({
								icon: "success",
								showConfirmButton: false,
								timer: 500,
								text: payload,
								title: "Ooops..."
							});
							return
						}
						fetchInomeTypes();
						MySwal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch(console.error());
			}
		});
	};

	// fetching income types
	useEffect(() => {
		fetchInomeTypes();
	}, []);

	const [modal, setModal] = useState(false);

	const showModal = () => {
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};
	return (
		<>
			<div className="w-52" onClick={showModal}>
				<Button2 value={"Income Types"} />
			</div>
			{modal ? (
				<div className="w-[100vw] z-50 flex h-full bg-black overflow-y-auto absolute bg-opacity-60">
					<div className="w-3/12 bg-white h-full">
						<div className="p-3 bg-gray1 text-primary font-semibold flex justify-between">
							<div>Incomes Types</div>
							<div className="cursor-pointer" onClick={closeModal}>
								X
							</div>
						</div>
						<div className="flex  p-5">
							<div className="w-7/12">
								<InputField
									type="text"
									placeholder="Enter Income Type"
									label="Income Type"
									value={incomeType}
									onChange={(e) => setIncomeType(e.target.value)}

								/>
							</div>

							<div onClick={postIncomeType} className="mt-14 ml-5">
								{
									loading ? <ButtonLoader /> : <Button value={"Add"} />
								}
							</div>
						</div>

						<table className="mt-5 ml-2 w-[95%] table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">Type</th>
								<th className="p-2 text-primary text-sm text-left">Action</th>
							</thead>
							<tbody>
								{/* edit popup start */}
								{editData ? (
									<div className="absolute shadow-lg rounded flex w-auto p-5 bg-white">
										<div className="w-2/3 pr-5">
											<InputField
												type="text"
												placeholder="Enter Income Type"
												label="Income Type"
												value={incomeTypeEdit}
												onChange={(e) => setincomeTypeEdit(e.target.value)}

											/>
										</div>
										<div className="flex justify-between w-1/3 mt-[55px]">
											<div onClick={updateIncomeType}>
												{
													editLoading ? <ButtonLoader /> : <ButtonSecondary value={"Update"} />
												}
											</div>
											<div className="ml-5 mr-5">
												<p
													className="text-black  text-lg cursor-pointer"
													onClick={closeEditData}
												>
													X
												</p>
											</div>
										</div>
									</div>
								) : null}
								{/* edit popup end */}

								{incomeTypesData.map((incomeTypeItem) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={incomeType?.id}
										>
											<td className="text-xs p-3 text-gray5">
												{incomeTypeItem?.name}
											</td>
											<td className="text-xs p-3 text-gray5">
												<div className="flex">
													<MdDeleteOutline
														onClick={() => deleteIncomeType(incomeTypeItem)}
														className="text-red w-4 h-4"
													/>
													<BsPencilSquare
														onClick={() => openEditData(incomeTypeItem)}
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
					<div className="ml-5 w-9/12" onClick={closeModal}></div>
				</div>
			) : null}
		</>
	);
}
export default IncomesTypeComp;
