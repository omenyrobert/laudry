import React, { useState, useEffect } from "react";
import ButtonAlt from "./ButtonAlt";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../store/slices/store";
import axiosInstance from "../axios-instance";
import Loader from "./Loader";

const StockLevels = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchStockHistory = async () => {
    try {
      setLoading(true);
      let res = await axiosInstance.get("/sales/stock");
      if (res.data.status) {
        setLoading(false);
        const reversed = res.data.payload.map((stock) => ({
          ...stock,
          history: stock.history.reverse(), // reverse history
        }));
        setStocks(reversed);
        setLoading(false);
        console.log("stocks", reversed);
        // console.log("stocks", res.data.payload);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockHistory();
  }, []);
  return (
    <div>
      <div className="ml-2" onClick={openModal}>
        <ButtonAlt value={"Stock Levels"} />
      </div>

      {modal ? (
        <div className="flex bg-black/50 z-50 absolute top-0 right-0 left-0 h-full w-full">
          <div className="w-2/12" onClick={closeModal}></div>
          <div className="w-10/12 bg-white p-5 ">
            <p className="font-bold text-lg">Stock Levels Reduction history</p>
            <div className="h-[calc(100vh-80px)] overflow-y-auto">
              {loading ? <Loader /> : null}
              {stocks?.map((stock) => {
                return (
                  <div>
                    <p className="font-bold">{stock.stockName}</p>
                    <div className="grid grid-cols-5 text-black font-medium text-sm">
                      <div className="p-2 border border-gray2">Date</div>
                      <div className="p-2 border border-gray2">Stock</div>
                      <div className="p-2 border border-gray2">qty Sold</div>
                      <div className="p-2 border border-gray2">Qty before</div>
                      <div className="p-2 border border-gray2">Qty After</div>
                    </div>
                    {stock.history.map((his) => {
                      return (
                        <div className="grid hover:bg-gray1 cursor-pointer grid-cols-5 text-gray5 text-sm">
                          <div className="p-2 border border-gray2">
                            {his.soldAt.slice(0, 10)}
                          </div>
                          <div className="p-2 border border-gray2">
                            {his.stockName}
                          </div>
                          <div className="p-2 border border-gray2">
                            {his.quantitySold}
                          </div>
                          <div className="p-2 border border-gray2">
                            {his.balanceBefore}
                          </div>
                          <div className="p-2 border border-gray2">
                            {his.balanceAfter}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StockLevels;
