import React, { useState } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import ButtonLoader from "../ButtonLoader";
import ButtonSecondary from "../ButtonSecondary";

function NOK({ staffProfile, staffId, fetchStaffInfo }) {
	const [nok, setNok] = useState(false);
	const { toggleFeedback } = useFeedback();

	const openNok = () => {
		setNok(true);
	};

	const closeNok = () => {
		setNok(false);
	};

	const [relationship, setRelationship] = useState("");
	const [nokname, setNokName] = useState("");
	const [nokContact, setNokContact] = useState("");

	const [posting, setPosting] = useState(false);
	const addNok = () => {
		console.log("Clicked")
		if (relationship === "" || nokname === "" || nokContact === "") {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please fill all fields",
			});
			return;
		}
		setPosting(true);
		const data = {
			relationship,
			name: nokname,
			contact: nokContact,
			staff: staffId,
		};

		axiosInstance
			.post("/staff-profile/next-of-kin", data)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					setPosting(false);
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Next of kin added successfully",
				});
				fetchStaffInfo();
				setNok(false);
				setRelationship("");
				setNokName("");
				setNokContact("");
				setPosting(false);
			})
			.catch((err) => {
				console.log(err);
				toggleFeedback("error", {
					title: "Oops...",
					text: "Something went wrong",
				});
				setPosting(false);
			});
	};

	function deleteNok(id) {
		axiosInstance
			.delete(`/staff-profile/next-of-kin/${id}`)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Next of kin deleted successfully",
				});
				fetchStaffInfo();
			})
			.catch((err) => {
				console.log(err);
				toggleFeedback("error", {
					title: "Oops...",
					text: "Something went wrong",
				});
			});
	}



	return (
		<>

			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						Next Of Kin Info
					</p>
				</div>
				<div
					onClick={openNok}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Next Of Kin
				</div>
				{nok ? (
					<div className="top-0 w-full h-full bg-black/50 right-0 absolute z-50 flex">
						<div onClick={closeNok} className="w-2/12">
						</div>
						<div className=" w-5/12 mt-[10vh]">
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div>
									<p>Add Next Of Kin</p>
								</div>
								<div>
									<p className="cursor-pointer" onClick={closeNok}>
										X
									</p>
								</div>
							</div>
							<div className="flex bg-white">
								<div className="w-1/2 p-3">
									<InputField
										type="text"
										placeholder="Enter relationship"
										label="Relationship"
										onChange={(e) => setRelationship(e.target.value)}
										value={relationship}
									/>
									<InputField
										type="text"
										placeholder="Enter Name"
										label="Name"
										onChange={(e) => setNokName(e.target.value)}
										value={nokname}
									/>
								</div>
								<div className="w-1/2 p-3 -mt-5">
									<InputField
										type="text"
										placeholder="Enter Contacts"
										label="Contacts"
										name="Contacts"
										onChange={(e) => setNokContact(e.target.value)}
										value={nokContact}
									/>




								</div>
							</div>
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div onClick={closeNok}>
									<ButtonSecondary value={"Close"} />
								</div>
								<div>
									{posting ? <ButtonLoader /> : <div onClick={addNok}> <Button value={"Add"} /></div>}
								</div>
							</div>
						</div>
						<div onClick={closeNok} className="w-5/12">
						</div>
					</div>
				) : null}
			</div>
			{staffProfile?.nextOfKin?.map((nok, index) => (
				<div key={index} className="flex border-b border-gray1 mt-5">
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						{nok.relationship}
					</div>
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						{nok.name}
					</div>
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						{nok.contact}
					</div>
					{/* Delete button */}
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						<div className="flex justify-end">
							<div onClick={() => {
								deleteNok(nok.id)
							}} className="text-red cursor-pointer">
								Delete
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default NOK;

/* {nok ? (
				<div className="border absolute z-50 md:-mt-[35vh] sm:-mt-[30vh] 2xl:-mt-[20vh]  lg:-mt-[25vh] xl:-mt-[35vh]  border-gray3 bg-white shadow h-auto rounded w-[40vw] overflow-y-auto">
					<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
						<div>
							<p>Add Next Of Kin</p>
						</div>
						<div>
							<p className="cursor-pointer" onClick={closeNok}>
								X
							</p>
						</div>
					</div>
					<div className="flex">
						<div className="w-1/2 p-3">
							<InputField
								type="text"
								placeholder="ext Of Kin Type"
								label="Next Of Kin Type"
								onChange={(e) => setRelationship(e.target.value)}
								value={relationship}
								
							/>
							<InputField
								type="text"
								placeholder="ext Of Kin Type"
								label="Next Of Kin Type"
								onChange={(e) => setNokName(e.target.value)}
								value={nokname}
								
							/>
						</div>
						<div className="w-1/2 p-3 -mt-5">
							<InputField
								type="text"
								placeholder="Enter Contacts"
								label="Contacts"
								name="Contacts"
								onChange={(e) => setNokContact(e.target.value)}
								value={nokContact}
								
							/>

							<div className="mt-14">
								<Button value={"Add Nok"} />
							</div>
						</div>
					</div>
				</div>
			) : null} */