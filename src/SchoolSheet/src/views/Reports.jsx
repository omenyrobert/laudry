import * as React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import "../assets/styles/main.css";

function Reports() {
  return (
    <div
    className="h-screen overflow-hidden bg-gray10"
  >
    <div className="flex w-full">
      <div className="w-1/12">
        <Sidebar />
      </div>
      <div className="w-11/12 -ml-3">
        <Navbar />
        <div className="h-screen overflow-y-auto mt-2">
          <div className="flex">
            <div className="w-7/12 rounded-md shadow-md bg-white h-96 p-2">
              Reports
            </div>
            <div className="w-5/12 rounded-md shadow-md bg-white ml-2 h-96 p-2">
              Anaylsis
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Reports