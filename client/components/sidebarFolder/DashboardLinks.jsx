import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import "../../assets/styles/sidebar.css"

function DashboardLinks({ name, link, Icon }) {
	const location = useLocation();


	return (
		<>
			<Link
				to={link}
				className={
					location.pathname === link
						? `flex ml-3  rounded-md p-2 cursor-pointer  ${link === "/dashboard" ? "mt-7" : ""}`
						: `flex ml-3 p-2 cursor-pointer ${link === "/dashboard" ? "mt-7" : ""}`
				}
			>
				<div className="w-auto flex">
					<Icon
						className={
							location.pathname === link
								? "w-12 h-12 p-4 bg-primary rounded-md mt-[2px]  linkdiv text-white "
								: "w-12 h-12 p-4 rounded-md mt-[2px] linkdiv text-white "
						}
					/>
					<p
						className="text-white p-2 ml-20 mt-2 tooltipp rounded-md bg-primary text-sm w-auto"
					>
						{name}
					</p>
				</div>
			</Link>
		</>
	);
}

export default DashboardLinks;
