import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/styles/main.css";
import Navigation from "../../components/settings/Navigation";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import InputSelect from "../../components/InputSelect";
import { FaRegUserCircle, FaPhone, FaBusinessTime,FaRegTrashAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import UserTable from "../../components/user/UserTable";
import Select from "react-select";


function Users() {
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Doctor", label: "Doctor" },
		{ value: "Nurse", label: "Nurse" },
		{ value: "Accountant", label: "Accountant" },
		{ value: "FrontOffice", label: "FrontOffice" },
	];
	const suboptions = [
		{ value: "Dental Doctor", label: "Dental Doctor" },
		{ value: "Skin Doctor", label: "Skin Doctor" },
		{ value: "Accountant", label: "Accountant" },
		{ value: "FrontOffice", label: "FrontOffice" },
	];
	const [phones, setPhones] = useState([{ phoneNumber: "" }]);
	const [noks, setNoks] = useState([
		{
			name: "",
			phone: "",
			type: "",
		},
	]);

	const addPhone = () => {
		setPhones([...phones, { phoneNumber: "" }]);
	};

	const addNok = () => {
		setNoks([...noks, { name: "", phone: "", type: "" }]);
	};

	const removePhones = (index) => {
		const newList = phones.filter((item, i) => i !== index);
		setPhones(newList);
	};
	
	const removeNok = (index) => {
		const newList = noks.filter((item, i) => i !== index);
		setNoks(newList);
	};





	return (
		<div className="h-screen overflow-hidden bg-gray10">
			<div className="flex w-full">
				<div className="w-1/12">
					<Sidebar />
				</div>
				<div className="w-11/12 -ml-3">
					<Navbar />
					<Navigation />
					<div className="rounded-md shadow-md bg-white  p-5 h-screen mt-2 w-full">
						<p className="text-primary text-xl font-semibold">Facility Users</p>
						<div className="flex">
							<div className="w-1/3 border-r-2 border-gray1 h-[80vh] overflow-y-auto pr-5">
								<InputField
									type="text"
									placeholder="Enter First Name"
									label="First Name"
									name="first_name"
									icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Enter Middle Name"
									label="Middle Name"
									name="middle_name"
									icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="text"
									placeholder="Enter Last Name"
									label="Last Name"
									name="last_name"
									icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="date"
									label="Date Of Birth"
									name="date_of_birth"
								/>
								<InputSelect
									type="text"
									placeholder="Select Gender"
									label="Gender"
									name="gender"
								/>
								{phones.map((phone, index) => (
									<div className="flex">
										<div className="w-11/12">
											<InputField
												type="text"
												key={index}
												value={phone.phoneNumber}
												placeholder="Enter Your Phone Number"
												label="Phone Number"
												name="phone"
												icon={<FaPhone className="w-3 -ml-7 mt-3" />}
											/>
										</div>
										<div className="w-1/12">
											<p
												onClick={() => removePhones(index)}
												className="text-red mt-[65px] ml-5 cursor-pointer"
											>
												<FaRegTrashAlt />
											</p>
										</div>
									</div>
								))}
								<button
									onClick={addPhone}
									className="text-primary text-sm flex -mt-3"
								>
									Add Phone
									<FaPhone className="w-3 ml-2 mt-1" />
								</button>

								<InputField
									type="text"
									placeholder="Place of Residence"
									label="Place of Residence"
									name="place_of_residence"
									icon={<IoLocationSharp className="w-3 -ml-7 mt-3" />}
								/>
								<InputField
									type="email"
									placeholder="Enter Your email"
									label="Email"
									name="email"
									icon={<MdAlternateEmail className="w-3 -ml-7 mt-3" />}
								/>

								{noks.map((nok, index) => (
									<div>
										<InputField
											type="text"
											placeholder="Next of Kin Name"
											value={nok.name}
											label="Nok Name"
											name="nok_name"
											icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
										/>
										<InputField
											type="text"
											placeholder="Next of Kin Phone Number"
											label="NOK Phone Number"
											value={nok.phone}
											name="phone"
											icon={<FaPhone className="w-3 -ml-7 mt-3" />}
										/>
										<InputField
											type="text"
											placeholder="Next of Kin Type"
											label="NOK  Type"
											value={nok.type}
											name="phone"
											icon={<FaBusinessTime className="w-3 -ml-7 mt-3" />}
										/>
										<p
											onClick={() => removeNok(index)}
											className="text-red mt-[65px] ml-5 cursor-pointer -mt-4"
										>
											<FaRegTrashAlt />
										</p>
									</div>
								))}

								<button
									onClick={addNok}
									className="text-primary text-sm flex mt-3"
								>
									Add Phone
									<FaRegUserCircle className="w-3 ml-2 mt-1" />
								</button>
								<br />

								<br/>
									<label className="text-gray4">Employee Type</label>

									<Select
										placeholder={"Select Employee Type"}
										defaultValue={selectedOption}
										onChange={setSelectedOption}
										className="mt-1"
										options={options}
									/>

<br/>
									<label className="text-gray4">Employee Sub Type</label>

									<Select
										placeholder={"Select Employee Sub Type"}
										defaultValue={selectedOption}
										onChange={setSelectedOption}
										className="mt-1"
										options={suboptions}
									/>
									<br/>
								<Button value={"Add User"} />
							</div>
							<div className="w-2/3 p-5">
								<UserTable />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Users;
