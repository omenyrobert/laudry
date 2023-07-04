import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getTransactions, getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import Button from "../Button";
import InputField from "../InputField";
import { formatDate } from "./GeneralLedger";

function CashFlow() {
  const dispatch = useDispatch();
  const [firstTransactionAmount, setFirstTransactionAmount] = useState(null);
  const [lastTransactionAmount, setLastTransactionAmount] = useState(null);
  const [netIncreaseDecrease, setNetIncreaseDecrease] = useState(null);
  const [accountOptions, setAccountOptions] = useState([]);
  const [account, setAccount] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const { transactions, accounts, loading } = useSelector((state) => state.schoolStore);

  // getTransactions $ accounts 
  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
  }, [dispatch]);

  useEffect(() => {
    const data = accounts.map((acc) => ({
      value: acc.accountName,
      label: acc.accountName,
      id: acc.id,
      amount: acc.amount,
    }));
    setAccountOptions(data);
  }, [accounts]);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      let include = true;

      if (account && transaction.account.accountName !== account.value) {
        include = false;
      }

      if (fromDate && transaction.date < fromDate) {
        include = false;
      }

      if (toDate && transaction.date > toDate) {
        include = false;
      }

      return include;
    });

    setFilteredTransactions(filtered);
  }, [transactions, account, fromDate, toDate]);

  useEffect(() => {
    if (filteredTransactions.length > 0) {
      setFirstTransactionAmount(filteredTransactions[0].balance);
      setLastTransactionAmount(filteredTransactions[filteredTransactions.length - 1].balance);

      let totalCredit = 0;
      let totalDebit = 0;

      filteredTransactions.forEach((transaction) => {
        totalCredit += transaction.credit;
        totalDebit += transaction.debit;
      });

      const netIncreaseDecrease = totalCredit - totalDebit;
      setNetIncreaseDecrease(netIncreaseDecrease);
    }
  }, [filteredTransactions]);

  const handleGeneratePDF = () => {
    const documentWindow = window.open("", "PRINT", "height=600,width=1000");
    const content = document.getElementById("ledger-table").outerHTML;

    documentWindow.document.write(content);

    // Get All stylesheets
    const stylesheets = document.querySelectorAll("link");
    // Append them to the head of the new window
    stylesheets.forEach((stylesheet) => {
      documentWindow.document.write(stylesheet.outerHTML);
    });
    // Get all style tags
    const styleTags = document.querySelectorAll("style");
    // Append them to the head of the new window
    styleTags.forEach((styleTag) => {
      documentWindow.document.write(styleTag.outerHTML);
    });

    setTimeout(() => {
      documentWindow.print();
    }, 1000);
  };

  return (
    <>
      <div className="bg-white p-3 h-[82vh] overflow-y-auto mt-2 border border-gray2 shadow rounded">
        <div className="flex justify-between">
          <div>
            <p className="text-secondary text-xl font-bold">Cash Flow</p>
          </div>
          <div className="flex">
            <div className="mr-3 mt-12">
              <Select
                placeholder="Select account"
                label="Account"
                value={account}
                onChange={setAccount}
                options={accountOptions}
              />
            </div>
            <div className="mr-3">
              <InputField
                type="date"
                label="From"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="mr-3">
              <InputField
                type="date"
                label="To"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            {/* <div>
              <InputField type="month" label="By Month" />
            </div> */}
            <div onClick={handleGeneratePDF} className="ml-5 mt-12">
              <Button value={"Pdf"} />
            </div>
          </div>
        </div>

        <div id="ledger-table">
          <div className="flex border-b border-gray1">
            <div className="w-1/4 p-2">Date</div>
            <div className="w-1/4 p-2">Transaction Type</div>
            <div className="w-1/4 p-2">Journal No</div>
            <div className="w-1/4 p-2">Description</div>
            <div className="w-1/4 p-2">Account</div>
            <div className="w-1/4 p-2">Credit</div>
            <div className="w-1/4 p-2">Debit</div>
            <div className="w-1/4 p-2">Amount</div>
            <div className="w-1/4 p-2">Balance</div>
          </div>
          {filteredTransactions.map((transaction) => (
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
          ))}
          <div className="bg-primary3 text-primary flex mt-1">
            <div className="w-10/12 p-2">Net Increase/Decrease</div>
            <div className="w-2/12 p-2">{Number(netIncreaseDecrease).toLocaleString()}</div>
          </div>
          <div className="bg-primary3 text-primary flex mt-1">
            <div className="w-10/12 p-2">Cash At the Beginning</div>
            <div className="w-2/12 p-2">{Number(firstTransactionAmount).toLocaleString()}</div>
          </div>
          <div className="bg-primary3 text-primary flex mt-1">
            <div className="w-10/12 p-2">Cash At the End</div>
            <div className="w-2/12 p-2">{Number(lastTransactionAmount).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CashFlow;
