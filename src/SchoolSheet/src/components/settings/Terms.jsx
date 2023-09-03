import React, { useState, useEffect } from "react";
import Button from "../Button";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import InputField from "../InputField";

import ButtonSecondary from "../ButtonSecondary";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getTerms } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";
import Loader from "../Loader";
import Loader2 from "../Loader2";

const Terms = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showUpdate, setShowUpdate] = useState(false);

	const closeShowUpdate = () => {
		setShowUpdate(false);
	};

	// edit terms
	const [editTerm, setEditTerm] = useState("");
	const [termId, setTermId] = useState("");
	const [toEdit, setToEdit] = useState("");
	const [fromEdit, setFromEdit] = useState("");
	const [activeTerm, setActiveTerm] = useState(false);
	const openShowUpdate = (termItem) => {
		setShowUpdate(true);
		setEditTerm(termItem?.term);
		setFromEdit(termItem?.from);
		setToEdit(termItem?.to);
		setTermId(termItem?.id);
	};
	const { terms } = useSelector((state) => state.schoolStore);

	// update terms
	const updateTerm = async () => {
		try {
			setSelecting(true);
			let formData = {
				term: editTerm,
				from: fromEdit,
				to: toEdit,
				selected: activeTerm ? 1 : 0,
				termId: termId,
			};
			const response = await axiosInstance.patch("/terms", formData);
			const { data } = response;
			const { status } = data;
			if (status) {
				setSelecting(false);
				dispatch(getTerms());
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeShowUpdate();
				setActiveTerm(false);
				// navigate(0);
				setSelectId("");
			}
		} catch (error) {
			console.log(error);
			setSelectId("");
			setSelecting(false);
		}
		setSelectId("");
		setSelecting(false);
	};

	// delete terms

	const deleteTerm = (termItem) => {
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
					const response = await axiosInstance.delete(`/terms/${termItem.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
						dispatch(getTerms());
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	// posting terms
	const [term, setTerm] = useState("");
	const [to, setTo] = useState("");
	const [from, setFrom] = useState("");

	const [isPosting, setIsPosting] = useState(false);

	const postTerms = async () => {
		try {
			let formData = {
				term: term,
				from: from,
				to: to,
				selected: 0,
			};
			if (term) {
				setIsPosting(true);
				const response = await axiosInstance.post("/terms", formData);
				const { data } = response;
				const { status } = data;
				if (status) {
					setTerm("");
					setTo("");
					setFrom("");
					dispatch(getTerms());
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
			console.error(error);
			setIsPosting(false);
		}
	};
	const [selecting, setSelecting] = useState(false);
	const [selectId, setSelectId] = useState("");

	const selectTerm = (termItem) => {
		setSelectId(termItem.id);
		setSelecting(true);
		setActiveTerm(true);
		setEditTerm(termItem.term);
		setFromEdit(termItem.from);
		setToEdit(termItem.to);
		setTermId(termItem.id);
		updateTerm();
	};

	// fetching terms
	useEffect(() => {
		dispatch(getTerms());
	}, [dispatch, termId, editTerm, fromEdit, toEdit]);

	return (
		<div>
			<div className="bg-white p-3 rounded-md shadow-md mr-5">
				<p className="text-secondary font-semibold text-xl">Terms</p>

				<div className="flex w-full">
					<div className="w-1/4">
						<InputField
							type="text"
							placeholder="Enter  term"
							label="Term"
							onChange={(e) => setTerm(e.target.value)}
							value={term}
						/>
					</div>
					<div className="w-1/4 ml-2">
						<InputField
							type="date"
							label="Start Date"
							onChange={(e) => setFrom(e.target.value)}
							value={from}
						/>
					</div>
					<div className="w-1/4 ml-2">
						<InputField
							type="date"
							label="End date"
							onChange={(e) => setTo(e.target.value)}
							value={to}
						/>
					</div>
					<div className="mt-5 w-1/4 ml-2">
						<br />
						{isPosting ? (
							<ButtonLoader />
						) : (
							<div onClick={postTerms}>
								<Button value={"Add terms"} />
							</div>
						)}
					</div>
				</div>

				<div className="mt-5 flex bg-gray1 text-sm text-gray5 cursor-pointer">
					<div className="w-2/3 p-2">Term</div>
					<div className="w-2/3 p-2">Start</div>
					<div className="w-2/3 p-2">End</div>
					<div className="w-1/3 p-2">Action</div>
				</div>
				{/* edit div statrt */}
				{showUpdate ? (
					<div className="absolute shadow-2xl rounded-md border bg-white  border-gray3  p-2 flex md:max-w-[45vw] max-w-[50vw]">
						<div className="w-1/4">
							<InputField
								type="text"
								label="terms"
								value={editTerm}
								onChange={(e) => setEditTerm(e.target.value)}
							/>
						</div>
						<div className="w-1/4 ml-2">
							<InputField
								type="text"
								label="Start"
								value={fromEdit}
								onChange={(e) => setFromEdit(e.target.value)}
							/>
						</div>
						<div className="w-1/4 ml-2">
							<InputField
								type="text"
								label="End"
								value={toEdit}
								onChange={(e) => toEdit(e.target.value)}
							/>
						</div>
						<div className="w-1/4 ml-2 mt-14 flex">
							<div onClick={updateTerm} className="w-3/4">
								<ButtonSecondary value={"Update"} />
							</div>
							<div className="ml-5 mt-2 w-1/4">
								<p onClick={closeShowUpdate} className="cursor-pointer">
									X
								</p>
							</div>
						</div>
					</div>
				) : (
					""
				)}
				{/* edit div end */}
				{terms.length === 0 ? (
					<Loader />
				) : (
					<div className="h-52 overflow-y-auto">
						{terms &&
							terms.map((termItem) => (
								<div
									key={termItem.id}
									className="flex border-b border-gray2 text-xs  hover:bg-gray1 cursor-pointer"
								>
									<div
										className={
											termItem.is_selected === 1
												? "bg-primary text-white w-2/3 p-2"
												: "w-2/3 p-2 text-gray5"
										}
									>
										{termItem?.term}
									</div>
									<div
										className={
											termItem?.is_selected === 1
												? "bg-primary text-white w-2/3 p-2"
												: "w-2/3 p-2 text-gray5"
										}
									>
										{termItem?.from}
									</div>
									<div
										className={
											termItem?.is_selected === 1
												? "bg-primary text-white w-2/3 p-2"
												: "w-2/3 p-2 text-gray5"
										}
									>
										{termItem?.to}
									</div>
									<div className="w-1/3 p-2 flex">
										<MdDeleteOutline
											onClick={() => deleteTerm(termItem)}
											className="text-red w-4 h-4 ml-5"
										/>

										<BsPencilSquare
											onClick={() => openShowUpdate(termItem)}
											className="text-warning h-4 w-4 ml-5"
										/>
										{selecting && selectId === termId.id ? (
											<Loader2 />
										) : (
											<p
												className="text-primary ml-5"
												onClick={() => selectTerm(termItem)}
											>
												Select
											</p>
										)}
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};
export default Terms;
