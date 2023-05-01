import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { BsGear } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { HiOutlineArrowSmRight } from "react-icons/hi";

function SettingsLinks() {

    const location = useLocation();
	const [link1, setLink1] = useState(false);
	const toggleLink1 = () => {
		setLink1(!link1);
	};

	return (
		<>
			<div
				className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
				onClick={toggleLink1}
			>
				<div className="w-4/5 flex">
					<BsGear className="w-4 h-4 mt-[2px] linkicon" />
					<p className="text-sm font-light linktext ml-6">Settings</p>
				</div>
				<div className="w-1/5">
					{link1 ? (
						<TbChevronDown className="w-5" />
					) : (
						<MdNavigateNext className="w-5" />
					)}
				</div>
			</div>
			{link1 ? (
				<div className="ml-4">
					<Link
						to="/settings"
						className={
							location.pathname === "/settings"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="w-4/5 flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/settings"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								About
							</p>
						</div>
						<div className="w-1/5"></div>
					</Link>
					{/* classesStreams */}

					<Link
						to="/classesStreams"
						className={
							location.pathname === "/classesStreams"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/classesStreams"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Classes & Streams
							</p>
						</div>
					</Link>

					{/* subjects Grading */}
					<Link
						to="/subjectsGrading"
						className={
							location.pathname === "/subjectsGrading"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/subjectsGrading"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Subjects & Grading
							</p>
						</div>
					</Link>
				</div>
			) : null}
		</>
	);
}

export default SettingsLinks;
