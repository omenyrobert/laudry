import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { HiOutlineArrowSmRight } from "react-icons/hi";

function TimeTableLinks() {
	const location = useLocation();
	const [link, setLink] = useState(false);
	const toggleLink = () => {
		setLink(!link);
	};

	return (
		<>
			<div
				className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
				onClick={toggleLink}
			>
				<div className="w-4/5 flex">
					<BsFillCalendarDateFill className="w-4 h-4 mt-[2px] linkicon" />
					<p className="text-sm font-light linktext ml-6">Time Table</p>
				</div>
				<div className="w-1/5">
					{link ? (
						<TbChevronDown className="w-5" />
					) : (
						<MdNavigateNext className="w-5" />
					)}
				</div>
			</div>
			{link ? (
				<div className="ml-4">
					{/* Lessons */}

					<Link
						to="#"
						className={
							location.pathname === "#"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "#"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Lessons
							</p>
						</div>
					</Link>

					{/* Exams */}

					<Link
						to="#"
						className={
							location.pathname === "#"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "#"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Exams
							</p>
						</div>
					</Link>

					{/* Calendar */}

					<Link
						to="#"
						className={
							location.pathname === "#"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "#"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Calendar
							</p>
						</div>
					</Link>
				</div>
			) : null}
		</>
	);
}

export default TimeTableLinks;
