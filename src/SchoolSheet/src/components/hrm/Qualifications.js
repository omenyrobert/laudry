import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";

function Qualifications() {
	const [Qualifications, setQualifications] = useState(false);

	const openQualifications = () => {
		setQualifications(true);
	};

	const closeQualifications = () => {
		setQualifications(false);
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
						Academic Qualifications
					</p>
				</div>
				<div
					onClick={openQualifications}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Qualifications
					
				</div>
                {Qualifications ? (
						<div className="border absolute z-50 -mt-[200px] border-gray3 bg-white shadow h-[400px] rounded w-[700px] overflow-y-auto">
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div>
									<p>Add Next Of Kin</p>
								</div>
								<div>
									<p className="cursor-pointer" onClick={closeQualifications}>
										X
									</p>
								</div>
							</div>
							<div className="flex">
								<div className="w-1/2 p-3">
									<InputField
										type="text"
										placeholder="Award"
										label="Award"
										onChange={(e) => setAward(e.target.value)}
										value={award}
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
										placeholder="Enter Institution"
										label="Institution"
										name="Institution"
										onChange={(e) => setSchool(e.target.value)}
										value={school}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>

									<InputField
										type="file"
										
										label="Document"
										onChange={(e) => setDoc(e.target.value)}
										value={doc}
										
									/>

									<div className="mt-14">
										<Button value={"Add Qualifications"} />
									</div>
								</div>
							</div>
						</div>
					) : null}
			</div>
			<div className="flex border-b border-gray1">
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">
					Bachelors in Education
				</div>
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">
					2012-06-01 - 2013-06-09 1yrs
				</div>
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">Makeerere</div>
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">file</div>
			</div>
			<div className="flex border-b border-gray1">
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">
					Bachelors in Education
				</div>
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">
					2012-06-01 - 2013-06-09 1yrs
				</div>
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">Makeerere</div>
				<div className="p-2 w-1/4 text-sm text-gray5 truncate">file</div>
			</div>
		</>
	);
}

export default Qualifications;
