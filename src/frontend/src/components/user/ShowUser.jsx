import React, { useState } from "react";
import "../../assets/styles/main.css";
import { BsCamera } from "react-icons/bs";
import Select from 'react-select'

function ShowUser(props) {
	const { userData, closeShowData } = props;

	return (
		<>
			<div className="bg-black/50 flex absolute z-50 top-0 left-0 right-0 h-full w-full">
				<div className="w-3/12" onClick={closeShowData}>

				</div>
				<div className="bg-white w-6/12 my-[5vh] rounded-md">
					<div className="flex justify-between text-white text-xl p-5 bg-primary">
						<div>
							<p className="text-white font-semibold">User Details</p>
						</div>
						<div>
							<p onClick={closeShowData} className="cursor-pointer">
								X
							</p>
						</div>
					</div>
					<div className="-mt-5">
						<div className="bg-primary flex justify-center p-5">
							<div className="">
								<img className="w-40 relative h-40 rounded-full" src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" />

								<div className="bg-secondary absolute ml-[140px] cursor-pointer -mt-20 p-2 bg-secondary rounded-full">
									<BsCamera className="text-xl text-white" />
								</div>
							</div>

						</div>
						<div className="flex">

							<div className="w-1/2 px-2">
								<p className="text-secondary mt-2 font-bold text-2xl">{userData.first_name} {userData.middle_name} {userData.last_name}</p>

								<br />
								<p className="text-gray5">{userData.email}</p>
<br/>
								<p className="">Place of Residence</p>
								<p className="text-gray5">{userData.location}</p>
								<br />
								<p className="">Phone</p>
								<p className="text-gray5">{userData.phone}</p>

							</div>
							<div className="w-1/2 p-2">
								<br/>
								<label>Add roles</label>
								<Select className="mt-2" placeholder="Select Role" options={[
									{label:"Admin", value:"Admin"},
									{label:"Sales", value:"Sales"},
									{label:"Stock", value:"Stock"},
									{label:"Report", value:"Report"},
									]} />
								

							</div>
						</div>
					</div>
				</div>
				<div className="w-3/12" onClick={closeShowData}>

				</div>

			</div>

		</>
	);
}

export default ShowUser;
