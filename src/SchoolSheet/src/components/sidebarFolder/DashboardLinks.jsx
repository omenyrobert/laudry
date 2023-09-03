import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";

function DashboardLinks() {
	const location = useLocation();
	const [link, setLink] = useState(false);
	const toggleLink = () => {
		setLink(!link);
	};

	return (
		<>
			<Link
				to="/dashboard"
				className={
					location.pathname === "/dashboard"
						? "flex w-[80%] ml-5 mt-7  bg-primary rounded-md p-2 cursor-pointer"
						: "flex w-[80%] ml-5 mt-7 linkdiv rounded-md p-2 cursor-pointer"
				}
			>
				<div className="w-4/5 flex">
					<TbLayoutDashboard
						className={
							location.pathname === "/dashboard"
								? "w-4 h-4 mt-[2px] text-white"
								: "w-4 h-4 mt-[2px] linkicon"
						}
					/>
					<p
						className={
							location.pathname === "/dashboard"
								? "text-sm font-light text-white ml-6 "
								: "text-sm font-light linktext ml-6 "
						}
					>
						Dashboard
					</p>
				</div>
				<div className="w-1/5"></div>
			</Link>
		</>
	);
}

export default DashboardLinks;
