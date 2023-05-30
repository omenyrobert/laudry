import React, { useState } from "react";
import SmallCalendar from "../components/dashboard/SmallCalendar";
// import Loader from "../components/Loader"
import PatientTable2 from "../components/students/studentsTable2";
import "../assets/styles/main.css";
import "../assets/styles/dashboard.css";
import BarGraph from "../components/dashboard/BarGraph";
import Cards from "../components/dashboard/Cards";
import Doughnut from "../components/dashboard/DoughnutComp";
import { FaUserAlt } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";

function Dashboard() {
	return (
		
			<div className="h-screen overflow-y-auto">
				<Cards />
				<div className="flex w-full">
					<div className="w-8/12">
						<div className="rounded-md w-full shadow-md bg-white h-[65vh] p-5">
							<p className="text-xl text-primary font-semibold">Fees Payment</p>
							<BarGraph />
						</div>
						<div className="rounded-md w-full shadow-md overflow-y-auto bg-white h-[50vh] p-5 mt-3">
							<p className="text-xl text-primary font-semibold">
								Students With Lowest Payments
							</p>
							<PatientTable2 />
						</div>
					</div>
					<div className="w-4/12 rounded-md shadow-md bg-white ml-2 overflow-y-auto h-[125vh] p-2">
						{/* <Doughnut /> */}
						<p className="text-xl text-primary font-semibold">Events</p>
						<div className="p-2 rounded-md w-full m-2 flex">
							<SmallCalendar />
						</div>
						<br/>
						<div className="bg-gray1 p-2 m-2">
							<p className="text-xl text-primary font-semibold">
								Happening Today
							</p>
							<div className="xl:block lg:block 2xl:flex sm:block  md:block mt-3">
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
							</div>
							<div className="xl:block lg:block 2xl:flex sm:block  md:block mt-3">
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
							</div>
							
							

						</div>

						<div className="bg-gray1 p-2 m-2">
							<p className="text-xl text-primary font-semibold">
								Upcoming Events
							</p>
							<div className="xl:block lg:block 2xl:flex sm:block  md:block mt-3">
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
							</div>
							<div className="xl:block lg:block 2xl:flex sm:block  md:block mt-3">
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
								<div className="bg-white p-2 rounded-md  shadow-md h-28 m-1 w-1/2 md:w-full cursor-pointer">
									<div className="flex">
										<div className="w-1/2">
											<p className="text-sm ml-5">Math Class</p>
										</div>
										<div className="w-1/2 bg-blue11 rounded-md">
											<p className="text-sm ml-5 text-primary">P.5 Green</p>
										</div>
									</div>
									<div className="flex mt-2">
										<div className="mt-3 w-20">
											<center>
												<FaUserAlt className="w-3 text-secondary" />
												<p className="text-gray4 text-xs ml-2">Mr Okello</p>
											</center>
										</div>
										<div className="mt-3 ml-5">
											<center>
												<GiAlarmClock className="w-4" />
												<p className="text-gray4 text-xs ml-2">
													11:30am - 1:00pm
												</p>
											</center>
										</div>
									</div>
								</div>
							</div>
							
							

						</div>

					
					</div>
				</div>
			</div>
	
	);
}

export default Dashboard;