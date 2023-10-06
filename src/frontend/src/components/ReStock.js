import React, { useState } from "react";
import ButtonAlt from "./ButtonAlt";

const ReStock = () => {
    const [modal, setModal] = useState(false)

    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    return (
        <div>
            <div onClick={openModal}>
                <ButtonAlt value={"ReStock"} />
            </div>

            {modal ?
                <div className="flex bg-black/50 z-50 absolute top-0 right-0 left-0 h-full w-full">
                    <div className="w-7/12" onClick={closeModal}>

                    </div>
                    <div className="w-5/12 bg-white p-5 ">
                        <div className="flex flex-wrap">
                            <div className="w-auto h-10 border border-gray2 bg-gray1 rounded-md p-2 m-1 flex">
                                <p>nail</p>
                                <span className="rounded-full bg-red px-2 ml-2 text-white">2</span>
                            </div>
                            <div className="w-auto h-10 border border-gray2 bg-gray1 rounded-md p-2 m-1 flex">
                                <p>Hima Cement</p>
                                <span className="rounded-full bg-red px-2 ml-2 text-white">32</span>
                            </div>
                            <div className="w-auto h-10 border border-gray2 bg-gray1 rounded-md p-2 m-1 flex">
                                <p>Tororo Cement</p>
                                <span className="rounded-full bg-red px-2 ml-2 text-white">0</span>
                            </div>
                            <div className="w-auto h-10 border border-gray2 bg-gray1 rounded-md p-2 m-1 flex">
                                <p>1 ltr Regal Paint</p>
                                <span className="rounded-full bg-red px-2 ml-2 text-white">12</span>
                            </div>
                        </div>
                    </div>

                </div> : null}

        </div>
    )
}

export default ReStock