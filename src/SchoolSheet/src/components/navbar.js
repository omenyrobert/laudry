import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const [log, setLog] = useState(false);
	const toggleLog = () => {
		setLog(!log);
	};
	return (
		<div className="flex my-5">
			<div className="w-7/12"></div>
			<div className="w-3/12 flex"></div>
			<div className="w-2/12 flex" onClick={toggleLog}>
				<div className="p-2 rounded-full bg-primary text-center text-white text-xs">
					O R
				</div>
				<div className="ml-2 relative cursor-pointer">
					<p>Admin</p>
					<p className="text-xs -mt-2">robert@gmail.com</p>
				</div>
				{log ? (
					<div className="absolute bg-white shadow-lg border border-gray2 p-3 mt-10 w-52 flex justify-center">
						<Link className="font-bold text-xl text-primary" to="/">
							Logout
						</Link>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Navbar;
