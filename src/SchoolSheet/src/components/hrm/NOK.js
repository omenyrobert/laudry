import React, { useState } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { Bs3SquareFill,BsFillPencilFill } from "react-icons/bs";
import Button from "../Button";

function NOK() {
	const [nok, setNok] = useState(false);

	const openNok = () => {
		setNok(true);
	};

	const closeNok = () => {
		setNok(false);
	};

	const [nokType, setNokType] = useState("");
	const [nokname, setNokName] = useState("");
	const [nokContact, setNokContact] = useState("");

	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						Next Of Kin Info
					</p>
				</div>
				<div
					onClick={openNok}
					className="text-sm  flex text-primary cursor-pointer relative p-2 border border-primary rounded h-10 mt-5"
				>
					<BsFillPencilFill className="mr-2 mt-1" /> Next Of Kin
					
				</div>
                {nok ? (
						<div className="border absolute z-50 -mt-[250px] border-gray3 bg-white shadow h-[300px] rounded w-[700px] overflow-y-auto">
							<div className="flex justify-between p-3 bg-gray1 text-primary font-semibold">
								<div>
									<p>Add Next Of Kin</p>
								</div>
								<div>
									<p className="cursor-pointer" onClick={closeNok}>
										X
									</p>
								</div>
							</div>
							<div className="flex">
								<div className="w-1/2 p-3">
									<InputField
										type="text"
										placeholder="ext Of Kin Type"
										label="Next Of Kin Type"
										onChange={(e) => setNokType(e.target.value)}
										value={nokType}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
									<InputField
										type="text"
										placeholder="ext Of Kin Type"
										label="Next Of Kin Type"
										onChange={(e) => setNokName(e.target.value)}
										value={nokname}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="w-1/2 p-3 -mt-5">
									<InputField
										type="text"
										placeholder="Enter Contacts"
										label="Contacts"
										name="Contacts"
										onChange={(e) => setNokContact(e.target.value)}
										value={nokContact}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>

									<div className="mt-14">
										<Button value={"Add Nok"} />
									</div>
								</div>
							</div>
						</div>
					) : null}
			</div>
			<div className="flex border-b border-gray1 mt-5">
				<div className="p-2 w-1/3 text-sm text-gray5 truncate">Father</div>
                <div className="p-2 w-1/3 text-sm text-gray5 truncate">Omeny Robert</div>
                <div className="p-2 w-1/3 text-sm text-gray5 truncate">07898898</div>
			</div>
            <div className="flex border-b border-gray1">
				<div className="p-2 w-1/3 text-sm text-gray5 truncate">Father</div>
                <div className="p-2 w-1/3 text-sm text-gray5 truncate">Omeny Robert</div>
                <div className="p-2 w-1/3 text-sm text-gray5 truncate">07898898</div>
			</div>
          
            
		</>
	);
}

export default NOK;
