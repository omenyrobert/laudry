import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill, BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";
import axiosInstance from "../../axios-instance"
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ButtonSecondary from "../ButtonSecondary";
import ButtonLoader from "../ButtonLoader";




function SalaryInfo({ salaryInfo, staffId, fetchStaffInfo }) {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [gross_salary, setGrossSalary] = useState(salaryInfo?.length === 0 ? "" : salaryInfo[0].gross_salary);
	const [bank_name, setBankName] = useState(salaryInfo?.length === 0 ? "" : salaryInfo[0].bank_name);
	const [account_name, setAccountName] = useState(salaryInfo?.length === 0 ? "" : salaryInfo[0].account_name);
	const [account_number, setAccountNumber] = useState(salaryInfo?.length === 0 ? "" : salaryInfo[0].account_number);
	const [bank_branch, setBankBranch] = useState(salaryInfo?.length === 0 ? "" : salaryInfo[0].account_branch);

	const enqueFeedBack = (status, message = null) => {
		const MySwal = withReactContent(Swal);
		if (message === null) {
			MySwal.fire({
				icon: status,
				showConfirmButton: false,
				timer: 500,
			});
		} else {
			MySwal.fire({
				icon: status,
				title: message.title,
				text: message.text,
			});
		}
	}

	const [posting, setPositing] = useState(false);
	const addSalaryInfo = async () => {
		setPositing(true)
		if (gross_salary === "" || bank_name === "" || account_name === "" || account_number === "" || bank_branch === "") {
			enqueFeedBack("error", {
				title: "Oops...",
				text: "Please fill all fields"
			})
			setPositing(false)
			return
		}
		const data = {
			gross_salary: gross_salary,
			bank_name: bank_name,
			account_name: account_name,
			account_number: account_number,
			bank_branch: bank_branch,
			staff: staffId
		}
		await axiosInstance.post("/salary-info", data)
			.then((res) => {
				const { status, payload } = res.data
				if (status) {
					fetchStaffInfo()
					enqueFeedBack("success", {
						title: "Success",
						text: "Salary Info Added"
					})
					setPositing(false)
				} else {
					enqueFeedBack("error", {
						title: "Oops...",
						text: payload
					})
					setPositing(false)
				}
			})
			.catch((err) => {
				enqueFeedBack("error", {
					title: "Error",
					text: "Salary Info Not Added"
				})
				setPositing(false)
			})
			setPositing(false)
	}


	const [updating, setUpdating] = useState(false)

	const updateSalaryInfo = async () => {
		setUpdating(true)
		if (gross_salary === "" || bank_name === "" || account_name === "" || account_number === "" || bank_branch === "") {
			enqueFeedBack("error", {
				title: "Oops...",
				text: "Please fill all fields"
			})
			setUpdating(false)
			return
		}
		const data = {
			gross_salary: gross_salary,
			bank_name: bank_name,
			account_name: account_name,
			account_number: account_number,
			bank_branch: bank_branch,
			staff: staffId,
			id: salaryInfo[0].id
		}
		await axiosInstance.put(`/salary-info/${salaryInfo[0].id}`, data)
			.then((res) => {
				const { status, payload } = res.data
				if (status) {
					fetchStaffInfo()
					enqueFeedBack("success", {
						title: "Success",
						text: "Salary Info Updated"
					})
					closeSalaryInfo();
					setUpdating(false)
				} else {
					enqueFeedBack("error", {
						title: "Oops...",
						text: payload
					})
					setUpdating(false)
				}
			})
			.catch((err) => {
				enqueFeedBack("error", {
					title: "Error",
					text: "Salary Info Not Updated"
				})
				setUpdating(false)
			})
		setUpdating(false)
	}



	const openSalaryInfo = () => {
		setEditModalOpen(true);
		setGrossSalary(salaryInfo?.length === 0 ? "" : salaryInfo[0].gross_salary);
		setBankName(salaryInfo?.length === 0 ? "" : salaryInfo[0].bank_name);
		setAccountName(salaryInfo?.length === 0 ? "" : salaryInfo[0].account_name);
		setAccountNumber(salaryInfo?.length === 0 ? "" : salaryInfo[0].account_number);
		setBankBranch(salaryInfo?.length === 0 ? "" : salaryInfo[0].bank_branch);
	};

	const closeSalaryInfo = () => {
		setEditModalOpen(false);
	};



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
					className="text-sm  flex text-primary cursor-pointer p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> {salaryInfo?.length === 0 ? "Add Salary Info" : "Edit Salary Info"}
				</div>

				{/** Edit Modal */}
				{editModalOpen ? (
					<div className="absolute flex w-full h-full z-50 bg-black/50 top-0 left-0">
						<div onClick={closeSalaryInfo} className="w-7/12">
						</div>
						<div className="mt-[10vh] mr-[10vw]  w-5/12 ">
							<div className="bg-white rounded-md">
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
											onChange={(e) => setGrossSalary(e.target.value)}
											value={gross_salary}

										/>
										<InputField
											type="text"
											placeholder="Bank"
											label="Bank"
											onChange={(e) => setBankName(e.target.value)}
											value={bank_name}

										/>
										<InputField
											type="text"
											placeholder="Account Name"
											label="Account Name"
											onChange={(e) => setAccountName(e.target.value)}
											value={account_name}

										/>
									</div>
									<div className="w-1/2 p-3 -mt-5">
										<InputField
											type="text"
											placeholder="Account Number"
											label="Account Number"

											onChange={(e) => setAccountNumber(e.target.value)}
											value={account_number}

										/>

										<InputField
											type="text"
											label="Account Branch"
											placeholder="Account Branch"
											onChange={(e) => setBankBranch(e.target.value)}
											value={bank_branch}
										/>


									</div>
								</div>
								<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
									<div>
										<ButtonSecondary value={"Close"} />
									</div>
									<div>
										{salaryInfo?.length === 0 ? (
											<div onClick={addSalaryInfo} className="">
												{posting ? <ButtonLoader /> : <Button value={"Add"} />}
											</div>) : (
											<div onClick={updateSalaryInfo} className="">
												{updating ? <ButtonLoader /> : <Button value={"Update"} />}


											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>

			{/** Salary Info Display */}
			{salaryInfo?.length === 0 ? <>No Salary Info</> : (
				salaryInfo?.map((salary) => (
					<div key={salary.id}>
						<div className="flex border-b border-gray1">
							<div className="p-2 w-1/3  truncate">
								Gross Salary
								<p className="text-sm text-gray5">
									{new Intl.NumberFormat(
										"en-US",
										{
											style: "currency",
											currency: "UGX",
										}
									).format(salary.gross_salary)}
								</p>
							</div>
							<div className="p-2 w-1/3  truncate">
								Bank
								<p className="text-sm text-gray5">{salary.bank_name}</p>
							</div>
							<div className="p-2 w-1/3  truncate">
								Account Name
								<p className="text-sm text-gray5">{salary.account_name}</p>
							</div>
						</div>
						<div className="flex border-b border-gray1">
							<div className="p-2 w-1/3  truncate">
								Account Number
								<p className="text-sm text-gray5">{salary.account_number}</p>
							</div>
							<div className="p-2 w-1/3">
								Bank Branch
								<p className="text-sm text-gray5">{salary.bank_branch}</p>
							</div>
						</div>
					</div >
				)))
			}

		</>
	);
}

export default SalaryInfo;
