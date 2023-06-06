import React, { useEffect, useState } from "react";
import Button2 from "../Button2";
import InputField from "../InputField";
import { BsSearch } from "react-icons/bs";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";

function Journal() {
	const [joun, setJoun] = useState(false);

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
							<InputField type="date" label="Date" />

							<InputField
								type="text"
								label="Debit"
								placeholder="Enter Amount"
							/>
							<InputField
								type="text"
								label="Debit account"
								placeholder="Select Debit account"
							/>
						</div>
						<div className="w-1/2 pl-2">
							<InputField
								type="text"
								label="Type Of Transaction"
								placeholder="Enter Transction Type"
							/>
							<InputField
								type="text"
								label="Credit"
								placeholder="Enter Amount"
							/>
							<InputField
								type="text"
								label="Account to Credit"
								placeholder="Enter Transction Type"
							/>
						</div>
					</div>

					<div className="flex justify-between text-primary text-lg font-semibold p-3 bg-gray1">
						<div onClick={closeJoun}>
							<ButtonSecondary value={"Close"} />
						</div>
						<div>
							<Button value={"Add Journal"} />
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
export default Journal;
