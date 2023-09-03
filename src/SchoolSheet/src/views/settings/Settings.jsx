import React, { useState, useEffect } from "react";
import "../../assets/styles/main.css";
import EditSchoolInfo from "../../components/settings/EditSchoolInfo";
import Sections from "../../components/settings/Sections";
import Terms from "../../components/settings/Terms";
import { useDispatch, useSelector } from "react-redux";
import { getSchools } from "../../store/schoolSheetSlices/schoolStore";
import { UPLOADS_URL } from "../../axios-instance";
import Loader from "../../components/Loader";

function Settings() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [motto, setMotto] = useState("");
	const [location, setLocation] = useState("");
	const [phones, setPhones] = useState("");
	const [emails, setEmails] = useState("");
	const [description, setDescription] = useState("");
	const [sites, setSites] = useState("");
	const [logo, setLogo] = useState("");
	const [school, setSchool] = useState(null);
	const { schools } = useSelector((state) => state.schoolStore);

	useEffect(() => {
		dispatch(getSchools());
	}, [dispatch]);

	useEffect(() => {
		setSchool(schools[0]);
		if (schools[0]) {
			const {
				name,
				motto,
				location,
				phoneNumbers,
				emails,
				description,
				sites,
				logo,
			} = schools[0];
			setName(name);
			setMotto(motto);
			setLocation(location);
			setPhones(phoneNumbers);
			setEmails(emails);
			setDescription(description);
			setSites(sites);
			setLogo(logo);
		}
	}, [schools]);

	console.log("school", school);
	return (
		<div className="w-full">
			<div className=" p-2 h-[92vh] overflow-y-auto mt-2 w-full">
				<p className="text-secondary text-xl font-semibold">About the School</p>
				<div className="flex w-full">
					<div className="w-1/3">
						<EditSchoolInfo />
						{schools.length === 0 ? (
							<Loader />
						) : (
							<div>
								<p>Logo</p>
								<img
									src={logo ? UPLOADS_URL + logo : "avatar.jpeg"}
									className="w-36 h-36 object-cover  rounded-full  border border-gray1 shadow"
									alt="school_logo"
								/>
								<p>Name</p>
								<p className="text-sm text-gray4">{name}</p>
								<br />
								<p>Motto</p>
								<p className="text-sm text-gray4">{motto}</p>
								<br />
								<p>Phone Numbers</p>
								<p className="text-sm text-gray4">{phones}</p>
								<br />
								<p>Emails</p>
								<p className="text-sm text-gray4">{emails}</p>
								<p>Location</p>
								<p className="text-sm text-gray4">{location}</p>
								<br />
								<p>Description</p>
								<p className="text-sm text-gray4">{description}</p>
								<p>Sites</p>
								<p className="text-sm text-gray4">{sites}</p>
							</div>
						)}
					</div>
					<div className="w-2/3 ml-10">
						<Terms />
						<br />
						<Sections />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
