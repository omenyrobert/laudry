import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { BsCameraFill } from "react-icons/bs";
import Button2 from "../Button2";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axiosInstance, { UPLOADS_URL } from "../../axios-instance"
// import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback"

const ShowStudentsForm = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const studentId = searchParams.get("student");
	const { toggleFeedback, setLoading } = useFeedback()
	const fileInput = useRef(null);

	const [student, setStudent] = useState({})

	const fetchUserData = () => {
		setLoading(true)
		axiosInstance.get(`/students/${studentId}`)
			.then((response) => {
				const { status, payload } = response.data;
				console.log('student', payload)

				if (status === false) {
					setLoading(false)
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					})
					return;
				}

				setLoading(false)

				setStudent(payload)

			})
	}

	useEffect(() => {
		fetchUserData()
	}, [studentId])

	const onPhotoChange = (e) => {

		if (e.target.files.length === 0) {
			toggleFeedback("error", {
				title: "Oops...",
				text: "No file selected",
			})
			return;
		}

		const formData = new FormData();
		formData.append("photo", e.target.files[0]);
		axiosInstance.put(`/students/photo/${studentId}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((response) => {
			const { status, payload } = response.data;
			if (status === false) {
				toggleFeedback("error", {
					title: "Oops...",
					text: payload,
				})
				return;
			}
			fetchUserData()
			toggleFeedback("success", {
				title: "Success",
				text: "Successfully uploaded photo",
			})

		}).catch((error) => {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Something went wrong",
			})
		})
	}

	return (
		<div className=" bg-white h-full">
			<div className="flex bg-gray1 p-3 justify-between">
				<div>
					<p className="text-primary font-semibold text-md">Students Info</p>
				</div>
				<div>
					<Link to="/students">Back</Link>
				</div>
			</div>
			<div className="flex">
				<div className="w-1/2 p-5">
					<input ref={fileInput} id="imageUpload" type="file" hidden={true} onChange={onPhotoChange} />
					<div className="flex justify-between">
						<div className="w-[250px] relative ">
							<span
								onClick={() => {
									fileInput.current.click();
								}}
								className="text-white bg-secondary p-2 ml-[80%] mt-10 cursor-pointer  absolute rounded-full">
								<BsCameraFill className="text-2xl" />
							</span>
							<img
								src={student?.photo ? UPLOADS_URL + student?.photo : "avata.jpeg"}
								className="w-full object-cover  rounded-full  border border-gray1 shadow"
								alt="profp"
							/>

						</div>
						<div className="mr-5">
							<p className="text-2xl font-semibold">
								{student?.firstName} {student?.middleName}{" "}
								{student?.lastName}
							</p>
							<p className="font-light">
								{student?.dateOfBirth} -{" "}
								{Math.abs(
									new Date().getFullYear() -
									new Date(student?.dateOfBirth).getFullYear()
								)}
								yrs
							</p>
							<p className="font-light mt-5">
								{student.classes?.map((c, i) => {
									return i === student.classes.length - 1 ? <span>{c.class}</span> : null
								})} - {student.streams?.map((s, i) => {
									return i === student.streams.length - 1 ? <span>{s.stream}</span> : null
								})}
							</p>
							<p className="text-sm font-light">{student?.gender?.value}</p>
							<p className="text-sm font-light">{student?.residence}</p>
						</div>
					</div>

					<br />
					<p>Phone Number</p>
					<p className="text-gray5">{student?.phoneNumber}</p>
					<hr className="text-gray3 mt-2" />
					<br />
					<p className="">Email</p>
					<p className="text-gray5">{student?.email}</p>
					<hr className="text-gray3 mt-2" />

					<br />
					<p>Next Of Kin</p>
					<p className="text-gray5">{student?.fatherName}</p>
					<p className="text-gray5">Father</p>
					<p className="text-gray5">{student?.fatherContact}</p>
					<hr className="text-gray3 mt-2" />

					<br />
					<p>Next Of Kin</p>
					<p className="text-gray5">{student?.motherName}</p>
					<p className="text-gray5">Mother</p>
					<p className="text-gray5">{student?.motherContact}</p>
					<hr className="text-gray3 mt-2" />

					<br />
					<div className="flex justify-between">
						<div>
							<p className="text-secondary font-bold text-2xl">Documents</p>
						</div>
						<Button2 value={"Doc"} />

					</div>

				</div>
				<div className="w-1/2 p-5 h-[85vh] overflow-y-auto">
					<div className="flex">
						<div>
							<p className="text-primary text-2xl">Years At School</p>
						</div>
						<div>
							<p className="bg-primary3 text-primary p-2 text-center rounded-full w-10 ml-5">
								08
							</p>
						</div>
					</div>


					{
						student?.terms?.map((term, i) => {
							return (
								<div className="bg-gray1 rounded-md p-2 flex mt-5">
									<div className="w-1/2">
										<p className="text-primary text-sm mt-10">
											Term {term.term} from {term.from} to {term.to}
										</p>
									</div>
									<div className="w-1/2 ml-2">
										<div className="flex text-xs">
											<div className="p-2 bg-white border border-gray2 w-1/3">
												Math
											</div>
											<div className="p-2 bg-white border border-gray2 w-1/3">81</div>
											<div className="p-2 bg-white border border-gray2 w-1/3">D1</div>
										</div>
										<div className="flex text-xs">
											<div className="p-2 bg-white border border-gray2 w-1/3">
												Math
											</div>
											<div className="p-2 bg-white border border-gray2 w-1/3">81</div>
											<div className="p-2 bg-white border border-gray2 w-1/3">D1</div>
										</div>
										<div className="flex text-xs">
											<div className="p-2 bg-white border border-gray2 w-1/3">
												Math
											</div>
											<div className="p-2 bg-white border border-gray2 w-1/3">81</div>
											<div className="p-2 bg-white border border-gray2 w-1/3">D1</div>
										</div>
									</div>
								</div>

							)
						})
					}
				</div>
			</div>
		</div>
	);
}

export default ShowStudentsForm;
