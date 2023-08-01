import React, { useState, useEffect } from "react";
import Button from "../Button";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import InputField from "../InputField";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getSections } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";
import Loader from "../Loader";

const Sections = () => {
	const [showUpdate, setShowUpdate] = useState(false);

	const closeShowUpdate = () => {
		setShowUpdate(false);
	};

	const [section, setSection] = useState("");
	const dispatch = useDispatch();
	const { sections } = useSelector((state) => state.schoolStore);

	// edit section
	const [editSection, setEditSection] = useState("");
	const [sectionId, setSectionId] = useState("");
	const openShowUpdate = (section) => {
		setShowUpdate(true);
		setEditSection(section.section);
		setSectionId(section.id);
		// console.log("id here", section);
	};

	// update section
	const updateSection = async () => {
		try {
			let formData = {
				sectionId: sectionId,
				section: editSection,
			};
			const response = await axiosInstance.put("/sections", formData);
			const { data } = response;
			const { status } = data;
			if (status) {
				dispatch(getSections());
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeShowUpdate();
			}
		} catch (error) {
			console.log(error);
		}
	};

	// delete section

	const deleteSection = (section) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const response = await axiosInstance.delete(
						`/sections/${section.id}`
					);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getSections());
						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const [isposting, setIsPosting] = useState(false);

	// posting Sections
	const postSections = async () => {
		try {
			setIsPosting(true);
			let formData = {
				section: section,
			};
			if (section) {
				const response = await axiosInstance.post("/sections", formData);
				const { data } = response;
				const { status } = data;
				if (status) {
					setSection("");
					dispatch(getSections());
					setIsPosting(false);
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				}
			}
		} catch (error) {
			console.log(error);
			setIsPosting(false);
		}
	};

	// fetching section
	useEffect(() => {
		dispatch(getSections());
	}, [dispatch]);

	return (
		<div>
			<div className="bg-white p-3 rounded-md shadow-md mr-5">
				<p className="text-secondary font-semibold text-lg">Sections</p>

				<div className="flex w-full">
					<div className="w-1/2">
						<InputField
							type="text"
							placeholder="Enter  Section"
							onChange={(e) => setSection(e.target.value)}
							value={section}
						/>
					</div>
					<div className="mt-5 ml-5">
						{isposting ? (
							<ButtonLoader />
						) : (
							<div onClick={postSections}>
								<Button value={"Add Section"} />
							</div>
						)}
					</div>
				</div>

				<div className="mt-5 flex relative bg-gray1 cursor-pointer">
					{showUpdate ? (
						<div className="absolute shadow-2xl md:w-[460px] rounded-md border bg-white  border-gray3  p-2 flex w-[500px]">
							<div className="w-3/5">
								<InputField
									type="text"
									label="Section"
									value={editSection}
									onChange={(e) => setEditSection(e.target.value)}
								/>
							</div>
							<div className="w-[100px] ml-10 mt-14">
								<div onClick={updateSection}>
									<ButtonSecondary value={"Update"} />
								</div>
							</div>
							<div className="w-[30px] ml-10 mt-14">
								<p onClick={closeShowUpdate} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
					) : (
						""
					)}
					<div className="w-2/3 p-2">Sections</div>
					<div className="w-1/3 p-2">Action</div>
				</div>
				{/* edit div statrt */}

				{/* edit div end */}
				{sections.length === 0 ? (
					<Loader />
				) : (
					<div className="h-52 overflow-y-auto">
						{sections &&
							sections.map((section) => (
								<div
									key={section.id}
									className="flex border-b border-gray2 text-xs hover:border-b-2 cursor-pointer"
								>
									<div className="w-2/3 p-2">{section.section}</div>
									<div className="w-1/3 p-2 flex">
										<MdDeleteOutline
											onClick={() => deleteSection(section)}
											className="text-red w-4 h-4"
										/>

										<BsPencilSquare
											onClick={() => openShowUpdate(section)}
											className="text-warning h-4 w-4 ml-5"
										/>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};
export default Sections;
