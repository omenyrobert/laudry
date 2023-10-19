import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../InputField";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";
import Select from "react-select"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getStaff } from "../../store/slices/store";

function EditUser(props) {
	const { userData, closeEditData } = props;
	const [posting, setPosting] = useState(false)
	const [firstName, setFirstName] = useState(userData.first_name)
	const [middletName, setMiddleName] = useState(userData.middle_name)
	const [lastName, setLastName] = useState(userData.last_name)
	const [email, setEmail] = useState(userData.email)
	const [phone, setPhone] = useState(userData.phone)
	const [location, setLocation] = useState(userData.location)
	const [roles, setRoles] = useState([])
	const dispatch = useDispatch()

	useEffect(() => {
		if (userData.roles) {
			let rolesArray = userData.roles.map((role) => {
				return { value: role, label: role }
			})
			setRoles(rolesArray)
		}
	}, [userData])



	const updateUser = async () => {
		if (firstName && lastName && email && roles.length > 0) {
			try {
				setPosting(true)
				let formData = {
					staffId: userData.id,
					firstName: firstName,
					middleName: middletName,
					lastName: lastName,
					email: email,
					phone: phone,
					location: location,
					roles: roles.map((role) => role.value)
				}
				let res = await axiosInstance.put("/staff", formData);
				const { status, payload } = res.data;

				if (status) {
					dispatch(getStaff())
					setFirstName("");
					setMiddleName("");
					setLastName("");
					setEmail("");
					setPhone("");
					setLocation("");
					setRoles([]);
					setPosting(false)
					closeEditData();
					Swal.fire({
						title: "Success",
						text: "User Updated Successfully",
						icon: "success",
						timer: 2000,
						showConfirmButton: false,
					});
				} else {
					setPosting(false)
					Swal.fire({
						title: "Error",
						text: payload,
						icon: "error",
						timer: 2000,
						showConfirmButton: false,
					});
				}


			} catch (error) {
				setPosting(false)
			} finally {
				setPosting(false)
			}
		} else {
			Swal.fire({
				title: "Error",
				text: "Please fill all the required fields",
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
	}

	return (
		<div className="flex absolute w-full h-full top-0 right-0 left-0 bg-black/50">
			<div className="w-3/12" onClick={closeEditData}>

			</div>
			<div className="w-6/12 ">
				<div className="bg-white rounded-md mt-[3vh]">
					<div className="flex justify-between p-3 bg-gray1">
						<div>
							<p className="text-primary font-semibold">Edit User</p>
						</div>
						<div>
							<p onClick={closeEditData} className="cursor-pointer">X</p>
						</div>
					</div>
					<div className="flex p-3">
						<div className='w-1/2 p-2'>

							<InputField value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" placeholder="Enter First Name" />
							<InputField value={middletName} onChange={(e) => setMiddleName(e.target.value)} label="Middle Name" placeholder="Enter Middle Name" />
						</div>
						<div className='w-1/2 p-2'>
							<InputField value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" placeholder="Last Name" />
							<InputField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter Email" />
						</div>
						<div className='w-1/2 p-2'>
							<p className='text-sm text-gray5'>Select Roles</p>
							<Select
								options={[
									{ value: 'admin', label: 'admin' },
									{ value: 'stock', label: 'stock' },
									{ value: 'reports', label: 'reports' },
									{ value: 'sales', label: 'sales' },
								]}
								placeholder="Select Role"
								isMulti
								onChange={(e) => setRoles(e)}
								value={roles}
							/>
						</div>

					</div>
					<div className="flex justify-between p-3 bg-gray1">
						<div onClick={closeEditData}>
							<ButtonSecondary value={"Close"} />
						</div>
						<div className="w-26">
							{posting ? <ButtonLoader /> :
								<div onClick={updateUser}>
									<Button value={"Update User"} />
								</div>}

						</div>
					</div>
				</div>
			</div>
			<div className="w-3/12" onClick={closeEditData}>

			</div>
		</div>
	);
}

export default EditUser;
