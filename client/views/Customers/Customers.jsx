import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button2 from "../../components/Button2";
import ButtonAlt from "../../components/ButtonAlt";
import CustomersTable from "../../components/Customers/CustomersTable";
import { testcustomersData } from "../../components/Customers/Customers";
import ButtonSecondary from "../../components/ButtonSecondary";
import axiosInstance from "../../axios-instance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../store/slices/store";
import { useFeedback } from "../../hooks/feedback";

const Customers = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.autocountStore);
  const [modal, setModal] = useState(false);
  const { toggleFeedback } = useFeedback();

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [posting, setPosting] = useState("");

  const postCustomer = async () => {
    if (name === "" || email === "" || phone === "" || location === "") {
      toggleFeedback("error", {
        title: "Error",
        message: "Please Fill All Fields",
      });
      return;
    }
    try {
      setPosting(true);
      const response = await axiosInstance.post("/customers", {
        name,
        email,
        phone,
        location,
      });

      const { status, payload } = response.data;

      if (status) {
        toggleFeedback("success", {
          title: "Success",
          message: "Customer Added Successfully",
        });
        dispatch(getCustomers());
        setName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setPosting(false);
        closeModal();
      } else {
        toggleFeedback("error", {
          title: "Error",
          message: payload,
        });
        setPosting(false);
      }
    } catch (error) {
      toggleFeedback("error", {
        title: "Error",
        message: error.message,
      });
      setPosting(false);
    }
  };

  return (
    <div className=" w-full bg-white rounded-md shadow">
      <div className="p-3">
        <div className="flex w-full justify-between">
          <div className="">
            <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
              Customers
            </h1>
          </div>
          <div className="w-4/12 ">
            {/* <InputField
              type="text"
              placeholder="Search For Customer ..."
              name="lastName"
              icon={
                <BsSearch
                  className="w-3 -ml-7 mt-3 cursor-pointer"
                  type="button"
                />
              }
            /> */}
          </div>
          <div className="mt-5" onClick={openModal}>
            <Button2 value={"Add Customers"} />
          </div>
        </div>
        <div className="">
          {modal ? (
            <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
              <div className="w-3/12" onClick={closeModal}></div>
              <div className="w-6/12">
                <div className="rounded-lg bg-white mt-[10vh]">
                  <div className="flex text-xl justify-between font-semibold text-primary p-2 bg-gray1">
                    <div>
                      <p>Add Custmer</p>
                    </div>
                    <div>
                      <p onClick={closeModal} className="cursor-pointer">
                        X
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-2">
                      <InputField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name Of Customer"
                        placeholder="Enter Name"
                      />
                      <InputField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="w-1/2 p-2">
                      <InputField
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label="Phone Number"
                        placeholder="Phone Number"
                      />
                      <InputField
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        label="Location"
                        placeholder="Enter Location"
                      />
                    </div>
                  </div>

                  <div className="flex  justify-between text-primary p-2 bg-gray1">
                    <div onClick={closeModal}>
                      <ButtonSecondary value={"Close"} />
                    </div>
                    <div className="w-36">
                      {posting ? (
                        <Loader />
                      ) : (
                        <div onClick={postCustomer}>
                          <Button value={"Add Customer"} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="h-1/4" onClick={closeModal}></div>
              </div>
              <div className="w-3/12" onClick={closeModal}></div>
            </div>
          ) : null}

          <CustomersTable customersData={customers} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
