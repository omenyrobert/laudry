import * as React from "react";
import Card from "./Card";

function Queue2(){
    return(
<div>
<div className="h-screen mt-1">
				<div className="flex bg-white">
					<div className="w-3/12">
						<div className="p-2 flex">
							<h1 className="text-gray5 font-bold">Scan</h1>
							<div className="bg-secondary rounded-full p-1 w-6 text-center ml-2 text-xs font-semibold">
								12
							</div>
						</div>

						<div className="shadow-md mx-1 p-2 h-screen overflow-y-auto bg-gray10">
							<Card />
							<Card first_name="Omeny" last_name="Robert" first_name_letter="O" last_name_letter="R" date_of_birth="09-05-1997 20" gender="Male" place_of_residence="Kira" />
						</div>
					</div>
					<div className="w-3/12">
						<div className="p-2 flex">
							<h1 className="text-gray5 font-bold">Dental</h1>
							<div className="bg-secondary rounded-full p-1 w-6 text-center ml-2 text-xs font-semibold">
								2
							</div>
						</div>

						<div className="shadow-md mx-1 p-2 h-screen overflow-y-auto bg-gray10">
						<Card />
                        <Card first_name="Omeny" last_name="Robert" first_name_letter="O" last_name_letter="R" date_of_birth="09-05-1997 20" gender="Male" place_of_residence="Kira" />
                        <Card first_name="Omeny" last_name="Robert" first_name_letter="O" last_name_letter="R" date_of_birth="09-05-1997 20" gender="Male" place_of_residence="Kira" />
						</div>
					</div>
					<div className="w-3/12">
						<div className="p-2 flex">
							<h1 className="text-gray5 font-bold">Admission</h1>
							<div className="bg-secondary rounded-full p-1 w-6 text-center ml-2 text-xs font-semibold">
								32
							</div>
						</div>

						<div className="shadow-md mx-1 p-2 h-screen overflow-y-auto bg-gray10">
            <Card />
						</div>
					</div>
					<div className="w-3/12">
						<div className="p-2 flex">
							<h1 className="text-gray5 font-bold">Done Today</h1>
							<div className="bg-secondary rounded-full p-1 w-6 text-center ml-2 text-xs font-semibold">
								12
							</div>
						</div>

						<div className="shadow-md mx-1 p-2 h-screen overflow-y-auto bg-gray10">
						<Card first_name="Omeny" last_name="Robert" first_name_letter="O" last_name_letter="R" date_of_birth="09-05-1997 20" gender="Male" place_of_residence="Kira" />
            <Card />
            <Card />
						</div>
					</div>
					<div className="w-3/12">
						<div className="p-2 flex">
							<h1 className="text-gray5 font-bold">Uncleared Invoices</h1>
							<div className="bg-secondary rounded-full p-1 w-6 text-center ml-2 text-xs font-semibold">
								12
							</div>
						</div>

						<div className="shadow-md mx-1 p-2 h-screen overflow-y-auto bg-gray10">
            <Card />
						</div>
					</div>
				</div>
			</div>
</div>
    )
}
export default Queue2