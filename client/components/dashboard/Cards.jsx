import React, { useState, useEffect } from "react";
import { FaUsers, FaFileInvoiceDollar, FaTooth } from "react-icons/fa";
import { TbZoomMoney } from "react-icons/tb"


function Cards({ allStock, warningStock, accounts, customers, staff }) {



	return (
		<div className="flex  rounded-md w-full">

			<div className="w-1/4 my-2 mr-2 p-3 h-24  bg-primary text-white shadow  rounded-md">
				<p className="text-lg font-semibold">
					Customers
				</p>
				<div className="flex justify-between mt-3 text-sm">
					<div>
						{customers?.length}
					</div>
					<div>
						View All
					</div>
				</div>
			</div>

			{/* first card */}

			<div className="w-1/4 m-2 p-2 h-24 border border-gray2   bg-white shadow hover:bg-blue11 cursor-pointer rounded-md ">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">Users</p>
						</div>
					</div>
					<div className="">
						<FaUsers />
					</div>
				</div>
				<div className="flex justify-between mt-5">
					<div className="">
						<p className="text-2xl">{
							staff.length.toLocaleString()
						}</p>
					</div>
					<div className="">
						<p className="bg-blue11 p-2 text-primary text-xs rounded">View All</p>
					</div>
				</div>
			</div>

			{/* second card */}

			<div className="w-1/4 m-2 p-2  h-24 border border-gray2   bg-white shadow hover:bg-yellow11 cursor-pointer rounded-md ">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">Products</p>
						</div>
					</div>
					<div className="">
						<FaFileInvoiceDollar />
					</div>
				</div>
				<div className="flex justify-between mt-5">
					<div className="">
						<p className="text-2xl">
							{allStock.length.toLocaleString()}
						</p>
					</div>
					<div className="">
						<p className="bg-yellow11 p-2 text-orange text-xs rounded">View All</p>
					</div>
				</div>
			</div>

			{/* third card */}

			<div className="w-1/4 m-2 p-2  h-24 border border-gray2    bg-white shadow hover:bg-green11 cursor-pointer rounded-md ">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">ReStocks</p>
						</div>
					</div>
					<div className="">
						<TbZoomMoney />
					</div>
				</div>
				<div className="flex justify-between mt-5">
					<div className="">
						<p className="text-2xl">
							{warningStock.length.toLocaleString()}
						</p>
					</div>
					<div className="">
						<p className="bg-green11 p-2 text-green text-xs rounded">View All</p>
					</div>
				</div>
			</div>

			{/* fourth card */}

			<div className="w-1/4 m-2 p-2  h-24 border border-gray2   bg-white shadow hover:bg-red1 cursor-pointer rounded-md">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">Uncleared Supply</p>
						</div>
					</div>
					<div className="">
						<FaUsers />
					</div>
				</div>
				<div className="flex justify-between mt-5">
					<div className="">
						<p>
							{accounts.length.toLocaleString()}
						</p>
					</div>
					<div className="">
						<p className="bg-red1 p-2 text-red text-xs rounded">View All</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Cards;
