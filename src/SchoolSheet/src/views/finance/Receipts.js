import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsFillPrinterFill, BsEye } from "react-icons/bs";
import Button2 from "../../components/Button2";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import SelectComp from "../../components/SelectComp";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import { BsSearch } from "react-icons/bs";
import ButtonSecondary from "../../components/ButtonSecondary";

let db = new Localbase("db");

function Receipts() {
	const [items, setItems] = useState([]);

	const [item, setItem] = useState("");
	const [qty, setQty] = useState("");
	const [unitCost, setUnitCost] = useState("");

	const [total, setTotal] = useState("");
	const addItems = () => {
		let itemObj = {
			item: item,
			qty: qty,
			unitCost: unitCost,
		};
		setItems([...items, itemObj]);
		setItem("");
		setQty("");
		setUnitCost("");
		const itemTotal = items.reduce(
			(acc, item) => acc + item.qty * item.unitCost,
			0
		);
		setTotal(itemTotal);
	};

	const [date, setDate] = useState("");
	const postreceipt = () => {
		let secId = uuid();
		let formData = {
			id: secId,
			supplierId: supplierId,
			items: items,
			date: date,
			status: 0,
		};
		if (supplierId || date || items) {
			db.collection("receiptsTbl")
				.add(formData)
				.then((response) => {
					console.log(response);
					setDate("");
					setSupplierId("");

					// fetch after
					fetchSuppliers();
					fetchreceipts();

					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					closeshow();
					setItems([]);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const [suppliersData, setSuppliers] = useState([]);
	const [supplierId, setSupplierId] = useState("");
	const fetchSuppliers = async () => {
		console.log("fetched");
		const suppliers = await db.collection("suppliersTbl").get();

		suppliers.forEach((supplier) => {
			let supplierObj = {
				label: supplier.supplier,
				value: supplier,
			};
			suppliers.push(supplierObj);
		});

		setSuppliers(suppliers);

		console.log("data", suppliersData);
	};

	const [receiptData, setreceiptData] = useState([]);
	const fetchreceipts = async () => {
		// console.log("fetched");
		const receipts = await db.collection("receiptsTbl").get();
		setreceiptData(receipts);
	};

	// fetching receipts
	useEffect(() => {
		fetchSuppliers();
		fetchreceipts();
	}, []);

	const removeItems = (index) => {
		const newList = items.filter((item, i) => i !== index);
		setItems(newList);
	};

	// delete supplier

	const deletereceipt = (receipt) => {
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
				db.collection("receiptsTbl")
					.doc({ id: receipt.id })
					.delete()
					.then((response) => {
						fetchreceipts();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
					});

				// fetch after
			}
		});
	};

	const [show, setshow] = useState(false);

	const openshow = () => {
		setshow(true);
	};

	const closeshow = () => {
		setshow(false);
	};

	const [view, setView] = useState(false);
	const [singlereceipt, setSinglereceipt] = useState("");
	const [singleTotal, setSingleTotal] = useState("");

	const openView = (receipt) => {
		setView(true);
		setSinglereceipt(receipt);
		let total2 = receipt.items.reduce(
			(acc, item) => acc + item.qty * item.unitCost,
			0
		);
		setSingleTotal(total2);
	};

	const closeView = () => {
		setView(false);
	};

	return (
		<>
			{/* enter receipt div */}

			<div className="w-full h-[80vh]">
				<div className="flex bg-white p-2">
					<div className="w-10/12">
						<div className="flex">
							<div className="w-6/12 px-2">
								<InputField
									placeholder="Search for Income"
									type="search"
									icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
								/>
							</div>
							<div className="w-3/12 px-2">
								<InputField placeholder="Filter By Type" />
							</div>{" "}
							<div className="w-2/12 px-2">
								<InputField type="date" />
							</div>
							<div className="w-2/12">
								<InputField type="date" />
							</div>
						</div>
					</div>
					<div className="w-2/12">
						<div onClick={openshow} className="w-[200px] ml-5 mt-5">
							<Button2 value={"Register Receipt"} />
						</div>
					</div>
				</div>

				{show ? (
					<div className="absolute float-right shadow-2xl bg-white border border-gray2 rounded-md w-[700px]">
						<div className="flex justify-between bg-gray1 p-3">
							<div>
								<p className="text-primary font-medium">Enter Receipt</p>
							</div>
							<div>
								<p onClick={closeshow} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="flex p-3 -mt-8">
							<div className="w-1/2 p-1">
								<InputField
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									label="Date"
								/>
							</div>
							<div className="w-1/2 p-1">
								<SelectComp
									options={suppliersData}
									placeholder="Select Supplier"
									label="Supplier"
									setSelectedOptionObj={(value) => {
										setSupplierId(value.id);
									}}
								/>
							</div>
						</div>
						<div className="flex px-3 -mt-[30px]">
							<div className="w-1/2 p-1">
								<SelectComp
									options={suppliersData}
									placeholder="Select Invoice"
									label="Invoice"
									setSelectedOptionObj={(value) => {
										setSupplierId(value.id);
									}}
								/>
							</div>
							<div className="w-1/2 p-1">
								<SelectComp
									options={suppliersData}
									placeholder="Select Account"
									label="Account"
									setSelectedOptionObj={(value) => {
										setSupplierId(value.id);
									}}
								/>
							</div>
						</div>

						<div>
							<div className="flex mx-2">
								<div className="w-4/12 p-2">
									<InputField
										value={item}
										label="Item"
										onChange={(e) => setItem(e.target.value)}
										placeholder="Enter Item"
									/>
								</div>
								<div className="w-3/12 p-2">
									<InputField
										value={qty}
										label="Qty"
										onChange={(e) => setQty(e.target.value)}
										placeholder="Enter Qty"
									/>
								</div>
								<div className="w-3/12 p-2">
									<InputField
										value={unitCost}
										onChange={(e) => setUnitCost(e.target.value)}
										label="UnitCost"
										placeholder="Enter UnitCost"
									/>
								</div>
								<div className="w-2/12 p-2 rounded-md h-10 mt-14">
									<div onClick={addItems}>
										{" "}
										<Button value={"Add"} />
									</div>{" "}
								</div>
							</div>
							<div className="flex bg-gray1 mx-5 mt-3">
								<div className="p-2 w-1/4 text-sm">Item</div>
								<div className="p-2 w-1/4 text-sm">Qty</div>
								<div className="p-2 w-1/4 text-sm">UnitCost</div>
								<div className="p-2 w-1/4 text-sm">ToTal</div>
								<div className="p-2 w-1/4 text-sm">Action</div>
							</div>
							<div className="h-40 overflow-y-auto">
								{items.map((item, index) => {
									return (
										<div className="flex hover:bg-gray1 mx-5">
											<div className="p-2 w-1/4 text-sm">{item.item}</div>
											<div className="p-2 w-1/4 text-sm">
												{Number(item.qty).toLocaleString()}
											</div>
											<div className="p-2 w-1/4 text-sm">
												{Number(item.unitCost).toLocaleString()}
											</div>
											<div className="p-2 w-1/4 text-sm">
												{Number(item.qty * item.unitCost).toLocaleString()}
											</div>
											<div className="p-2 w-1/4 text-sm">
												<p
													onClick={() => removeItems(index)}
													className="text-red cursor-pointer text-sm ml-5"
												>
													Remove Item
												</p>
											</div>
										</div>
									);
								})}
							</div>
							<div className="flex bg-gray1 mx-5">
								<div className="p-2 w-1/4 font-semibold">Total</div>
								<div className="p-2 w-1/4 text-sm"></div>
								<div className="p-2 w-1/4 text-sm"></div>
								<div className="p-2 w-1/4 text-sm"></div>
								<div className="p-2 w-1/4 font-semibold">
									{Number(total).toLocaleString()}
								</div>
							</div>
						</div>
						<div className="flex justify-between p-3 bg-gray1 mt-4">
							<div onClick={closeshow} ><ButtonSecondary value={"Close"}/></div>
							<div onClick={postreceipt}>
								<Button value={"Add receipt"} />
							</div>
						</div>
					</div>
				) : null}

				{view ? (
					<>
						<div className="bg-white absolute rounded border border-gray2 shadow-2xl w-[700px] h-[60vh] overflow-y-auto">
							<div className="bg-gray1 p-3 text-primary font-medium flex justify-between">
								<div>Receipt</div>
								<div>
									<p className="cursor-pointer" onClick={closeView}>
										X
									</p>
								</div>
							</div>
							<div className="p-3 text-white">
								<div className=" p-2 text-gray5">
									<p>Status: {singlereceipt.status}</p>

									<p>Date: {singlereceipt.date}</p>

									{singlereceipt.supplierId}
								</div>
								<div className="">
									<div className="flex bg-gray1 text-black mx-1">
										<div className="p-2 w-1/4">Item</div>
										<div className="p-2 w-1/4">Qty</div>
										<div className="p-2 w-1/4">UnitCost</div>
										<div className="p-2 w-1/4">ToTal</div>
									</div>

									{singlereceipt.items.map((item, index) => {
										return (
											<div
												key={item.index}
												className="flex text-gray5 cursor-pointer hover:bg-gray1 mx-5"
											>
												<div className="p-2 w-1/4 text-sm">{item.item}</div>
												<div className="p-2 w-1/4 text-sm">
													{Number(item.qty).toLocaleString()}
												</div>
												<div className="p-2 w-1/4 text-sm">
													{Number(item.unitCost).toLocaleString()}
												</div>
												<div className="p-2 w-1/4 text-sm">
													{Number(item.qty * item.unitCost).toLocaleString()}
												</div>
											</div>
										);
									})}
									<div className="flex cursor-pointer text-black bg-gray1 mx-5">
										<div className="p-2 w-1/4">Total</div>
										<div className="p-2 w-1/4"></div>
										<div className="p-2 w-1/4"></div>
										<div className="p-2 w-1/4">
											{Number(singleTotal).toLocaleString()}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}
				<h1 className="text-primary mt-5 font-semibold text-xl">Receipts</h1>
				<table className="mt-2 w-full table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Receipt No</th>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Supplier</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Paid</th>
						<th className="p-2 text-primary text-sm text-left">Balance</th>
						<th className="p-2 text-primary text-sm text-left">Status</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{receiptData.map((receipt) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={receipt.id}
								>
									<td className="text-xs text-gray5 p-3 text-gray5">001</td>
									<td className="text-xs text-gray5 p-3 text-gray5">
										{receipt.date}
									</td>
									<td className="text-xs text-gray5 p-3 text-gray5">2</td>
									<td className="text-xs text-gray5 p-3 text-gray5">0</td>
									<td className="text-xs text-gray5 p-3 text-gray5">0</td>
									<td className="text-xs text-gray5 p-3 text-gray5">0</td>
									<td className="text-xs text-gray5 p-3 text-red">
										{receipt.status}
									</td>
									<td className="text-xs text-gray5 p-3 text-red">
										<div className="flex justify-between w-18">
											<MdDeleteOutline
												onClick={() => deletereceipt(receipt)}
												className="text-red"
											/>

											<BsEye
												onClick={() => openView(receipt)}
												className="text-primary"
											/>
											<BsFillPrinterFill className="text-black" />
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
export default Receipts;
