import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";
import Button2 from "../Button2";

let db = new Localbase("db");

function AssetsComp() {
	// useEffect(()=>{
	// 	console.log('useEffect')
	// },[])

	// post asset Type
	const [assetTypeId, setAssetTypeId] = useState("");
	const [asset, setAsset] = useState("");
	const [cost, setCost] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [purchaseDate, setPurchaseDate] = useState("");
	const [purchasedFrom, setPurchasedFrom] = useState("");
	const [sellersContacts, setSellersContacts] = useState("");
	const [add, setAdd] = useState(false);
	const openAdd = () => {
		setAdd(true);
	};
	const closeAdd = () => {
		setAdd(false);
	};
	const postAsset = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			assetTypeId: assetTypeId,
			asset: asset,
			cost: cost,
			description: description,
			date: date,
			purchasedFrom: purchasedFrom,
			sellersContacts: sellersContacts,
			purchaseDate: purchaseDate,
		};

		if (assetTypeId || asset || cost || description || date || purchaseDate) {
			db.collection("assetsTbl")
				.add(formData)
				.then((response) => {
					setAssetTypeId("");
					setAsset("");
					setCost("");
					setDescription("");
					setDate("");
					setSellersContacts("");
					setPurchaseDate("");
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					fetchAssets();
					closeAdd();
				})
				.catch(console.error());
		}
	};

	// fetch asset typess
	const [assetTypesData, setAssetTypesData] = useState([]);
	const [assetTotal, setAssetTotal] = useState("");

	const fetchAssetTypes = () => {
		return db
			.collection("assetTypesTbl")
			.get()
			.then((assetTypes) => {
				//  assetTypesData.push(assetTypes);
				// setAssetTypesData2(newData);
				console.log("assetTypesData", assetTypesData);
				assetTypes.forEach((element) => {
					let Obj = {
						label: element.assetType,
						value: element,
					};
					assetTypesData.push(Obj);
				});
				// console.log("asset types array", assetTypesData);
			});
	};

	// fetch assets
	const [assetsData, setAssetsData] = useState([]);
	const fetchAssets = () => {
		db.collection("assetsTbl")
			.get()
			.then((assets) => {
				// const newData = assets;
				// setAssetsData(newData);

				let newData = assets;
				setAssetsData(newData);
				// console.log("new asset", newData);
				let total = assets.reduce((acc, item) => acc + parseInt(item.cost), 0);
				setAssetTotal(total);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [assetTypeIdEdit, setAssetTypeIdEdit] = useState("");
	const [assetIdEdit, setAssetIdEdit] = useState("");
	const [assetEdit, setAssetEdit] = useState("");
	const [costEdit, setCostEdit] = useState("");
	const [descriptionEdit, setDescriptionEdit] = useState("");
	const [dateEdit, setDateEdit] = useState("");
	const [commentEdit, Edit] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (assetItem) => {
		setEditData(true);
		setAssetTypeIdEdit(assetItem?.assetTypeId);
		setAssetIdEdit(assetItem.id);
		setAssetEdit(assetItem.asset);
		setCostEdit(assetItem.cost);
		setDescriptionEdit(assetItem.from);
		setDateEdit(assetItem.date);
		Edit(assetItem.comment);
	};

	const updateasset = () => {
		db.collection("assetsTbl")
			.doc({ id: assetIdEdit })
			.update({
				assetTypeId: assetTypeIdEdit,
				asset: assetEdit,
				asset: assetEdit,
				from: descriptionEdit,
				date: dateEdit,
				comment: commentEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchAssets();
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

	//deleting asset types
	const deleteasset = (assetItem) => {
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
				db.collection("assetsTbl")
					.doc({ id: assetItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchAssets();

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

	// fetching asset types
	useEffect(() => {
		fetchAssetTypes().then(() => {
			console.log("fetchAssets");
			fetchAssets();
		});
	}, []);

	return (
		<>
			<h5 className="text-lg font-medium text-primary">Assets</h5>
			<div onClick={openAdd} className="w-[200px]">
				<Button2 value={"Register Asset"} />
			</div>

			<div className="w-full h-[80vh]">
				{add ? (
					<div className="bg-white border border-gray3 absolute w-1/2 shadow-lg rounded-md mr-2">
						<div className="flex justify-between font-bold bg-gray1 rounded-md text-primary p-3">
							<div>Register Asset</div>
							<div>
								<p onClick={closeAdd} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="flex justify-between px-3">
							<div className="w-1/3 p-1">
								<InputField
									type="date"
									label="Date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="text"
									placeholder="Enter asset"
									label="asset"
									value={asset}
									onChange={(e) => setAsset(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="number"
									placeholder="Enter Cost"
									label="cost"
									value={cost}
									onChange={(e) => setCost(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
						</div>
						<div className="flex justify-between px-3">
							<div className="w-1/3 p-1">
								<SelectComp
									options={assetTypesData}
									placeholder="Select asset Type"
									label="asset Type"
									setSelectedOptionObj={(value) => {
										setAssetTypeId(value.id);
									}}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="text"
									placeholder="Enter Description"
									label="asset Description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<div className="w-1/3 p-1">
								<InputField
									type="date"
									label="Purchase Date"
									value={purchaseDate}
									onChange={(e) => setPurchaseDate(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex px-3">
							<div className="w-1/3 p-1">
								<InputField
									type="text"
									placeholder="Enter Purchased From"
									label="Purchased From"
									value={purchasedFrom}
									onChange={(e) => setPurchasedFrom(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="text"
									placeholder="Enter Sellers Contacts"
									label="Sellers Contacts"
									value={sellersContacts}
									onChange={(e) => setSellersContacts(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField type="file" label="Photos" />
							</div>
							
						</div>
						<div className="p-3 flex justify-between">
								<div></div>
								<div onClick={postAsset}>
									<Button value={"Register Asset"} />
								</div>
							</div>
					</div>
				) : null}

				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">asset</th>
						<th className="p-2 text-primary text-sm text-left">asset Type</th>
						<th className="p-2 text-primary text-sm text-left">cost</th>
						<th className="p-2 text-primary text-sm text-left">Description</th>
						<th className="p-2 text-primary text-sm text-left">Seller</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded w-[1000px] bg-white">
								<div className="flex justify-between bg-primary text-white p-2 rounded-md">
									<div>
										<p>Edit asset</p>
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
											placeholder="Enter asset"
											label="asset"
											value={assetEdit}
											onChange={(e) => setAssetEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="number"
											placeholder="Enter Cost"
											label="cost"
											value={costEdit}
											onChange={(e) => setCostEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={assetTypesData}
											placeholder="Select asset Type"
											label="asset Type"
											setSelectedOptionObj={(value) => {
												setAssetTypeIdEdit(value.id);
											}}
										/>
									</div>
								</div>
								<div className="flex px-5">
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter Description"
											label="asset Description"
											value={descriptionEdit}
											onChange={(e) => setDescriptionEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter Comment"
											label="asset Comment"
											value={commentEdit}
											onChange={(e) => Edit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 ml-5">
										<div onClick={updateasset} className="mt-14">
											<ButtonSecondary value={"Update"} />
										</div>
									</div>
									<div className="w-1/4"></div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{assetsData.map((assetItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={assetItem?.id}
								>
									<td className="text-xs p-3 text-gray5">{assetItem.date}</td>
									<td className="text-xs p-3 text-gray5">{assetItem.asset}</td>
									<td className="text-xs p-3 text-gray5">1</td>
									<td className="text-xs p-3 text-gray5">
										{Number(assetItem.cost).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{assetItem.description}
									</td>
									<td className="text-xs p-3 text-gray5">
										{assetItem.purchasedFrom}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline
											onClick={() => deleteasset(assetItem)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(assetItem)}
										/>
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-5 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(assetTotal).toLocaleString()}</td>
							<td></td>
							<td>
								<td></td>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
export default AssetsComp;
