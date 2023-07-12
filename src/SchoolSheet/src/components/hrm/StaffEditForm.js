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
import axiosInstance, { UPLOADS_URL } from "../../axios-instance";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback";
import Loader from "../Loader";

let db = new Localbase("db");

const roles = [
	{
		label: "Admin",
		value: "admin",
	},
	{
		label: "Fees",
		value: "fees",
	},
	{
		label: "Assessment",
		value: "assessment",
	},
	{
		label: "Hrm",
		value: "hrm",
	},
	{
		label: "Finance",
		value: "finance",
	},
];

function StaffEditForm(props) {
	const location = useLocation();
	const [salaryInfo, setSalaryInfo] = useState([]);
	const searchParams = new URLSearchParams(location.search);
	const staffId = searchParams.get("staffId");
	const { closeEditData } = props;
	const { setLoading, toggleFeedback } = useFeedback();

	const [staffInfo, setStaffInfo] = useState({});
	const [staffProfile, setStaffProfile] = useState({});

	const [staffRoles, setStaffRoles] = useState(null);
	const [matchingRoles, setMatchingRoles] = useState(null);

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
				setSalaryInfo(payload.salaryInfo);
				if (payload.roles && payload.roles.length > 0) {
					setStaffRoles(payload.roles);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchStaffProfile = async () => {
		try {
			const response = await axiosInstance.post(`/staff-profile/get-profile`, {
				staff: staffId,
			});
			const { status, payload } = response.data;
			if (status === false) {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: payload,
				});
			} else {
				setStaffProfile(payload);
				console.log(payload);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchStaffInfo();
				await fetchStaffProfile();
				setLoading(false);
			} catch (error) {
				toggleFeedback("error", {
					title: "Oops...",
					text: "Something went wrong",
				});
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	// fetch stypes

	const [photo, setPhoto] = useState(staffInfo?.profile_picture);

	const [postingPhoto, setPostingPhoto] = useState(false);

	const handlePhotoChange = async (e) => {
		try {
			setPostingPhoto(true);
			// console.log("posting", postingPhoto);
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("profile_picture", file);
			let res = await axiosInstance.post(
				`/staff/profile-picture/${staffId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (res.status) {
				fetchStaffInfo();
				setPostingPhoto(false);
			} else {
				setPostingPhoto(false);
			}
		} catch (error) {}

		// 	.then((res) => {

		// 		console.log(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// setPostingPhoto(false);
		// console.log("posting2", postingPhoto);
	};

	const [posting, setPosting] = useState(false);

	const addRole = async (role) => {
		setPosting(true);
		let formData = {
			staffId,
			firstName: staffInfo.first_name,
			lastName: staffInfo.last_name,
			email: staffInfo.email,
			roles: role.value,
			isRemove: false,
		};
		try {
			const response = await axiosInstance.put(`/staff`, formData);
			const { status, payload } = response.data;
			if (status === false) {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: payload,
				});
			} else {
				fetchStaffProfile();
				updateMatchingRoles(role, false);
			}
		} catch (error) {
			console.log(error);
		}
		setPosting(false);
	};

	useEffect(() => {
		if (staffRoles) {
			const matchingRoles = roles.filter((role) =>
				staffRoles.includes(role.value)
			);
			setMatchingRoles(matchingRoles);
		}
	}, [staffRoles, staffInfo]);

	const removeRole = async (role) => {
		setPosting(true);
		let formData = {
			staffId,
			firstName: staffInfo.first_name,
			lastName: staffInfo.last_name,
			email: staffInfo.email,
			roles: role.value,
			isRemove: true,
		};
		try {
			const response = await axiosInstance.put(`/staff`, formData);
			const { status, payload } = response.data;
			if (status === false) {
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: payload,
				});
			} else {
				fetchStaffProfile();
				updateMatchingRoles(role, true);
			}
		} catch (error) {
			console.log(error);
		}
		setPosting(false);
	};

	const updateMatchingRoles = (role, isRemove) => {
		if (isRemove) {
			const updatedRoles = (matchingRoles || []).filter(
				(r) => r.value !== role.value
			);
			setMatchingRoles(updatedRoles);
		} else {
			const updatedRoles = [...(matchingRoles || []), role];
			setMatchingRoles(updatedRoles);
		}
	};

	return (
		<>
			<div className="bg-white h-[90vh] overflow-y-auto  ">
				<div className="p-3 bg-gray1 flex justify-between">
					<div>
						<p className="text-primary text-lg  font-semibold">
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
						<div className="flex justify-center h-64 bg-primary rounded-md">
							{postingPhoto ? (
								<div className="mt-24">
								<Loader />
								</div>
							) : (
								<div className="flex">
									<div>
										<img
											src={
												staffInfo?.profile_picture
													? UPLOADS_URL + staffInfo?.profile_picture
													: "avata.jpeg"
											}
											className="w-60 h-60 object-cover rounded-full  border-4 my-2 border-white"
											alt={staffInfo?.firstName}
										/>
										<input
											onChange={handlePhotoChange}
											id="ppImage"
											type="file"
											hidden
											accept="image/*"
										/>
									</div>
									<div className="relative">
										<div
											onClick={(e) => {
												const imgInput = document.getElementById("ppImage");
												imgInput.click();
											}}
											className="bg-white w-8 rounded-full h-8 border-2 border-primary  absolute -ml-10 mt-10"
										>
											<BsCameraFill className="w-4 ml-1.5 mt-1 text-primary h-4" />
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="bg-gray1 p-2 rounded-md">
							<div className="w-40">
								{posting ? (
									<Loader />
								) : (
									<Select
										placeholder={"Select roles"}
										// defaultValue={studentType}
										name="studentType"
										onChange={addRole}
										options={roles}
									/>
								)}
							</div>
							<div className="flex overflow-x-auto gap-2 mt-1">
								{matchingRoles &&
									matchingRoles.map((role, id) => {
										return (
											<div key={id} className="bg-white p-1 rounded-md">
												{role.label}{" "}
												<span
													className="cursor-pointer ml-2 text-red"
													onClick={() => removeRole(role)}
												>
													X
												</span>
											</div>
										);
									})}
							</div>
						</div>

						<BasicInfo
							staffInfo={staffInfo}
							staffProfile={staffProfile}
							staffId={staffId}
							fetchStaffInfo={fetchStaffInfo}
						/>

						<br />
					</div>

					<div className="w-7/12 p-2">
						<Experience
							staffInfo={staffInfo}
							staffProfile={staffProfile}
							staffId={staffId}
							fetchStaffInfo={fetchStaffProfile}
						/>
						<hr className="text-gray2 my-10" />
						<Qualifications
							staffInfo={staffInfo}
							staffProfile={staffProfile}
							staffId={staffId}
							fetchStaffInfo={fetchStaffProfile}
						/>
						<hr className="text-gray2 my-10" />
						<SalaryInfo
							salaryInfo={salaryInfo}
							staffProfile={staffProfile}
							staffId={staffId}
							fetchStaffInfo={fetchStaffInfo}
						/>
					</div>
				</div>
				<hr className="text-gray2" />

				<div className="flex p-3">
					<div className="w-4/12 py-2 pl-2 pr-5">
						<NOK
							staffProfile={staffProfile}
							staffInfo={staffInfo}
							staffId={staffId}
							fetchStaffInfo={fetchStaffProfile}
						/>
					</div>
					<div className="w-8/12 p-2">
						<OtherInfo
							staffProfile={staffProfile}
							staffInfo={staffInfo}
							staffId={staffId}
							fetchStaffInfo={fetchStaffInfo}
							fetchStaffProfile={fetchStaffProfile}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default StaffEditForm;
