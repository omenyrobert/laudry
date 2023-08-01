import React, { useEffect, useState } from "react";
import Button2 from "../Button2";
import InputField from "../InputField";
// import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../ButtonLoader";
import { BsSearch } from "react-icons/bs";
import { usePrint } from "../../hooks/print";

function Journal() {
	const dispatch = useDispatch();
	const [joun, setJoun] = useState(false);
	const [debit, setDebit] = useState(null);
	const [debitAccount, setDebitAccount] = useState(null);
	const [transactionType, setTransactionType] = useState(null);
	const [credit, setCredit] = useState(null);
	const [creditAccount, setCreditAccount] = useState(null);
	const [date, setDate] = useState("");
	const [accountOptions, setAccountOptions] = useState([]);
	const { accounts } = useSelector((state) => state.schoolStore);
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
	const [journalTotal, setjournalTotal] = useState("");
	const [journalsData, setjournalsData] = useState([]);
	const [description, setDescription] = useState("");
	const { printContent } = usePrint();

	const fetchjournals = async () => {
		const res = await axiosInstance.get("/transactions/type/journal");

		const { status, payload } = res.data;

		if (status === false) {
			setLoading(false);
			toggleFeedback("error", payload);
			return;
		}

		const coupledTransactions = [];

		for (let i = 0; i < payload.length; i++) {
			const transaction = payload[i];

			if (
				coupledTransactions.find(
					(t) => t.transactionId === transaction.transactionId
				)
			)
				continue;

			// find corresponding transaction with same id
			const correspondingTransaction = payload.find((t) => {
				return (
					t.transactionId === transaction.transactionId &&
					t.id !== transaction.id
				);
			});

			if (correspondingTransaction) {
				coupledTransactions.push({
					transactionId: transaction.transactionId,
					...transaction,
					transactionAmount:
						transaction.debit === 0 ? transaction.credit : transaction.debit,
					debitAccount:
						transaction.debit === 0
							? correspondingTransaction.account
							: transaction.account,
					creditAccount:
						transaction.credit === 0
							? correspondingTransaction.account
							: transaction.account,
				});
			}
		}

		setjournalsData(coupledTransactions);

		console.log(coupledTransactions);

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setjournalTotal(total);
	};

	const showJoun = () => {
		setJoun(true);
	};

	const closeJoun = () => {
		setJoun(false);
	};

	useEffect(() => {
		const now = new Date().getUTCFullYear();
		const years = Array(now - (now - 20))
			.fill("")
			.map((v, idx) => now - idx);
	}, []);

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchjournals();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		const data = accounts.map((acc) => ({
			value: acc.accountName,
			label: acc.accountName,
			id: acc.id,
			amount: acc.amount,
		}));
		setAccountOptions(data);
	}, [accounts]);

	const [posting, setPosting] = useState(false);

	// createJournal
	const createJournal = async () => {
		// if (transactionType !== null && debit !== null && credit !== null && debitAccount !== null && creditAccount !== null) {
		try {
			setPosting(true);
			const formData = {
				title: transactionType,
				transactionCategory: "journal",
				accountToDebit: debitAccount && debitAccount.id,
				accountToCredit: creditAccount && creditAccount.id,
				amountToDebit: parseFloat(debit),
				amountToCredit: parseFloat(debit),
				description: description,
			};

			console.log("formData", formData);

			const response = await axiosInstance.post("/transactions", formData);
			const { data } = response;
			const { status } = data;

			if (status) {
				dispatch(getAccounts());
				setDebit(null);
				setCredit(null);
				setTransactionType(null);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeJoun();
				setPosting(false);
			}
		} catch (error) {
			console.log(error);
			setPosting(false);
		}
		// }
	};

	// implement search
	const [query, setQuery] = useState({
		search: "",
		startDate: NaN,
		endDate: NaN,
	});
	const [searchedjournals, setSearchedjournals] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedjournals(journalsData);
			return;
		}
		const filteredjournals = journalsData.filter((income) => {
			const incomeDate = new Date(income.date);
			const isStartDateValid = isNaN(query.startDate)
				? true
				: incomeDate.getTime() >= query.startDate;
			const isEndDateValid = isNaN(query.endDate)
				? true
				: incomeDate.getTime() <= query.endDate;
			const isSearchValid = income.title
				.toLowerCase()
				.includes(query.search.toLowerCase());
			return (
				isStartDateValid && isEndDateValid && isSearchValid
			);
		});
		setSearchedjournals(filteredjournals);
	}, [query, journalsData]);

	return (
		<div className="bg-white p-3 h-full">
			<div className="flex relative">
				<div className="p-2 w-2/12">
					<p className="text-secondary text-xl font-bold">General Journal</p>
				</div>
				<div className="p-2 w-7/12 flex gap-4 -mt-5">
					<div className="w-4/12">
						<InputField
							type="search"
							placeholder="Search for Journal"
							icon={<BsSearch className="w-3 -ml-7 mt-3" />}
							onChange={(e) => {
								setQuery({ ...query, search: e.target.value });
							}}
						/>
					</div>
					<div className="w-2/12 px-2">
						<InputField
							type="date"
							onChange={(e) => {
								setQuery({ ...query, startDate: e.target.valueAsNumber });
							}}
						/>
					</div>
					<div className="w-2/12">
						<InputField
							type="date"
							onChange={(e) => {
								setQuery({ ...query, endDate: e.target.valueAsNumber });
							}}
						/>
					</div>
				</div>
				<div className="p-2 w-2/12"></div>
				<div className="p-2 w-2/12">
					<div className="w-32" onClick={showJoun}>
						<Button2 value={"Journal"} />
					</div>
				</div>
			</div>

			{joun ? (
				<div className="absolute bg-white shadow-2xl rounded-md border border-gray2 z-50  w-1/2">
					<div className="flex justify-between text-primary text-lg font-semibold p-3 bg-gray1">
						<div>
							<p className="">Enter Journal</p>
						</div>
						<div>
							<p onClick={closeJoun} className="cursor-pointer">
								X
							</p>
						</div>
					</div>
					<div className="p-3 h-auto flex">
						<div className="w-1/2 pr-2">
							<InputField
								type="date"
								label="Date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>

							<InputField
								type="text"
								label="Debit"
								value={debit}
								onChange={(e) => setDebit(e.target.value)}
								placeholder="Enter Amount"
							/>
							<Select
								placeholder="Select Debit account"
								label="Debit account"
								defaultValue={debitAccount}
								onChange={setDebitAccount}
								options={accountOptions}
							/>
						</div>
						<div className="w-1/2 pl-2">
							<InputField
								type="text"
								label="Type Of Transaction"
								value={transactionType}
								onChange={(e) => setTransactionType(e.target.value)}
								placeholder="Enter Transaction Type"
							/>
							<InputField
								type="text"
								label="Credit"
								value={debit}
								editable={false}
								// onChange={(e) => setCredit(e.target.value)}
								placeholder="Enter Amount"
							/>
							<Select
								placeholder="Select Credit account"
								label="Credit account"
								defaultValue={creditAccount}
								onChange={setCreditAccount}
								options={accountOptions}
							/>
						</div>
					</div>

					<label className="text-gray5 ml-5">Description</label>
					<br />
					<textarea
						className="bg-gray1 min-h-[100px] ml-5 p-5 border border-gray2 w-[95%]"
						placeholder="Enter Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>

					<div className="flex justify-between text-primary text-lg font-semibold p-3 bg-gray1">
						<div onClick={closeJoun}>
							<ButtonSecondary value={"Close"} />
						</div>
						<div onClick={createJournal}>
							{posting ? (
								<div className="w-40">
									{" "}
									<ButtonLoader />
								</div>
							) : (
								<div>
									{" "}
									<Button value={"Add Journal"} />{" "}
								</div>
							)}
						</div>
					</div>
				</div>
			) : null}
			<div className="h-[80vh] overflow-y-auto">
				{searchedjournals.map((journal) => (
					<div
						id={journal.id + "journal"}
						key={journal.id}
						className="p-2 bg-gray1 text-sm hover:bg-white cursor-pointer rounded-md my-2"
					>
						<div className="flex text-gray5 ">
							<div className="w-1/3">
								<p>Date: {new Date(journal.date).toLocaleDateString()}</p>
							</div>
							<div className="w-1/3">
								<p>Journal number: {journal.transactionId}</p>
							</div>
							<div className="w-1/3 flex justify-between">
								<p>Transaction Type: {journal.title}</p>
								<p
									onClick={() => printContent(journal.id + "journal")}
									className="text-primary border border-primary rounded-md py-1 px-3 cursor-pointer">
									Print
								</p>
							</div>
						</div>
						<div className="flex text-gray5 bg-gray2 py-2 mt-4">
							<div className="w-1/3">
								<p>Debit Account: {journal.debitAccount.accountName}</p>
							</div>
							<div className="w-1/3">
								<p>Amount Debited: {journal.transactionAmount} </p>
							</div>
							<div className="w-1/3">
								<p>Description: {journal.description}</p>
							</div>
						</div>
						<div className="flex text-gray5  mt-4">
							<div className="w-1/3">
								<p>Credit Account: {journal.creditAccount.accountName}</p>
							</div>
							<div className="w-1/3">
								<p>Amount Credit: {journal.transactionAmount} </p>
							</div>
							<div className="w-1/3"></div>
						</div>
					</div>
				))}
				<br />
			</div>
		</div>
	);
}
export default Journal;
