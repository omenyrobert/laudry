import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye } from "react-icons/bs";
import Button2 from "../Button2";
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import Button from "../Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";

let db = new Localbase("db");

function Suppliers() {
	const [showUpdate2, setShowUpdate2] = useState(false);

	const closeShowUpdate2 = () => {
		setShowUpdate2(false);
	};

	// edit supplier

	const openShowUpdate2 = (sup) => {
		setShowUpdate2(true);
		setEditSupplier(sup.supplier);
		setSupplierId(sup.id);
		setContactsEdit(sup.contacts);
		setEmailsEdit(sup.emails);
		setAddressEdit(sup.address);
		setAboutEdit(sup.about);
	};

	const [showUpdate, setShowUpdate] = useState(false);

	const closeShowUpdate = () => {
		setShowUpdate(false);
	};

	// edit supplier
	const [editSupplier, setEditSupplier] = useState("");
	const [contactsEdit, setContactsEdit] = useState("");
	const [emailsEdit, setEmailsEdit] = useState("");
	const [addressEdit, setAddressEdit] = useState("");
	const [aboutEdit, setAboutEdit] = useState("");
	const [supplierId, setSupplierId] = useState("");

	const openShowUpdate = (sup) => {
		setShowUpdate(true);
		setEditSupplier(sup.supplier);
		setSupplierId(sup.id);
		setContactsEdit(sup.contacts);
		setEmailsEdit(sup.emails);
		setAddressEdit(sup.address);
		setAboutEdit(sup.about);
	};

	// update supplier
	const updateSupplier = () => {
		db.collection("suppliersTbl")
			.doc({ id: supplierId })
			.update({
				supplier: editSupplier,
				contacts: contactsEdit,
				emails: emailsEdit,
				address: addressEdit,
				about: aboutEdit,
			})
			.then((response) => {
				console.log(response);
				fetchSuppliers();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeShowUpdate();
			})
			.catch((error) => {
				console.log(error);
			});

		// fetch after
		// fetchSuppliers();
	};

	// delete supplier

	const deleteSupplier = (sup) => {
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
				db.collection("suppliersTbl")
					.doc({ id: sup.id })
					.delete()
					.then((response) => {
						fetchSuppliers();

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

	// posting suppliers
	const [supplier, setSupplier] = useState("");
	const [contacts, setContacts] = useState("");
	const [emails, setEmails] = useState("");
	const [address, setAddress] = useState("");
	const [about, setAbout] = useState("");
	const postSuppliers = () => {
		let secId = uuid();
		let formData = {
			id: secId,
			supplier: supplier,
			contacts: contacts,
			emails: emails,
			address: address,
			about: about,
		};
		if (supplier || contacts || emails || address || about) {
			db.collection("suppliersTbl")
				.add(formData)
				.then((response) => {
					console.log(response);
					setSupplier("");
					setContacts("");
					setEmails("");
					setAddress("");
					setAbout("");

					// fetch after
					fetchSuppliers();

					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const [suppliersData, setSuppliers] = useState([]);
	const fetchSuppliers = async () => {
		console.log("fetched");
		const suppliers = await db.collection("suppliersTbl").get();
		setSuppliers(suppliers);
	};

	// fetching supplier
	useEffect(() => {
		fetchSuppliers();
	}, []);

	return (
		<>
			<div className="w-full h-[90vh] bg-white ">
				<div className="p-2">
					<p className="text-secondary font-medium text-lg">Suppliers</p>
					<div className="flex w-full">
						<div className="p-1 w-1/2">
							<InputField
								label="Supplier Name"
								type="text"
								placeholder="Supplier Name"
								value={supplier}
								onChange={(e) => setSupplier(e.target.value)}
							/>
						</div>
						<div className="p-1 w-1/2">
							<InputField
								value={contacts}
								onChange={(e) => setContacts(e.target.value)}
								label="Contacts"
								type="text"
								placeholder="Contacts"
							/>
						</div>
					</div>

					<div className="flex w-full -mt-10">
						<div className="p-1 w-1/2">
							<InputField
								value={emails}
								onChange={(e) => setEmails(e.target.value)}
								label="Emails"
								type="text"
								placeholder="Emails"
							/>
						</div>
						<div className="p-1 w-1/2">
							<InputField
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								label="Address"
								type="text"
								placeholder="Address"
							/>
						</div>
					</div>
					<div className="flex w-full -mt-10">
						<div className="p-1 w-1/2">
							<InputField
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								label="about"
								type="text"
								placeholder="about"
							/>
						</div>
						<div className="p-1 w-1/2 mt-14">
							<div onClick={postSuppliers}>
								<Button value={"Add Supplier"} />
							</div>
						</div>
					</div>

					<table className="mt-1 w-[98%] table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Name</th>
							<th className="p-2 text-primary text-sm text-left">Contacts</th>
							<th className="p-2 text-primary text-sm text-left">Location</th>
							<th className="p-2 text-primary text-sm text-left">Actions</th>
						</thead>
						<tbody>
							{showUpdate2 ? (
								<div className="border border-gray2 absolute w-[600px] bg-white  shadow-xl">
									<div className="bg-primary rounded p-2 text-white flex justify-between">
										<div> Supplier Info</div>

										<div>
											<p className="cursor-pointer" onClick={closeShowUpdate2}>
												X
											</p>
										</div>
									</div>
									<div className="flex w-full">
										<div className="p-1 w-1/2">
											<p className="font-bold text-xl text-primary">
												{editSupplier}
											</p>
										</div>
										<div className="p-1 w-1/2">
											<p>Contacts</p>
											<p className="text-gray5 text-sm">{contactsEdit}</p>
										</div>
									</div>

									<div className="flex w-full mt-5">
										<div className="p-5 w-1/2">
											<p>Emails</p>
											<p className="text-gray5 text-sm">{emailsEdit}</p>
										</div>
										<div className="p-5 w-1/2">
											<p>Address</p>
											<p className="text-gray5 text-sm">{addressEdit}</p>
										</div>
									</div>
									<div className="flex w-full mt-5">
										<div className="p-5 w-1/2">
											<p>about</p>
											<p className="text-gray5 text-sm">{aboutEdit}</p>
										</div>
										<div className="p-5 w-1/2 mt-14"></div>
									</div>
								</div>
							) : null}

							{showUpdate ? (
								<div className="border border-gray2 absolute w-[600px] bg-white  shadow-xl">
									<div className="bg-primary rounded p-2 text-white flex justify-between">
										<div>Update Supplier</div>

										<div>
											<p className="cursor-pointer" onClick={closeShowUpdate}>
												X
											</p>
										</div>
									</div>
									<div className="flex w-full">
										<div className="p-1 w-1/2">
											<InputField
												label="Supplier Name"
												type="text"
												placeholder="Supplier Name"
												value={editSupplier}
												onChange={(e) => setEditSupplier(e.target.value)}
											/>
										</div>
										<div className="p-1 w-1/2">
											<InputField
												value={contactsEdit}
												onChange={(e) => setContactsEdit(e.target.value)}
												label="Contacts"
												type="text"
												placeholder="Contacts"
											/>
										</div>
									</div>

									<div className="flex w-full -mt-10">
										<div className="p-1 w-1/2">
											<InputField
												value={emailsEdit}
												onChange={(e) => setEmailsEdit(e.target.value)}
												label="Emails"
												type="text"
												placeholder="Emails"
											/>
										</div>
										<div className="p-1 w-1/2">
											<InputField
												value={addressEdit}
												onChange={(e) => setAddressEdit(e.target.value)}
												label="Address"
												type="text"
												placeholder="Address"
											/>
										</div>
									</div>
									<div className="flex w-full -mt-10">
										<div className="p-1 w-1/2">
											<InputField
												value={aboutEdit}
												onChange={(e) => setAboutEdit(e.target.value)}
												label="about"
												type="text"
												placeholder="about"
											/>
										</div>
										<div className="p-1 w-1/2 mt-14">
											<div onClick={updateSupplier}>
												<Button value={"Update Supplier"} />
											</div>
										</div>
									</div>
								</div>
							) : null}

							{suppliersData.map((sup) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={sup.id}
									>
										<td className="text-xs p-3 text-gray5">{sup.supplier}</td>
										<td className="text-xs p-3 text-gray5">{sup.contacts}</td>
										<td className="text-xs p-3 text-gray5">{sup.address}</td>
										<td>
											<div className="flex justify-between w-18">
												<MdDeleteOutline
													onClick={() => deleteSupplier(sup)}
													className="text-red "
												/>
												<BsPencilSquare
													onClick={() => openShowUpdate(sup)}
													className="text-warning "
												/>
												<BsEye
													onClick={() => openShowUpdate2(sup)}
													className="text-primary"
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
		</>
	);
}
export default Suppliers;
