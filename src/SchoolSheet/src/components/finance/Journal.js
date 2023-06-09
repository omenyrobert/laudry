import React, { useEffect, useState } from "react";
import Button2 from "../Button2";
import InputField from "../InputField";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";

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
	});

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);

	useEffect(() => {
		const data = accounts.map(acc => ({
			value: acc.accountName,
			label: acc.accountName,
			id: acc.id,
			amount: acc.amount,
		}));
		setAccountOptions(data);
	}, [accounts]);

	console.log("debitAccount", debitAccount);

		// createJournal
		const createJournal = async () => {
			try {
				let formData = {
					date,
					debit: parseFloat(debit),
					credit: parseFloat(debit),
					transactionType,
					debitAccount: debitAccount && debitAccount.value,
					debitAccountId: debitAccount && debitAccount.id,
					creditAccount: creditAccount && creditAccount.value,
					creditAccountId: creditAccount && creditAccount.id,
				};

				console.log("formData", formData);
		
				const response = await axiosInstance.post("/journals", formData);
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
				}
			} catch(error) {
				console.log(error);
			}
		};

	return (
		<>
			<div className="flex relative">
				<div className="p-2 w-2/12">
					<p className="text-secondary text-xl font-bold">General Journal</p>
				</div>
				<div className="p-2 w-7/12 flex gap-4 -mt-5">
					<InputField placeholder="Search for Income" type="date" />
					<InputField placeholder="Search for Income" type="date" />

					<InputField
						placeholder="Search for Income"
						type="month"
						format="YYYY"
					/>
					<InputField placeholder="Search for Income" type="date" />
				</div>
				<div className="p-2 w-2/12"></div>
				<div className="p-2 w-2/12">
					<div className="w-auto" onClick={showJoun}>
						<Button2 value={"Enter Journal"} />
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
					<div className="p-3 h-[35vh] overflow-y-auto flex">
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

					<div className="flex justify-between text-primary text-lg font-semibold p-3 bg-gray1">
						<div onClick={closeJoun}>
							<ButtonSecondary value={"Close"} />
						</div>
						<div onClick={createJournal}>
							<Button value={"Add Journal"} />
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
export default Journal;
