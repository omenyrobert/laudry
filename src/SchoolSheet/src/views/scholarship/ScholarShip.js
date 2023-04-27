import React from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function ScholarShip() {
	return (
		<>
			<div className="flex">
				<div className="w-5/12 bg-white p-2 h-[90vh] overflow-y-auto">
					<h1 className="text-primary font-semibold">Create ScholarShip</h1>
					<div className="flex">
						<div className="w-2/5 p-1">
							<InputField
								label="ScholarShip Name"
								type="text"
								placeholder="Enter Scholarship Name"
							/>
						</div>
						<div className="w-2/5 p-1">
							<InputField
								label="Percentage"
								type="number"
								placeholder="Enter Percentage"
							/>
						</div>
						<div className="w-1/5 p-1 mt-14">
							<Button value={"Add"} />
						</div>
					</div>
					<div className="flex border-b border-gray1">
						<div className="w-1/3 p-2  text-sm">Name</div>
						<div className="w-1/3 p-2  text-sm">Percentage</div>
						<div className="w-1/3 p-2  text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">FootBall</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">70%</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">Academics</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">100%</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">State House</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">70%</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
				</div>
				<div className="w-7/12 p-2">
					<h1 className="text-primary font-semibold">Students On </h1>
                    <br/>
					<div className="flex border-b border-gray1 bg-white">
						<div className="w-1/3 p-2 text-gray5 text-sm">Full Name</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Class</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">ScholarShip</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Percentage</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees to Pay</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">FootBall</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Class</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">ScholarShip</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Percentage</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees to Pay</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">FootBall</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Class</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">ScholarShip</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Percentage</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees to Pay</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">FootBall</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Class</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">ScholarShip</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Percentage</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees to Pay</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
					<div className="flex border-b border-gray1 hover:bg-gray1 hover:border-l-primary cursor-pointer hover:border-l-2">
						<div className="w-1/3 p-2 text-gray5 text-sm">FootBall</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Class</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">ScholarShip</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Percentage</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Fees to Pay</div>
						<div className="w-1/3 p-2 text-gray5 text-sm">Action</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default ScholarShip;
