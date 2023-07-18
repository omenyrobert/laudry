import React, { useState } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import ButtonLoader from "../ButtonLoader";

function Experience({ staffProfile, staffId, fetchStaffInfo }) {
	const [experience, setExperience] = useState(false);
	const { toggleFeedback } = useFeedback();
	const [loading, setLoading] = useState(false);

	const openExperience = () => {
		setExperience(true);
	};

	const closeExperience = () => {
		setExperience(false);
	};

	const [school, setSchool] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [position, setPosition] = useState("");

	// const [posting, setPositing] =   useState(false);
	const addExperience = async () => {
		if (school === "" || from === "" || to === "" || position === "") {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please Fill in all fields",
			});
			return;
		}
		const experienceData = {
			staff: staffId,
			company: school,
			position,
			start_date: from,
			end_date: to,
		};
		setLoading(true);

		try {
			const res = await axiosInstance.post(
				"/staff-profile/work-experience",
				experienceData
			);
			const { status, payload } = res.data;
			if (status) {
				toggleFeedback("success", {
					title: "Success",
					text: "Experience added successfully",
				});
				fetchStaffInfo();
				closeExperience();
			} else {
				toggleFeedback("error", {
					title: "Error",
					text: payload,
				});
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			toggleFeedback("error", {
				title: "Error",
				text: error.message,
			});
			closeExperience();
			setLoading(false);
		}
	};

	function deleteWorkExperience(id) {
		axiosInstance
			.delete(`/staff-profile/work-experience/${id}`)
			.then((res) => {
				const { status, payload } = res.data;
				if (status) {
					toggleFeedback("success", {
						title: "Success",
						text: "Experience deleted successfully",
					});
					fetchStaffInfo();
				} else {
					toggleFeedback("error", {
						title: "Error",
						text: payload,
					});
				}
			})
			.catch((err) => {
				toggleFeedback("error", {
					title: "Error",
					text: err.message,
				});
			});
	}

	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						Academic Experience
					</p>
				</div>
				<div
					onClick={openExperience}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Experience
				</div>
				{experience ? (
					<div className="border absolute z-50  border-gray3 bg-white shadow h-auto rounded w-[35vw] overflow-y-auto">
						<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
							<div>
								<p>Add Experience</p>
							</div>
							<div>
								<p className="cursor-pointer" onClick={closeExperience}>
									X
								</p>
							</div>
						</div>
						<div className="flex">
							<div className="w-1/2 p-3">
								<InputField
									type="text"
									placeholder="School"
									label="School"
									onChange={(e) => setSchool(e.target.value)}
									value={school}
								/>
								<InputField
									type="date"
									placeholder="From"
									label="From Date"
									onChange={(e) => setFrom(e.target.value)}
									value={from}
								/>
							</div>
							<div className="w-1/2 p-3 -mt-5">
								<InputField
									type="date"
									placeholder="To"
									label="To Date"
									onChange={(e) => {
										setTo(e.target.value);
									}}
									value={to}
								/>
								<InputField
									type="text"
									placeholder="Enter Position"
									label="Position"
									name="position"
									onChange={(e) => setPosition(e.target.value)}
									value={position}
								/>
								<div className="flex justify-between mt-5">
									<div></div>
									<div>
										{loading ? (
											<ButtonLoader />
										) : (
											<div onClick={addExperience} className=" w-20">
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

			{staffProfile?.workExperience?.map((experience, index) => (
				<div key={index} className="flex border-b border-gray1">
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						{experience.company}
					</div>
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						{experience.start_date} - {experience.end_date}
					</div>
					<div className="p-2 w-1/3 text-sm text-gray5 truncate">
						{experience.position}
					</div>
					<div className="p-2 w-1/5 text-sm text-gray5 truncate">
						<div className="flex justify-end">
							<div
								onClick={() => {
									deleteWorkExperience(experience.id);
								}}
								className="text-red cursor-pointer"
							>
								Delete
							</div>
						</div>
					</div>
				</div>
			))}

			{staffProfile?.workExperience?.length === 0 ? (
				<div className="flex justify-center items-center h-20">
					<p className="text-gray5 text-sm">No Experience Added</p>
				</div>
			) : null}
		</>
	);
}

export default Experience;
