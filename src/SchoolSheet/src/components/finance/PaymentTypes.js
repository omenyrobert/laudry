import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
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

let db = new Localbase("db");

function PaymentTypes() {
	// post payment Type
	const [paymentType, setpaymentType] = useState("");
	const postpaymentType = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			paymentType: paymentType,
		};
		if (paymentType) {
			db.collection("paymentTypesTbl")
				.add(formData)
				.then((response) => {
					setpaymentType("");
					fetchpayamentTypes();
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
		db.collection("paymentTypesTbl")
			.get()
			.then((paymentTypes) => {
				const newData = paymentTypes;
				setpaymentTypesData(newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [paymentTypeEdit, setpaymentTypeEdit] = useState("");
	const [paymentTypeId, setpaymentTypeId] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (paymentType) => {
		setEditData(true);
		setpaymentTypeEdit(paymentType?.paymentType);
		setpaymentTypeId(paymentType.id);
	};
	const updatepaymentType = () => {
		db.collection("paymentTypesTbl")
			.doc({ id: paymentTypeId })
			.update({
				paymentType: paymentTypeEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchpayamentTypes();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
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
				db.collection("paymentTypesTbl")
					.doc({ id: paymentTypeItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchpayamentTypes();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});
	};

	// fetching payment types
	useEffect(() => {
		fetchpayamentTypes();
	}, []);

	return (
		<>
			<div className="w-full h-[80vh]">
				<div className=" bg-white p-5 shadow-lg rounded-md">
					<h5 className="text-xl text-secondary font-medium">Payment Types</h5>
					<InputField
						type="text"
						placeholder="Enter Payment Type"
						label="Payment Type"
						value={paymentType}
						onChange={(e) => setpaymentType(e.target.value)}
						icon={<FaPen className="w-3 -ml-7 mt-3" />}
					/>

					<div onClick={postpaymentType}>
						<Button value={"Add Payment Type"} />
					</div>
				</div>
				
				<table className="mt-10 w-[95%] table-auto">
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
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="flex justify-between w-1/3 mt-[55px]">
									<div onClick={updatepaymentType}>
										<ButtonSecondary value={"Update"} />
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
									key={paymentType.id}
								>
									<td className="text-xs p-3 text-gray5">
										{paymentTypeItem.paymentType}
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
		</>
	);
}
export default PaymentTypes;
