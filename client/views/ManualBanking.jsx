import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";

const ManualBanking = () => {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      <div onClick={showModal}>
        {" "}
        <Button value={"Banked Money"} />{" "}
      </div>
      {modal ? (
        <div className="flex bg-black/50 absolute z-50 top-0 h-full w-full left-0">
          <div className="w-4/12"></div>
          <div className="w-8/12 bg-white p-5">
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-lg">Banked Money</p>
              </div>
              <div>
                <p
                  onClick={closeModal}
                  className="font-bold cursor-pointer text-xl"
                >
                  X
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <InputField type="date" label="Date" />
              <InputField
                type="number"
                label="Amount"
                placeholder="Enter Amount"
              />
              <InputField
                type="text"
                label="comment"
                placeholder="Leave comment"
              />
              <div className="w-[90px] mt-12">
                <Button value={"Save"} />
              </div>
            </div>

            <div className="grid grid-cols-4 text-sm font-bold border-b">
              <div className="p-2">Date</div>
              <div className="p-2">Amount</div>
              <div className="p-2">Date</div>
              <div className="p-2">#</div>
            </div>
            <div className="grid grid-cols-4 text-sm border-gray3 hover:bg-gray1 cursor-pointer border-b">
              <div className="p-2">Date</div>
              <div className="p-2">Amount</div>
              <div className="p-2">Date</div>
              <div className="p-2">#</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ManualBanking;
