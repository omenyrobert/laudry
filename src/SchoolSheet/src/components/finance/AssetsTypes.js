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

function AssetsTypes() {
	// post asset Type
	const [assetType, setAssetType] = useState("");
	const postAssetType = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			assetType: assetType,
		};
		if (assetType) {
			db.collection("assetTypesTbl")
				.add(formData)
				.then((response) => {
					setAssetType("");
					fetchAssetTypes();
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

	// fetch asset typess
	const [assetTypesData, setAssetTypesData] = useState([]);
	const fetchAssetTypes = () => {
		db.collection("assetTypesTbl")
			.get()
			.then((assetTypes) => {
				const newData = assetTypes;
				setAssetTypesData(newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [assetTypeEdit, setAssetTypeEdit] = useState("");
	const [assetTypeId, setAssetTypeId] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (assetType) => {
		setEditData(true);
		setAssetTypeEdit(assetType?.assetType);
		setAssetTypeId(assetType.id);
	};
	const updateassetType = () => {
		db.collection("assetTypesTbl")
			.doc({ id: assetTypeId })
			.update({
				assetType: assetTypeEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchAssetTypes();
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
	const deleteassetType = (assetTypeItem) => {
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
				db.collection("assetTypesTbl")
					.doc({ id: assetTypeItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchAssetTypes();

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
		fetchAssetTypes();
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
				<Button2 value={"Asset Types"} />
			</div>
			{modal ? (
				<div className="w-[100vw] z-50 flex h-full bg-black overflow-y-auto absolute bg-opacity-60">
					<div className="w-3/12 bg-white h-full">
						<div className="bg-gray1 p-3 flex justify-between text-primary font-semibold">
							<div>
								<h5 className="text-lg font-medium">Asset Types</h5>
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
										placeholder="Enter asset Type"
										label="asset Type"
										value={assetType}
										onChange={(e) => setAssetType(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="ml-2 mt-14" onClick={postAssetType}>
									<Button value={"Add asset Type"} />
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
										<div className="absolute shadow-lg rounded flex w-[400px] p-5 bg-white">
											<div className="w-2/3 pr-5">
												<InputField
													type="text"
													placeholder="Enter asset Type"
													label="asset Type"
													value={assetTypeEdit}
													onChange={(e) => setAssetTypeEdit(e.target.value)}
													icon={<FaPen className="w-3 -ml-7 mt-3" />}
												/>
											</div>
											<div className="flex justify-between w-1/3 mt-[55px]">
												<div onClick={updateassetType}>
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

									{assetTypesData.map((assetTypeItem) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={assetType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{assetTypeItem.assetType}
												</td>
												<td className="text-xs p-3 text-gray5">
													<div className="flex">
														<MdDeleteOutline
															onClick={() => deleteassetType(assetTypeItem)}
															className="text-red w-4 h-4"
														/>
														<BsPencilSquare
															onClick={() => openEditData(assetTypeItem)}
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
export default AssetsTypes;
