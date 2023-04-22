import React, { useState } from "react";
import "../../assets/styles/main.css";
import {
	MdOutlineArrowBackIosNew,
	MdOutlineArrowForwardIos,
} from "react-icons/md";
import Queue1 from "./Queue1";
import Queue2 from "./Queue2";

function Queue() {
  const [queue1, setQueue1] = useState(true);
  const [queue2, setQueue2] = useState(false);

const handleQueue1=()=>{
setQueue1(true)
setQueue2(false);
} 

const handleQueue2=()=>{
  setQueue2(true)
  setQueue1(false);
  } 

	return (
		<>
			<div className="p-2 flex justify-between mt-2">
				<div className="bg-white p-2 shadow-md flex rounded-md cursor-pointer" onClick={handleQueue1}>
					<MdOutlineArrowBackIosNew className="mt-1 mr-2" />
					<div> Queue 1</div>
				</div>
				<div className="bg-white p-2 flex shadow-md rounded-md cursor-pointer" onClick={handleQueue2}>
					<div> Queue 2</div> <MdOutlineArrowForwardIos className="mt-1 ml-2" />
				</div>
			</div>
      { queue1 ? <Queue1/> : null }
            { queue2 ? <Queue2/> : null }
			
		</>
	);
}
export default Queue;
