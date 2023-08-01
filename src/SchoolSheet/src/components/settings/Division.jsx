import React, { useEffect, useState } from "react";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getDivisions } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";

function Division() {
	const dispatch = useDispatch();
	const [editData, setEditData] = useState(false);
	const [editDivision, setEditDivision] = useState("");
	const [editPoints, setEditPoints] = useState("");
	const [divisionId, setDivisionId] = useState("");

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (div) => {
		setEditData(true);
		setEditDivision(div?.division);
		setEditPoints(div.points);
		setDivisionId(div.id);
	};

	// posting division
	const [isPosting, setIsPosting] = useState(false);
	const [division, setDivision] = useState("");
	const [points, setPoints] = useState(0);
	const [upperLimit, setUpperLimit] = useState(0);
	const [lowerLimit, setLowerLimit] = useState(0);

	const postDivision = async () => {
		try {
			setIsPosting(true);
			let formData = {
				division,
				points: 1,
				upperLimit: parseFloat(upperLimit),
				lowerLimit: parseFloat(lowerLimit),
			};

			const response = await axiosInstance.post("/divisions", formData);
			const { data } = response;
			const { status, payload } = data;

			if (status) {
				dispatch(getDivisions());
				setDivision("");
				setPoints("");
				setUpperLimit("");
				setLowerLimit("");
				setIsPosting(false);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			} else {
				setIsPosting(false);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "error",
					showConfirmButton: false,
					timer: 500,
					title: payload,
				});
			}
		} catch (error) {
			console.log(error);
			setIsPosting(false);
		}
	};

	// fetching divisions
	useEffect(() => {
		dispatch(getDivisions());
	}, [dispatch]);

	//deleting Division
	const deleteDivision = (div) => {
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
					const response = await axiosInstance.delete(`/divisions/${div.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getDivisions());
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

	// updating division
	const updateDivision = async () => {
		try {
			let formData = {
				id: divisionId,
				division: editDivision,
				points: parseFloat(editPoints),
			};
			const subject = await axiosInstance.put("/divisions", formData);
			const { data } = subject;
			const { status } = data;
			if (status) {
				dispatch(getDivisions());
				setEditDivision("");
				setEditPoints("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { divisions } = useSelector((state) => state.schoolStore);

	console.log("divisions", divisions);

	return (
		<div className=" bg-white pl-5 shadow-lg rounded-md h-auto p-3">
			<h5 className="text-xl font-medium ml-5 text-secondary">Divisions</h5>
			<div className="w-full">
				<div className="flex justify-between ">
					<div className="w-2/5 p-2">
						<InputField
							type="text"
							placeholder="Enter Division"
							label="Division"
							value={division}
							onChange={(e) => setDivision(e.target.value)}
						/>
					</div>
					<div className="w-2/5 p-2">
						<InputField
							type="text"
							placeholder="Enter Minimum Points"
							label="from"
							value={lowerLimit}
							onChange={(e) => setLowerLimit(e.target.value)}
						/>

					</div>
					<div className="w-2/5 p-2">
						<InputField
							type="text"
							placeholder="Enter Maximum Points"
							label="To"
							value={upperLimit}
							onChange={(e) => setUpperLimit(e.target.value)}
						/>
					</div>

					<div className="mt-8 mr-5 w-1/3 p-2">
						<br />
						{isPosting ? (
							<ButtonLoader />
						) : (
							<div onClick={postDivision}>
								<Button value={"Add"} />
							</div>
						)}
					</div>
				</div>
				<div className="h-[25vh] overflow-y-auto">
					<table className=" w-[98%] table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Division</th>
							<th className="p-2 text-primary text-sm text-left">from</th>
							<th className="p-2 text-primary text-sm text-left">to</th>
							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{/* edit popup start */}
							{editData ? (
								<div className="absolute shadow-2xl rounded flex w-[40vw] p-5 bg-white">
									<div className="w-2/5 pr-2">
										<InputField
											type="text"
											placeholder="Enter Division"
											label="Division"
											onChange={(e) => setEditDivision(e.target.value)}
											value={editDivision}
										/>
									</div>
									<div className="w-2/5 pr-2">
										<InputField
											type="text"
											placeholder="Enter Points"
											label="Points"
											onChange={(e) => setEditPoints(e.target.value)}
											value={editPoints}
										/>
									</div>
									<div className="flex justify-between w-1/5 mt-[55px]">
										<div onClick={updateDivision}>
											<ButtonSecondary value={"Update"} />
										</div>
										<div>
											<p
												className="text-black text-lg ml-5 cursor-pointer"
												onClick={closeEditData}
											>
												X
											</p>
										</div>
									</div>
								</div>
							) : null}
							{/* edit popup end */}

							{divisions.map((div) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={div.id}
									>
										<td className="text-xs p-3 text-gray5">{div.division}</td>
										<td className="text-xs p-3 text-gray5">{div.lowerLimit}</td>
										<td className="text-xs p-3 text-gray5">{div.upperLimit}</td>
										<td className="text-xs p-3 text-gray5 flex">
											<MdDeleteOutline
												onClick={() => deleteDivision(div)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												className="text-warning h-4 w-4 ml-5"
												onClick={() => openEditData(div)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
export default Division;
