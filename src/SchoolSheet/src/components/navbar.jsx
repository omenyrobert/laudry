import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../store/schoolSheetSlices/schoolStore"

const Navbar = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [log, setLog] = useState(false);
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.schoolStore);
	const [expiryDate, setExpiryDate] = useState(null);
	const [days, setDays] = useState(null);
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


	useEffect(() => {
		dispatch(getToken())
	}, [dispatch])


	useEffect(() => {
		if (token) {
			const date = new Date(token).toLocaleDateString()
			// const time = new Date(token).toLocaleTimeString()

			const days = Math.floor((new Date(token) - new Date()) / (1000 * 60 * 60 * 24));
			setExpiryDate(date)
			setDays(days);



		}
	}, [token])





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
			{days < 15 ? <div className="bg-white py-2 px-5 rounded-md flex">

				<p className="text-red text-sm mt-1">
					{
						"The Activation Key Expires on " + expiryDate
					}
				</p>
				<p className="p-1 rounded text-sm ml-2 bg-primary3 text-primary">
					{days} Days Left
				</p>
			</div> : null}

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
