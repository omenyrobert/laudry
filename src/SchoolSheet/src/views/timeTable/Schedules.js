import React from "react";
import ScheduleType from "../../components/timeTable/ScheduleType";
import Slots from "../../components/timeTable/Slots";

function Schedules() {
	return (
		<div className="flex w-full">
			<div className="w-3/12 p-5  bg-white border border-gray2 rounded h-[90vh] shadow-lg">
				<ScheduleType />
			</div>
            <div className="w-5/12 mx-5 p-5  bg-white border border-gray2 rounded h-[90vh] shadow-lg">
				<Slots />
			</div>
			<div className="w-4/12 p-5">
				<h1 className="text-secondary font-medium text-xl">Class Schedules</h1>
				<table className="mt-10 w-[95%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Class</th>
						<th className="p-2 text-primary text-sm text-left">Students</th>
                        <th className="p-2 text-primary text-sm text-left">Class Teacher</th>
                      
					</thead>
					<tbody>
						<tr className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md">
							<td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            
                        </tr>
                        <tr className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md">
							<td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                          
                        </tr>
                        <tr className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md">
							<td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            
                        </tr>
                        <tr className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md">
							<td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                          
                        </tr>
                        <tr className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md">
							<td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            
                        </tr>
                        <tr className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md">
							<td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                            <td className="text-xs p-3 text-gray5">S.1 green</td>
                          
                        </tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Schedules;
