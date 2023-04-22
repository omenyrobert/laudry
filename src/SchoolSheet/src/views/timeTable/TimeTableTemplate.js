import React, { useState } from "react";
import Button2 from "../../components/Button2";
import Button from "../../components/Button";
import { GoPrimitiveDot } from "react-icons/go";
import InputField from "../../components/InputField";
import SelectComp from "../../components/SelectComp";
import ButtonSecondary from "../../components/ButtonSecondary";
import CalendarComp from "../../components/dashboard/CalendarComp";

function TimeTableTemplate() {
	const [add, setAdd] = useState(false);

	const openAdd = () => {
		setAdd(true);
	};

	const closeAdd = () => {
		setAdd(false);
	};

	return (
		<>
			<div className="mx-2 relative">
				{add ? (
					<div className="absolute z-50 rounded-md border border-gray2  bg-white shadow-2xl w-[70vw]">
						<div className="bg-primary rounded text-white flex justify-between p-3">
							<div>Create Schedule</div>
							<div>
								<p className="cursor-pointer" onClick={closeAdd}>
									X
								</p>
							</div>
						</div>
						<div className=" flex h-[70vh] overflow-y-auto">
							<div className="w-1/2 flex">
								<div className="w-1/2 p-2">
									<InputField type="date" label="Date" />
									<SelectComp
										placeholder="Select Schedule Type"
										label="Schedule Type"
									/>
									<SelectComp placeholder="Select Teacher" label="Teacher" />
								</div>
								<div className="w-1/2 p-2">
									<InputField
										type="text"
										label="Name"
										placeholder="Name Of the Schedule"
									/>
									<SelectComp placeholder="Select Subject" label="Subject" />
								</div>
							</div>
							<div className="w-1/2 p-2 ">
								<div className=" overflow-x-scroll overflow-hidden">
									<div className="w-[900px]">
										<p>Week 1</p>
										<div className="bg-primary3 flex text-primary font-medium text-sm">
											<div className="w-1/4 p-2">Monday</div>
											<div className="w-1/4 p-2">Tuesday</div>
											<div className="w-1/4 p-2">Wednesday</div>
											<div className="w-1/4 p-2">Thursday</div>
											<div className="w-1/4 p-2">Friday</div>
											<div className="w-1/4 p-2">Saturday</div>
											<div className="w-1/4 p-2">Sunday</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										
									</div>
									<hr className="text-gray2 my-5"/>
									<div className="w-[900px]">
										<p>Week 2</p>
										<div className="bg-primary3 flex text-primary font-medium text-sm">
											<div className="w-1/4 p-2">Monday</div>
											<div className="w-1/4 p-2">Tuesday</div>
											<div className="w-1/4 p-2">Wednesday</div>
											<div className="w-1/4 p-2">Thursday</div>
											<div className="w-1/4 p-2">Friday</div>
											<div className="w-1/4 p-2">Saturday</div>
											<div className="w-1/4 p-2">Sunday</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										
									</div>
									<hr className="text-gray2 my-5"/>
									<div className="w-[900px]">
										<p>Week 2</p>
										<div className="bg-primary3 flex text-primary font-medium text-sm">
											<div className="w-1/4 p-2">Monday</div>
											<div className="w-1/4 p-2">Tuesday</div>
											<div className="w-1/4 p-2">Wednesday</div>
											<div className="w-1/4 p-2">Thursday</div>
											<div className="w-1/4 p-2">Friday</div>
											<div className="w-1/4 p-2">Saturday</div>
											<div className="w-1/4 p-2">Sunday</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										<div className=" cursor-pointer py-3 border-b border-gray2 flex text-primary font-medium text-xs">
											<div className="w-1/4 p-2 hover:bg-primary3">
												8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
											<div className="w-1/4 p-2 hover:bg-primary3">
											8:00Am - 8:30Am
											</div>
											<div className="w-1/4 p-2 hover:bg-primary3">8:00Am - 8:30Am</div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray1 rounded flex justify-between p-3">
							<div onClick={closeAdd}> <ButtonSecondary value={"Close"}/></div>
							<div>
								<Button value={"Add Shedule"} />
							</div>
						</div>
					</div>
				) : null}
				<div className="bg-white p-5 border h-[90vh] border-gray2 mt-5 shadow">
					<div className="flex justify-between">
						<div>
							<p className="text-secondary text-xl font-medium">Time Table</p>
						</div>
						<div onClick={openAdd}>
							<Button2 value={"Add Schedule"} />
						</div>
					</div>
					<br/>
				 <CalendarComp/>
				</div>
			</div>
		</>
	);
}
export default TimeTableTemplate;
