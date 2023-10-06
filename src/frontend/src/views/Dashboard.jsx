import React, { useEffect, useState } from "react";
import SmallCalendar from "../components/dashboard/SmallCalendar";
// import Loader from "../components/Loader"
import "../assets/styles/main.css";
import "../assets/styles/dashboard.css";
import BarGraph from "../components/dashboard/BarGraph";
import Cards from "../components/dashboard/Cards";
import Doughnut from "../components/dashboard/DoughnutComp";
import { FaUserAlt } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";
import DoughnutComp from "../components/dashboard/DoughnutComp";

const Dashboard = () => {
	const navigate = useNavigate();

	const customers = [
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 45000 },
		{ id: 1, fn: "Akao", emails: "34", contact: "25,000", kids: 75000 },
		{ id: 1, fn: "Jeremy", emails: "34", contact: "25,000", kids: 660000 },
		{ id: 1, fn: "Kol", emails: "34", contact: "25,000", kids: 870000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 400000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 20000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 14000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 240000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 320000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 340000 },
		{ id: 1, fn: "Omeny", emails: "34", contact: "25,000", kids: 430000 }
	]

	const givings = [
		{ id: 1, name: "15th June 2023", type: "Omeny Robert", amount: "250,000" },
		{ id: 1, name: "15th June 2023", type: "Kafunda Food Supliy", amount: "50,000" },
		{ id: 1, name: "1st Sep 2023", type: "Jessa Milk", amount: "120,000" },
		{ id: 1, name: "3rd Oct 2023", type: "Lato Powder", amount: "250,000" },
		{ id: 1, name: "3rd Oct 2023", type: "Ryco Curry Powder", amount: "250,000" },
		{ id: 1, name: "3rd Oct 2023", type: "Joshua Barack", amount: "250,000" },
		{ id: 1, name: "3rd Oct 2023", type: "Wandegeya Feeds", amount: "150,000" },
		{ id: 1, name: "3rd Oct 2023", type: "John Odongo", amount: "250,000" },
		{ id: 1, name: "2nd Nov 2023", type: "Kato Food supply", amount: "120,000" },
	]

	const news = [
		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },
		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://images.pexels.com/photos/4867670/pexels-photo-4867670.jpeg?auto=compress&cs=tinysrgb&w=1600" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://images.pexels.com/photos/7328448/pexels-photo-7328448.jpeg?auto=compress&cs=tinysrgb&w=1600" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },
	]





	return (
		<div className="h-[100vh] overflow-y-auto">
			<Cards />
			<div className="flex w-full">
				<div className="w-7/12">
					<div className="rounded-md w-full shadow-md bg-white h-[65vh] p-5">
						<p className="text-xl text-primary font-semibold">Products</p>
						<BarGraph />

					</div>
					<div className="bg-white shadow h-[75vh] overflow-y-auto rounded-md p-2 mt-2 shadow-md">
						<p className="my-2 text-xl font-semibold text-primary">Most Bought items</p>
						<div className="flex font-medium text-primary bg-gray1">
							<div className="p-2 w-1/4">
								Products
							</div>
							<div className="p-2 w-1/4">
								Qty
							</div>
							<div className="p-2 w-1/4">
								UnitCost
							</div>
							<div className="p-2 w-1/4">
								UnitSell
							</div>

						</div>

						{customers.map((mem) => {
							return (
								<div className="flex text-sm border-b border-gray1 cursor-pointer text-gray5 hover:bg-gray1">
									<div className="p-2 w-1/4 flex">
										<div className="ml-2">	{mem.fn}</div>
									</div>
									<div className="p-2 w-1/4">
										{mem.emails}
									</div>
									<div className="p-2 w-1/4">
										{mem.contact}
									</div>
									<div className="p-2 w-1/4">
										{mem.kids}
									</div>

								</div>
							)
						})}

					</div>
				</div>
				<div className="w-5/12">
					<div className=" rounded-md shadow-md bg-white ml-2 overflow-y-auto p-2">
						<p className="m-2 text-xl font-semibold text-primary">Un cleared Supply</p>
						<div className="h-[40vh] overflow-y-auto mt-2">
							{givings.map((giv) => {
								return (
									<div className="flex justify-between p-2 hover:bg-gray1 border-b border-gray1 hover:border-2 cursor-pointer hover:border-l-primary">
										<div>
											<p>{giv.type}</p>
											<p className="text-sm font-light text-gray5">{giv.name}</p>
										</div>
										<p className="text-primary font-medium text-lg">{giv.amount}</p>
									</div>
								)
							})}
						</div>
						<br />
					</div>
					<div className="mt-2 rounded-md shadow-md bg-white ml-2 overflow-y-auto p-2">
						<p className="m-2 text-xl font-semibold text-primary">Profit per Product</p>
						<DoughnutComp />
						<br />
						<br />
						<br />
					</div>

				</div>


			</div>
			<br />
		</div>
	);
};

export default Dashboard;
