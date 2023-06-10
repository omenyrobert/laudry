import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Button from "../Button";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Localbase from "localbase";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { BsCameraFill, BsFillPencilFill } from "react-icons/bs";
import BasicInfo from "./BasicInfo";
import Experience from "./Experience";
import Qualifications from "./Qualifications";
import NOK from "./NOK";
import OtherInfo from "./OtherInfo";
import SalaryInfo from "./SalaryInfo";
import axiosInstance from "../../axios-instance"
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

let db = new Localbase("db");

function StaffEditForm(props) {
	const location = useLocation();
	const [salaryInfo, setSalaryInfo] = useState([])
	const searchParams = new URLSearchParams(location.search);
	const staffId = searchParams.get("staffId");
	const { closeEditData } = props;

	const staffInfoEdit = {
		classes: [
			{
				id: 1,
				sclass: "Primary 1",
			},
			{
				id: 2,
				sclass: "Primary 2",
			},
			{
				id: 3,
				sclass: "Primary 3",
			},
		],
		subjects: [
			{
				id: 1,
				subjectName: "Math",
			},
			{
				id: 2,
				sclass: "SST",
			},
			{
				id: 3,
				sclass: "Nursery",
			},
		],
	};

	const [staffInfo, setStaffInfo] = useState({})

	const fetchStaffInfo = async () => {
		try {
			const response = await axiosInstance.get(`/staff/${staffId}`);
			const { status, payload } = response.data;
			if (status === false) {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: payload,
				});
			} else {
				setStaffInfo(payload);
				setSalaryInfo(payload.salaryInfo)
				console.log(payload)
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchStaffInfo();
	}, []);

	// fetch stypes

	return (
		<>
			<div className="bg-white h-[90vh] overflow-y-auto  ">
				<div className="p-3 bg-gray1 flex justify-between">
					<div>
						<p className="text-primary text-lg font-semibold">
							Staff Member Info
						</p>
					</div>
					<div>
						<Link
							to="/staff"
							className="font-semibold text-primary cursor-pointer"
						>
							Back
						</Link>
					</div>
				</div>
				<div className="flex p-3">
					<div className="w-5/12 py-3 pl-3 pr-10">
						<div className="flex justify-center">
							<div className="w-1/2 flex">
								<div>
									<img
										src="avata.jpeg"
										className="w-full object-cover rounded-full  border border-gray1 shadow"
									/>
								</div>
								<div className="relative">
									<div className="bg-primary w-8 rounded-full h-8  absolute -ml-10 mt-10">
										<BsCameraFill className="w-4 m-2 text-center text-white h-4" />
									</div>
								</div>
							</div>
						</div>

						<BasicInfo staffInfo={staffInfo} staffId={staffId} fetchStaffInfo={fetchStaffInfo} />

						<br />
					</div>

					<div className="w-7/12 p-2">
						<Experience />
						<hr className="text-gray2 my-10" />
						<Qualifications />
						<hr className="text-gray2 my-10" />
						<SalaryInfo salaryInfo={salaryInfo} staffId={staffId} fetchStaffInfo={fetchStaffInfo} />
					</div>
				</div>
				<hr className="text-gray2" />

				<div className="flex p-3">
					<div className="w-3/12 py-2 pl-2 pr-5">
						<NOK />
					</div>
					<div className="w-9/12 p-2">
						<OtherInfo />
					</div>
				</div>
			</div>
		</>
	);
}

export default StaffEditForm;
