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

function StockTypes() {
	// post stock Type
	const [stockType, setstockType] = useState("");
	const poststockType = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			stockType: stockType,
		};
		if (stockType) {
			db.collection("stockTypesTbl")
				.add(formData)
				.then((response) => {
					setstockType("");
					fetchInomeTypes();
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

	// fetch stock typess
	const [stockTypesData, setstockTypesData] = useState([]);
	const fetchInomeTypes = () => {
		db.collection("stockTypesTbl")
			.get()
			.then((stockTypes) => {
				const newData = stockTypes;
				setstockTypesData(newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [stockTypeEdit, setstockTypeEdit] = useState("");
	const [stockTypeId, setstockTypeId] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (stockType) => {
		setEditData(true);
		setstockTypeEdit(stockType?.stockType);
		setstockTypeId(stockType.id);
	};
	const updatestockType = () => {
		db.collection("stockTypesTbl")
			.doc({ id: stockTypeId })
			.update({
				stockType: stockTypeEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchInomeTypes();
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

	//deleting stock types
	const deletestockType = (stockTypeItem) => {
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
				db.collection("stockTypesTbl")
					.doc({ id: stockTypeItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchInomeTypes();

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

	// fetching stock types
	useEffect(() => {
		fetchInomeTypes();
	}, []);

	return (
		<>
			<h5 className="text-xl font-bold text-secondary">Stock Types</h5>
			<div className="w-full h-[80vh] mt-5">
				<div className=" bg-white p-5 shadow-lg rounded-md flex">
					<div className="w-2/3">
						<InputField
							type="text"
							placeholder="Enter stock Type"
							label="Stock Type"
							value={stockType}
							onChange={(e) => setstockType(e.target.value)}
							icon={<FaPen className="w-3 -ml-7 mt-3" />}
						/>
					</div>

					<div onClick={poststockType} className="mt-14 ml-3">
						<Button value={"Save"} />
					</div>
				</div>
				<hr className="text-primary" />
				<table className="mt-10 table-auto w-full">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-lg rounded flex w-[500px] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="text"
										placeholder="Enter stock Type"
										label="stock Type"
										value={stockTypeEdit}
										onChange={(e) => setstockTypeEdit(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="flex justify-between w-1/3 mt-[55px]">
									<div onClick={updatestockType}>
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
						) : null}
						{/* edit popup end */}

						{stockTypesData.map((stockTypeItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={stockType.id}
								>
									<td className="text-xs p-3 text-gray5">
										{stockTypeItem.stockType}
									</td>
									<td className="text-xs p-3 text-gray5">
										<div className="flex">
											<MdDeleteOutline
												onClick={() => deletestockType(stockTypeItem)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												onClick={() => openEditData(stockTypeItem)}
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
export default StockTypes;
