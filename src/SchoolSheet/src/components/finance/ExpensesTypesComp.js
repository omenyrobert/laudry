import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../assets/styles/main.css";
import Button2 from "../Button2";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";


function ExpensesTypesComp() {
	// post expense Type
	const [expenseType, setExpenseType] = useState(null);
	const [loading, setLoading] = useState(false)
	const postExpenseType = () => {
		let formData = {
			name: expenseType,
			type: "expense"
		};
		if (expenseType) {
			setLoading(true)
			axiosInstance.post("/transaction-types", formData)
				.then((response) => {
					setExpenseType(null);
					fetchExpenseTypes();
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

	// fetch expense typess
	const [expenseTypesData, setExpenseTypesData] = useState([]);
	const fetchExpenseTypes = () => {
		axiosInstance.get("/transaction-types/expense")
			.then((response) => {
				setExpenseTypesData(response.data.payload);
			})
			.catch(console.error());
	};

	// update
	const [editData, setEditData] = useState(false);
	const [expenseTypeEdit, setExpenseTypeEdit] = useState("");
	const [expenseTypeId, setExpenseTypeId] = useState("");
	const [editLoading, setEditLoading] = useState(false)
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (expenseTypeItem) => {
		setEditData(true);
		setExpenseTypeEdit(expenseTypeItem?.name);
		setExpenseTypeId(expenseTypeItem.id);
	};
	const updateExpenseType = () => {

		let formData = {
			name: expenseTypeEdit,
			type: "expense",
			id: expenseTypeId
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
				fetchExpenseTypes();
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

	//deleting expense types
	const deleteExpenseType = (expenseTypeItem) => {
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

				axiosInstance.delete(`/transaction-types/${expenseTypeItem.id}`)
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
						fetchExpenseTypes();
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

	// fetching expense types
	useEffect(() => {
		fetchExpenseTypes();
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
				<Button2 value={"Expense Types"} />
			</div>
			{modal ? (
				<div className="w-[100vw] z-50 flex h-full bg-black overflow-y-auto absolute bg-opacity-60">
					<div className="w-3/12 bg-white h-full">
						<div className="bg-gray1 p-3 flex justify-between text-primary font-semibold">
							<div>
								<h5 className="text-lg font-medium">Expense Types</h5>
							</div>
							<div onClick={closeModal}>
								<p className="cursor-pointer">X</p>
							</div>
						</div>
						<div className="w-full h-[80vh]">
							<div className="bg-white p-5 flex ">

								<div className="w-7/12">
									<InputField
										type="text"
										placeholder="Enter Expense Type"
										label="Expense Type"
										value={expenseType}
										onChange={(e) => setExpenseType(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>

								</div>

								<div className="mt-14 ml-2" onClick={postExpenseType}>
									{
										loading ? <ButtonLoader /> : <Button value={"Add"} />
									}
								</div>
							</div>

							<table className="mt-10 w-[95%] ml-3 table-auto">
								<thead style={{ backgroundColor: "#0d6dfd10" }}>
									<th className="p-2 text-primary text-sm text-left">Type</th>
									<th className="p-2 text-primary text-sm text-left">Action</th>
								</thead>
								<tbody>
									{/* edit popup start */}
									{editData ? (
										<div className="absolute shadow-lg rounded flex w-[400px] p-5 bg-white">
											<div className="w-2/3 pr-5">
												<InputField
													type="text"
													placeholder="Enter Expense Type"
													label="Expense Type"
													value={expenseTypeEdit}
													onChange={(e) => setExpenseTypeEdit(e.target.value)}
													
												/>
											</div>
											<div className="flex justify-between w-1/3 mt-[55px]">
												<div onClick={updateExpenseType}>
													{
														editLoading ? <ButtonLoader /> : <ButtonSecondary value={"Update"} />
													}
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
									) : null}
									{/* edit popup end */}

									{expenseTypesData.map((expenseTypeItem) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expenseTypeItem.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expenseTypeItem.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													<div className="flex">
														<MdDeleteOutline
															onClick={() => deleteExpenseType(expenseTypeItem)}
															className="text-red w-4 h-4"
														/>
														<BsPencilSquare
															onClick={() => openEditData(expenseTypeItem)}
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
					</div>
					<div className="ml-5 w-9/12" onClick={closeModal}></div>
				</div>
			) : null}
		</>
	);
}
export default ExpensesTypesComp;
