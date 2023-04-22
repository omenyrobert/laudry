import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Button from "../Button";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import InputField from "../InputField";
import Button2 from "../Button2";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";

let db = new Localbase("db");

function Sections() {
	const [showUpdate, setShowUpdate] = useState(false);

	const closeShowUpdate = () => {
		setShowUpdate(false);
	};

	const [section, setSection] = useState("");
	const [sectionsData, setSections] = useState([]);

	// edit section
	const [editSection, setEditSection] = useState("");
	const [sectionId, setSectionId] = useState("");
	const openShowUpdate = (section) => {
		setShowUpdate(true);
		setEditSection(section.section);
		setSectionId(section.id);
		console.log("id here", section);
	};

	// update section
	const updateSection = () => {
		db.collection("sections")
			.doc({ id: sectionId })
			.update({
				section: editSection,
			})
			.then((response) => {
				console.log(response);
				fetchSections();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeShowUpdate();
			})
			.catch((error) => {
				console.log(error);
			});

		// fetch after
		// fetchSections();
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
		}).then((result) => {
			if (result.isConfirmed) {
				db.collection("sections")
					.doc({ id: section.id })
					.delete()
					.then((response) => {
						fetchSections();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
					});

				// fetch after
			}
		});
	};

	// posting Sections
	const postSections = () => {
		let secId = uuid();
		let formData = {
			id: secId,
			section: section,
		};
		if (section) {
			db.collection("sections")
				.add(formData)
				.then((response) => {
					console.log(response);
					setSection("");

					// fetch after
					fetchSections();

					// show alert
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const fetchSections = async () => {
		console.log("fetched");
		const sections = await db.collection("sections").get();
		setSections(sections);
	};

	// fetching section
	useEffect(() => {
		fetchSections();
	}, []);

	return (
		<div>
			<div className="bg-white p-3 rounded-md shadow-md mr-5">
				<p className="text-primary font-semibold text-lg">Sections</p>

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
						<div onClick={postSections}>
							<Button2 value={"Add Section"} />
						</div>
					</div>
				</div>

				<div className="mt-5 flex bg-gray1 cursor-pointer">
					<div className="w-2/3 p-2">Sections</div>
					<div className="w-1/3 p-2">Action</div>
				</div>
				{/* edit div statrt */}
				{showUpdate ? (
					<div className="absolute shadow-2xl rounded-md border bg-white  border-gray3  p-2 flex w-[500px]">
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
				{/* edit div end */}
				<div className="h-52 overflow-y-auto">
					{sectionsData &&
						sectionsData.map((section) => (
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
			</div>
		</div>
	);
}
export default Sections;
