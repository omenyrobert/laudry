import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByAccountId } from "../../store/schoolSheetSlices/schoolStore";
import Loader from "../Loader";

function Ledger() {
  const { accountId } = useParams();
  const dispatch = useDispatch();
  const { transactionsByAccountId, loading } = useSelector((state) => state.schoolStore);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    dispatch(getTransactionsByAccountId(accountId));
  }, [dispatch, accountId]);

  useEffect(() => {
    const filtered = transactionsByAccountId.filter((transaction) => {
      if (fromDate && toDate && selectedMonth) {
        const transactionDate = new Date(transaction.date);
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        const transactionMonth = transactionDate.getMonth() + 1;
        const selectedMonthValue = parseInt(selectedMonth.split("-")[1]);

        return (
          transactionDate >= fromDateObj &&
          transactionDate <= toDateObj &&
          transactionMonth === selectedMonthValue
        );
      } else if (fromDate && toDate) {
        const transactionDate = new Date(transaction.date);
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);

        return transactionDate >= fromDateObj && transactionDate <= toDateObj;
      } else if (selectedMonth) {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth() + 1;
        const selectedMonthValue = parseInt(selectedMonth.split("-")[1]);

        return transactionMonth === selectedMonthValue;
      }
      return true;
    }, []);

    setFilteredTransactions(filtered);
  }, [transactionsByAccountId, fromDate, toDate, selectedMonth]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleGeneratePDF = () => {
    const documentWindow = window.open("", "PRINT", "height=600,width=1000");
    const content = document.getElementById("ledger-table").outerHTML;

    documentWindow.document.write(
      content
    );

    // Get All stylesheets
    const stylesheets = document.querySelectorAll("link");
    // Append them to the head of the new window
    stylesheets.forEach((stylesheet) => {
      documentWindow.document.write(stylesheet.outerHTML)
    });
    // Get all style tags 
    const styleTags = document.querySelectorAll("style");
    // Append them to the head of the new window
    styleTags.forEach((styleTag) => {
      documentWindow.document.write(styleTag.outerHTML)
    })

    setTimeout(() => {
      documentWindow.print();
    }, 1000);
  };

  return (
    <>
      <div className="bg-white p-3 h-[82vh] mt-2 overflow-y-auto border border-gray2 shadow rounded">
        <div className="flex justify-between">
          <div className="flex">
            <Link to="/accounts">
              <p className="text-primary font-semibold p-2 border border-primary rounded-md h-10 cursor-pointer">
                Back
              </p>
            </Link>

            <p className="text-secondary text-xl font-bold ml-5">
              {transactionsByAccountId.length > 0 && transactionsByAccountId[0].account.accountName} Ledger
            </p>
          </div>
          <div className="flex">
            <div className="mr-3">
              <InputField type="date" label="From" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="mr-3">
              <InputField type="date" label="To" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div>
              <InputField
                type="month"
                label="By Month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            <div className="ml-5 mt-12" onClick={handleGeneratePDF}>
              <Button value={"Pdf"} />
            </div>
          </div>
        </div>

        <div id="ledger-table">
          <div className="flex border-b border-gray1 bg-primary3 text-primary font-medium mt-3">
            <div className="w-1/4 p-2">Date</div>
            <div className="w-1/4 p-2">Transaction Type</div>
            <div className="w-1/4 p-2">Transaction No</div>
            <div className="w-1/4 p-2">Description</div>
            <div className="w-1/4 p-2">Account</div>
            <div className="w-1/4 p-2">Credit</div>
            <div className="w-1/4 p-2">Debit</div>
            <div className="w-1/4 p-2">Amount</div>
            <div className="w-1/4 p-2">Balance</div>
          </div>

          <div id="ledger-rows">
            {filteredTransactions.length > 0 &&
              filteredTransactions.map((transaction) => {
                return (
                  <div
                    className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg"
                    key={transaction.transactionId}
                  >
                    <div className="w-1/4 p-2">{formatDate(transaction.date)}</div>
                    <div className="w-1/4 p-2">{transaction.transactionType}</div>
                    <div className="w-1/4 p-2">{transaction.transactionId}</div>
                    <div className="w-1/4 p-2 truncate">{transaction.description}</div>
                    <div className="w-1/4 p-2">{transaction.account.accountName}</div>
                    <div className="w-1/4 p-2">{Number(transaction.credit).toLocaleString()}</div>
                    <div className="w-1/4 p-2">{Number(transaction.debit).toLocaleString()}</div>
                    <div className="w-1/4 p-2">{Number(transaction.amount).toLocaleString()}</div>
                    <div className="w-1/4 p-2">{Number(transaction.balance).toLocaleString()}</div>
                  </div>
                );
              })}
          </div>
        </div>
        {loading.transactionsByAccountId && <Loader />}
      </div>
    </>
  );
}

export default Ledger;
