import React, { useState, useEffect } from "react";
import "../../assets/styles/main.css";
import EditSchoolInfo from "../../components/settings/EditSchoolInfo";
import Sections from "../../components/settings/Sections";
import Terms from "../../components/settings/Terms";
import Localbase from "localbase";

let db = new Localbase("db");

function Settings() {

	const [name, setName] = useState("");
	const [motto, setMotto] = useState("");
	const [location, setLocation] = useState("");
	const [phones, setPhones] = useState("");
	const [emails, setEmails] = useState("");
	const [description, setDescription] = useState("");
	const [sites, setSites] = useState("");
	
	const fetchAboutInfo = async () => {
		console.log("fetched");
		const aboutInfo = await db.collection("aboutInfoTbl").get();
		setName(aboutInfo[0].name);
		setMotto(aboutInfo[0].motto);
		setLocation(aboutInfo[0].location);
		setPhones(aboutInfo[0].phones);
		setEmails(aboutInfo[0].emails);
		setDescription(aboutInfo[0].description);
		setSites(aboutInfo[0].sites);
	};

	// fetching section
	useEffect(() => {
		fetchAboutInfo();
	}, []);

	return (
		<div className="w-full">
			<div className=" p-2 h-[92vh] overflow-y-auto mt-2 w-full">
				<p className="text-primary text-xl font-semibold">About the School</p>
				<div className="flex w-full">
					
					<div className="w-1/2">
					<EditSchoolInfo/>
						<p>Logo</p>
						<p>Name</p>
						<p className="text-sm text-gray4">{name}</p>
						<br />
						<p>Motto</p>
						<p className="text-sm text-gray4">{motto}</p>
						<br />
						<p>Phone Numbers</p>
						<p className="text-sm text-gray4">
							{phones}
						</p>
						<br />
						<p>Emails</p>
						<p className="text-sm text-gray4">
							{emails}
						</p>
						<p>Location</p>
						<p className="text-sm text-gray4">{location}</p>
						<br />
						<p>Description</p>
						<p className="text-sm text-gray4">
							{description}
						</p>
						<p>Sites</p>
						<p className="text-sm text-gray4">
							{sites}
						</p>
					</div>
					<div className="w-1/2 ml-10">
						<Terms/>
						<br />
						<Sections />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
