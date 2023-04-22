import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import "../../assets/styles/main.css"

const Card = ({
	first_name_letter,
	last_name_letter,
	first_name,
	middle_name,
	date_of_birth,
	gender,
	place_of_residence,
	last_name,
}) => (
	<div className="bg-white p-2 h-36 my-2 w-full rounded">
		<div className="flex justify-between">
			<div className="">
				<div className="flex">
					<div className="rounded-full h-8 w-8 pt-1 my-2 text-center text-sm font-semibold  text-primary bg-primary2">
						{first_name_letter} {last_name_letter}
					</div>
					<div>
						<p className="p-3 -mt-1 -ml-1">
							{first_name} {middle_name} {last_name}
						</p>
					</div>
				</div>
			</div>
			<div className="">
				
				<HiDotsVertical className="text-primary hoverIcon cursor-pointer" />
				<div className="border border-gray1 w-32 p-2 z-10 showOnHover shadow-lg h-36 overflow-y-auto -ml-[3vw] bg-white rounded absolute">
					<p className="text-gray5 text-sm border-b border-gray2 py-1 cursor-pointer hover:bg-gray1">Waiting</p>
					<p className="text-gray5 text-sm  border-b border-gray2 py-1 cursor-pointer hover:bg-gray1">Doctor</p>
					<p className="text-gray5 text-sm border-b border-gray2 py-1 cursor-pointer  hover:bg-gray1">Doctor</p>
					<p className="text-gray5 text-sm border-b border-gray2 py-1 cursor-pointer  hover:bg-gray1">Doctor</p>
					<p className="text-gray5 text-sm border-b border-gray2 py-1 cursor-pointer  hover:bg-gray1">Doctor</p>
					<p className="text-gray5 text-sm border-b border-gray2 py-1 cursor-pointer  hover:bg-gray1">Doctor</p>
					<p className="text-gray5 text-sm border-b border-gray2 py-1 cursor-pointer  hover:bg-gray1">Doctor</p>
				</div>
			</div>
		</div>
		<div className="flex mt-3">
			<div className="w-2/3">
				<div className="flex">
					<div className="">
						<BsCalendarDate className="text-red" />
					</div>
					<div className=" -mt-3">
						<p className="text-sm p-3 text-gray5">{date_of_birth}yrs</p>
					</div>
				</div>
			</div>
			<div className="w-1/3"></div>
		</div>
		<div className="flex mt-2 justify-between">
			<div className="text-gray5 text-xs">{gender}</div>
			<div className=" text-gray5 text-xs">{place_of_residence}</div>
		</div>
	</div>
);

export default Card;
