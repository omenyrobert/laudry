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

function PaymentTypes() {
	// post payment Type
	const [loading, setLoading] = useState(false)
	const [paymentType, setpaymentType] = useState("");


	const postpaymentType = () => {
		let formData = {
			name: paymentType,
			type: "payment"
		};
		if (paymentType) {
			setLoading(true)
			axiosInstance.post("/transaction-types", formData)
				.then((response) => {
					setpaymentType(null);
					fetchpayamentTypes();
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

	// fetch payment typess
	const [paymentTypesData, setpaymentTypesData] = useState([]);

	const fetchpayamentTypes = () => {
		axiosInstance.get("/transaction-types/payment")
			.then((response) => {
				setpaymentTypesData(response.data.payload);
			})
			.catch(console.error());
	};

	// update
	const [editData, setEditData] = useState(false);
	const [paymentTypeEdit, setpaymentTypeEdit] = useState("");
	const [paymentTypeId, setpaymentTypeId] = useState("");
	const [editLoading, setEditLoading] = useState(false)
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (paymentType) => {
		setEditData(true);
		setpaymentTypeEdit(paymentType?.name);
		setpaymentTypeId(paymentType.id);
	};
	const updatepaymentType = () => {

		let formData = {
			name: paymentTypeEdit,
			type: "payment",
			id: paymentTypeId
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
				fetchpayamentTypes();
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

	//deleting payment types
	const deletepaymentType = (paymentTypeItem) => {
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
				axiosInstance.delete(`/transaction-types/${paymentTypeItem.id}`)
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
						fetchpayamentTypes();
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

	// fetching payment types
	useEffect(() => {
		fetchpayamentTypes();
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
				<Button2 value={"Payment Types"} />
			</div>
			{modal ? (
				<div className="w-[100vw] z-50 flex h-full bg-black overflow-y-auto absolute bg-opacity-60">
					<div className="w-3/12 bg-white h-full">
						<div className="bg-gray1 p-3 flex justify-between text-primary font-semibold">
							<div>
								<h5 className="text-lg font-medium">Payment Types</h5>
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
										placeholder="Enter Payment Type"
										label="Payment Type"
										value={paymentType}
										onChange={(e) => setpaymentType(e.target.value)}

									/>
								</div>

								<div className="ml-2 mt-14" onClick={postpaymentType}>
									{
										loading ? <ButtonLoader /> : <Button value={"Add"} />
									}
								</div>
							</div>

							<table className="mt-10 ml-2 w-[95%] table-auto">
								<thead style={{ backgroundColor: "#0d6dfd10" }}>
									<th className="p-2 text-primary text-sm text-left">Type</th>
									<th className="p-2 text-primary text-sm text-left">Action</th>
								</thead>
								<tbody>
									{/* edit popup start */}
									{editData ? (
										<div className="absolute shadow-lg rounded flex w-[350px] p-5 bg-white">
											<div className="w-2/3 pr-5">
												<InputField
													type="text"
													placeholder="Enter payment Type"
													label="payment Type"
													value={paymentTypeEdit}
													onChange={(e) => setpaymentTypeEdit(e.target.value)}

												/>
											</div>
											<div className="flex justify-between w-1/3 mt-[55px]">
												<div onClick={updatepaymentType}>
													{
														editLoading ? <ButtonLoader /> : <ButtonSecondary value={"Update"} />
													}

												</div>
												<div className="ml-3">
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

									{paymentTypesData.map((paymentTypeItem) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={paymentType?.id}
											>
												<td className="text-xs p-3 text-gray5">
													{paymentTypeItem?.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													<div className="flex">
														<MdDeleteOutline
															onClick={() => deletepaymentType(paymentTypeItem)}
															className="text-red w-4 h-4"
														/>
														<BsPencilSquare
															onClick={() => openEditData(paymentTypeItem)}
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
export default PaymentTypes;
