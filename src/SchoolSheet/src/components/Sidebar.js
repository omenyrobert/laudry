import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	TbLayoutDashboard,
	TbTournament,
	TbBooks,
	TbChevronDown,
	TbBus,
} from "react-icons/tb";
import {
	FaUsers,
	FaBookReader,
	FaCapsules,
	FaRegMoneyBillAlt,
	FaUserCog,
	FaMoneyCheckAlt,
	FaBriefcase,
	FaChair,
} from "react-icons/fa";
import { MdNavigateNext, MdOutlineSportsSoccer } from "react-icons/md";
import { HiOutlineArrowSmRight, HiOutlineCurrencyDollar } from "react-icons/hi";
import {
	BsGear,
	BsFillFileEarmarkPostFill,
	BsUpcScan,
	BsFillCalendarDateFill,
} from "react-icons/bs";
import { FcAdvertising } from "react-icons/fc";
import "../assets/styles/sidebar.css";

function Sidebar() {
	const location = useLocation();

	const [link1, setLink1] = useState(false);

	const [link2, setLink2] = useState(false);

	const [link3, setLink3] = useState(false);

	const [link4, setLink4] = useState(false);

	const [link5, setLink5] = useState(false);

	const [link6, setLink6] = useState(false);

	const [link7, setLink7] = useState(false);

	const [link8, setLink8] = useState(false);

	const [link9, setLink9] = useState(false);

	const [link10, setLink10] = useState(false);

	const [link11, setLink11] = useState(false);

	const [link12, setLink12] = useState(false);

	const [link13, setLink13] = useState(false);

	const [link14, setLink14] = useState(false);

	const toggleLink1 = () => {
		setLink1(!link1);
	};

	const toggleLink2 = () => {
		setLink2(!link2);
	};

	const toggleLink3 = () => {
		setLink3(!link3);
	};

	const toggleLink4 = () => {
		setLink4(!link4);
	};

	const toggleLink5 = () => {
		setLink5(!link5);
	};

	const toggleLink6 = () => {
		setLink6(!link6);
	};

	const toggleLink7 = () => {
		setLink7(!link7);
	};

	const toggleLink8 = () => {
		setLink8(!link8);
	};

	const toggleLink9 = () => {
		setLink9(!link9);
	};

	const toggleLink10 = () => {
		setLink10(!link10);
	};

	const toggleLink11 = () => {
		setLink11(!link11);
	};

	const toggleLink12 = () => {
		setLink12(!link12);
	};

	const toggleLink13 = () => {
		setLink13(!link13);
	};

	const toggleLink14 = () => {
		setLink14(!link14);
	};

	return (
		<div className="bg-white w-[250px] h-screen text-primary2 my-2 -mt-1 pt-5  shadow-xl">
			<div className="flex ml-6 ">
				<FaBriefcase className="text-secondary text-2xl" />
				<p className="text-secondary text-xl ml-2 font-bold">
					School SoftOffice
				</p>
			</div>
			<div className="h-[75vh] overflow-y-auto">
				{/* Dashboard */}

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

				{/* settings */}

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

				{/* 2. Fees */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink2}
				>
					<div className="w-4/5 flex">
						<FaMoneyCheckAlt className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Fees</p>
					</div>
					<div className="w-1/5">
						{link2 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link2 ? (
					<div className="ml-4">
						{/* feesStrructures */}

						<Link
							to="/feesStrructures"
							className={
								location.pathname === "/feesStrructures"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/feesStrructures"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Fees Structure
								</p>
							</div>
						</Link>

						{/* feesStrructures */}

						<Link
							to="/fees"
							className={
								location.pathname === "/fees"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/fees"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Fees Payments
								</p>
							</div>
						</Link>
					</div>
				) : null}

				{/* Students */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink3}
				>
					<div className="w-4/5 flex">
						<FaUsers className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Students</p>
					</div>
					<div className="w-1/5">
						{link3 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link3 ? (
					<div className="ml-4">
						{/* strudents */}

						<Link
							to="/students"
							className={
								location.pathname === "/students"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/students"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Students Info
								</p>
							</div>
						</Link>

						{/* groups */}

						<Link
							to="/groupsAndTypes"
							className={
								location.pathname === "/groupsAndTypes"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/groupsAndTypes"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Groups & Types
								</p>
							</div>
						</Link>
					</div>
				) : null}

				{/* ±Classes */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink14}
				>
					<div className="w-4/5 flex">
						<FaUsers className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Classes</p>
					</div>
					<div className="w-1/5">
						{link14 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link14 ? (
					<div className="ml-4">
						{/* strudents */}

						<Link
							to="/studentAttendance"
							className={
								location.pathname === "/studentAttendance"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/studentAttendance"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Student Attendance
								</p>
							</div>
						</Link>

						{/* assesment */}

						<Link
							to="/assessment"
							className={
								location.pathname === "/assessment"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/assessment"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Assessment
								</p>
							</div>
						</Link>

						{/* report card generation */}

						<Link
							to="/reportCards"
							className={
								location.pathname === "/reportCards"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/reportCards"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Report Cards
								</p>
							</div>
						</Link>

						{/* Time Table */}

						<Link
							to="/timeTable"
							className={
								location.pathname === "/timeTable"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/timeTable"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Time Table
								</p>
							</div>
						</Link>
					</div>
				) : null}

				{/* FaChair */}

				{/* 4. HRM */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink4}
				>
					<div className="w-4/5 flex">
						<FaUserCog className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">HRM</p>
					</div>
					<div className="w-1/5">
						{link4 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link4 ? (
					<div className="ml-4">
						{/* staff */}

						<Link
							to="/staff"
							className={
								location.pathname === "/staff"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/staff"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Staff Members
								</p>
							</div>
						</Link>

						{/* staff */}

						<Link
							to="/staffAttendance"
							className={
								location.pathname === "/staffAttendance"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/staffAttendance"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Staff Attendance
								</p>
							</div>
						</Link>

						{/* staff */}

						<Link
							to="/payRoll"
							className={
								location.pathname === "/payRoll"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/payRoll"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Pay Roll
								</p>
							</div>
						</Link>
					</div>
				) : null}

				<hr className="text-gray2 my-5" />

				{/* . 6. Finance */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink5}
				>
					<div className="w-4/5 flex">
						<HiOutlineCurrencyDollar className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Finance</p>
					</div>
					<div className="w-1/5">
						{link5 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link5 ? (
					<div className="ml-4">
						{/* incomes */}

						<Link
							to="/incomes"
							className={
								location.pathname === "/incomes"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/incomes"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Incomes
								</p>
							</div>
						</Link>

						{/* expenses */}

						<Link
							to="/expenses"
							className={
								location.pathname === "/expenses"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/expenses"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Expenses
								</p>
							</div>
						</Link>

						{/* reports */}

						<Link
							to="/reports"
							className={
								location.pathname === "/reports"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/reports"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Balance Sheet
								</p>
							</div>
						</Link>

						{/* invoices */}

						<Link
							to="/invoices"
							className={
								location.pathname === "/invoices"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/invoices"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Invoices
								</p>
							</div>
						</Link>

						{/* Payments */}

						{/* receipts */}

						<Link
							to="/receipts"
							className={
								location.pathname === "/receipts"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/receipts"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Receipts
								</p>
							</div>
						</Link>

						{/* receipts */}

						<Link
							to="/payments"
							className={
								location.pathname === "/payments"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/payments"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Payments
								</p>
							</div>
						</Link>

						{/* Payments */}

						{/* Stock Management */}

						<Link
							to="/stock"
							className={
								location.pathname === "/stock"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/stock"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Stock Management
								</p>
							</div>
						</Link>

						{/* Stock Management */}

						{/* Stock Management */}

						{/* Assetes */}

						<Link
							to="/assets"
							className={
								location.pathname === "/assets"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/assets"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Assetes
								</p>
							</div>
						</Link>
						{/* Assetes */}
					</div>
				) : null}

				{/* . Time Table */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink6}
				>
					<div className="w-4/5 flex">
						<BsFillCalendarDateFill className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Time Table</p>
					</div>
					<div className="w-1/5">
						{link6 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link6 ? (
					<div className="ml-4">
						{/* schedule */}

						<Link
							to="/schedules"
							className={
								location.pathname === "/schedules"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/schedules"
											? "text-sm font-light text-white ml-5"
											: "text-sm font-light linktext ml-5"
									}
								>
									Schedules
								</p>
							</div>
						</Link>

						{/* Calendar */}

						<Link
							to="/calendar"
							className={
								location.pathname === "/calendar"
									? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
									: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
							}
						>
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p
									className={
										location.pathname === "/calendar"
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

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink7}
				>
					<div className="w-4/5 flex">
						<FcAdvertising className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Marketing</p>
					</div>
					<div className="w-1/5">
						{link7 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link7 ? (
					<div className="ml-4">
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="w-4/5 flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Emails</p>
							</div>
							<div className="w-1/5"></div>
						</div>
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">SMS</p>
							</div>
						</div>
					</div>
				) : null}

				{/* Scholarships */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink8}
				>
					<div className="w-4/5 flex">
						<FaBookReader className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Scholarships</p>
					</div>
					<div className="w-1/5">
						{link8 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link8 ? (
					<div className="ml-4">
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="w-4/5 flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Scholarships</p>
							</div>
							<div className="w-1/5"></div>
						</div>
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Students</p>
							</div>
						</div>
					</div>
				) : null}

				{/* Library */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink9}
				>
					<div className="w-4/5 flex">
						<TbBooks className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Library</p>
					</div>
					<div className="w-1/5">
						{link9 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link9 ? (
					<div className="ml-4">
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="w-4/5 flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Scholarships</p>
							</div>
							<div className="w-1/5"></div>
						</div>
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Students</p>
							</div>
						</div>
					</div>
				) : null}

				{/* Scholarships */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink10}
				>
					<div className="w-4/5 flex">
						<MdOutlineSportsSoccer className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Sports</p>
					</div>
					<div className="w-1/5">
						{link10 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link10 ? (
					<div className="ml-4">
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="w-4/5 flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Scholarships</p>
							</div>
							<div className="w-1/5"></div>
						</div>
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Students</p>
							</div>
						</div>
					</div>
				) : null}

				<hr className="text-gray2 my-5" />

				{/* Activities */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink11}
				>
					<div className="w-4/5 flex">
						<TbTournament className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Activities</p>
					</div>
					<div className="w-1/5">
						{link11 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link11 ? (
					<div className="ml-4">
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="w-4/5 flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Scholarships</p>
							</div>
							<div className="w-1/5"></div>
						</div>
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Students</p>
							</div>
						</div>
					</div>
				) : null}

				{/* Transport */}

				<div
					className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
					onClick={toggleLink12}
				>
					<div className="w-4/5 flex">
						<TbBus className="w-4 h-4 mt-[2px] linkicon" />
						<p className="text-sm font-light linktext ml-6">Transport</p>
					</div>
					<div className="w-1/5">
						{link12 ? (
							<TbChevronDown className="w-5" />
						) : (
							<MdNavigateNext className="w-5" />
						)}
					</div>
				</div>
				{link12 ? (
					<div className="ml-4">
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="w-4/5 flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Scholarships</p>
							</div>
							<div className="w-1/5"></div>
						</div>
						<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
							<div className="flex">
								<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
								<p className="text-sm font-light linktext ml-5">Students</p>
							</div>
						</div>
					</div>
				) : null}
				<br />
			</div>
			<div className="p-4 m-4 bg-secondary rounded-md h-48">
				<div className="flex justify-center items-center">
					<img src="upgrade1.png" className="w-28" />
				</div>

				<div className="p-3 text-center mt-2 text-sm bg-black text-white rounded-md">
					<p>Upgrade Now</p>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
