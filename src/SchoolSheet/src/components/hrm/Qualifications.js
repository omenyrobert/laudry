import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import ButtonLoader from "../ButtonLoader";

function Qualifications({ staffProfile, staffId, fetchStaffInfo }) {
	const [Qualifications, setQualifications] = useState(false);
	const { toggleFeedback } = useFeedback();

	const openQualifications = () => {
		setQualifications(true);
	};

	const closeQualifications = () => {
		setQualifications(false);
	};

	const [award, setAward] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [school, setSchool] = useState("");
	const [doc, setDoc] = useState("");

	const [posting, setPositing] = useState(false);

	const addQualifications = async () => {
		if (award === "" || from === "" || to === "" || school === "") {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please fill all fields",
			});
			return;
		}
		setPositing(true);
		const data = {
			qualification: award,
			institution: school,
			start_date: from,
			end_date: to,
			staff: staffId,
		};

		await axiosInstance
			.post("/staff-profile/education", data)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					setPositing(false);
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Qualifications added successfully",
				});
				fetchStaffInfo();
				setQualifications(false);
				setAward("");
				setFrom("");
				setTo("");
				setSchool("");
				setPositing(false);
			})
			.catch((err) => {
				console.log(err);
				toggleFeedback("error", {
					title: "Oops...",
					text: "Something went wrong",
				});
				setPositing(false);
			});
		setPositing(false);
	};

	function deleteQualification(id) {
		axiosInstance
			.delete(`/staff-profile/education/${id}`)
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
					text: "Qualifications deleted successfully",
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
						Academic Qualifications
					</p>
				</div>
				<div
					onClick={openQualifications}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Qualifications
				</div>
				{Qualifications ? (
					<div className="border absolute z-50 -mt-[200px] border-gray3 bg-white shadow h-[400px] rounded w-[35vw] overflow-y-auto">
						<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
							<div>
								<p>Add Qualification</p>
							</div>
							<div>
								<p className="cursor-pointer" onClick={closeQualifications}>
									X
								</p>
							</div>
						</div>
						<div className="flex">
							<div className="w-1/2 p-3">
								<InputField
									type="text"
									placeholder="Award"
									label="Award"
									onChange={(e) => setAward(e.target.value)}
									value={award}
								/>
								<InputField
									type="date"
									placeholder="From"
									label="From Date"
									onChange={(e) => setFrom(e.target.value)}
									value={from}
								/>
								<InputField
									type="date"
									placeholder="To"
									label="To Date"
									onChange={(e) => setTo(e.target.value)}
									value={to}
								/>
							</div>
							<div className="w-1/2 p-3 -mt-5">
								<InputField
									type="text"
									placeholder="Enter Institution"
									label="Institution"
									name="Institution"
									onChange={(e) => setSchool(e.target.value)}
									value={school}
								/>

								<InputField
									type="file"
									label="Document"
									onChange={(e) => setDoc(e.target.value)}
									value={doc}
								/>
								<div className="flex justify-between mt-20">
									<div></div>
									<div className="w-20">
										{posting ? (
											<ButtonLoader />
										) : (
											<div onClick={addQualifications} className="">
												<Button value={"Add"} />
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>

			{staffProfile?.education?.map((qualification, index) => (
				<div key={index} className="flex border-b border-gray1">
					<div className="p-2 w-1/4 text-sm text-gray5 truncate">
						{qualification.qualification}
					</div>
					<div className="p-2 w-1/4 text-sm text-gray5 truncate">
						{qualification.start_date} - {qualification.end_date}
					</div>
					<div className="p-2 w-1/4 text-sm text-gray5 truncate">
						{qualification.institution}
					</div>
					<div className="p-2 w-1/4 text-sm text-gray5 truncate">
						{qualification.document}
					</div>
					<div className="p-2 w-1/6 text-sm text-gray5 truncate">
						<div className="flex justify-end">
							<div
								onClick={() => {
									deleteQualification(qualification.id);
								}}
								className="text-red cursor-pointer"
							>
								Delete
							</div>
						</div>
					</div>
				</div>
			))}

			{staffProfile?.education?.length === 0 ? (
				<div className="flex justify-center items-center h-20">
					<p className="text-gray5 text-sm">No Qualifications added yet</p>
				</div>
			) : null}
		</>
	);
}

export default Qualifications;
