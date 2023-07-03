import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	getStockLevels,
	getStockTypes,
	getReductions,
} from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../assets/styles/main.css";
import Loader from "../Loader";
import ButtonLoader from "../ButtonLoader";

function StockComp() {
	const dispatch = useDispatch();
	// post stock Type
	const [stockTypeId, setstockTypeId] = useState("");
	const [stock, setstock] = useState("");
	const [qty, setqty] = useState("");
	const [date, setDate] = useState("");

	const [posting, setPosting] = useState(false);

	const poststock = async () => {
		setPosting(true);
		try {
			let formData = {
				stockType: stockTypeId,
				stock: stock,
				quantity: parseFloat(qty),
				date: date,
				remaining: parseFloat(qty),
			};

			const response = await axiosInstance.post("/stock-levels", formData);
			const { data } = response;
			const { status } = data;

			if (status) {
				dispatch(getStockLevels());
				setstockTypeId("");
				setstock("");
				setqty("");
				setDate("");

				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch (error) {
			console.log(error);
		}
		setPosting(false);
	};

	// update
	const [editData, setEditData] = useState(false);
	const [stockTypeIdEdit, setstockTypeIdEdit] = useState("");
	const [stockIdEdit, setstockIdEdit] = useState("");
	const [stockEdit, setstockEdit] = useState("");
	const [qtyEdit, setqtyEdit] = useState("");

	const [dateEdit, setDateEdit] = useState("");

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (stockItem) => {
		setEditData(true);
		setstockTypeIdEdit(stockItem?.stockType);
		setstockIdEdit(stockItem.id);
		setstockEdit(stockItem.stock);
		setqtyEdit(stockItem.quantity);
		setDateEdit(stockItem.date);
	};

	const updatestock = async () => {
		try {
			let formData = {
				id: stockIdEdit,
				stockType: stockTypeIdEdit,
				stock: stockEdit,
				quantity: qtyEdit,
				date: dateEdit,
			};
			const stockLevel = await axiosInstance.put("/stock-levels", formData);
			const { data } = stockLevel;
			const { status } = data;
			if (status) {
				dispatch(getStockLevels());
				setstockTypeIdEdit("");
				setstockEdit("");
				setqtyEdit("");
				setDateEdit("");
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
	const deletestock = (stockItem) => {
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
						`/stock-levels/${stockItem.id}`
					);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getStockLevels());
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

	const [showReduce, setShowReduce] = useState(false);

	const openShowReduce = (stockItem) => {
		setShowReduce(true);
		setStockId(stockItem);
		const _reductions = reductions.filter((r) => r.stockId === stockItem.id);
		setFilterStocks(_reductions);
	};

	const closeShowReduce = () => {
		setShowReduce(false);
	};

	const [sqty, setSqty] = useState("");
	const [reducedDate, setReducedDate] = useState("");
	const [takenBy, setTakenBy] = useState("");
	const [takenByContacts, setTakenByContacts] = useState("");
	const [stockId, setStockId] = useState("");
	const [filterStocks, setFilterStocks] = useState([]);

	const [reducing, setReducing] = useState(false);

	const reduceStock = async () => {
		try {
			setReducing(true);
			if (sqty) {
				const balance = stockId.remaining - parseFloat(sqty);

				let formData = {
					id: stockId.id,
					quantity: stockId.quantity,
					remaining: balance,
					reducedDate: reducedDate,
					takenBy: takenBy,
					takenByContacts: takenByContacts,
					reductions: sqty,
				};
				let reductionData = {
					date: reducedDate,
					stock: stockId.stock,
					stockId: stockId.id,
					quantity: stockId.quantity,
					quantityTaken: sqty,
					takenBy,
					takenByContacts,
					balance,
				};
				const reductions = await axiosInstance.post(
					"/reductions",
					reductionData
				);
				const stockLevel = await axiosInstance.put("/stock-levels", formData);
				const stockLevelData = stockLevel.data;
				const stockLevelStatus = stockLevelData.status;
				const reductionsData = reductions.data;
				const reductionsStatus = reductionsData.status;
				if (reductionsStatus && stockLevelStatus) {
					dispatch(getStockLevels());
					dispatch(getReductions());
					setReducedDate("");
					setTakenBy("");
					setTakenByContacts("");
					setSqty("");
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					setReducing(false);
				}
			}
		} catch (error) {
			console.log(error);
			setReducing(false);
		}
		setReducing(false);
	};

	useEffect(() => {
		dispatch(getStockTypes());
		dispatch(getStockLevels());
		dispatch(getReductions());
	}, [dispatch]);

	const { stockLevels, stockTypes, reductions } = useSelector(
		(state) => state.schoolStore
	);

	useEffect(() => {
		if (reductions && reductions.length > 0) {
			const _reductions = reductions.filter((r) => r.stockId === stockId.id);
			setFilterStocks(_reductions);
		}
	}, [reductions, stockId.id]);

	return (
		<>
			<h5 className="text-xl font-bold text-secondary">Stock Levels</h5>
			<div className="w-full h-[80vh] mt-5">
				<div className="bg-white p-3 shadow-lg rounded-md mr-2">
					<div className="flex justify-between">
						<div className="w-3/12 p-1">
							<InputField
								type="date"
								label="Date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</div>
						<div className="w-3/12 p-1">
							<InputField
								type="text"
								placeholder="Enter Stock"
								label="Stock"
								value={stock}
								onChange={(e) => setstock(e.target.value)}
							/>
						</div>
						<div className="w-3/12 p-1">
							<InputField
								type="number"
								placeholder="Enter Quantity"
								label="Qty"
								value={qty}
								onChange={(e) => setqty(e.target.value)}
							/>
						</div>
						<div className="w-3/12 p-1">
							<SelectComp
								options={stockTypes}
								placeholder="Select stock Type"
								label="Stock Type"
								setSelectedOptionObj={(value) => {
									setstockTypeId(value.id);
								}}
							/>
						</div>
						<div className="p-1 w-1/12 mt-14">
							{posting ? (
								<div>
									<ButtonLoader />
								</div>
							) : (
								<div onClick={poststock}>
									<Button value={"Add"} />
								</div>
							)}
						</div>
					</div>
				</div>

				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">stock</th>
						<th className="p-2 text-primary text-sm text-left">stock Type</th>
						<th className="p-2 text-primary text-sm text-left">qty</th>
						<th className="p-2 text-primary text-sm text-left">Remaining</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded w-[1000px] bg-white">
								<div className="flex justify-between text-primary bg-gray1 p-2 rounded-md">
									<div>
										<p>Edit stock</p>
									</div>
									<div>
										<p className="cursor-pointer" onClick={closeEditData}>
											X
										</p>
									</div>
								</div>
								<div className="flex px-5">
									<div className="w-1/4 p-1">
										<InputField
											type="date"
											label="Date"
											value={dateEdit}
											onChange={(e) => setDateEdit(e.target.value)}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter stock"
											label="stock"
											value={stockEdit}
											onChange={(e) => setstockEdit(e.target.value)}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="number"
											placeholder="Enter Quantity"
											label="qty"
											value={qtyEdit}
											onChange={(e) => setqtyEdit(e.target.value)}
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={stockTypes}
											placeholder="Select stock Type"
											label="stock Type"
											setSelectedOptionObj={(value) => {
												setstockTypeIdEdit(value.id);
											}}
										/>
									</div>
									<div className="w-1/4 ml-2">
										<div onClick={updatestock} className="mt-14">
											<ButtonSecondary value={"Update"} />
										</div>
									</div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{/* stock Levels */}

						{showReduce ? (
							<div className="bg-white my-1 absolute shadow-2xl border border-gray2   w-[800px] -mt-[20vh] rounded h-[60vh] overflow-y-auto">
								<div className="flex justify-between bg-primary text-white p-3">
									<div>Stock Name</div>
									<div>
										<p onClick={closeShowReduce} className="cursor-pointer">
											X
										</p>
									</div>
								</div>
								<div className="flex  p-2 -mt-5">
									<div className="w-1/3 p-1">
										<InputField
											value={reducedDate}
											onChange={(e) => setReducedDate(e.target.value)}
											label="Date"
											type="date"
										/>
									</div>
									<div className="w-1/3 p-1">
										<InputField
											label="Qty"
											type="Text"
											value={sqty}
											onChange={(e) => setSqty(e.target.value)}
											placeholder="Enter Qty"
										/>
									</div>
									<div className="w-1/3 p-1">
										<InputField
											label="Taken By"
											value={takenBy}
											onChange={(e) => setTakenBy(e.target.value)}
											type="text"
											placeholder="Enter Person Receiving"
										/>
									</div>
								</div>
								<div className="flex  px-2 -mt-10">
									<div className="w-1/3 p-1">
										<InputField
											value={takenByContacts}
											onChange={(e) => setTakenByContacts(e.target.value)}
											label="Contacts"
											type="text"
											placeholder="Taken By Contacts"
										/>
									</div>
									<div className="w-auto p-1 mt-14">
										{reducing ? (
											<ButtonLoader />
										) : (
											<div onClick={reduceStock}>
												<Button value={"Add"} />
											</div>
										)}
									</div>
									<div className="w-1/3 p-1"></div>
								</div>
								<div className="flex bg-gray1 hover:bg-gray1 border-b border-gray2">
									<div className="cursor-pointer p-2 w-2/12">Date</div>

									<div className="cursor-pointer p-2 w-1/12">Qty</div>
									<div className="cursor-pointer p-2 w-2/12">Balance</div>
									<div className="cursor-pointer p-2 w-2/12">Taken By</div>
									<div className="cursor-pointer p-2 w-3/12">Contacts</div>
									<div className="cursor-pointer p-2 w-3/12">Reductions</div>
								</div>
								{filterStocks &&
									filterStocks.length > 0 &&
									filterStocks.map((reduced) => {
										return (
											<div className="flex text-gray5 text-xs hover:bg-gray1 border-b border-gray2">
												<div className="cursor-pointer p-2 w-2/12">
													{reduced.date}
												</div>

												<div className="cursor-pointer p-2 w-1/12">
													{reduced.quantity}
												</div>
												<div className="cursor-pointer p-2 w-2/12">
													{reduced.balance}
												</div>
												<div className="cursor-pointer p-2 w-2/12">
													{reduced.takenBy}
												</div>
												<div className="cursor-pointer p-2 w-3/12">
													{reduced.takenByContacts}
												</div>
												<div className="cursor-pointer p-2 w-3/12">
													{reduced.quantityTaken}
												</div>
											</div>
										);
									})}
							</div>
						) : null}

						{stockLevels &&
							stockLevels.length > 0 &&
							stockLevels.map((stockItem) => {
								// st is the stockType
								const st = stockTypes.find(
									(stockType) => stockType.id === stockItem.stockType
								);
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={stockItem?.id}
									>
										<td className="text-xs p-3 text-gray5">{stockItem.date}</td>
										<td className="text-xs p-3 text-gray5">
											{stockItem.stock}
										</td>
										<td className="text-xs p-3 text-gray5">{st.type}</td>
										<td className="text-xs p-3 text-gray5">
											{Number(stockItem.quantity).toLocaleString()}
										</td>

										<td className="text-xs p-3 text-gray5">
											{Number(stockItem.remaining).toLocaleString()}
										</td>
										<td className="text-xs p-3 text-gray5 flex">
											<MdDeleteOutline
												onClick={() => deletestock(stockItem)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												className="text-warning h-4 w-4 ml-5"
												onClick={() => openEditData(stockItem)}
											/>
											<BsEye
												className="text-primary h-4 w-4 ml-5"
												onClick={() => openShowReduce(stockItem)}
											/>
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
export default StockComp;
