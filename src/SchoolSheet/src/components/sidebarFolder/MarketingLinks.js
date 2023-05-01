import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { FcAdvertising } from "react-icons/fc";
import { MdNavigateNext } from "react-icons/md";
import { HiOutlineArrowSmRight } from "react-icons/hi";

function MarketingLinks() {
	const location = useLocation();
	const [link, setLink] = useState(false);
	const toggleLink = () => {
		setLink(!link);
	};

	return (
		<>
			<div
				className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer"
				onClick={toggleLink}
			>
				<div className="w-4/5 flex">
					<FcAdvertising className="w-4 h-4 mt-[2px] linkicon" />
					<p className="text-sm font-light linktext ml-6">Marketing</p>
				</div>
				<div className="w-1/5">
					{link ? (
						<TbChevronDown className="w-5" />
					) : (
						<MdNavigateNext className="w-5" />
					)}
				</div>
			</div>
			{link ? (
				<div className="ml-4">
					<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
						<div className="w-4/5 flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p className="text-sm font-light linktext ml-5">Emails</p>
						</div>
						<div className="w-1/5"></div>
					</div>
					<div className="flex w-[80%] ml-5 mt-1 linkdiv rounded-md p-2 cursor-pointer">
						<div className="flex">
							<HiOutlineArrowSmRight className="w-5 mt-[3px]" />
							<p className="text-sm font-light linktext ml-5">SMS</p>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default MarketingLinks;
