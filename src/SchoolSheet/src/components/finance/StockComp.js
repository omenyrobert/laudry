import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";

let db = new Localbase("db");

function StockComp() {
	// useEffect(()=>{
	// 	console.log('useEffect')
	// },[])

	// post stock Type
	const [stockTypeId, setstockTypeId] = useState("");
	const [stock, setstock] = useState("");
	const [qty, setqty] = useState("");
	const [from, setFrom] = useState("");
	const [date, setDate] = useState("");
	const [comment, setComment] = useState("");
	const poststock = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			stockTypeId: stockTypeId,
			stock: stock,
			qty: qty,
			date: date,
		};
		if (stockTypeId || stock || qty || from || date || comment) {
			db.collection("stocksTbl")
				.add(formData)
				.then((response) => {
					setstockTypeId("");
					setstock("");
					setqty("");
					setFrom("");
					setDate("");
					setComment("");

					fetchStocks();

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
	const [stockReduced, setstockReduced] = useState([]);
	const fetchStockReduced = () => {
		return db
			.collection("stocksReducedTbl")
			.get()
			.then((stocks2) => {
				let newData = stocks2;
				setstockReduced(newData);
			});
	};

	const fetchStocksTypes = () => {
		return db
			.collection("stockTypesTbl")
			.get()
			.then((stockTypes) => {
				//  stockTypesData.push(stockTypes);
				// setstockTypesData2(newData);
				console.log("stockTypesData", stockTypesData);
				stockTypes.forEach((element) => {
					let Obj = {
						label: element.stockType,
						value: element,
					};
					stockTypesData.push(Obj);
				});
				// console.log("stock types array", stockTypesData);
			});
	};

	// fetch stocks
	const [stocksData, setstocksData] = useState([]);
	const fetchStocks = () => {
		db.collection("stocksTbl")
			.get()
			.then((stocks) => {
				// const newData = stocks;
				// setstocksData(newData);

				const newData = stocks;
				setstocksData(newData);
				// console.log('new array', newData)
			});
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
		setstockTypeIdEdit(stockItem?.stockTypeId);
		setstockIdEdit(stockItem.id);
		setstockEdit(stockItem.stock);
		setqtyEdit(stockItem.qty);
		setDateEdit(stockItem.date);
	};

	const updatestock = () => {
		db.collection("stocksTbl")
			.doc({ id: stockIdEdit })
			.update({
				stockTypeId: stockTypeIdEdit,
				stock: stockEdit,
				date: dateEdit,
				qty: qtyEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchStocks();
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
	const deletestock = (stockItem) => {
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
				db.collection("stocksTbl")
					.doc({ id: stockItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchStocks();

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

	const [showReduce, setShowReduce] = useState(false);

	const openShowReduce = (stockItem) => {
		setShowReduce(true);
		setStockId(stockItem.id);
	};

	const closeShowReduce = () => {
		setShowReduce(false);
	};

	const [sqty, setSqty] = useState("");
	const [reducedDate, setReducedDate] = useState("");
	const [takenBy, setTakenBy] = useState("");
	const [takenByContacts, setTakenByContacts] = useState("");
	const [stockId, setStockId] = useState("");

	const reduceStock = () => {
		let levelId = uuid();
		let formData = {
			id: levelId,
			stockId: stockId,
			sqty: sqty,
			reducedDate: reducedDate,
			takenBy: takenBy,
			takenByContacts: takenByContacts,
		};
		if (sqty) {
			db.collection("stocksReducedTbl")
				.add(formData)
				.then((response) => {
					setstockTypeId("");
					setSqty("");
					setReducedDate("");
					setTakenBy("");
					setTakenByContacts("");
					fetchStocks();
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
	const [stocksReducedData, setstocksReducedData] = useState([]);
	const fetchStocksReduced = () => {
		db.collection("stocksReducedTbl")
			.get()
			.then((stocks) => {
				// const newData = stocks;
				// setstocksData(newData);

				const newData = stocks;
				setstocksReducedData(newData);
				// console.log('new array', newData)
			});
	};
	useEffect(() => {
		fetchStocksReduced();
	});
	// fetching stock types
	useEffect(() => {
		fetchStocksTypes().then(() => {
			// console.log("fetchStocks");
			fetchStockReduced();
			fetchStocks();
		});
	}, []);

	return (
		<>
			<h5 className="text-xl font-bold text-secondary">Stock Levels</h5>
			<div className="w-full h-[80vh] mt-5">
				<div className="bg-white p-3 shadow-lg rounded-md mr-2">
					<div className="flex justify-between">
						<div className="w-1/4 p-1">
							<InputField
								type="date"
								label="Date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</div>
						<div className="w-1/4 p-1">
							<InputField
								type="text"
								placeholder="Enter Stock"
								label="Stock"
								value={stock}
								onChange={(e) => setstock(e.target.value)}
								
							/>
						</div>
						<div className="w-1/4 p-1">
							<InputField
								type="number"
								placeholder="Enter Amounnt"
								label="Qty"
								value={qty}
								onChange={(e) => setqty(e.target.value)}
								
							/>
						</div>
						<div className="w-1/4 p-1">
							<SelectComp
								options={stockTypesData}
								placeholder="Select stock Type"
								label="stock Type"
								setSelectedOptionObj={(value) => {
									setstockTypeId(value.id);
								}}
							/>
						</div>
						<div className="p-1 w-1/4 mt-14">
							<div onClick={poststock}>
								<Button value={"Add stock"} />
							</div>
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
											placeholder="Enter Amounnt"
											label="qty"
											value={qtyEdit}
											onChange={(e) => setqtyEdit(e.target.value)}
											
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={stockTypesData}
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
									<div className="w-1/3 p-1 mt-14">
										<div onClick={reduceStock}>
											<Button value={"Add"} />
										</div>
									</div>
									<div className="w-1/3 p-1"></div>
								</div>
								<div className="flex bg-gray1 hover:bg-gray1 border-b border-gray2">
									<div className="cursor-pointer p-2 w-2/12">Date</div>
									<div className="cursor-pointer p-2 w-2/12">Stock</div>
									<div className="cursor-pointer p-2 w-1/12">Qty</div>
									<div className="cursor-pointer p-2 w-2/12">Balance</div>
									<div className="cursor-pointer p-2 w-2/12">Taken By</div>
									<div className="cursor-pointer p-2 w-3/12">Contacts</div>
								</div>
								{stocksReducedData.map((reduced) => {
									return (
										<div className="flex text-gray5 text-xs hover:bg-gray1 border-b border-gray2">
											<div className="cursor-pointer p-2 w-2/12">
												{reduced.reducedDate}
											</div>
											<div className="cursor-pointer p-2 w-2/12">Posho</div>
											<div className="cursor-pointer p-2 w-1/12">
												{reduced.sqty}
											</div>
											<div className="cursor-pointer p-2 w-2/12">
												200
											</div>
											<div className="cursor-pointer p-2 w-2/12">
												{reduced.takenBy}
											</div>
											<div className="cursor-pointer p-2 w-3/12">
												{reduced.takenByContacts}
											</div>
										</div>
									);
								})}
							</div>
						) : null}

						{stocksData.map((stockItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={stockItem?.id}
								>
									<td className="text-xs p-3 text-gray5">{stockItem.date}</td>
									<td className="text-xs p-3 text-gray5">{stockItem.stock}</td>
									<td className="text-xs p-3 text-gray5">1</td>
									<td className="text-xs p-3 text-gray5">
										{Number(stockItem.qty).toLocaleString()}
									</td>

									<td className="text-xs p-3 text-gray5">
										{Number(stockItem.qty).toLocaleString()}
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
