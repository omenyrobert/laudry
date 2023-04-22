import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";

export default function Root() {
	return (
		<>
			<div id="detail">
				<div className="flex w-full h-screen overflow-hidden bg-gray10">
					<div className="w-[250px]">
						<Sidebar />
					</div>
					<div className="w-full ml-4 mr-2">
						<Navbar />
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
