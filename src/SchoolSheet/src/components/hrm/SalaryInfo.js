import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";

function SalaryInfo() {
	const [SalaryInfo, setSalaryInfo] = useState(false);

	const openSalaryInfo = () => {
		setSalaryInfo(true);
	};

	const closeSalaryInfo = () => {
		setSalaryInfo(false);
	};

	const [award, setAward] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [school, setSchool] = useState("");
	const [doc, setDoc] = useState("");

	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						Salary Info
					</p>
				</div>
				<div
					onClick={openSalaryInfo}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> SalaryInfo
				</div>
				{SalaryInfo ? (
					<div className="border absolute z-50 -mt-[200px] border-gray3 bg-white shadow h-[400px] rounded w-[700px] overflow-y-auto">
						<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
							<div>
								<p>Add Salary Info</p>
							</div>
							<div>
								<p className="cursor-pointer" onClick={closeSalaryInfo}>
									X
								</p>
							</div>
						</div>
						<div className="flex">
							<div className="w-1/2 p-3">
								<InputField
									type="text"
									placeholder="Gross Salary"
									label="Gross Salary"
									onChange={(e) => setAward(e.target.value)}
									value={award}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Bank"
									label="Bank"
									onChange={(e) => setFrom(e.target.value)}
									value={from}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Account Name"
									label="Account Name"
									onChange={(e) => setTo(e.target.value)}
									value={to}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/2 p-3 -mt-5">
								<InputField
									type="text"
									placeholder="Account Number"
									label="Account Number"
								
									onChange={(e) => setSchool(e.target.value)}
									value={school}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>

								<InputField
									type="text"
									label="Account Branch"
									placeholder="Account Branch"
									onChange={(e) => setDoc(e.target.value)}
									value={doc}
								/>

								<div className="mt-14">
									<Button value={"Add SalaryInfo"} />
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
			<div className="flex border-b border-gray1">
				<div className="p-2 w-1/3  truncate">
					Gross Salary
					<p className="text-sm text-gray5">2,001,000</p>
				</div>
				<div className="p-2 w-1/3  truncate">
					Bank
					<p className="text-sm text-gray5">Centinary Bank</p>
				</div>
				<div className="p-2 w-1/3  truncate">
					Account Name
					<p className="text-sm text-gray5">Jim Junior</p>
				</div>
			</div>
			<div className="flex border-b border-gray1">
				<div className="p-2 w-1/3  truncate">
					Account Number
					<p className="text-sm text-gray5">056890454</p>
				</div>
				<div className="p-2 w-1/3">
					Bank Branch
					<p className="text-sm text-gray5">056890454</p>
				</div>
			</div>
		</>
	);
}

export default SalaryInfo;
