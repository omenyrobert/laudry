import React from "react";
import ButtonAlt from "../components/ButtonAlt";
import InputField from "../components/InputField";
import ExpensesReported from "../components/ExpensesReport";

const Banking = () => {

    const banks = [
        { id: 1, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 2, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 3, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 4, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 5, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 6, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 7, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 8, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 9, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 10, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 11, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
        { id: 12, income: "2,050,000", bank: "2,000,000", expense: "50,000", date: "10-10-2023" },
    ]

    return (
        <div className="w-full bg-white rounded-md shadow px-5">
            <div className="flex w-full justify-between">
                <div className=''>
                    <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
                        Banking Report
                    </h1>
                </div>

                <div className="w-4/12 ">


                </div>
                <div className="flex mt-5">
                    <div className="-mt-5">
                        <InputField type="date" />
                    </div>
                    <div className="-mt-5 mx-3">
                        <InputField type="date" />
                    </div>

                    <div className="ml-2">
                        <ButtonAlt value={"Print"} />
                    </div>
                    <div className="ml-2">
                      <ExpensesReported/>
                    </div>
                </div>

            </div>
            <div className="flex bg-gray1 font-medium">
                <div className="w-1/4 p-2">
                    Date
                </div>
                <div className="w-1/4 p-2">
                    Total sales
                </div>
                <div className="w-1/4 p-2">
                    Sales on Credit
                </div>
                <div className="w-1/4 p-2">
                    Expenses
                </div>
                <div className="w-1/4 p-2">
                    Banked
                </div>

            </div>
            <div className="h-[calc(100vh-260px)] overflow-y-auto">
                {banks.map((bank) => {
                    return (

                        <div className="flex cursor-pointer border-b border-gray1 hover:bg-gray1 text-gray5 text-sm">
                            <div className="w-1/4 p-2">
                                {bank.date}
                            </div>
                            <div className="w-1/4 p-2">
                                {bank.income}
                            </div>
                            <div className="w-1/4 p-2">
                                {bank.expense}
                            </div>
                            <div className="w-1/4 p-2">
                                {bank.expense}
                            </div>
                            <div className="w-1/4 p-2">
                                {bank.bank}
                            </div>

                        </div>

                    )
                })}
            </div>

            <div className="flex bg-secondary text-white font-medium">
                <div className="w-1/4 p-2">
                    Total
                </div>
                <div className="w-1/4 p-2">
                    22,000,000
                </div>
                <div className="w-1/4 p-2">
                    22,000,000
                </div>
                <div className="w-1/4 p-2">
                    8,070,000
                </div>
                <div className="w-1/4 p-2">
                    19,000,000
                </div>

            </div>
            <br />
        </div>
    )
}

export default Banking