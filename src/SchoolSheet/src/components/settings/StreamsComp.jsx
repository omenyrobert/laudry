import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import { getStreams } from "../../store/schoolSheetSlices/schoolStore";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";
import Loader from "../Loader";

const StreamsComp = () => {
	const dispatch = useDispatch();
	const [editData, setEditData] = useState(false);
	const [streamEdit, setstreamEdit] = useState("");
	const [streamId, setstreamId] = useState("");

	// posting Streams
	const [isposting, setIsPosting] = useState(false);
	const [stream, setStream] = useState("");
	const postStream = async () => {
		try {
			setIsPosting(true);
			let formData = {
				stream: stream,
			};
			const response = await axiosInstance.post("/streams", formData);
			const { data } = response;
			const { status } = data;
			if (status) {
				dispatch(getStreams());
				setStream("");
				const MySwal = withReactContent(Swal);
				setIsPosting(false);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch (error) {
			console.log(error);
			setIsPosting(false);
		}
	};

	// fetching stream
	useEffect(() => {
		dispatch(getStreams());
	}, [dispatch]);

	//deleting stream
	const deleteStream = (stream) => {
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
					const response = await axiosInstance.delete(`/streams/${stream.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getStreams());
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

	// updating streams
	const updateStream = async () => {
		try {
			let formData = {
				streamId: streamId,
				stream: streamEdit,
			};
			const stream = await axiosInstance.put("/streams", formData);
			const { data } = stream;
			const { status } = data;
			if (status) {
				dispatch(getStreams());
				setstreamEdit("");
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

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (stream) => {
		setEditData(true);
		setstreamEdit(stream?.stream);
		setstreamId(stream.id);
	};

	const { streams } = useSelector((state) => state.schoolStore);
	return (
		<>
			<h5 className="text-xl font-medium text-secondary">Streams</h5>
			<div className="w-full">
				<div className="flex justify-between bg-white pl-4 shadow-lg">
					<div className="w-[65%]">
						<InputField
							type="text"
							placeholder="Enter Stream name"
							label="Stream Name"
							value={stream}
							onChange={(e) => setStream(e.target.value)}
						/>
					</div>
					<div className="mt-8 mr-5">
						<br />
						{isposting ? (
							<ButtonLoader />
						) : (
							<div onClick={postStream}>
								<Button value={"Add  Stream"} />
							</div>
						)}
					</div>
				</div>
				<div className="h-[70vh] overflow-y-auto">
					<table className="mt-10 w-full table-auto">
						<thead style={{ backgroundColor: "#0d6dfd10" }}>
							<th className="p-2 text-primary text-sm text-left">Stream</th>
							<th className="p-2 text-primary text-sm text-left">Action</th>
						</thead>
						<tbody>
							{/* edit popup start */}
							{editData ? (
								<div className="absolute shadow-lg rounded flex w-auto p-5 bg-white">
									<div className="w-2/3 pr-5">
										<InputField
											type="text"
											placeholder="Enter Stream Name"
											label="Stream Name"
											onChange={(e) => setstreamEdit(e.target.value)}
											value={streamEdit}
										/>
									</div>
									<div className="flex justify-between w-1/3 mt-[55px]">
										<div onClick={updateStream}>
											<ButtonSecondary value={"Update"} />
										</div>
										<div className="ml-5">
											<p
												className="text-black text-lg cursor-pointer"
												onClick={closeEditData}
											>
												X
											</p>
										</div>
									</div>
								</div>
							) : null}
							{/* edit popup end */}

							{streams.map((stream) => {
								return (
									<tr
										className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
										key={stream.id}
									>
										<td className="text-xs p-3 text-gray5">{stream.stream}</td>
										<td className="text-xs p-3 text-gray5">
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteStream(stream)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													onClick={() => openEditData(stream)}
													className="text-warning h-4 w-4 ml-5"
												/>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				{streams.length === 0 ? <Loader /> : null}
			</div>
		</>
	);
};
export default StreamsComp;
