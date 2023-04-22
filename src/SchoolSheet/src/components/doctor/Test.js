import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Select from "react-select";
function Test() {
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Malaria", label: "Malaria" },
		{ value: "Covid", label: "Consulataion" },
		{ value: "Typhoid", label: "Typhoid" },
		{ value: "Covid", label: "Consulataion" },
	];
	const tests = [
		{
			id: 1,
			test: "Malaria",
		},
		{
			id: 2,
			test: "Covid",
		},
		{
			id: 3,
			test: "Typhoid",
		},
		{
			id: 4,
			test: "Malaria",
		},
		{
			id: 5,
			test: "Malaria",
		},
	];
	const testResults = [
		{
			id: 1,
			test: "Malaria",
			sample: "Blood",
			result: "positive",
		},
		{
			id: 2,
			test: "Covid",
			sample: "Blood",
			result: "positive",
		},
		{
			id: 3,
			test: "Typhoid",
			sample: "Blood",
			result: "positive",
		},
		{
			id: 4,
			test: "Malaria",
			sample: "Blood",
			result: "positive",
		},
		{
			id: 5,
			test: "Malaria",
			sample: "Blood",
			result: "positive",
		},
	];
	return (
		<>
			<div className="flex ">
				<div className="w-1/2 border-r border-gray1 p-5">
					<label>Select Tests</label>
					<Select
						placeholder={"Select Charge Type"}
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						className="mt-1"
						options={options}
					/>
					<br/>
					{tests.map((test) => {
						return (
							<div className="flex justify-between border-b p-2 border-gray1 hover:bg-gray1">
								<div>
									<p className="text-gray5 text-sm">{test.test}</p>
								</div>
								<div>
									<MdDeleteOutline className="text-red w-4 h-4  mt-1 cursor-pointer" />
								</div>
							</div>
						);
					})}
				</div>
				<div className="w-1/2 p-5">
					{testResults.map((test) => {
						return (
							<div className="flex w-full border-b p-2 border-gray1 hover:bg-gray1">
								<div className="w-1/3">
									<p className="text-gray5 text-sm">{test.test}</p>
								</div>
								<div className="w-1/3">
									<p className="text-gray5 text-sm">{test.sample}</p>
								</div>
								<div className="w-1/3">
									<p className="text-gray5 text-sm">{test.result}</p>
								</div>
								
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
export default Test;
