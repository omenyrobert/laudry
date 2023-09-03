import React, { useState } from "react";
import "../../assets/styles/main.css";

import StudentsTypes from "../../components/students/StudentsTypes";
import Groups from "../../components/students/Groups";

function GroupsAndTypes() {

	return (

				<div className="w-full">
					<div className="p-5 h-screen overflow-y-auto mt-2 w-full">
						
						<div className="flex mt-5">
							<div className="w-1/2 border-r-2 border-gray1 mr-5 h-[90vh] overflow-y-auto">
								<StudentsTypes/>
							</div>
							<div className="w-1/2 h-[90vh] overflow-y-auto">
								<Groups/>
							</div>
						</div>
					</div>
				</div>
		
	);
}

export default GroupsAndTypes;
