import React, { useState } from "react";
import Button2 from "../Button2";
import Button from "../Button";
import { GoPrimitiveDot } from "react-icons/go";
import InputField from "../InputField";
import SelectComp from "../SelectComp";
import ButtonSecondary from "../ButtonSecondary";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin


function Lessons() {
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
						</div>
						<div className="bg-gray1 rounded flex justify-between p-3">
							<div onClick={closeAdd}>
								{" "}
								<ButtonSecondary value={"Close"} />
							</div>
							<div>
								<Button value={"Add Shedule"} />
							</div>
						</div>
					</div>
				) : null}
				<div className="bg-white p-5 border h-[90vh] overflow-y-auto  border-gray2 mt-5 shadow">
					<div className="flex justify-between">
						<div>
							<p className="text-secondary text-2xl font-medium">
								Time Table For Lessons
							</p>
						</div>
						<div onClick={openAdd}>
							<Button2 value={"Add Schedule"} />
						</div>
					</div>
					<br />
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin, rrulePlugin, timeGridPlugin]}
						initialView="timeGridWeek"
						timeZone="local"
						slotDuration="00:15:00"
						slotMinTime="08:00:00"
						slotMaxTime="18:00:00"
						eventBackgroundColor="#193296"
						eventBorderColor="#193296"
						nowIndicator="true"
						scrollTime='moment().subtract(50, "minutes").format("HH:mm:ss")'
						events={[
							{
								title: 'Monday Meeting',
								start: '2023-04-25T12:00:00',
								end: '2023-04-25T13:00:00',
								daysOfWeek: [1], // 1 = Monday
								startTime: '12:00',
								endTime: '13:00',
								color: '#f542cb'
							},
							{
								title: 'Tuesday Meeting',
								start: '2023-04-25T08:00:00',
								end: '2023-04-25T08:30:00',
								daysOfWeek: [2], // 1 = Monday
								startTime: '08:00',
								endTime: '08:30',
							},
							{
								title: 'Thursday Meeting',
								start: '2023-04-25T10:00:00',
								end: '2023-04-25T11:30:00',
								daysOfWeek: [4], // 1 = Monday
								startTime: '10:00',
								endTime: '11:30',
								color: '#f28305'
							},
							{
								title: 'Sport Day',
								start: '2023-04-26T14:00:00',
								end: '2023-04-26T14:30:00',
								// daysOfWeek: [2], 
								// startTime: '14:00',
								// endTime: '14:30',
							},

						]}
					/>
				</div>
			</div>
		</>
	);
}
export default Lessons;
