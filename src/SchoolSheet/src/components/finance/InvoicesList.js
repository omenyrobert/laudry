import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsFillPrinterFill, BsEye } from "react-icons/bs";
import Button2 from "../Button2";
import InputField from "../InputField";
import Button from "../Button";
import SelectComp from "../SelectComp";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";

let db = new Localbase("db");

function InvoicesList() {
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
	const postInvoice = () => {
		let secId = uuid();
		let formData = {
			id: secId,
			supplierId: supplierId,
			items: items,
			date: date,
			status: 0,
		};
		if (supplierId || date || items) {
			db.collection("invoicesTbl")
				.add(formData)
				.then((response) => {
					console.log(response);
					setDate("");
					setSupplierId("");

					// fetch after
					fetchSuppliers();
					fetchInvoices();

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

	const [invoiceData, setInvoiceData] = useState([]);
	const fetchInvoices = async () => {
		// console.log("fetched");
		const invoices = await db.collection("invoicesTbl").get();
		setInvoiceData(invoices);
	};

	// fetching invoices
	useEffect(() => {
		fetchSuppliers();
		fetchInvoices();
	}, []);

	const removeItems = (index) => {
		const newList = items.filter((item, i) => i !== index);
		setItems(newList);
	};

	// delete supplier

	const deleteInvoice = (invoice) => {
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
				db.collection("invoicesTbl")
					.doc({ id: invoice.id })
					.delete()
					.then((response) => {
						fetchInvoices();

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
	const [singleInvoice, setSingleInvoice] = useState("");
	const [singleTotal, setSingleTotal] = useState("");

	const openView = (invoice) => {
		setView(true);
		setSingleInvoice(invoice);
		let total2 = invoice.items.reduce((acc, item)=> acc + (item.qty * item.unitCost),0)
		setSingleTotal(total2)
	};

	const closeView = () => {
		setView(false);
	};

	return (
		<>
			{/* enter invoice div */}

			<div className="w-full h-[80vh]">
				<div onClick={openshow}>
					<Button2 value={"Register Invoice"} />
				</div>

				{show ? (
					<div className="absolute shadow-2xl bg-white border border-gray2 h-[65vh] overflow-y-auto rounded-md w-[700px]">
						<div className="flex justify-between bg-gray1 p-3">
							<div>
								<p className="text-primary font-medium">Enter Invoice</p>
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

						<div>
							<div className="flex mx-2 -mt-5">
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
								<div className="w-2/12 p-2 rounded-md h-10 mt-16">
									<div onClick={addItems}>
										{" "}
										<Button value={"Add"} />
									</div>{" "}
								</div>
							</div>
							<div className="flex bg-gray1 mx-5">
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
						<div className="flex justify-between p-3">
							<div></div>
							<div onClick={postInvoice}>
								<Button value={"Add Invoice"} />
							</div>
						</div>
					</div>
				) : null}

				{view ? (
					<>
						<div className="bg-white absolute border border-gray2 shadow-2xl w-[700px] h-[60vh] overflow-y-auto">
							<div className="bg-primary p-3 text-white flex justify-between">
								<div>Invoice</div>
								<div>
									<p className="cursor-pointer" onClick={closeView}>
										X
									</p>
								</div>
							</div>
							<div className="p-3 text-white flex">
								<div className="w-1/3 p-2 text-gray5">
									<p>Status: {singleInvoice.status}</p>

									<p>Date: {singleInvoice.date}</p>

									{singleInvoice.supplierId}
								</div>
								<div className="w-2/3 p-2">
									<div className="flex bg-gray1 text-black mx-5">
										<div className="p-2 w-1/4">Item</div>
										<div className="p-2 w-1/4">Qty</div>
										<div className="p-2 w-1/4">UnitCost</div>
										<div className="p-2 w-1/4">ToTal</div>
									</div>

									{singleInvoice.items.map((item, index) => {
										return (
											<div key={item.index} className="flex text-gray5 cursor-pointer hover:bg-gray1 mx-5">
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
										<div className="p-2 w-1/4">{Number(singleTotal).toLocaleString()}</div>
									</div>


								</div>
							</div>
						</div>
					</>
				) : null}
				<table className="mt-10 w-full table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Invoice No</th>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Supplier</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Paid</th>
						<th className="p-2 text-primary text-sm text-left">Balance</th>
						<th className="p-2 text-primary text-sm text-left">Status</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{invoiceData.map((invoice) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={invoice.id}
								>
									<td className="text-xs text-gray5 p-3 text-gray5">001</td>
									<td className="text-xs text-gray5 p-3 text-gray5">
										{invoice.date}
									</td>
									<td className="text-xs text-gray5 p-3 text-gray5">2</td>
									<td className="text-xs text-gray5 p-3 text-gray5">0</td>
									<td className="text-xs text-gray5 p-3 text-gray5">0</td>
									<td className="text-xs text-gray5 p-3 text-gray5">0</td>
									<td className="text-xs text-gray5 p-3 text-red">
										{invoice.status}
									</td>
									<td className="text-xs text-gray5 p-3 text-red">
										<div className="flex justify-between w-18">
											<MdDeleteOutline
												onClick={() => deleteInvoice(invoice)}
												className="text-red"
											/>
		
											<BsEye
												onClick={() => openView(invoice)}
												className="text-primary"
											/>
																				<BsFillPrinterFill className="text-black"/>

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
export default InvoicesList;
