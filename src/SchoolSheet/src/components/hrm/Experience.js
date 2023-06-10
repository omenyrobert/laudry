import React, { useState } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";


function Experience({ staffProfile, staffId, fetchStaffInfo }) {
	const [experience, setExperience] = useState(false);
	const { toggleFeedback } = useFeedback()

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

	const addExperience = async () => {
		if (school === "" || from === "" || to === "" || position === "") {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please Fill in all fields"
			})
			return;
		}
		const experienceData = {
			staff: staffId,
			company: school,
			position,
			start_date: from,
			end_date: to
		}

		try {
			const res = await axiosInstance.post("/staff-profile/work-experience", experienceData)
			const { status, payload } = res.data
			if (status) {
				toggleFeedback("success", {
					title: "Success",
					text: "Experience added successfully"
				})
				fetchStaffInfo()
				closeExperience()
			} else {
				toggleFeedback("error", {
					title: "Error",
					text: payload
				})
			}
		} catch (error) {
			console.log(error)
			toggleFeedback("error", {
				title: "Error",
				text: error.message
			})
			closeExperience()
		}
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
					<div className="border absolute z-50  border-gray3 bg-white shadow h-[350px] rounded w-[700px] overflow-y-auto">
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
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="From"
									label="From Date"
									onChange={(e) => setFrom(e.target.value)}
									value={from}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/2 p-3 -mt-5">
								<InputField
									type="text"
									placeholder="To"
									label="To Date"
									onChange={(e) => setTo(e.target.value)}
									value={to}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Enter Position"
									label="Position"
									name="position"
									onChange={(e) => setPosition(e.target.value)}
									value={position}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>

								<div onClick={addExperience} className="mt-14">
									<Button value={"Add Experience"} />
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>

			{
				staffProfile?.workExperience?.map((experience, index) => (
					<div key={index} className="flex border-b border-gray1">
						<div className="p-2 w-1/3 text-sm text-gray5 truncate">{experience.company}</div>
						<div className="p-2 w-1/3 text-sm text-gray5 truncate">
							{experience.start_date} - {experience.end_date}
						</div>
						<div className="p-2 w-1/3 text-sm text-gray5 truncate">
							{experience.position}
						</div>
					</div>
				))
			}

			{staffProfile?.workExperience?.length === 0 ? (
				<div className="flex justify-center items-center h-20">
					<p className="text-gray5 text-sm">No Experience Added</p>
				</div>
			) : null}

		</>
	);
}

export default Experience;
