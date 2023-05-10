import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button2 from "../../components/Button2";
import { BsSearch } from "react-icons/bs";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";

function Equity() {
	const [modal, setModal] = useState(false);

	const showModal = () => {
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};

	return (
		<>
			<div className="flex relative  justify-between mt-2 bg-white px-3 border border-gray2 rounded-md">
				<div>
					<h5 className="text-xl font-medium text-secondary mt-5">
						Equity
					</h5>
				</div>
				<div className="w-1/2">
					<InputField
						type="search"
						placeholder="Search for Asset"
						icon={<BsSearch className="w-3 -ml-7 mt-3" />}
					/>
				</div>
				<div>
					<div onClick={showModal} className="w-[200px]  mt-5">
						<Button2 value={"Register Equity"} />
					</div>
				</div>
			</div>

			{modal ? (
				<div className="bg-white w-1/3   shadow-2xl z-50 absolute border border-gray2 rounded-md">
					<div className="flex justify-between p-3 text-primary font-semibold bg-gray1">
						<div>Add Equity</div>
						<div>
							<p onClick={closeModal} className="cursor-pointer">
								X
							</p>
						</div>
					</div>
					<div className="p-3 flex">
						<div className="w-1/2 p-1">
							<InputField
								type="text"
								label="Equity"
								placeholder="Enter Equity Name"
							/>
							<InputField label="Date" type="date" />
						</div>
						<div className="w-1/2 p-1">
							<InputField label="Amount" placeholder="Enter Equity Amount" />
						</div>
					</div>

					<div className="flex justify-between p-3 text-primary font-semibold bg-gray1">
						<div onClick={closeModal}>
							<ButtonSecondary value={"close"} />
						</div>
						<div>
							<Button value={"Add Equity"} />
						</div>
					</div>
				</div>
			) : null}

            {/* table of Equity */}
            <div className="mt-10">
            <div className="flex text-primary bg-primary3 mt-5 mr-2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Date</div>
				<div className="border border-gray1 p-3 w-1/4">Equity</div>
				<div className="border border-gray1 p-3 w-1/4">Amount</div>
				<div className="border border-gray1 p-3 w-1/4">Amount</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
            <div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Meals</div>
				<div className="border border-gray1 p-3 w-1/4">Equity</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT</div>
				<div className="border border-gray1 p-3 w-1/4">27,097,906</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Meals</div>
				<div className="border border-gray1 p-3 w-1/4">Equity</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT</div>
				<div className="border border-gray1 p-3 w-1/4">27,097,906</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Meals</div>
				<div className="border border-gray1 p-3 w-1/4">Equity</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT</div>
				<div className="border border-gray1 p-3 w-1/4">27,097,906</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>

            </div>
		</>
	);
}
export default Equity;
