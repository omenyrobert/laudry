import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getStockTypes } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../assets/styles/main.css";


function StockTypes() {
	const dispatch = useDispatch();
	// post stock Type
	const [stockType, setstockType] = useState("");

	const postStockType = async () => {
		try {
			let formData = {
				type: stockType,
			};
	
			const response = await axiosInstance.post("/stockTypes", formData);
			const { data } = response;
			const { status } = data;
	
			if (status) {
				dispatch(getStockTypes());
				setstockType("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch(error) {
			console.log(error);
		}
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
		setstockTypeEdit(stockType?.type);
		setstockTypeId(stockType.id);
	};

	const updatestockType = async () => {
		try {
			let formData = {
				type: stockTypeEdit,
				id: stockTypeId,
			};
			const subject = await axiosInstance.put("/stockTypes", formData);
			const { data } = subject;
			const { status } = data;
			if (status) {
				dispatch(getStockTypes());
				setstockTypeEdit("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			}
		} catch (error) {
			console.log(error);
		}
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
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const response = await axiosInstance.delete(`/stockTypes/${stockTypeItem.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getStockTypes());
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

	// fetching stock types
	useEffect(() => {
		dispatch(getStockTypes());
	}, [dispatch]);


	const { stockTypes } = useSelector((state) => state.schoolStore);

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
							
						/>
					</div>

					<div onClick={postStockType} className="mt-14 ml-3">
						<Button value={"Save"} />
					</div>
				</div>
				
				<table className="mt-10 table-auto w-full">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-lg rounded flex w-[25vw] p-5 bg-white">
								<div className="w-2/3 pr-5">
									<InputField
										type="text"
										placeholder="Enter stock Type"
										label="stock Type"
										value={stockTypeEdit}
										onChange={(e) => setstockTypeEdit(e.target.value)}
										
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

						{stockTypes.map((stockTypeItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={stockTypeItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{stockTypeItem.type}
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
