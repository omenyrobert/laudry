import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import Button2 from "../../components/Button2";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Select from "react-select";
import { MdDeleteOutline, MdPrint } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonSecondary from "../../components/ButtonSecondary";
import axiosInstance from "../../axios-instance";
import { useNavigate } from "react-router-dom";

function PayRoll() {
	const [payslipType, setPayslipType] = useState();
	const [payslipTypeData, setPayslipTypeData] = useState([]);
	const navigate = useNavigate();
	// post payslip types
	const postPayslipType = () => {
		let formData = {
			category: payslipType,
		};
		if (payslipType) {
			axiosInstance
				.post("/pay-slip-categories", formData)
				.then((res) => {
					setPayslipType("");
					// fetch after
					fetchPayslipType();

					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					closeCreate();
				})
				.catch((err) => {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						showConfirmButton: false,
						timer: 500,
					});
				});
		}
	};
	// fetch payslip types
	const fetchPayslipType = () => {
		axiosInstance.get("/pay-slip-categories").then((res) => {
			const { payload } = res.data;
			console.log(payload);
			const newData = payload?.map((payslip) => ({
				value: payslip?.category,
				label: payslip?.category,
				...payslip,
			}));
			setPayslipTypeData(newData);
		});
	};

	//deleting Payslip Types
	const deletePayslipType = (type) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosInstance
					.delete(`/pay-slip-categories/${type.id}`)
					.then((res) => {
						// fetch after
						fetchPayslipType();
						const { status, payload } = res.data;

						if (status === false) {
							const MySwal = withReactContent(Swal);
							MySwal.fire({
								icon: "error",
								showConfirmButton: false,
								timer: 500,
								title: payload,
							});
							return;
						}

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((err) => {
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "error",
							showConfirmButton: false,
							timer: 500,
						});
					});
			}
		});
	};

	// updating Payslip Type
	const [typeEdit, setTypeEdit] = useState("");
	const [typeId, setTypeId] = useState("");
	const [editData, setEditData] = useState(false);
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (type) => {
		setEditData(true);
		setTypeEdit(type?.category);
		setTypeId(type.id);
	};
	const updatePayslipType = () => {
		let formData = {
			category: typeEdit,
		};

		axiosInstance
			.put(`/pay-slip-categories/${typeId}`, formData)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						showConfirmButton: false,
						timer: 500,
						title: payload,
					});
					return;
				}
				// fetch after
				fetchPayslipType();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			})
			.catch((err) => {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					showConfirmButton: false,
					timer: 500,
				});
			});
	};

	// fetching stypes
	useEffect(() => {
		fetchPayslipType();
	}, []);

	// staff pay slip
	const [staffInfo, setStaffInfo] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	// fetch staff info
	useEffect(() => {
		axiosInstance.get("/staff").then((res) => {
			const { payload } = res.data;

			const newData = payload.map((staff) => ({
				value: staff.first_name + " " + staff.last_name,
				label: staff.first_name + " " + staff.last_name,
				...staff,
			}));
			setStaffInfo(newData);
		});
	}, []);

	const [pay, setPay] = useState(false);

	const openPay = () => {
		setPay(true);
		setCreate(false);
	};
	const closePay = () => {
		setPay(false);
	};

	// toggle create
	const [create, setCreate] = useState(false);
	const openCreate = () => {
		setCreate(true);
		setPay(false);
	};

	const closeCreate = () => {
		setCreate(false);
	};

	const [taxes, setTaxes] = useState([]);
	const [grossSalary, setGrossSalary] = useState(0);
	const [netSalary, setNetSalary] = useState(0);

	function handleTaxNameChange(e, index) {
		const updatedTaxes = [...taxes];
		updatedTaxes[index].name = e.target.value;
		setTaxes(updatedTaxes);
	}

	function handleTaxPercentageChange(e, index) {
		const updatedTaxes = [...taxes];
		updatedTaxes[index].percentage = parseInt(e.target.value);
		setTaxes(updatedTaxes);
	}

	function handleAddTax() {
		const updatedTaxes = [...taxes];
		updatedTaxes.push({ name: "", percentage: 0 });
		setTaxes(updatedTaxes);
	}

	function handleDeleteTax(index) {
		const updatedTaxes = [...taxes];
		updatedTaxes.splice(index, 1);
		setTaxes(updatedTaxes);
	}

	const [deductions, setDeductions] = useState([]);

	function handleDeductionNameChange(e, index) {
		const updatedDeductions = [...deductions];
		updatedDeductions[index].name = e.target.value;
		setDeductions(updatedDeductions);
	}

	function handleDeductionAmountChange(e, index) {
		const updatedDeductions = [...deductions];
		updatedDeductions[index].amount = parseInt(e.target.value);
		setDeductions(updatedDeductions);
	}

	function handleAddDeduction() {
		const updatedDeductions = [...deductions];
		updatedDeductions.push({ name: "", amount: 0 });
		setDeductions(updatedDeductions);
	}

	function handleDeleteDeduction(index) {
		const updatedDeductions = [...deductions];
		updatedDeductions.splice(index, 1);
		setDeductions(updatedDeductions);
	}

	useEffect(() => {
		let totalTaxPercentage = 0;
		taxes.forEach((tax) => {
			if (tax.percentage) {
				totalTaxPercentage += tax.percentage;
			} else {
				totalTaxPercentage += 0;
			}
		});

		let totalDeductions = 0;
		deductions.forEach((deduction) => {
			if (deduction.amount) {
				totalDeductions += deduction.amount;
			} else {
				totalDeductions += 0;
			}
		});

		const netSalary =
			grossSalary - grossSalary * (totalTaxPercentage / 100) - totalDeductions;
		setNetSalary(netSalary);
	}, [taxes, grossSalary, deductions]);

	const postEmployeePay = () => {
		let data = {
			gross_salary: grossSalary,
			taxes: [...taxes],
			deductions: [...deductions],
			net_salary: netSalary,
			paySlipCategory: selectedPaySlip.id,
			staff: selectedOption.id,
		};
		if (data) {
			axiosInstance
				.post("/pay-slip", data)
				.then((res) => {
					const { status, payload } = res.data;
					if (status === false) {
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "error",
							showConfirmButton: false,
							timer: 500,
							title: payload,
						});
						return;
					}
					// fetch after
					fetchEmployeePay();
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					setTaxes([]);
					setDeductions([]);
					setNetSalary(0);
					setSelectedOption(null);
					closePay();
				})
				.catch((err) => {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						showConfirmButton: false,
						timer: 500,
					});
				});
		}
	};
	// fetch employee payslip
	const [employeePayData, setEmployeePayData] = useState([]);
	const fetchEmployeePay = () => {
		axiosInstance.get("/pay-slip").then((res) => {
			const { payload } = res.data;
			console.log(payload);
			setEmployeePayData(payload);
		});
	};

	useEffect(() => {
		fetchEmployeePay();
	}, []);

	//deleting employee Payslip
	const deleteEmployeePay = (payslip) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosInstance
					.delete(`/pay-slip/${payslip.id}`)
					.then((res) => {
						const { status, payload } = res.data;
						if (status === false) {
							const MySwal = withReactContent(Swal);
							MySwal.fire({
								icon: "error",
								showConfirmButton: false,
								timer: 500,
								title: payload,
							});
							return;
						}
						// fetch after
						fetchEmployeePay();
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((err) => {
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "error",
							showConfirmButton: false,
							timer: 500,
						});
					});
			}
		});
	};

	// update employee payslip
	const [employeeId, setEmployeeId] = useState();
	const [editEmployeePay, setEditEmployeePay] = useState(false);
	const closeEditPay = () => {
		setEditEmployeePay(false);
	};

	const [formTaxes, setFormTaxes] = useState();
	const [formDeductions, setFormDeductions] = useState();
	const [formGrossSalary, setFormGrossSalary] = useState();
	const [netSalaryEdit, setNetSalaryEdit] = useState();
	const [employeeNameEdit, setEmployeeNameEdit] = useState();
	const [activePaySlip, setActivePaySlip] = useState();

	const openEditEmployeePay = (payslip) => {
		const { staff } = payslip;
		setEmployeeId(staff.id);
		setActivePaySlip(payslip);
		setFormTaxes(payslip.taxes);
		setFormDeductions(payslip.deductions);
		setFormGrossSalary(payslip.gross_salary);
		setNetSalaryEdit(payslip.net_salary);
		setEmployeeNameEdit(`${staff.first_name} ${staff.last_name}`);
		setEditEmployeePay(true);
	};

	function handleTaxNameChangeEdit(e, index) {
		const updatedTaxes = [...formTaxes];
		updatedTaxes[index].name = e.target.value;
		setFormTaxes(updatedTaxes);
	}

	function handleTaxPercentageChangeEdit(e, index) {
		const updatedTaxes = [...formTaxes];
		updatedTaxes[index].percentage = parseInt(e.target.value);
		setFormTaxes(updatedTaxes);
	}

	function handleAddTaxEdit() {
		const updatedTaxes = [...formTaxes];
		updatedTaxes.push({ name: "", percentage: 0 });
		setFormTaxes(updatedTaxes);
	}

	function handleDeleteTaxEdit(index) {
		const updatedTaxes = [...formTaxes];
		updatedTaxes.splice(index, 1);
		setFormTaxes(updatedTaxes);
	}

	function handleDeductionNameChangeEdit(e, index) {
		const updatedDeductions = [...formDeductions];
		updatedDeductions[index].name = e.target.value;
		setFormDeductions(updatedDeductions);
	}

	function handleDeductionAmountChangeEdit(e, index) {
		const updatedDeductions = [...formDeductions];
		updatedDeductions[index].amount = parseInt(e.target.value);
		setFormDeductions(updatedDeductions);
	}

	function handleAddDeductionEdit() {
		const updatedDeductions = [...formDeductions];
		updatedDeductions.push({ name: "", amount: 0 });
		setFormDeductions(updatedDeductions);
	}

	function handleDeleteDeductionEdit(index) {
		const updatedDeductions = [...formDeductions];
		updatedDeductions.splice(index, 1);
		setFormDeductions(updatedDeductions);
	}

	useEffect(() => {
		let totalTaxPercentage = 0;
		formTaxes?.forEach((tax) => {
			if (tax.percentage) {
				totalTaxPercentage += tax.percentage;
			} else {
				totalTaxPercentage += 0;
			}
		});

		let totalDeductions = 0;
		formDeductions?.forEach((deduction) => {
			if (deduction.amount) {
				totalDeductions += deduction.amount;
			} else {
				totalDeductions += 0;
			}
		});

		const netSalaryEdit =
			formGrossSalary -
			formGrossSalary * (totalTaxPercentage / 100) -
			totalDeductions;
		setNetSalaryEdit(netSalaryEdit);
	}, [formTaxes, formGrossSalary, formDeductions]);

	const updateEmployeePay = () => {
		let data = {
			gross_salary: formGrossSalary,
			taxes: [...formTaxes],
			deductions: [...formDeductions],
			net_salary: netSalaryEdit,
			paySlipCategory: activePaySlip.paySlipCategory.id,
			staff: employeeId,
		};

		axiosInstance
			.put(`/pay-slip/${activePaySlip.id}`, data)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						showConfirmButton: false,
						timer: 500,
						title: payload,
					});
					return;
				}
				// fetch after
				fetchEmployeePay();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditPay();
			})
			.catch((err) => {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					showConfirmButton: false,
					timer: 500,
				});
			});
	};

	const [selectedPaySlip, setSelectedPaySlip] = useState(null);

	const handleSelectEmployee = (value) => {
		setSelectedOption(value);
		if (value.salaryInfo.length === 0) {
			Swal.fire({
				title: "Employee Has No Salary Info",
				text: "Please add salary info for this employee",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Add Salary Info",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/app/hrm/salary-info");
				}
			});
		} else {
			setGrossSalary(value.salaryInfo[0].gross_salary);
		}
	};

	const [printing, setPrinting] = useState(false);
	const [printData, setPrintData] = useState(null);

	const openPrint = (payslip) => {
		setPrinting(true);
		setPrintData(payslip);
	};

	useEffect(() => {
		if (printing && printData) {
			const documentWindow = window.open("", "PRINT", "height=600,width=1000");
			const content = document.getElementById("payslip-pdf").outerHTML;

			documentWindow.document.write(content);
			// Get All stylesheets
			const stylesheets = document.querySelectorAll("link");
			// Append them to the head of the new window
			stylesheets.forEach((stylesheet) => {
				documentWindow.document.write(stylesheet.outerHTML);
			});
			// Get all style tags
			const styleTags = document.querySelectorAll("style");
			// Append them to the head of the new window
			styleTags.forEach((styleTag) => {
				documentWindow.document.write(styleTag.outerHTML);
			});

			setTimeout(() => {
				documentWindow.print();
				setPrinting(false);
				setPrintData(null);
			}, 1000);
		}
	}, [printing, printData]);

	return (
		<div className="w-full">
			<div
				style={{
					display: "none",
				}}
			>
				<PaySlipPDF payslip={printData} />
			</div>

			<div className="h-screen mt-2">
				<div className="flex bg-white p-3 justify-between shadow-lg rounded-md">
					<div className="flex justify-between w-1/2">
						<div onClick={openCreate}>
							<Button2 value={"Payslip"} />
						</div>
						<div onClick={openPay}>
							<Button2 value={"Employee Payslip"} />
						</div>
					</div>
					<div>
						<p className="text-primary text-xl font-semibold">PayRoll</p>
					</div>
				</div>
				{create ? (
					<div className="absolute w-[300px]  z-50  bg-white shadow-lg rounded-md">
						<div className="text-primary p-3 flex justify-between rounded-md bg-gray1">
							<div>Create Payslip</div>
							<div>
								<p onClick={closeCreate} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="p-2">
							<InputField
								type="text"
								placeholder="Enter Title of Payslip"
								label="Title"
								value={payslipType}
								onChange={(e) => setPayslipType(e.target.value)}
							/>
							<br />
							<div onClick={postPayslipType}>
								<Button value={"Create Payslip "} />
							</div>
						</div>
					</div>
				) : null}

				{pay ? (
					<div className="absolute w-1/2 z-50  bg-white shadow-lg rounded-md">
						<div className="text-primary p-3 font-semibold flex justify-between rounded-md bg-gray1">
							<div>Create Payslip</div>
							<div>
								<p onClick={closePay} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
						<div className="flex h-[60vh]  overflow-y-auto">
							<div className="w-1/2 p-3">
								<label className="text-gray4">Employees</label>

								<Select
									placeholder={"Select Employee"}
									defaultValue={selectedOption}
									onChange={handleSelectEmployee}
									className="mt-1"
									options={staffInfo}
								/>

								<br />

								<label className="text-gray4">Pay Slip Category</label>

								<Select
									placeholder={"Select PaySlip Category"}
									defaultValue={selectedPaySlip}
									onChange={setSelectedPaySlip}
									className="mt-1"
									options={payslipTypeData}
								/>

								{taxes.map((taxItem, index) => (
									<div key={index}>
										<InputField
											type="text"
											placeholder="Enter Tax Name"
											value={taxItem.name}
											onChange={(e) => handleTaxNameChange(e, index)}
											label="Tax Name"
										/>
										<InputField
											type="number"
											placeholder="Tax Percent"
											label="Tax Percent"
											value={taxItem.percentage}
											onChange={(e) => handleTaxPercentageChange(e, index)}
										/>

										<p
											onClick={() => handleDeleteTax(index)}
											className="text-red mt-[65px] ml-5 cursor-pointer -mt-4"
										>
											Delete
										</p>
									</div>
								))}

								<button
									onClick={handleAddTax}
									className="text-primary text-sm flex mt-3"
								>
									Add Tax
								</button>
								<br />
								<div className="bg-gray1 p-3 rounded-md">
									Net Salary - {netSalary}
								</div>
							</div>
							<div className="w-1/2 p-3">
								<br />
								<div className="bg-gray1 p-3 rounded-md">
									Gross Salary - {grossSalary}
								</div>
								{deductions.map((deduction, index) => (
									<div>
										<InputField
											type="text"
											placeholder="Enter Deduction Name"
											value={deduction.name}
											onChange={(e) => handleDeductionNameChange(e, index)}
											label="Deduction Name"
										/>
										<InputField
											type="number"
											placeholder="Deduction Amount"
											label="Deduction Amount"
											value={deduction.amount}
											onChange={(e) => handleDeductionAmountChange(e, index)}
										/>

										<p
											onClick={() => handleDeleteDeduction(index)}
											className="text-red mt-[65px] ml-5 cursor-pointer -mt-4"
										>
											Delete
										</p>
									</div>
								))}

								<button
									onClick={handleAddDeduction}
									className="text-primary text-sm flex mt-3"
								>
									Add Deductions
								</button>
								<br />
							</div>
						</div>
						<div className=" p-3 font-semibold flex justify-between rounded-md bg-gray1">
							<div onClick={closePay}>
								<ButtonSecondary value={"Close"} />
							</div>
							<div>
								<div onClick={postEmployeePay}>
									<Button value={"Save Payslip"} />
								</div>
							</div>
						</div>
					</div>
				) : null}

				<div className="flex relative">
					<div className="w-3/12 h-[80vh] overflow-y-auto">
						<p className="mt-5 text-lg font-medium text-secondary">
							Payslip Category
						</p>
						<table className="mt-5 w-full table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">Payslip</th>
								<th className="p-2 text-primary text-sm text-left">Action</th>
							</thead>
							<tbody>
								{/* edit popup start */}
								{editData ? (
									<div className="absolute shadow-lg rounded  flex w-[400px] p-5 bg-white">
										<div className="w-2/3 pr-5">
											<InputField
												type="text"
												placeholder="Enter Staff Type"
												label="Staff Type"
												name="Staff_type"
												value={typeEdit}
												onChange={(e) => setTypeEdit(e.target.value)}
											/>
										</div>
										<div className="flex justify-between w-1/3 mt-[55px]">
											<div onClick={updatePayslipType}>
												<ButtonSecondary value={"Update"} />
											</div>
											<div>
												<p
													className="text-black text-lg cursor-pointer"
													onClick={closeEditData}
												>
													X
												</p>
											</div>
										</div>
									</div>
								) : null}
								{/* edit popup end */}
								{payslipTypeData.map((payslip) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={payslip.id}
										>
											<td className="text-xs p-3 text-gray5">
												{payslip.category}
											</td>
											<td className="text-xs p-3 text-gray5">
												<div className="flex">
													<MdDeleteOutline
														className="text-red w-4 h-4"
														onClick={() => deletePayslipType(payslip)}
													/>
													<BsPencilSquare
														className="text-warning h-4 w-4 ml-5"
														onClick={() => openEditData(payslip)}
													/>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="w-9/12 ml-5 h-[80vh] overflow-y-auto ">
						<p className="mt-5 text-lg font-medium text-secondary">
							{" "}
							Employee Payslip{" "}
						</p>
						<table className="mt-5 w-full table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">
									Full Name
								</th>
								<th className="p-2 text-primary text-sm text-left">
									Gross Salary
								</th>
								<th className="p-2 text-primary text-sm text-left">
									Net Salary
								</th>
								<th className="p-2 text-primary text-sm text-left">Action</th>
							</thead>
							<tbody>
								{editEmployeePay ? (
									<div className="absolute w-1/2  -mt-32   bg-white shadow-lg rounded-md">
										<div className="text-primary p-3 flex justify-between rounded-md bg-gray1">
											<div>Edit Payslip</div>
											<div>
												<p onClick={closeEditPay} className="cursor-pointer">
													X
												</p>
											</div>
										</div>
										<div className="flex h-[60vh] overflow-y-auto">
											<div className="w-1/2 p-3">
												<label className="text-gray4">Employee</label>

												<div className="bg-gray1 p-3 rounded-md">
													{employeeNameEdit}
												</div>

												{formTaxes?.map((taxItem, index) => (
													<div key={index}>
														<InputField
															type="text"
															placeholder="Enter Tax Name"
															value={taxItem.name}
															onChange={(e) =>
																handleTaxNameChangeEdit(e, index)
															}
															label="Tax Name"
														/>
														<InputField
															type="number"
															placeholder="Tax Percent"
															label="Tax Percent"
															value={taxItem.percentage}
															onChange={(e) =>
																handleTaxPercentageChangeEdit(e, index)
															}
														/>

														<p
															onClick={() => handleDeleteTaxEdit(index)}
															className="text-red mt-[65px] ml-5 cursor-pointer -mt-4"
														>
															Delete
														</p>
													</div>
												))}

												<button
													onClick={handleAddTaxEdit}
													className="text-primary text-sm flex mt-3"
												>
													Add Tax
												</button>
												<br />
												<div className="bg-gray1 p-3 rounded-md">
													Net Salary - {netSalaryEdit}
												</div>
											</div>
											<div className="w-1/2 p-3">
												<br />
												<div className="bg-gray1 p-3 rounded-md">
													Gross Salary - {formGrossSalary}
												</div>
												{formDeductions?.map((deduction, index) => (
													<div>
														<InputField
															type="text"
															placeholder="Enter Deduction Name"
															value={deduction.name}
															onChange={(e) =>
																handleDeductionNameChangeEdit(e, index)
															}
															label="Deduction Name"
														/>
														<InputField
															type="number"
															placeholder="Deduction Amount"
															label="Deduction Amount"
															value={deduction.amount}
															onChange={(e) =>
																handleDeductionAmountChangeEdit(e, index)
															}
														/>

														<p
															onClick={() => handleDeleteDeductionEdit(index)}
															className="text-red mt-[65px] ml-5 cursor-pointer -mt-4"
														>
															Delete
														</p>
													</div>
												))}

												<button
													onClick={handleAddDeductionEdit}
													className="text-primary text-sm flex mt-3"
												>
													Add Deductions
												</button>
												<br />
											</div>
										</div>
										<div className="text-primary p-3 flex justify-between rounded-md bg-gray1">
											<div onClick={closeEditPay}>
												<ButtonSecondary value={"Close"} />
											</div>
											<div>
												<div onClick={updateEmployeePay}>
													<Button value={"Update Payslip"} />
												</div>
											</div>
										</div>
									</div>
								) : null}

								{employeePayData?.map((payslip) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={payslip.id}
										>
											<td className="flex">
												<div>
													<p className="text-sm p-3 -mt-1 text-gray5">
														{payslip.staff.first_name} {payslip.staff.last_name}
													</p>
												</div>
											</td>
											<td className="text-xs p-3 text-gray5">
												{payslip.gross_salary}
											</td>
											<td className="text-xs p-3 text-gray5">
												{payslip.net_salary}
											</td>
											<td className="text-xs p-3 text-gray5">
												<div className="flex">
													<MdDeleteOutline
														className="text-red w-4 h-4"
														onClick={() => deleteEmployeePay(payslip)}
													/>
													<BsPencilSquare
														className="text-warning h-4 w-4 ml-5"
														onClick={() => openEditEmployeePay(payslip)}
													/>
													<MdPrint
														className="text-primary h-4 w-4 ml-5"
														onClick={() => openPrint(payslip)}
													/>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PayRoll;

const PaySlipPDF = ({ payslip }) => {
	return (
		<div id="payslip-pdf" className="bg-white z-50 absolute w-full h-full">
			<div className="p-3 bg-primary text-lg text-white flex justify-between">
				<div>
					<p>
						PaySlip for {payslip?.staff?.first_name}{" "}
						{payslip?.staff?.middle_name[0]?.toUpperCase()}{" "}
						{payslip?.staff?.last_name}{" "}
					</p>
				</div>
				<div>{payslip?.paySlipCategory?.category}</div>
				<div>{new Date(payslip?.created_at).toLocaleDateString()}</div>
			</div>
			<div className="flex border-b border-gray1 p-5 justify-between text-gray5">
				<div>Gross Salary</div>
				<div>{payslip?.gross_salary}</div>
			</div>
			<div className="flex border-b border-gray1 p-5 justify-between text-gray5">
				<div className="w-20">PAYEE Tax</div>
				<div>20%</div>
				<div>200,000</div>
			</div>
			{payslip?.taxes?.map((tax) => (
				<div className="flex border-b border-gray1 p-5 justify-between text-gray5">
					<div className="w-20">{tax.name}</div>
					<div>{tax.percentage}%</div>
					<div>
						{(parseInt(payslip.gross_salary) * parseInt(tax.percentage)) / 100}
					</div>
				</div>
			))}

			{payslip?.deductions?.map((deduction) => (
				<div className="flex border-b border-gray1 p-5 justify-between text-gray5">
					<div className="w-20">{deduction.name}</div>
					<div>{deduction.amount}</div>
				</div>
			))}
			<div className="flex bg-gray1 p-5 justify-between text-gray5">
				<div className="">Total Deductions</div>
				<div>{payslip?.deductions?.reduce((a, b) => a + b.amount, 0)}</div>
			</div>
			<div className="flex bg-gray1 p-5 justify-between text-gray5">
				<div className="">Total Tax</div>
				<div>
					{payslip?.taxes?.reduce(
						(a, b) =>
							a +
							(parseInt(payslip.gross_salary) * parseInt(b.percentage)) / 100,
						0
					)}
				</div>
			</div>
			<div className="flex border-b border-gray1 text-lg text-primary p-5 justify-between font-bold">
				<div className="">Net Salary</div>
				<div>{payslip?.net_salary}</div>
			</div>
		</div>
	);
};
