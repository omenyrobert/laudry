import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";
import Swal from "sweetalert2";

const Navbar = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [log, setLog] = useState(false);
	const [active, setActive] = useState("loading");
	const [activity, setActivity] = useState();
	const [expiry, setExpiry] = useState({});
	const [loading, setLoading] = useState(false);
	const toggleLog = () => {
		setLog(!log);
	};
	const handleLogout = async () => {
		try {
			const response = await axiosInstance.get("/auth/logout");
			const { data } = response;
			const { status } = data;
			if (status) {
				localStorage.clear();
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	async function checkActivation() {
		try {
			const response = await axiosInstance.get("/system");
			const { status, payload } = response.data;
			if (status) {
				if (payload === null) {
					setActive(false)
				} else {
					setActive(true)
					setActivity(payload)
					const date = new Date(payload.date).toLocaleDateString()
					const time = new Date(payload.date).toLocaleTimeString()

					setExpiry({
						date: date,
						time: time,
					})


				}
			}
		} catch (error) {
			console.log(error);

		}
	}

	useEffect(() => {
		checkActivation()
	}, []);

	useEffect(() => {
		if (active === false) {
			Swal.fire({
				title: 'Activation key Expired',
				text: 'Please enter a new key',
				input: 'text',
				inputAttributes: {
					autocapitalize: 'off'
				},
				showCancelButton: false,
				confirmButtonText: 'Confirm',
				showLoaderOnConfirm: true,
				allowOutsideClick: false,
				preConfirm: (login) => {
					return axiosInstance.post("/system", { key: login })
						.then((res) => {
							const { status, payload } = res.data
							if (status) {
								setActive(true)
								// ss
								checkActivation()
								return true
							} else {
								Swal.showValidationMessage(
									`Invalid Key`
								)
							}
						})
						.catch(error => {
							Swal.showValidationMessage(
								`Request failed: ${error}`
							)
						})
				},
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "Successfull",
					})
				}
			})
		}
	}, [active])



	useEffect(() => {
		const token = localStorage.getItem("schoolSoftToken");
		const loggedInUser = JSON.parse(localStorage.getItem("schoolSoftUser"));
		if (token === null || token === undefined) {
			return navigate("/");
		} else if (loggedInUser === null || loggedInUser === undefined) {
			return navigate("/");
		} else {
			const { first_name, last_name, email } = loggedInUser;
			setFirstName(first_name);
			setLastName(last_name);
			setEmail(email);
		}
	}, [navigate]);
	return (
		<div className="mt-2 h-12 flex justify-between">
			<div></div>
			<div className="bg-white p-2 rounded-md">

				<p className="text-red text-sm">
					{
						active === "loading" ? (
							<div className="loader2"></div>
						) : active === false ? (
							"Please activate your account"
						) : (
							"The Activation Key Expires on " + expiry.date + " at " + expiry.time
						)
					}
				</p>
			</div>
			<div className="flex" onClick={toggleLog}>
				<div className="ml-2 relative cursor-pointer">
					<p className="font-bold">{firstName + " " + lastName}</p>
					<p className="text-xs -mt-1">{email}</p>
				</div>
				{log ? (
					<div
						className="absolute bg-white shadow-lg border border-gray2 p-3 mt-10 w-52 flex justify-center"
						onClick={handleLogout}
					>
						<span className="font-bold text-md text-primary cursor-pointer">
							Logout
						</span>
					</div>
				) : null}
				<div className="pt-3 h-10 w-10 rounded-full bg-primary cursor-pointer text-center text-white text-xs ml-2">
					{firstName[0]?.toUpperCase() + " " + lastName[0]?.toUpperCase()}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
