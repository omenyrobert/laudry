import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the overlay color here
	},
	content: {
		width: "50vw",
		height: "70vh",
		marginLeft: "25vw",
		marginTop: "10vw",
	},
};

const Sample = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
			
		</div>
	);
};

export default Sample;

