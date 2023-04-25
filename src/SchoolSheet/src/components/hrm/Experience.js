import React, { useState } from "react";

function Experience() {
	const [Experience, setExperience] = useState(false);

	const openExperience = () => {
		setExperience(true);
	};

	const closeExperience = () => {
		setExperience(false);
	};

	cons[school, setSchool] = useState("");
	cons[from, setFrom] = useState("");
	cons[to, setTo] = useState("");
	cons[not, setNot] = useState("");

	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						Academic Experience
					</p>
				</div>
				<div
					onClick={openExperience}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Experience
					{Experience ? (
						<div className="border absolute z-50 -mt-[200px] border-gray3 bg-white shadow h-[30px] rounded w-[700px] overflow-y-auto">
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div>
									<p>Add Next Of Kin</p>
								</div>
								<div>
									<p className="cursor-pointer" onClick={closeExperience}>
										X
									</p>
								</div>
							</div>
							<div className="flex">
								<div className="w-1/2 p-3">
									<InputField
										type="text"
										placeholder="School"
										label="School"
										onChange={(e) => setSchool(e.target.value)}
										value={school}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
									<InputField
										type="text"
										placeholder="From"
										label="From Date"
										onChange={(e) => setFrom(e.target.value)}
										value={from}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
									<InputField
										type="text"
										placeholder="To"
										label="To Date"
										onChange={(e) => setTo(e.target.value)}
										value={to}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="w-1/2 p-3 -mt-5">
									<InputField
										type="text"
										placeholder="Enter Duties, classes, Subjects"
										label="Notes"
										name="Notes"
										onChange={(e) => setNot(e.target.value)}
										value={not}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>

									<div className="mt-14">
										<Button value={"Add Experience"} />
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="flex border-b border-gray1">
				<div className="p-2 w-1/3">Seeta High</div>
				<div className="p-2 w-1/3">2012-06-01 - 2013-06-09 1yrs</div>
				<div className="p-2 w-1/3">English, Math, Sports Teacher</div>
			</div>
			<div className="flex border-b border-gray1">
				<div className="p-2 w-1/3">Seeta High</div>
				<div className="p-2 w-1/3">2012-06-01 - 2013-06-09 1yrs</div>
				<div className="p-2 w-1/3">English, Math, Sports Teacher</div>
			</div>
            <div className="flex border-b border-gray1">
				<div className="p-2 w-1/3">Seeta High</div>
				<div className="p-2 w-1/3">2012-06-01 - 2013-06-09 1yrs</div>
				<div className="p-2 w-1/3">English, Math, Sports Teacher</div>
			</div>
		</>
	);
}

export default Experience;
