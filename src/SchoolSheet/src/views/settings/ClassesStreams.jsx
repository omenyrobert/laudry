import React, { useState } from "react";
import "../../assets/styles/main.css";
import Navigation from "../../components/settings/Navigation";
import StreamsComp from "../../components/settings/StreamsComp";

import ClassesComp from "../../components/settings/ClassesComp";

function ClassesStreams() {
	return (
		<div className="w-full">
			<div className="p-5 h-screen  mt-2 w-full">
				
				<div className="flex mt-5">
					<div className="w-1/3 border-r-2 border-gray1 mr-5">
						<StreamsComp />
					</div>
					<div className="w-2/3 h-[90vh]">
						<ClassesComp />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClassesStreams;
