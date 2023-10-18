import React, { useState, useEffect } from "react";
import ButtonAlt from "../components/ButtonAlt";
import InputField from "../components/InputField";
import ExpensesReported from "../components/ExpensesReport";
import { useDispatch, useSelector } from "react-redux";
import { getBankReport } from "../store/slices/store";
import { usePrint } from "../hooks/print";

const Banking = () => {
    const { bankReport } = useSelector((state) => state.autocountStore)
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const { printContent } = usePrint()

    useEffect(() => {
        dispatch(getBankReport({
            startDate: startDate,
            endDate: endDate
        }))
    }, [])

    const searchBankReport = () => {
        dispatch(getBankReport({
            startDate: startDate,
            endDate: endDate
        }))
    }


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
                        <InputField
                            type="date"
                            onChange={(e) => {
                                setStartDate(e.target.value)
                            }}
                        />
                    </div>
                    <div className="-mt-5 mx-3">
                        <InputField
                            type="date"
                            onChange={(e) => {
                                setEndDate(e.target.value)
                            }}
                        />
                    </div>
                    <div className="ml-2">
                        <ButtonAlt
                            value={"Filter"}
                            onClick={searchBankReport}
                        />
                    </div>

                    <div className="ml-2">
                        <ButtonAlt
                            onClick={() => printContent("banking--report--print")}
                            value={"Print"} />
                    </div>
                    <div className="ml-2">
                        <ExpensesReported />
                    </div>
                </div>

            </div>
            <div id="banking--report--print">
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
                    {bankReport.map((bank) => {
                        return (

                            <div className="flex cursor-pointer border-b border-gray1 hover:bg-gray1 text-gray5 text-sm">
                                <div className="w-1/4 p-2">
                                    {bank.date}
                                </div>
                                <div className="w-1/4 p-2">
                                    {bank.sales}
                                </div>
                                <div className="w-1/4 p-2">
                                    {bank.unpaidSales}
                                </div>
                                <div className="w-1/4 p-2">
                                    {bank.expenses}
                                </div>
                                <div className="w-1/4 p-2">
                                    {bank.sales + bank.unpaidSales}
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
                        {
                            bankReport.reduce((a, b) => {
                                return a + b.sales
                            }, 0)
                        }
                    </div>
                    <div className="w-1/4 p-2">
                        {
                            bankReport.reduce((a, b) => {
                                return a + b.unpaidSales
                            }, 0)
                        }
                    </div>
                    <div className="w-1/4 p-2">
                        {
                            bankReport.reduce((a, b) => {
                                return a + b.expenses
                            }, 0)
                        }
                    </div>
                    <div className="w-1/4 p-2">
                        {
                            bankReport.reduce((a, b) => {
                                return a + b.sales + b.unpaidSales
                            }, 0)
                        }
                    </div>

                </div>
            </div>
            <br />
        </div>
    )
}

export default Banking