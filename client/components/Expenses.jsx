import React, { useEffect, useState } from "react";
import ButtonAlt from "./ButtonAlt";
import InputField from "./InputField";
import Button from "./Button";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Select from "react-select";
import axiosInstance from "../axios-instance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonLoader from "./ButtonLoader";
import Loader from "./Loader";
import Button2 from "./Button2";
import ButtonSecondary from "./ButtonSecondary";
import { usePrint } from "../hooks/print";

const Expenses = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const [modal2, setModal2] = useState(false);
  const { printContent } = usePrint();

  const openModal2 = (expense) => {
    seteDate(expense.date);
    seteAmount(expense.amount);
    seteType({ label: expense.type, value: expense.type }); // fix type for Select
    seteReceivedby(expense.receivedBy);
    seteExpense(expense.expense);
    setModal2(true);
    setId(expense.id);
  };

  // posting sales
  const [updating, setUpdating] = useState(false);
  const [edate, seteDate] = useState("");
  const [eamount, seteAmount] = useState("");
  const [etype, seteType] = useState("");
  const [ereceivedby, seteReceivedby] = useState("");
  const [eexpense, seteExpense] = useState("");
  const [id, setId] = useState("");

  const updateExpense = async () => {
    if (
      edate === "" ||
      eamount === "" ||
      !etype || // etype is an object now
      ereceivedby === "" ||
      eexpense === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    try {
      setUpdating(true);
      let formData = {
        id: id,
        date: edate,
        amount: eamount,
        type: etype.label,
        receivedBy: ereceivedby,
        expense: eexpense,
      };
      let res = await axiosInstance.put("/expenses", formData);
      if (res.status) {
        setUpdating(false);
        setDate("");
        setAmount("");
        setReceivedby("");
        setType("");
        fetchExpenses();
        setExpense("");
        setId("");
        closeModal2();
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } catch (error) {
    } finally {
      setUpdating(false);
    }
  };

  const closeModal2 = () => setModal2(false);

  // posting sales
  const [posting, setPosting] = useState(false);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [receivedby, setReceivedby] = useState("");
  const [expense, setExpense] = useState("");

  const postExpense = async () => {
    if (
      date !== "" &&
      amount !== "" &&
      type !== "" &&
      receivedby !== "" &&
      expense !== ""
    ) {
      try {
        setPosting(true);
        let formData = {
          date: date,
          amount: amount,
          type: type.label,
          receivedBy: receivedby,
          expense: expense,
        };
        let res = await axiosInstance.post("/expenses", formData);
        if (res.status) {
          setPosting(false);
          setDate("");
          setAmount("");
          setReceivedby("");
          setType("");
          fetchExpenses();
          setExpense("");
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            icon: "success",
            showConfirmButton: false,
            timer: 500,
          });
        }
      } catch (error) {
      } finally {
        setPosting(false);
      }
    }
  };

  const [loading, setLoading] = useState(false);

  // keep original list + filtered list
  const [allExpenses, setAllExpenses] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [total, setTotal] = useState("");

  // filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      let res = await axiosInstance.get("/expenses");
      if (res.status) {
        setLoading(false);
        const data = res.data.payload || [];
        setAllExpenses(data);
        setExpenseData(data);

        const sum = data.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.amount;
        }, 0);
        setTotal(sum);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // FILTER BY DATE RANGE (client-side)
  useEffect(() => {
    // if no filters, show all
    if (!fromDate && !toDate) {
      setExpenseData(allExpenses);
      const sum = allExpenses.reduce((acc, cur) => acc + cur.amount, 0);
      setTotal(sum);
      return;
    }

    const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
    const to = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;

    const filtered = allExpenses.filter((exp) => {
      const d = new Date(exp.date).getTime();
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });

    setExpenseData(filtered);
    const sum = filtered.reduce((acc, cur) => acc + cur.amount, 0);
    setTotal(sum);
  }, [fromDate, toDate, allExpenses]);

  const deleteExpense = (expense) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `/expenses/${expense.id}`
          );
          const { data } = response;
          const { status } = data;
          if (status) {
            fetchExpenses();
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 500,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const types = [
    { label: "Utility", value: "Utility" },
    { label: "Meals", value: "Meals" },
    { label: "Commissions", value: "Commissions" },
    { label: "Causal Labour", value: "Labour" },
    { label: "Transport", value: "Transport" },
  ];

  return (
    <div className="p-2 bg-white rounded-md">
      {/* edit modal */}
      {modal2 ? (
        <div className="absolute z-50 w-[80vw] shadow-xl bg-white rounded-md">
          <div className="flex p-3 justify-between bg-gray1 font-medium text-primary">
            <div>Edit Expense</div>
            <div>
              <p className="cursor-pointer" onClick={closeModal2}>
                X
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 p-2">
              <InputField
                value={edate}
                onChange={(e) => seteDate(e.target.value)}
                label="date"
                type="date"
              />
            </div>
            <div className="w-1/3 p-2">
              <InputField
                value={eamount}
                onChange={(e) => seteAmount(e.target.value)}
                label="Amount"
                type="number"
                placeholder="Enter Amount"
              />
            </div>
            <div className="w-1/3 p-2">
              <InputField
                value={eexpense}
                onChange={(e) => seteExpense(e.target.value)}
                label="Expense"
                placeholder="Enter Expense"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 p-2">
              <InputField
                value={ereceivedby}
                onChange={(e) => seteReceivedby(e.target.value)}
                label="Received By"
                placeholder="Enter Person and Contacts"
              />
            </div>
            <div className="w-1/3 p-2">
              <br />
              <label className="text-gray5">Expense Type</label>
              <Select
                value={etype}
                onChange={seteType}
                placeholder="Select Expense Type"
                options={types}
              />
            </div>
            <div className="w-1/3 p-2"></div>
          </div>

          <div className="flex p-3 justify-between bg-gray1 font-medium text-primary">
            <div onClick={closeModal2}>
              <ButtonSecondary value={"Close"} />
            </div>
            <div className="w-32">
              {updating ? (
                <ButtonLoader />
              ) : (
                <div onClick={updateExpense}>
                  <Button value={"Update"} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <p className="text-xl font-semibold">Expenses</p>
      </div>
      <div className="flex">
        {/* LEFT: Add Expense */}
        <div className="w-[350px] -mt-8">
          <div className=" p-2">
            <InputField
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label="date"
              type="date"
            />
          </div>
          <div className="-mt-12 p-2">
            <InputField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Enter amount"
            />
          </div>
          <div className="-mt-12 p-2">
            <InputField
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              label="Expense"
              placeholder="Expense"
            />
          </div>

          <div className="-mt-12 p-2">
            <InputField
              value={receivedby}
              onChange={(e) => setReceivedby(e.target.value)}
              label="Received By"
              placeholder="Recieved by"
            />
          </div>
          <div className="-mt-5 p-2">
            <label className="text-gray5">Expense Type</label>
            <Select
              value={type}
              onChange={setType}
              placeholder="Select Expense Type"
              options={types}
            />
          </div>
          <div className="w-32">
            {posting ? (
              <ButtonLoader />
            ) : (
              <div onClick={postExpense}>
                <Button value={"Add"} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Filters + Table */}
        <div className="w-full">
          <div className="flex -mb-5 justify-between">
            <div className="flex gap-2 -mt-14">
              {/* FROM DATE */}
              <InputField
                type="date"
                label="From"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              {/* TO DATE */}
              <InputField
                type="date"
                label="To"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="-mt-8" onClick={() => printContent("print-temp")}>
              <Button value={"Print"} />
            </div>
          </div>

          <div id="print-temp">
            <div className="flex bg-gray1 font-medium">
              <div className="w-2/12 p-2">Date</div>
              <div className="w-2/12 p-2">Expenses</div>
              <div className="w-3/12 p-2">Received By</div>
              <div className="w-2/12 p-2">Type</div>
              <div className="w-2/12 p-2">Amount</div>
              <div className="w-1/12 p-2">Action</div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : null}

            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              {expenseData.map((expense) => {
                return (
                  <div
                    key={expense.id}
                    className="flex hover:bg-gray1 text-sm text-gray5 border-b border-gray1 cursor-pointer"
                  >
                    <div className="w-2/12 p-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                    <div className="w-2/12 p-2">{expense.expense}</div>
                    <div className="w-3/12 p-2">{expense.receivedBy}</div>
                    <div className="w-2/12 p-2">{expense.type}</div>
                    <div className="w-2/12 p-2">
                      {expense.amount.toLocaleString()}
                    </div>
                    <div className="w-1/12 flex p-2">
                      <BsTrash
                        onClick={() => deleteExpense(expense)}
                        className="text-red"
                      />
                      <BsPencilSquare
                        onClick={() => openModal2(expense)}
                        className="text-yellow ml-5"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex bg-secondary text-white font-medium mt-2">
              <div className="w-2/12 p-2">Total</div>
              <div className="w-2/12 p-2"></div>
              <div className="w-3/12 p-2"></div>
              <div className="w-2/12 p-2"></div>
              <div className="w-2/12 p-2">{total.toLocaleString()}</div>
              <div className="w-1/12 p-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
