import React, { useState } from "react";
import ButtonAlt from "./ButtonAlt";
import { usePrint } from "../hooks/print";

const TodaySales = () => {
    const { printContent } = usePrint()


    const [modal, setModal] = useState(false)

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const sales = [
        { id: 1, product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Regal Pain", qty: 10, sale: "200,000", cost: "100,000", profit: "100,000" },
        { id: 1, product: "Iron Bar", qty: 104, sale: "1,03,000", cost: "710,000", profit: "67,000" },
        { id: 1, product: "Iron Sheet", qty: 234, sale: "203,000", cost: "180,000", profit: "97,000" },
        { id: 1, product: "B Wire", qty: 14, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "2 inc Nails", qty: 24, sale: "230,000", cost: "190,000", profit: "30,000" },
        { id: 1, product: "1 ltr Sadolin", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Padlocks", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Spade", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "cememnt Hima", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Wheel Barrow", qty: 2, sale: "700,000", cost: "400,000", profit: "300,000" },
        { id: 1, product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
        { id: 1, product: "Nails", qty: 234, sale: "23,000", cost: "10,000", profit: "13,000" },
    ]

    return (
        <>
            <div className="flex justify-between mt-2 mr-2">
                <div>

                </div>
                <div onClick={openModal}>
                    <ButtonAlt value={"Today's Sales"} />
                </div>

            </div>
            {modal ? <div className="flex bg-black/50 left-0 right-0 absolute z-50 top-0 h-full w-full">
                <div className="w-3/12" onClick={closeModal}>

                </div>
                <div className="w-9/12 p-3 bg-white">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xl font-semibold">Todays Sales</p>
                        </div>
                        <div>
                            <ButtonAlt onClick={() => {
                                printContent("today-sales-table")
                            }} value={"Print"} />
                        </div>

                    </div>

                    <div id="today-sales-table">
                        <div className="flex bg-gray1 font-medium mt-2" >
                            <div className="w-1/4 p-2">
                                Product
                            </div>
                            <div className="w-1/4 p-2">
                                Qty
                            </div>
                            <div className="w-1/4 p-2">
                                Cost
                            </div>
                            <div className="w-1/4 p-2">
                                Sales
                            </div>
                            <div className="w-1/4 p-2">
                                Profit
                            </div>

                        </div>
                        <div className="h-[75vh] overflow-y-auto">
                            {sales.map((sale) => {
                                return (
                                    <div className="flex hover:bg-gray1 text-sm text-gray5 border-b border-gray1 cursor-pointer">
                                        <div className="w-1/4 p-2">
                                            {sale.product}
                                        </div>
                                        <div className="w-1/4 p-2">
                                            {sale.qty}
                                        </div>
                                        <div className="w-1/4 p-2">
                                            {sale.cost}
                                        </div>
                                        <div className="w-1/4 p-2">
                                            {sale.sale}
                                        </div>
                                        <div className="w-1/4 p-2">
                                            {sale.profit}
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex bg-secondary text-white font-medium mt-2">
                            <div className="w-1/4 p-2">
                                Total
                            </div>
                            <div className="w-1/4 p-2">

                            </div>
                            <div className="w-1/4 p-2">
                                7,300,000
                            </div>
                            <div className="w-1/4 p-2">
                                6,070,000
                            </div>
                            <div className="w-1/4 p-2">
                                4,900,000
                            </div>

                        </div>
                    </div>

                </div>

            </div> : null}

        </>
    )
}

export default TodaySales