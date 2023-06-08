import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button2 from "../Button2";
import Button from "../Button";
import { FaPen, FaPhone, FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdLocationPin } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonSecondary from "../ButtonSecondary";
import Modal from "react-modal";
import axiosInstance from "../../axios-instance"
import { useDispatch, useSelector } from "react-redux";
import { getSchools } from "../../store/schoolSheetSlices/schoolStore";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the overlay color here
	},
	content: {
		width: "800px",
		height: "auto",
		padding: "0px",
		marginLeft: "25vw",
		marginTop: "5vw",
	},
};

function EditSchoolInfo() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [motto, setMotto] = useState("");
	const [location, setLocation] = useState("");
	const [phones, setPhones] = useState("");
	const [emails, setEmails] = useState("");
	const [description, setDescription] = useState("");
	const [sites, setSites] = useState("");
	const [show, setShow] = useState(false);
	const [id, setId] = useState("");
	const [photo, setPhoto] = useState(null);
	const [school, setSchool] = useState(null);
	const { schools } = useSelector((state) => state.schoolStore);

	const updateInfo = () => {
		let data = {
			name: name,
			motto: motto,
			location: location,
			phoneNumbers: phones,
			emails: emails,
			sites: sites,
			description: description,
			id,
		};
		  
		const formData = new FormData();

		for (const key in data) {
			formData.append(key, data[key]);
		}

		if (photo) {
			formData.append("logo", photo);
		}

		axiosInstance.put(`schools`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
			.then((response) => {
				const { status, payload } = response.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						title: "Oops...",
						text: payload,
					});
					return;
				}
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				dispatch(getSchools());
				setIsOpen(false);
			})
			.catch((error) => {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: "An Error Occurred while trying to update student. Please try again",
				});
			})
	};

	// fetching section
	useEffect(() => {
		dispatch(getSchools());
	}, [dispatch]);


	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	function selectPhoto(e) {

		const { files } = e.target;
		if (files && files[0]) {
			setPhoto(files[0]);
		}
	}

	useEffect(() => {
		setSchool(schools[0]);
		if (schools[0]) {
		  const {
			name,
			motto,
			location,
			phoneNumbers,
			emails,
			description,
			sites,
			id
		  } = schools[0];
		  setName(name);
		  setMotto(motto);
		  setLocation(location);
		  setPhones(phoneNumbers);
		  setEmails(emails);
		  setDescription(description);
		  setSites(sites);
		  setId(id);
		}
	  }, [schools]);

	return (
		<>
			<div className="p-5">
				<div onClick={openModal} className="w-52">
					<Button2 value={"Edit School Info"} />
				</div>

				<Modal
					isOpen={isOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>

						<div className="text-primary flex justify-between p-3 bg-gray1 font-semibold">
							<div>Update School Info</div>
							<div>
								<p onClick={closeModal} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="p-3 flex">
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
									onChange={selectPhoto}
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
							</div>
						</div>
						<div className="flex justify-between p-3 bg-gray1">
							<div onClick={closeModal}>
								<ButtonSecondary value={"Close"} />
							</div>
							<div>
								<div onClick={updateInfo}>
									<Button value={"Update"} />
								</div>
							</div>
						
					</div>
				</Modal>
			</div>
		</>
	);
}

export default EditSchoolInfo;
