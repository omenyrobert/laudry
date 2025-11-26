import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import axiosInstance from "../axios-instance";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { usePrint } from "../hooks/print";
import withReactContent from "sweetalert2-react-content";
const Banking = () => {
  const [loading, setLoading] = useState(false);
  const [bankings, setBankings] = useState([]);
  const { printContent } = usePrint();
  const fetchBanking = async () => {
    try {
      setLoading(true);
      let res = await axiosInstance.get("/bankings");
      if (res.data.status) {
        setLoading(false);
        setBankings(res.data.payload);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanking();
  }, []);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [bankId, setBankId] = useState("");
  const editBankings = (bank) => {
    setIsEdit(true);
    setBankId(bank.id);
    setDate(bank.date);
    setAmount(bank.amount);
    setComment(bank.comment);
  };
  const [posting, setPosting] = useState(false);
  const postBankings = async () => {
    if (date && amount && comment) {
      try {
        setPosting(true);
        let formData = {
          date: date,
          amount: amount,
          comment: comment,
        };
        let res = await axiosInstance.post("/bankings", formData);
        if (res.data.payload) {
          setDate("");
          setAmount("");
          setComment("");
          setBankId("");
          setPosting(false);
          fetchBanking();
        }
      } catch (error) {
        setPosting(false);
      }
    }
  };

  const updateBankings = async () => {
    try {
      setPosting(true);
      let formData = {
        id: bankId,
        date: date,
        amount: amount,
        comment: comment,
      };
      let res = await axiosInstance.put("/bankings", formData);
      if (res.data.payload) {
        setDate("");
        setAmount("");
        setComment("");
        setBankId("");
        setPosting(false);
        setIsEdit(false);
        fetchBanking();
      }
    } catch (error) {
      setPosting(false);
    }
  };

  const deleteBanking = (bank) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let formData = {
            date: bank.date,
            amount: bank.amount,
          };
          const response = await axiosInstance.post(
            `/bankings/${bank.id}`,
            formData
          );
          const { data } = response;
          const { status } = data;
          if (status) {
            fetchBanking();
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 500,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredBankings = bankings.filter((bank) => {
    const bankDate = new Date(bank.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return bankDate >= start && bankDate <= end;
    }
    if (start && !end) {
      return bankDate >= start;
    }
    if (!start && end) {
      return bankDate <= end;
    }
    return true; // if no filters applied
  });

  return (
    <div className="w-full bg-white p-5">
      <div className="flex">
        <div className="w-3/12 -mt-2 gap-3">
          <p className="text-lg font-bold">Add Banked Money</p>
          <InputField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            label="Date"
          />
          <InputField
            type="number"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <InputField
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="comment"
            placeholder="Leave comment"
          />
          <div className="w-[90px] mt-12">
            {isEdit ? (
              <>
                {posting ? (
                  <ButtonLoader />
                ) : (
                  <div onClick={updateBankings}>
                    <Button value={"Update"} />
                  </div>
                )}
              </>
            ) : (
              <>
                {posting ? (
                  <ButtonLoader />
                ) : (
                  <div onClick={postBankings}>
                    <Button value={"Save"} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-9/12 pl-5">
          <div className="flex justify-between -mt-2">
            <p className="font-bold text-lg">Banking</p>
            <div className="flex gap-3 -mt-5">
              <InputField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <InputField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="" onClick={() => printContent("print-temp")}>
              <Button value={"Print"} />
            </div>
          </div>
          <div id="print-temp">
            <div className="grid grid-cols-4 -mt-5 text-sm font-bold border-b">
              <div className="p-2">Date</div>
              <div className="p-2">Amount</div>
              <div className="p-2">Date</div>
              <div className="p-2">#</div>
            </div>
            <div className="h-[calc(100vh-220px)] overflow-y-auto">
              {filteredBankings.map((bank) => {
                return (
                  <div className="grid grid-cols-4 text-sm border-gray3 hover:bg-gray1 cursor-pointer border-b">
                    <div className="p-2">{bank.date}</div>
                    <div className="p-2">{bank.amount.toLocaleString()}</div>
                    <div className="p-2">{bank.comment}</div>
                    <div className="p-2 flex gap-2">
                      <BsPencilSquare onClick={() => editBankings(bank)} />{" "}
                      <BsTrash
                        onClick={() => deleteBanking(bank)}
                        className="text-red"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-4 text-sm font-bold bg-secondary text-white">
              <div className="p-2">Total</div>
              <div className="p-2">
                {" "}
                {bankings
                  .reduce((total, bank) => total + bank.amount, 0)
                  .toLocaleString()}
              </div>
              <div className="p-2"></div>
              <div className="p-2"></div>
            </div>
          </div>

          {loading ? <Loader /> : null}
        </div>
      </div>
    </div>
  );
};
export default Banking;
