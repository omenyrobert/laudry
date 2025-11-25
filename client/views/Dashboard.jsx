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

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(null);
  const [pendingOrder, setPendingOrders] = useState(null);
  const [paidOrder, setPaidOrders] = useState(null);
  const [totalPendingOrders, setTotalPendingOrders] = useState(null);
  const [totalPaidOrders, setTotalPaidOrders] = useState(null);
  const [totalPaidAmount, setTotalPaidAmount] = useState(null);
  const [totalPendingAmount, setTotalPendingAmount] = useState(null);
  const [topExpenses, setTopExpenses] = useState(null);
  const [totalExpenseThisWeek, settotalExpenseThisWeek] = useState(null);
  const [mostOrderItems, setmostOrderItems] = useState(null)

  const fetchDashboard = async () => {
    try {
      let res = await axiosInstance.get("/orders/dashboard");
      if (res.data.status) {
        let dataObj = res?.data?.payload;
        console.log("orders dashhboard", res?.data?.payload);
        setTotalPendingOrders(dataObj?.totalPendingOrders);
        setTotalPendingAmount(dataObj?.totalPendingAmount);
        setTotalPaidOrders(dataObj?.totalPaidOrders);
        setTotalPaidAmount(dataObj?.totalPaidAmount);
        setTotalOrders(dataObj?.totalOrders);
        setTopExpenses(dataObj?.topExpenses);
        setPendingOrders(dataObj?.pendingOrders);
        setPaidOrders(dataObj?.paidOrders);
        settotalExpenseThisWeek(dataObj?.totalExpenseThisWeek);
		setmostOrderItems(dataObj?.mostOrderItems)
        // totalPendingOrders
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="h-[100vh] overflow-y-auto">
      <Cards
        totalOrders={totalOrders}
        totalPaidOrders={totalPaidOrders}
        totalPendingOrders={totalPendingOrders}
        totalExpenseThisWeek={totalExpenseThisWeek}
        totalPendingAmount={totalPendingAmount}
      />

      <div className="flex w-full">
        <div className="w-7/12">
          <div className="rounded-md w-full shadow-md bg-white h-[calc(100vh-200px)] p-5">
            <p className="text-xl text-primary font-semibold">Orders</p>
            <BarGraph mostOrderItems={mostOrderItems} />
          </div>
          <div className="bg-white h-[calc(100vh-200px)] overflow-y-auto rounded-md p-2 mt-2 shadow-md">
            <p className="my-2 text-xl font-semibold text-primary">
              Most Washed Items
            </p>
            <div className="flex   justify-between font-medium text-primary bg-gray1">
              <div className="p-2">Item</div>
              <div className="p-2 ">Qty</div>
            </div>

            {mostOrderItems?.map((mem) => {
              return (
                <div className="flex  justify-between text-sm border-b border-gray1 cursor-pointer text-gray5 hover:bg-gray1">
                  <div className="p-2  flex">
                    <div className="ml-2"> {mem.itemName}</div>
                  </div>
                  <div className="p-2 ">{mem.totalQty?.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-5/12">
          <div className=" rounded-md h-[calc(100vh-200px)] shadow-md bg-white ml-2 overflow-y-auto p-2">
            <p className="m-2 text-xl font-semibold text-primary">
              Pending Orders
            </p>
            <div className="h-[40vh] overflow-y-auto mt-2">
              {pendingOrder?.map((giv) => {
                return (
                  <div className="flex justify-between p-2 hover:bg-gray1 border-b border-gray1 hover:border-2 cursor-pointer hover:border-l-primary">
                    <div>
                      <p>{giv?.name}</p>
                      <p className="text-sm font-light text-gray5">
                        {new Date(giv.date).toDateString()}
                      </p>
                    </div>
                    <p className="text-primary font-medium text-lg">
                      {giv.amount?.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
            <br />
          </div>
          <div className="mt-2 rounded-md shadow-md bg-white ml-2 h-[calc(100vh-200px)] overflow-y-auto p-2">
            <p className="m-2 text-xl font-semibold text-primary">
              Top Expenses
            </p>
             {topExpenses?.map((giv) => {
                return (
                  <div className="flex justify-between text-sm p-2 hover:bg-gray1 border-b border-gray1 hover:border-2 cursor-pointer hover:border-l-primary">
                    <div>
                      <p>{giv?.date?.slice(0,10)}</p>
                     
                    </div>
					<div>
                      <p>{giv?.expense}</p>
                     
                    </div>
                    <p className="text-primary font-medium text-lg">
                      {giv.amount?.toLocaleString()}
                    </p>
                  </div>
                );
              })}
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
