import React, { useState } from "react";
import ButtonAlt from "./ButtonAlt";
import InputField from "./InputField";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";

const ExpensesReported = () => {

    const [modal, setModal] = useState(false)

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }


    const sales = [
        { id: 1, product: "12-10-2023", qty: "Lunch", sale: "My Daily Lunch", cost: "10,000" },
        { id: 1, product: "12-10-2023", qty: "Offloading cement", sale: "Offloaders", cost: "7,000" },
        { id: 1, product: "12-10-2023", qty: "Breakfast", sale: "To me", cost: "4,000" },
        { id: 1, product: "12-10-2023", qty: "Yaka", sale: "Mobile Moneu", cost: "20,000" },
        { id: 1, product: "12-10-2023", qty: "Transport", sale: "For buying stock", cost: "10,000" },
        { id: 1, product: "12-10-2023", qty: "Lunch", sale: "My Daily Lunch", cost: "10,000" },
        { id: 1, product: "12-10-2023", qty: "Lunch", sale: "My Daily Lunch", cost: "10,000" },
    ]




    return (
        <div>
            <div onClick={openModal}>
                <ButtonAlt value={"Expenses Report"} />
            </div>


            {modal ? <div className="flex bg-black/50 z-50 left-0 right-0 absolute z-50 top-0 h-full w-full">
                <div className="w-2/12" onClick={closeModal}>

                </div>
                <div className="w-10/12 p-3 bg-white">
                    <div className="flex justify-between m-5">
                        <div>
                            <p className="text-xl font-semibold">Expenses</p>
                        </div>
                        <div>
                            <ButtonAlt value={"Print"} />
                        </div>
                    </div>
                    <div className="flex justify-between mx-5">
                        <div className="w-72 -mt-5">
                            <InputField placeholder="Search Expense" icon={<BsSearch className="mt-2 mr-3" />} />

                        </div>
                        <div className="flex">
                            <div className="w-52">
                                <Select placeholder="Select Type"
                                    options={[{ label: "Utility", value: "Utility" },
                                    { label: "Meals", value: "Meals" },
                                    { label: "Commissions", value: "Commissions" },
                                    { label: "Causal Labour", value: "Labour" },
                                    { label: "Transport", value: "Transport" },
                                    ]} />
                            </div>
                            <div className="mx-3  -mt-5">
                                <InputField type="date" />
                            </div>
                            <div className=" -mt-5">
                                <InputField type="date" />
                            </div>
                        </div>

                    </div>



                    <div className="flex bg-gray1 font-medium mt-2">
                        <div className="w-1/4 p-2">
                            Date
                        </div>
                        <div className="w-1/4 p-2">
                            Expenses
                        </div>
                        <div className="w-1/4 p-2">
                            To
                        </div>
                        <div className="w-1/4 p-2">
                            Type
                        </div>
                        <div className="w-1/4 p-2">
                            Amount
                        </div>




                    </div>
                    <div className="h-[calc(100vh-220px)] overflow-y-auto">
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
                                        meals
                                    </div>
                                    <div className="w-1/4 p-2">
                                        {sale.cost}
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

                        </div>
                        <div className="w-1/4 p-2">

                        </div>
                        <div className="w-1/4 p-2">
                            7,300,000
                        </div>
                        <div className="w-1/4 p-2">

                        </div>


                    </div>

                </div>

            </div> : null}


        </div>
    )
}

export default ExpensesReported