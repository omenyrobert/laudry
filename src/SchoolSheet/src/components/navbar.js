import * as React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaGift } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";

function Navbar() {
	return (
		<div className="flex my-5">
			<div className="w-7/12">
				
			</div>
			<div className="w-3/12 flex">
				
			</div>
			<div className="w-2/12 flex">
				<div className="p-2 rounded-full bg-primary text-center text-white text-xs">
					O R 
				</div>
				<div className="ml-2">
					<p>Admin</p>
					<p className="text-xs -mt-2">robert@gmail.com</p>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
