import * as React from "react";
import { MdLockOutline, MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";


import "../assets/styles/login.css";
import Button from "../components/Button";
import InputField from "../components/InputField";
function Login() {
	return (
		<div className="flex overflow-hidden h-screen w-full bgdiv">
			<div className="w-7/12 flex justify-center items-center">
				<div>
					<img src="login2.png" className="w-[500px]" />
				</div>
			</div>

			<div className="w-5/12 p-2 flex justify-center items-center">
				<div className="bg-white rounded-md shadow-lg p-10 w-[500px]">
					<div className="flex justify-center">
            <FaBriefcase className="text-secondary text-3xl mt-2"/>
						<h1 className="font-bold text-4xl mt-1 text-secondary ml-2">
							School SoftOffice
						</h1>
					</div>
          <p className="text-center text-primary mt-2">Sign in</p>
					<InputField
						type="email"
						placeholder="Enter Your email"
						label="Email"
						name="email"
						icon={<MdAlternateEmail className="w-10 mt-3" />}
					/>
					<InputField
						type="password"
						placeholder="Enter Your password"
						label="Password"
						name="password"
						icon={<MdLockOutline className="w-10 mt-3" />}
					/>
					<div className="flex justify-between my-2">
						<div className="flex">
							<input type="radio" />
							<p className="text-gray5 text-sm">Remember Me</p>
						</div>
						<div>
							<Link to="/email">
								<p className="text-secondary font-semibold text-sm">Forgot Password?</p>
							</Link>
						</div>
					</div>
					<Link to="/dashboard">
						<Button value={"Login"} />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
