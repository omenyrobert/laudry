import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import InputField from "../InputField";
import Button2 from "../Button2";
import { FaPen, FaPhone, FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdLocationPin } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";

let db = new Localbase("db");

function EditSchoolInfo() {
	const [name, setName] = useState("");
	const [motto, setMotto] = useState("");
	const [location, setLocation] = useState("");
	const [phones, setPhones] = useState("");
	const [emails, setEmails] = useState("");
	const [description, setDescription] = useState("");
	const [sites, setSites] = useState("");
	const [show, setShow] = useState(false);
	const [aid, setAid] = useState("")

	const updateInfo = () => {
		db.collection("aboutInfoTbl")
			.doc({ id: aid })
			.update({
				name: name,
				motto: motto,
				location: location,
				phones: phones,
				emails: emails,
				sites: sites,
				description: description,
			})
			.then((response) => {
				closeShow();
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
	};

	const fetchAboutInfo = async () => {
		console.log("fetched");
		const aboutInfo = await db.collection("aboutInfoTbl").get();
		setName(aboutInfo[0].name);
		setMotto(aboutInfo[0].motto);
		setLocation(aboutInfo[0].location);
		setPhones(aboutInfo[0].phones);
		setEmails(aboutInfo[0].emails);
		setDescription(aboutInfo[0].description);
		setSites(aboutInfo[0].sites);
		setAid(aboutInfo[0].id);
	};

	// fetching section
	useEffect(() => {
		fetchAboutInfo();
	}, []);


	const openShow = () => {
		setShow(true);
	};
	const closeShow = () => {
		setShow(false);
	};
	return (
		<>
			<div className="p-5">
				<div onClick={openShow}>
					<Button2 value={"Edit School Info"} />
				</div>

				{show ? (
					<div className="bg-white border border-gray2 absolute shadow-2xl w-[800px] h-[60vh] overflow-y-auto">
						<div className="bg-primary flex justify-between p-2 text-white">
							<div>Update School Info</div>
							<div>
								<p onClick={closeShow} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="p-2 flex">
							<div className="w-1/2">
								<InputField
									type="text"
									placeholder="Enter Facility Name"
									label="Facility Name"
									onChange={(e) => setName(e.target.value)}
									value={name}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									value={phones}
									placeholder="Enter Your Phone Number"
									label="Phone Number"
									onChange={(e) => setPhones(e.target.value)}
									icon={<FaPhone className="w-3 -ml-7 mt-3" />}
								/>

								<InputField
									type="file"
									label=" Logo"
									name="Logo"
									icon={<FaRegImage className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Enter Description"
									label="Description"
									onChange={(e) => setDescription(e.target.value)}
									value={description}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/2 ml-5">
								<InputField
									type="text"
									placeholder="Enter motto"
									label="motto"
									onChange={(e) => setMotto(e.target.value)}
									value={motto}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="email"
									value={emails}
									placeholder="Enter Email"
									label="Email Address"
									onChange={(e) => setEmails(e.target.value)}
									icon={<MdOutlineAlternateEmail className="w-3 -ml-7 mt-3" />}
								/>

								<InputField
									type="text"
									placeholder="Enter  Location"
									label=" Location"
									onChange={(e) => setLocation(e.target.value)}
									value={location}
									icon={<MdLocationPin className="w-3 -ml-7 mt-3" />}
								/>

								<InputField
									type="text"
									placeholder="Enter  Sites"
									label="Sites"
									onChange={(e) => setSites(e.target.value)}
									value={sites}
									icon={<MdLocationPin className="w-3 -ml-7 mt-3" />}
								/>

								<div onClick={updateInfo}>
									<Button2 value={"Update"} />
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
}

export default EditSchoolInfo;
