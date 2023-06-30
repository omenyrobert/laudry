import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSections } from "../../store/schoolSheetSlices/schoolStore";
import Select from "react-select";
import axiosInstance from "../../axios-instance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from "../Button";
import ButtonLoader from "../ButtonLoader";
import { useFeedback } from "../../hooks/feedback";
import InputField from "../InputField";


function OtherInfo({ staffProfile, staffInfo, staffId, fetchStaffInfo, fetchStaffProfile }) {
	const dispatch = useDispatch();
	const [init] = useState(true);
	const [studentClasses, setStudentClasses] = useState([]);
	const [studentClass, setStudentClass] = useState(null);
	const { toggleFeedback } = useFeedback();
	const [subjects, setSubjects] = useState([]);
	const [subject, setSubject] = useState(null);
	const [documentName, setDocumentName] = useState("");
	const [document, setDocument] = useState(null);

	const fetchSubjects = () => {
		axiosInstance.get("/subjects").then((response) => {
			console.log("response", response);
			const { payload } = response.data;
			const studentSubjectsArr = [];
			for (let i = 0; i < payload.length; i++) {
				studentSubjectsArr.push({
					label: payload[i].subject,
					value: payload[i].subject,
					...payload[i],
				});
			}
			setSubjects(studentSubjectsArr);
		});
	};



	const fetchSchoolClasses = () => {
		axiosInstance.get("/class").then((response) => {
			console.log("response", response);
			const { payload } = response.data;
			const studentClassesArr = [];
			for (let i = 0; i < payload.length; i++) {
				studentClassesArr.push({
					label: payload[i].class,
					value: payload[i].class,
					...payload[i],
				});
			}
			setStudentClasses(studentClassesArr);
		});
	};

	useEffect(() => {
		dispatch(getSections());
		try {
			fetchSchoolClasses();
			fetchSubjects();
		} catch (error) {
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				icon: "error",
				title: "Oops...",
				text: "An Error Occured while trying to fetch data for your Form. Please Refresh Page",
			});
		}
	}, [init, dispatch]);

	const addClass = () => {
		if (!studentClass) {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please fill all fields",
			});
			return;
		}
		const data = {
			classId: studentClass.id,
			staffId: staffId,
		};

		axiosInstance
			.post("/class/add-class-to-staff", data)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Class added successfully",
				});
				fetchStaffInfo();
				setStudentClass("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const removeClass = (id) => {
		axiosInstance
			.post(`/class/remove-class-from-staff`, {
				classId: id,
				staffId: staffId,
			})
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Class removed successfully",
				});
				fetchStaffInfo();
			})
			.catch((err) => {
				console.log(err);
				toggleFeedback("error", {
					title: "Oops...",
					text: "An Error Occured while trying to remove class",
				});
			});
	};

	const removeSubject = (id) => {
		axiosInstance
			.post(`/subjects/remove-subject-from-staff`, {
				subjectId: id,
				staffId: staffId,
			})
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Subject removed successfully",
				});
				fetchStaffInfo();
			})
			.catch((err) => {
				console.log(err);
				toggleFeedback("error", {
					title: "Oops...",
					text: "An Error Occured while trying to remove subject",
				});
			});
	};

	const removeDocument = (id) => {
		axiosInstance
			.delete(`/staff-profile/document/${id}`)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Document removed successfully",
				});
				fetchStaffInfo();
			})
			.catch((err) => {
				console.log(err);
				toggleFeedback("error", {
					title: "Oops...",
					text: "An Error Occured while trying to remove document",
				});
			});
	};

	const addSubject = () => {
		if (!subject) {

			toggleFeedback("error", {
				title: "Oops...",
				text: "Please fill all fields",
			});
			return;
		}
		const data = {
			subjectId: subject.id,
			staffId: staffId,
		};

		axiosInstance
			.post("/subjects/add-subject-to-staff", data)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Subject added successfully",
				});
				fetchStaffInfo();
				setStudentClass("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	function handleFileChange(e) {
		setDocument(e.target.files[0]);
	}

	const addDocument = () => {
		if (!documentName || documentName === "") {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please fill all fields",
			});
			return;
		}
		if (!document) {
			toggleFeedback("error", {
				title: "Oops...",
				text: "Please select a document",
			});
			return;
		}

		const formData = new FormData();
		formData.append("document", document);
		formData.append("name", documentName);
		formData.append("staff", staffId);

		axiosInstance
			.post("/staff-profile/document", formData)
			.then((res) => {
				const { status, payload } = res.data;
				if (status === false) {
					toggleFeedback("error", {
						title: "Oops...",
						text: payload,
					});
					return;
				}
				toggleFeedback("success", {
					title: "Success",
					text: "Document added successfully",
				});
				fetchStaffProfile();
				setStudentClass("");
			})
			.catch((err) => {
				console.log(err);
			});
	};






	return (
		<>
			<div className="flex justify-between">
				<div>
					<p className="text-secondary text-xl font-semibold ml-5">
						0thers Info
					</p>
				</div>
				<div></div>
			</div>
			<div className="flex">
				<div className="w-1/3 p-2">
					<Select
						placeholder={"Select Class"}
						defaultValue={studentClass}
						name="studentClass"
						onChange={setStudentClass}
						options={studentClasses}
					/>
					{/* Add button */}
					<div className="flex justify-end">
						<div onClick={addClass} >
							<Button value={"Add Class"} />

						</div>
					</div>



					<br />

					{
						staffInfo?.classes?.map((item) => (
							<div className="flex border-b border-gray1 p-2">
								<div className="text-gray5 text-sm w-2/3">{item.class}</div>
								<div className="w-1/3">
									<p
										onClick={() => removeClass(item.id)}
										className="text-red text-sm cursor-pointer"
									>
										X
									</p>
								</div>
							</div>
						))
					}
				</div>
				<div className="w-1/3 p-2">
					<label>Subjects</label>
					<br />
					<Select
						placeholder={"Select Subject"}
						defaultValue={subject}
						name="subject"
						onChange={setSubject}
						options={subjects}
					/>
					{/* Add button */}
					<div className="flex justify-end">
						<div onClick={addSubject} >
							<Button value={"Add Subject"} />
						</div>
					</div>
					<br />
					{
						staffInfo?.subjects?.map((item) => (
							<div className="flex border-b border-gray1 p-2">
								<div className="text-gray5 text-sm w-2/3">{item.subject}</div>
								<div className="w-1/3">
									<p
										onClick={() => removeSubject(item.id)}
										className="text-red text-sm cursor-pointer"
									>
										X
									</p>
								</div>
							</div>
						))
					}

				</div>
				<br />
				<div className="w-1/3 p-2">
					<label>Recomendation & Other Documents</label>
					<br />
					<div className="">
						<InputField
							placeholder={"Document Name"}
							value={documentName}
							onChange={(e) => setDocumentName(e.target.value)}
						/>

						<input id="documentInput" type="file" hidden={true} onChange={handleFileChange} />
						<div onClick={(e) => {
							e.preventDefault();
							const input = window.document.getElementById("documentInput");
							input.click();
						}} >
							<Button value={
								document ? document.name : "Select Document"
							} />
						</div>

						<br />
						<div onClick={addDocument} >
							<Button value={"Add Document"} />
						</div>
					</div>
					<br />

					{
						staffProfile?.staffDocument?.map((item) => (
							<div className="flex border-b border-gray1 p-2">
								<div className="text-gray5 text-sm w-2/3">{item.name}</div>
								<div className="w-1/3">
									<p
										onClick={() => removeDocument(item.id)}
										className="text-red text-sm cursor-pointer"
									>
										X
									</p>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	);
}

export default OtherInfo;
