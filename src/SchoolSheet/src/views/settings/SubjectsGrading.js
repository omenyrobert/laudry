import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../../components/InputField";
import { FaPen } from "react-icons/fa";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import Subjects from "../../components/settings/Subjects";
import Grades from "../../components/settings/Grades";

function SubjectsGrading() {
	return (
		<div className="flex -ml-5">
			<div className="w-1/3 p-5">
				<Subjects />
			</div>
			<div className="w-2/3 ml-5 p-5">
				<Grades/>
			</div>
		</div>
	);
}
export default SubjectsGrading;
