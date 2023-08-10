import React from "react";
import InputField from "../../components/InputField";
import Select from "react-select";
import Button from "../../components/Button";

function MarkSheet() {
	const options = [
		{
			label: "Red",
			value: "Red",
		},
		{
			label: "Yellow",
			value: "Yellow",
		},
	];
	const marks = [
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
		{
			id: 1,
			name: "Omeny Robert",
			classLevel: "Nursery",
			class: "P.1",
			stream: "Red",
			marks: "60%",
			grade: "C4",
		},
	];
	return (
		<div className="bg-white p-5 h-full">
			<div className="flex justify-between">
				<div className="text-xl text-secondary font-semibold">Mark Sheet</div>
				<div>
					<Button value={"Print"} />
				</div>
			</div>
			<div className="flex mt-2">
				<div className="w-1/4 p-2">
					<Select placeholder={"Select Class "} options={options} />
				</div>
				<div className="w-1/4 p-2">
					<Select placeholder={"Select Stream"} options={options} />
				</div>
				<div className="w-1/4 p-2">
					<Select placeholder={"Select Exam Type"} options={options} />
				</div>
				<div className="w-1/4 p-2">
					<Select placeholder={"Select Subject"} options={options} />
				</div>
			</div>
			<div className="flex bg-primary3 text-primary font-medium mt-5">
				<div className="w-2/12 p-2">Full Name</div>
				<div className="w-2/12 p-2">Class Level</div>
				<div className="w-2/12 p-2">Class</div>
				<div className="w-2/12 p-2">Stream</div>
				<div className="w-2/12 p-2">Mark</div>
				<div className="w-2/12 p-2">Grade</div>
			</div>
			{marks.map((mark) => {
				return (
					<div className="flex cursor-pointer hover:bg-gray1 border-b border-gray1 text-gray5 text-sm">
						<div className="w-2/12 p-2">{mark.name}</div>
						<div className="w-2/12 p-2">{mark.classLevel}</div>
						<div className="w-2/12 p-2">{mark.class}</div>
						<div className="w-2/12 p-2">{mark.stream}</div>
						<div className="w-2/12 p-2">{mark.marks}</div>
						<div className="w-2/12 p-2">{mark.grade}</div>
					</div>
				);
			})}
		</div>
	);
}
export default MarkSheet;
