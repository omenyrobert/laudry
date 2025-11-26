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
import InputField from "../components/InputField";
import { BsSearch } from "react-icons/bs";
import { usePrint } from "../hooks/print";
import Button from "../components/Button";

const PaidOrders = () => {
  const [paidOrders, setPaidOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [totalPaidOrders, setTotalPaidOrders] = useState(null);
  const [totalPaidAmount, setTotalPaidAmount] = useState(null);
  const { printContent } = usePrint();
  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchDashboard = async () => {
    try {
      let res = await axiosInstance.get("/orders/dashboard");
      if (res.data.status) {
        let dataObj = res?.data?.payload;
        console.log("orders dashhboard", res?.data?.payload);
        setTotalPaidOrders(dataObj?.totalPaidOrders);
        setTotalPaidAmount(dataObj?.totalPaidAmount);
        setPaidOrders(dataObj?.paidOrders || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ====== STATUS OPTIONS ======
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#fcf8f0] text-[#fca503]";
      case "processing":
        return "bg-[#d7e3fa] text-[#033cad]";
      case "completed":
        return "bg-[#ccffd0] text-[#01910d]";
      case "paid":
        return "bg-[#01910d] text-[#ffffff]";
      case "cancelled":
        return "bg-red-100 text-[#ff0000]";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // ====== APPLY FILTERS (LIVE) ======
  useEffect(() => {
    if (!paidOrders) return;

    let data = [...paidOrders];

    // --- text search ---
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      data = data.filter((order) => {
        const name = order.name?.toLowerCase() || "";
        const phone = order.phone?.toLowerCase() || "";
        const address = order.address?.toLowerCase() || "";
        const idStr = String(order.id || "").toLowerCase();

        return (
          name.includes(lower) ||
          phone.includes(lower) ||
          address.includes(lower) ||
          idStr.includes(lower)
        );
      });
    }

    // --- date filter (assuming order.date is "YYYY-MM-DD" or ISO-compatible) ---
    if (startDate) {
      data = data.filter((order) => {
        if (!order.date) return false;
        return new Date(order.date) >= new Date(startDate);
      });
    }

    if (endDate) {
      data = data.filter((order) => {
        if (!order.date) return false;
        return new Date(order.date) <= new Date(endDate);
      });
    }

    setFilteredOrders(data);
  }, [paidOrders, searchTerm, startDate, endDate]);

  // ====== TOTALS (for current view: filtered or all) ======
  const currentOrders = filteredOrders || paidOrders || [];

  const totals = currentOrders.reduce(
    (acc, order) => {
      const amount = Number(order.amount) || 0;
      const paid = Number(order.paid) || 0;
      const balance = amount - paid;

      acc.amount += amount;
      acc.paid += paid;
      acc.balance += balance;
      return acc;
    },
    { amount: 0, paid: 0, balance: 0 }
  );

  return (
    <div className="h-[calc(100vh-50px)] p-2 bg-white rounded-md overflow-y-auto">
      <div className="flex font-bold -mb-5 text-lg justify-between w-full">
        <div>
          <p>
            <span className="text-primary">
              {currentOrders.length || totalPaidOrders}
            </span>{" "}
            Paid Orders
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 -mt-6">
          {/* Search */}
          <InputField
            placeholder="Search"
            icon={<BsSearch className="mt-2 mr-2" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Start Date */}
          <InputField
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          {/* End Date */}
          <InputField
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <p>UGX: {totalPaidAmount?.toLocaleString()}</p>
        </div>
        <div onClick={() => printContent("print-temp")}>
          <Button value={"Print"} />
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div id="print-temp" className="">
        <div className="bg-gray1 grid grid-cols-10 border-b text-sm">
          <div className="p-2">Order ID</div>
          <div className="p-2">Date</div>
          <div className="p-2">Name</div>
          <div className="p-2">Phone</div>
          <div className="p-2">Address</div>
          <div className="p-2">Amount</div>
          <div className="p-2">Paid</div>
          <div className="p-2">Balance</div>
          <div className="p-2">Status</div>
          <div className="p-2">Items</div>
        </div>
        <div className="h-[calc(100vh-190px)] overflow-y-auto">
          {currentOrders.map((order) => (
            <div
              className="shadow-sm grid grid-cols-10 border-b border-gray1 cursor-pointer hover:shadow-md"
              key={order.id}
            >
              <div className="text-sm p-2 text-gray5">#{order.id} </div>
              <div className="p-2 text-sm text-gray5">{order.date}</div>
              <div className="text-sm p-2 text-gray5">{order.name}</div>
              <div className="text-sm p-2 text-gray5">{order.phone}</div>
              <div className="text-sm p-2 text-gray5">{order.address}</div>
              <div className="text-sm p-2 text-gray5">
                {Number(order.amount).toLocaleString()}
              </div>
              <div className="text-sm p-2 text-gray5 underline text-blue-600">
                {Number(order.paid).toLocaleString()}
              </div>
              <div className="text-sm p-2 text-gray5">
                {(Number(order.amount) - Number(order.paid)).toLocaleString()}
              </div>
              <div className="text-xs flex p-2 text-gray5">
                <div>
                  <span
                    className={
                      "p-1 text-xs mb-1 rounded-md border " +
                      getStatusClasses(order.orderStatus)
                    }
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="text-xs p-3 text-gray5">
                {order.items && order.items.length > 0
                  ? order.items
                      .map(
                        (oi) => `${oi.item?.name || "Item"} x ${oi.quantity}`
                      )
                      .join(", ")
                  : "No items"}
              </div>
            </div>
          ))}

          {/* TOTALS ROW */}
          <div className="bg-gray1 font-bold grid grid-cols-10 border-b text-sm">
            <div className="p-2">Total</div>
            <div className="p-2"></div>
            <div className="p-2"></div>
            <div className="p-2"></div>
            <div className="p-2"></div>
            <div className="p-2">
              UGX: {totals.amount.toLocaleString()}
            </div>
            <div className="p-2">
              UGX: {totals.paid.toLocaleString()}
            </div>
            <div className="p-2">
              UGX: {totals.balance.toLocaleString()}
            </div>
            <div className="p-2"></div>
            <div className="p-2"></div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default PaidOrders;
