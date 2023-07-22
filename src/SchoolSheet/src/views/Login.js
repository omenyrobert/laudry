// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { MdLockOutline, MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "../assets/styles/login.css";
import Button from "../components/Button";
import InputField from "../components/InputField";
import axiosInstance from "../axios-instance";
import ButtonLoader from "../components/ButtonLoader";
import { useFeedback } from "../hooks/feedback"

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const [loginError, setLoginError] = useState("");
	const [isLoging, setIsLoging] = useState(false);
	const [token, setToken] = useState("");
	const { toggleFeedback } = useFeedback()
	const [activating, setActivating] = useState(false);

	const expireDate = false;

	const handleLogin = async () => {
		setIsLoging(true);
		const isActive = await checkActivation();
		if (!isActive) {
			setActivate(true);
			return;
		}
		if (expireDate) {
			setActivate(true);
		} else {
			try {
				setIsLoging(true);
				const response = await axiosInstance.post("/auth/login", formData);
				const { data } = response;
				const { status, payload } = data;
				const { token, user } = payload;
				if (status) {
					localStorage.setItem("schoolSoftToken", token);
					localStorage.setItem("schoolSoftUser", JSON.stringify(user));
					setIsLoging(false);
					navigate("/dashboard");
				} else {
					setIsLoging(false);
					setLoginError(payload);
					console.log("error", payload);
				}
			} catch (error) {
				console.log(error);
				setIsLoging(false);
			}
		}
	};

	const [activate, setActivate] = useState(false);


	async function checkActivation() {
		try {
			const response = await axiosInstance.get("/system");
			const { status, payload } = response.data;
			if (status) {
				if (payload === null) {
					return false
				} else {
					const now = new Date().getTime();
					const expiryDate = new Date(payload).getTime();
					if (now > expiryDate) {
						return false
					}
					return true

				}
			} else {
				return false
			}
		} catch (error) {
			return false
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("schoolSoftToken");
		if (token !== null && token !== undefined) {
			navigate("/dashboard");
		}
	}, [navigate]);


	async function validateToken() {
		if (token === "") {
			toggleFeedback("error", {
				title: "Error",
				text: "Please enter a valid token",
			})
			return
		}
		try {
			setActivating(true);
			const response = await axiosInstance.post("/system", {
				key: token,
			});
			const { status, payload } = response.data;
			if (status) {
				setActivate(false);
				toggleFeedback("success", {
					title: "Activation Successful",
					text: "You can now login",
				})
				handleLogin();
			} else {
				setToken("");
				setActivate(true);
				toggleFeedback("error", {
					title: "Activation Failed",
					text: payload,
				})
			}
		} catch (error) {
			console.log(error);
			toggleFeedback("error", {
				title: "An Error Occured",
				text: error.message,
			})
		}


	}
	return (
		<>
			<div className="flex overflow-hidden h-screen w-full bgdiv">
				<div className="w-7/12 flex justify-center items-center">
					<div>
						<img src="login2.png" className="w-[500px]" alt="Logo" />
					</div>
				</div>

				<div className="w-5/12 p-2 flex justify-center items-center">
					<div className="bg-white rounded-md shadow-lg p-10 w-[500px]">
						<div className="flex justify-center">
							<FaBriefcase className="text-secondary text-3xl mt-2" />
							<h1 className="font-bold text-4xl mt-1 text-secondary ml-2">
								School SoftOffice
							</h1>
						</div>
						<p className="text-center text-primary mt-2">Sign in</p>
						<p className="text-red m-2 text-center">{loginError}</p>
						<InputField
							type="email"
							placeholder="Enter Your email"
							label="Email"
							name="email"
							icon={<MdAlternateEmail className="w-10 mt-3" />}
							onChange={onChange}
						/>
						<InputField
							type="password"
							placeholder="Enter Your password"
							label="Password"
							name="password"
							icon={<MdLockOutline className="w-10 mt-3" />}
							onChange={onChange}
						/>
						<div className="flex justify-between my-2">
							<div className="flex">
								<input type="radio" />
								<p className="text-gray5 text-sm">Remember Me</p>
							</div>
							<div>
								<Link to="/email">
									<p className="text-secondary font-semibold text-sm">
										Forgot Password?
									</p>
								</Link>
							</div>
						</div>
						<div>
							{isLoging ? (
								<ButtonLoader />
							) : (
								<div onClick={handleLogin}>
									{" "}
									<Button value={"Login"} />{" "}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{activate ? (
				<div className="bg-gray2 top-0 absolute right-0 left-0 h-screen w-full flex justify-center items-center">
					<div className="p-5 rounded-md bg-white w-[500px]">
						<p className="text-secondary text-xl font-medium">
							Enter Activation Key
						</p>
						<div className="flex">
							<div className="w-[80%]">
								<InputField
									type="text"
									placeholder="Enter Activation Key"
									value={token}
									onChange={(e) => setToken(e.target.value)}
								/>
							</div>
							{
								activating ?  <div className="w-[20%] ml-5 mt-5"> <ButtonLoader /> </div> : <div onClick={validateToken} className="w-[20%] ml-5 mt-5">
									<Button value={"Submit"} />
								</div>
							}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Login;
