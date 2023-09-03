import React, { useState } from "react";
import "../../assets/styles/main.css";
// import { MdDeleteOutline } from "react-icons/md";
// import { BsPencilSquare, BsEye } from "react-icons/bs";

function ShowUser(props) {
	const { showData, closeShowData } = props;
	return (
		<>
			<div className="h-[80vh] overflow-y-auto shadow-2xl border w-[50vw] absolute z-50 bg-white rounded -mt-10">
				<div className="flex justify-between p-5 bg-gray1">
					<div>
						<p className="text-primary font-semibold">User Details</p>
					</div>
					<div>
						<p onClick={closeShowData} className="cursor-pointer">
							X
						</p>
					</div>
				</div>
				<div className="flex p-3">
					<div className="w-1/2 p-2">
						<p className="text-primary font-bold text-xl">Omeny Robert</p>
                        <p className="text-gray5">Doctor</p>
                        <p className="text-gray5">Heart Doctor</p>
                        <br/>
						<p className="text-gray5">29-06-1999</p>
                        <p className="text-gray5">Male</p>
						
						<br />
						<p className="text-gray5">Place of Residence</p>
                        <p className="text-gray5">Namugongo</p>
						<br />
						<p className="text-gray5">Contacts</p>
                        <p className="text-gray5">0778978955</p>
                        <p className="text-gray5">0700978955</p>
						<br />
						<p className="text-gray5">Email</p>
                        <p className="text-gray5">rob@gmail.com</p>
						<br />
					</div>
					<div className="w-1/2 p-2">
                        <p>Next of Kin</p>
                        <br/>
                        <p className="text-primary font-bold ">Kyle Morgan</p>
                        <p className="text-gray5">Father</p>
                        <p className="text-gray5">0778978955</p>
                        <br/>
                        <p className="text-primary font-bold ">Alden Teddy</p>
                        <p className="text-gray5">Mother</p>
                        <p className="text-gray5">0778978955</p>
                    </div>
				</div>
			</div>
		</>
	);
}

export default ShowUser;
