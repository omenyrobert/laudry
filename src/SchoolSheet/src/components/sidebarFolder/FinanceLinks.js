import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { MdNavigateNext } from "react-icons/md";
import { HiOutlineArrowSmRight, HiOutlineCurrencyDollar } from "react-icons/hi";

function FinanceLinks() {
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
					<HiOutlineCurrencyDollar className="w-4 h-4 mt-[2px] linkicon" />
					<p className="text-sm font-light linktext ml-6">Finance</p>
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

					{/* Payments */}

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

					{/* Bills */}

					<Link
						to="/bills"
						className={
							location.pathname === "/bills"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/bills"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Bills
							</p>
						</div>
					</Link>

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

					{/* Liabilities */}

					<Link
						to="/liabilities"
						className={
							location.pathname === "/liabilities"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/liabilities"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Liabilities
							</p>
						</div>
					</Link>
					{/* Liabilities */}

					{/* Equity */}

					<Link
						to="/equity"
						className={
							location.pathname === "/equity"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/equity"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Equity
							</p>
						</div>
					</Link>
					{/* Equity */}

					{/* journal */}
					<Link
						to="/journal"
						className={
							location.pathname === "/journal"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/journal"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Journal
							</p>
						</div>
					</Link>

					{/* Accounts */}

					<Link
						to="/accounts"
						className={
							location.pathname === "/accounts"
								? "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 bg-primary cursor-pointer text-white"
								: "flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
						}
					>
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p
								className={
									location.pathname === "/accounts"
										? "text-sm font-light text-white ml-5"
										: "text-sm font-light linktext ml-5"
								}
							>
								Accounts
							</p>
						</div>
					</Link>
					{/* Accounts */}

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
								Reports
							</p>
						</div>
					</Link>
					{/* reports */}
				</div>
			) : null}
		</>
	);
}

export default FinanceLinks;
