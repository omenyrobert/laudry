import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";

const Navbar = () => {
	const navigate = useNavigate();
	const loggedInUser = JSON.parse(localStorage.getItem("schoolSoftUser"));
	const { first_name, last_name, email } = loggedInUser;
	const [log, setLog] = useState(false);
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
		const token = localStorage.getItem('schoolSoftToken');
		if (token === null || token === undefined) {
			navigate('/');
		}
	}, [navigate]);
	return (
		<div className="mt-2 h-12">
			<div className=" flex float-right" onClick={toggleLog}>

				<div className="ml-2 relative cursor-pointer">
					<p className="font-bold float-right">{first_name + " " + last_name}</p>
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
					{first_name[0]?.toUpperCase() + " " + last_name[0]?.toUpperCase()}
				</div>
			</div>

		</div>
	);
};

export default Navbar;
