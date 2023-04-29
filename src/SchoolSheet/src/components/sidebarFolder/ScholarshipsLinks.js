import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";

function ScholarshipsLinks() {
	const location = useLocation();
	const [link, setLink] = useState(false);
	const toggleLink = () => {
		setLink(!link);
	};

	return (
		<>
			<Link
				to="/scholarShip"
				className={
					location.pathname === "/scholarShip"
						? "flex w-[80%] ml-5 mt-7  bg-primary rounded-md p-2 cursor-pointer"
						: "flex w-[80%] ml-5 mt-7 linkdiv rounded-md p-2 cursor-pointer"
				}
			>
				<div className="w-4/5 flex">
					<FaBookReader
						className={
							location.pathname === "/scholarShip"
								? "w-4 h-4 mt-[2px] text-white"
								: "w-4 h-4 mt-[2px] linkicon"
						}
					/>
					<p
						className={
							location.pathname === "/scholarShip"
								? "text-sm font-light text-white ml-6 "
								: "text-sm font-light linktext ml-6 "
						}
					>
						Scholarships
					</p>
				</div>
				<div className="w-1/5"></div>
			</Link>
		</>
	);
}

export default ScholarshipsLinks;
