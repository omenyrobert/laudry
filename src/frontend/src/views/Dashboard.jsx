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
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, getAllStock, getCustomers, getTopStock } from "../store/slices/store";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const { allStock, customers, accounts, topStock } = useSelector((state) => state.autocountStore)
	const [warningStock, setWarningStock] = useState([])
	const [unSettled, setUnSettled] = useState([])
	const [stocksWithHightsSales, setStocksWithHightsSales] = useState([])

	useEffect(() => {
		const unsettled = accounts.filter((account) => {
			return account.balance !== 0
		})

		setUnSettled(unsettled)
	}, [accounts])

	useEffect(() => {
		dispatch(getAllStock())
		dispatch(getCustomers())
		dispatch(getAccounts())
	}, [dispatch])

	useEffect(() => {
		const warning = allStock.filter((stock) => {
			return stock.qty < stock.warningAt
		})

		setWarningStock(warning)
	}, [allStock])

	useEffect(() => {
		let allS = [...allStock]
		const stocksWithHightsSales = allS.sort((a, b) => {
			if (a.sales?.length > b.sales?.length) {
				return -1
			} else {
				return 1
			}
		})

		setStocksWithHightsSales(stocksWithHightsSales.slice(0, 5))
	}, [allStock])






	return (
		<div className="h-[100vh] overflow-y-auto">
			<Cards allStock={allStock} warningStock={warningStock} accounts={unSettled} />
			<div className="flex w-full">
				<div className="w-7/12">
					<div className="rounded-md w-full shadow-md bg-white h-[65vh] p-5">
						<p className="text-xl text-primary font-semibold">Products</p>
						<BarGraph allStock={allStock} />

					</div>
					<div className="bg-white h-[75vh] overflow-y-auto rounded-md p-2 mt-2 shadow-md">
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

						{stocksWithHightsSales.map((mem) => {
							return (
								<div className="flex text-sm border-b border-gray1 cursor-pointer text-gray5 hover:bg-gray1">
									<div className="p-2 w-1/4 flex">
										<div className="ml-2">	{mem.name}</div>
									</div>
									<div className="p-2 w-1/4">
										{mem.qty}
									</div>
									<div className="p-2 w-1/4">
										{mem.unitCost}
									</div>
									<div className="p-2 w-1/4">
										{mem.unitSell}
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
							{unSettled.map((giv) => {
								return (
									<div className="flex justify-between p-2 hover:bg-gray1 border-b border-gray1 hover:border-2 cursor-pointer hover:border-l-primary">
										<div>
											<p>{giv.customer?.name}</p>
											<p className="text-sm font-light text-gray5">{
												new Date(giv.date).toDateString()
											}</p>
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
						<DoughnutComp unSettled={unSettled} />
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
