import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import Button2 from "../../components/Button2";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Select from "react-select";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import { v4 as uuid } from "uuid";
import ButtonSecondary from "../../components/ButtonSecondary";
import axiosInstance from "../../axios-instance";

let db = new Localbase("db");

function PayRoll() {
	const [payslipType, setPayslipType] = useState();
	const [payslipTypeData, setPayslipTypeData] = useState([]);
	// post payslip types
	const postPayslipType = () => {
		let formData = {
			category: payslipType,
		};
		if (payslipType) {

			axiosInstance.post("/pay-slip-categories", formData).then((res) => {
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
			}).catch((err) => {
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
			console.log(payload)
			setPayslipTypeData(payload);
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

				axiosInstance.delete(`/pay-slip-categories/${type.id}`).then((res) => {
					// fetch after
					fetchPayslipType();
					const { status, payload } = res.data;

					if (status === false) {
						const MySwal = withReactContent(Swal);
						MySwal.fire({
							icon: "error",
							showConfirmButton: false,
							timer: 500,
							title: payload
						});
						return;
					}

					Swal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				}).catch((err) => {
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "error",
						showConfirmButton: false,
						timer: 500,
					});
				})
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
		}

		axiosInstance.put(`/pay-slip-categories/${typeId}`, formData).then((res) => {
			const { status, payload } = res.data;
			if (status === false) {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					showConfirmButton: false,
					timer: 500,
					title: payload
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
		}).catch((err) => {
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				icon: "error",
				showConfirmButton: false,
				timer: 500,
			});
		})
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
				grossSalary: staff.grossSalary,
				staffId: staff.id,
			}));
			setStaffInfo(newData);
		});
	}, []);

	const [pay, setPay] = useState(false);

	const openPay = () => {
		setPay(true);
	};
	const closePay = () => {
		setPay(false);
	};

	// toggle create
	const [create, setCreate] = useState(false);
	const openCreate = () => {
		setCreate(true);
	};

	const closeCreate = () => {
		setCreate(false);
	};

	const [taxes, setTaxes] = useState([
		{
			name: "",
			percent: 0,
		},
	]);
	const grossSalary = parseInt(selectedOption?.grossSalary);
	const [netSalary, setNetSalary] = useState(0);

	function handleTaxNameChange(e, index) {
		const updatedTaxes = [...taxes];
		updatedTaxes[index].name = e.target.value;
		setTaxes(updatedTaxes);
	}

	function handleTaxPercentageChange(e, index) {
		const updatedTaxes = [...taxes];
		updatedTaxes[index].percent = parseInt(e.target.value);
		setTaxes(updatedTaxes);
	}

	function handleAddTax() {
		const updatedTaxes = [...taxes];
		updatedTaxes.push({ name: "", percent: 0 });
		setTaxes(updatedTaxes);
	}

	function handleDeleteTax(index) {
		const updatedTaxes = [...taxes];
		updatedTaxes.splice(index, 1);
		setTaxes(updatedTaxes);
	}

	const [deductions, setDeductions] = useState([
		{
			name: "",
			amount: 0,
		},
	]);

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
			totalTaxPercentage += tax.percent;
		});

		let totalDeductions = 0;
		deductions.forEach((deduction) => {
			totalDeductions += deduction.amount;
		});

		const netSalary =
			grossSalary - grossSalary * (totalTaxPercentage / 100) - totalDeductions;
		setNetSalary(netSalary);
	}, [taxes, grossSalary, deductions]);

	const postEmployeePay = () => {
		let stId = uuid();
		let data = {
			id: stId,
			employeeId: selectedOption.staffId,
			employeeName: selectedOption.value,
			grossSalary: selectedOption.grossSalary,
			tax: [...taxes],
			deduction: [...deductions],
			netSalary: netSalary,
		};
		if (data) {
			db.collection("employeePaySlipTbl")
				.add(data)
				.then((response) => {
					// fetch after
					fetchEmployeePay();
					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
					setTaxes([
						{
							name: "",
							percent: 0,
						},
					]);
					setDeductions([
						{
							name: "",
							amount: 0,
						},
					]);
					setNetSalary(0);
					setSelectedOption(null);
					closePay();
				})
				.catch(console.error());
		}
	};
	// fetch employee payslip
	const [employeePayData, setEmployeePayData] = useState();
	const fetchEmployeePay = () => {
		db.collection("employeePaySlipTbl")
			.get()
			.then((payslipType) => {
				const newData = payslipType;
				setEmployeePayData(newData);
			});
	};

	useEffect(() => {
		fetchEmployeePay();
	}, []);

	//deleting employee Payslip
	const deleteEmployeePay = (employee) => {
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
				db.collection("employeePaySlipTbl")
					.doc({ id: employee.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchEmployeePay();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
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

	const openEditEmployeePay = (employee) => {
		setEditEmployeePay(true);
		setEmployeeId(employee.id);
		setFormTaxes(employee.tax);
		setFormDeductions(employee.deduction);
		setFormGrossSalary(employee.grossSalary);
		setNetSalaryEdit(employee.netSalary);
		setEmployeeNameEdit(employee.employeeName);
	};

	function handleTaxNameChangeEdit(e, index) {
		const updatedTaxes = [...formTaxes];
		updatedTaxes[index].name = e.target.value;
		setFormTaxes(updatedTaxes);
	}

	function handleTaxPercentageChangeEdit(e, index) {
		const updatedTaxes = [...formTaxes];
		updatedTaxes[index].percent = parseInt(e.target.value);
		setFormTaxes(updatedTaxes);
	}

	function handleAddTaxEdit() {
		const updatedTaxes = [...formTaxes];
		updatedTaxes.push({ name: "", percent: 0 });
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
			totalTaxPercentage += tax.percent;
		});

		let totalDeductions = 0;
		formDeductions?.forEach((deduction) => {
			totalDeductions += deduction.amount;
		});

		const netSalaryEdit =
			formGrossSalary -
			formGrossSalary * (totalTaxPercentage / 100) -
			totalDeductions;
		setNetSalaryEdit(netSalaryEdit);
	}, [formTaxes, formGrossSalary, formDeductions]);

	const updateEmployeePay = () => {
		db.collection("employeePaySlipTbl")
			.doc({ id: employeeId })
			.update({
				tax: [...formTaxes],
				deduction: [...formDeductions],
				netSalary: netSalaryEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchEmployeePay();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditPay();
			});
	};

	return (
		<div className="w-full">
			<div className="h-screen mt-2">
				<div className="flex bg-white p-3 justify-between shadow-lg rounded-md">
					<div className="flex justify-between w-1/2">
						<div onClick={openCreate}>
							<Button2 value={"Create Payslip"} />
						</div>
						<div onClick={openPay}>
							<Button2 value={"Create Employee Payslip"} />
						</div>
					</div>
					<div>
						<p className="text-primary text-xl font-semibold">PayRoll</p>
					</div>
				</div>
				{create ? (
					<div className="absolute w-[400px] h-[30vh] overflow-y-auto bg-white shadow-lg rounded-md">
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
					<div className="absolute w-1/2  bg-white shadow-lg rounded-md">
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
									onChange={setSelectedOption}
									className="mt-1"
									options={staffInfo}
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
											value={taxItem.percent}
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
									Gross Salary - {selectedOption?.grossSalary}
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

				<div className="flex">
					<div className="w-3/12">
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
									<div className="absolute shadow-lg rounded flex w-[400px] p-5 bg-white">
										<div className="w-2/3 pr-5">
											<InputField
												type="text"
												placeholder="Enter Staff Type"
												label="Staff Type"
												name="Staff_type"
												value={typeEdit}
												onChange={(e) => setTypeEdit(e.target.value)}
												icon={<FaPen className="w-3 -ml-7 mt-3" />}
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
					<div className="w-9/12 ml-5">
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
									<div className="absolute w-1/2 h-[75vh]  overflow-y-auto bg-white shadow-lg rounded-md">
										<div className="bg-primary p-3 flex justify-between rounded-md text-white">
											<div>Edit Payslip</div>
											<div>
												<p onClick={closeEditPay} className="cursor-pointer">
													X
												</p>
											</div>
										</div>
										<div className="flex">
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
															value={taxItem.percent}
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
												<div onClick={updateEmployeePay}>
													<Button value={"Update Payslip"} />
												</div>
											</div>
										</div>
									</div>
								) : null}

								{employeePayData?.map((employee) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={employee.id}
										>
											<td className="flex">
												<div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
													{employee.employeeName[0]}
												</div>
												<div>
													<p className="text-sm p-3 -mt-1 text-gray5">
														{employee.employeeName}
													</p>
												</div>
											</td>
											<td className="text-xs p-3 text-gray5">
												{employee.grossSalary}
											</td>
											<td className="text-xs p-3 text-gray5">
												{employee.netSalary}
											</td>
											<td className="text-xs p-3 text-gray5">
												<div className="flex">
													<MdDeleteOutline
														className="text-red w-4 h-4"
														onClick={() => deleteEmployeePay(employee)}
													/>
													<BsPencilSquare
														className="text-warning h-4 w-4 ml-5"
														onClick={() => openEditEmployeePay(employee)}
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
