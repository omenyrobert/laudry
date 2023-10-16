import React from "react";
import InputField from "../components/InputField";
import Button2 from "../components/Button2";
import { BsSearch } from "react-icons/bs";
import ButtonAlt from "../components/ButtonAlt";
import ReStock from "../components/ReStock";

const Reports = () => {


    const sales = [
        { id: 1, date: "09-11-2023", product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "Regal Pain", qty: 10, sale: "200,000", cost: "100,000", profit: "100,000" },
        { id: 1, date: "09-11-2023", product: "Iron Bar", qty: 104, sale: "1,03,000", cost: "710,000", profit: "67,000" },
        { id: 1, date: "09-11-2023", product: "Iron Sheet", qty: 234, sale: "203,000", cost: "180,000", profit: "97,000" },
        { id: 1, date: "09-11-2023", product: "B Wire", qty: 14, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "2 inc Nails", qty: 24, sale: "230,000", cost: "190,000", profit: "30,000" },
        { id: 1, date: "09-11-2023", product: "1 ltr Sadolin", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "Padlocks", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "Spade", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "cememnt Hima", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, date: "09-11-2023", product: "Wheel Barrow", qty: 2, sale: "700,000", cost: "400,000", profit: "300,000" },
        { id: 2, date: "09-11-2023", product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 3, date: "09-11-2023", product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 4, date: "10-11-2023", product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 5, date: "11-11-2023", product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },

    ]

    return (
        <div className="w-full bg-white rounded-md shadow px-5">
            <div className="flex w-full justify-between">
                <div className=''>
                    <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
                      Sales  Report
                    </h1>
                </div>

                <div className="w-4/12 ">

                    <InputField
                        type="text"
                        placeholder="Search For Student ..."
                        name="lastName"
                        icon={
                            <BsSearch
                                className="w-3 -ml-7 mt-3 cursor-pointer"
                                type="button"
                            />
                        }
                    />
                </div>
                <div className="flex mt-5">
                    <div className="-mt-5">
                        <InputField type="date" />
                    </div>
                    <div className="-mt-5 mx-3">
                        <InputField type="date" />
                    </div>
                    <div>
                        <ReStock />
                    </div>
                    <div className="ml-2">
                        <ButtonAlt value={"Print"} />
                    </div>



                </div>

            </div>
            <div className="h-[65vh] overflow-y-auto">
                <div className="font-medium flex w-full bg-gray1 text-primary">
                    <div className="p-3 w-2/12">
                        Date
                    </div>
                    <div className="p-3 w-2/12">
                        Product
                    </div>
                    <div className="p-3 w-2/12">
                        Qty
                    </div>
                    <div className="py-3 w-2/12">
                        Cost
                    </div>
                    <div className="py-3 w-2/12">
                        Sale
                    </div>
                    <div className="py-3 w-2/12">
                        Profit
                    </div>
                </div>


                {sales?.map((sale) => {
                    return (
                        <div
                            className="shadow-sm flex border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                            key={sale.id}
                        >
                            <div className="py-3 w-2/12 text-xs text-gray5  ">
                                {sale.date}
                            </div>
                            <div className="py-3 text-xs text-gray5 w-2/12">
                                {sale.product}
                            </div>
                            <div className="py-3 text-xs text-gray5 w-2/12">
                                {sale.qty}
                            </div>
                            <div className="py-3 text-xs text-gray5 w-2/12">
                                {sale.cost}
                            </div>
                            <div className="py-3 text-xs text-gray5 w-2/12">
                                {sale.sale}
                            </div>
                            <div className="py-3 text-xs text-gray5 w-2/12">
                                {sale.profit}
                            </div>


                        </div>
                    )
                })}


            </div>
            <div>
                <div className="font-medium flex w-full bg-secondary text-white">
                    <div className="p-3 w-2/12">
                        Total
                    </div>
                    <div className="p-3 w-2/12">

                    </div>
                    <div className="p-3 w-2/12">

                    </div>
                    <div className="py-3 w-2/12">
                        1,250,00
                    </div>
                    <div className="py-3 w-2/12">
                        3,250,00
                    </div>
                    <div className="py-3 w-2/12">
                        2,250,00
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports