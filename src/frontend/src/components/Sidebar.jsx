import React, { } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	MdHardware,
} from "react-icons/md";
import "../assets/styles/sidebar.css";
import DashboardLinks from "./sidebarFolder/DashboardLinks";
import { TbLogout2 } from "react-icons/tb";
import { TbLayoutDashboard, TbMicroscope, TbCertificate, TbReportMoney, TbTestPipe } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";
import { BiLogoZoom, BiSolidLogOut } from "react-icons/bi";
import { MdGraphicEq, MdSell } from "react-icons/md"
import { FaUsers, FaMoneyCheckDollar, FaNewspaper } from "react-icons/fa";
import { BsBank, BsGraphUpArrow, BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";

function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const response = await axiosInstance.get("/auth/logout");
			const { data } = response;
			const { status } = data;
			if (status) {
				localStorage.clear();
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-secondary h-screen text-primary2 my-2 -mt-1  shadow-xl">
			<div className="p-5 flex justify-center">
				<img src="fav.svg" className="w-2/3 rounded-full" />
			</div>
			<div className="h-[82vh] overflow-y-auto -mt-8">
				{/* Dashboard */}

				<DashboardLinks Icon={TbLayoutDashboard} name="Dashboard" link={"/dashboard"} />
				<DashboardLinks Icon={AiOutlineTeam} name="customers" link={"/customers"} />
				<DashboardLinks Icon={FaUsers} name="users" link={"/users"} />
				<DashboardLinks Icon={MdHardware} name="stock" link={"/stock"} />
				<DashboardLinks Icon={MdSell} name="Sales" link={"/sales"} />
				<DashboardLinks Icon={BsGraphUpArrow} name="Reports" link={"/reports"} />
				<DashboardLinks Icon={BsBank} name="Banking" link={"/banking"} />

			</div>

			<div onClick={handleLogout} className="w-12 cursor-pointer h-12 flex ml-5 justify-center rounded-full items-center text-center m-2 text-sm bg-black text-white">
				<TbLogout2 className="w-6 h-6 -ml-1" />
			</div>

		</div>
	);
}

export default Sidebar;
