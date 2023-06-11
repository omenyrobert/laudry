import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
// import ButtonLoader from "../ButtonLoader";


function AddTransaction() {

    const [date, setDate] = useState("")
    const [amount, setAmount] = useState("")

    const postExpense = () => {

    }

    return (
        <>
            <div className="bg-white">
                <div className="flex bg-gray1 justify-between p-3 text-primary font-semibold">
                    <div>
                        <p>Add Expense</p>
                    </div>
                    <div>
                        <p className="cursor-pointer" >
                            Back
                        </p>
                    </div>
                </div>
                <div className="flex justify-between mx-3">
                    <div className="w-1/3 p-1">
                        <InputField
                            type="date"
                            label="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="w-1/3 p-1">
                        <InputField
                            type="text"
                            placeholder="Enter expense"
                            label="Expense"
                        // value={expense}
                        // onChange={(e) => setExpense(e.target.value)}

                        />
                    </div>
                    <div className="w-1/3 p-1">
                        <InputField
                            type="number"
                            placeholder="Enter Amounnt"
                            label="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}

                        />
                    </div>
                </div>
                <div className="flex justify-between mx-3">
                    <div className="w-1/3 p-1">

                    </div>
                    <div className="w-1/3 p-1">

                    </div>
                    <div className="w-1/3 p-1">
                        <InputField
                            type="text"
                            placeholder="Enter Received By "
                            label="Received By"
                        // value={to}
                        // onChange={(e) => setTo(e.target.value)}

                        />
                    </div>
                </div>
                <div className="flex justify-between mx-3">
                    <div className="w-1/3 p-1">
                        <InputField
                            type="text"
                            placeholder="Enter Contacts"
                            label="Expense Contacts"
                        // value={contacts}
                        // onChange={(e) => setContacts(e.target.value)}

                        />
                    </div>
                    <div className="w-1/3 p-1">
                        <InputField
                            type="text"
                            placeholder="Enter Description"
                            label=" Description"
                        // value={contacts}
                        // onChange={(e) => setContacts(e.target.value)}

                        />
                    </div>
                    <div className="w-1/3 p-1 mt-14"></div>
                </div>
                <div className="flex justify-between bg-gray1  p-3 ounded">
                    <div >

                    </div>
                    <div>
                        <div onClick={postExpense}>
                            <Button value={"Add Expense"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddTransaction