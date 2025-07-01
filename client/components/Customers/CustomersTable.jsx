import React, { useState, useEffect } from "react";
import "../../assets/styles/main.css";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../Button";
import InputField from "../InputField";
import ButtonSecondary from "../ButtonSecondary";
import axiosInstance from "../../axios-instance";
import ButtonLoader from "../ButtonLoader";
import Loader from "../Loader";
import { useFeedback } from "../../hooks/feedback";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../store/slices/store";
import Swal from "sweetalert2";
import widivReactContent from "sweetalert2-react-content";

const CustomersTable = (props) => {
  const { customersData } = props;

  const [modal, setModal] = useState(false);

  const openModal = (customer) => {
    setModal(true);
    setName(customer.name);
    setEmail(customer.email);
    setLocation(customer.location);
    setPhone(customer.phone);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [modal2, setModal2] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const openModal2 = (customer) => {
    setModal2(true);
    setName(customer.name);
    setCustomerId(customer.id);
    setIsEdit(true);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [posting, setPosting] = useState(false);

  const { toggleFeedback } = useFeedback();

  const dispatch = useDispatch();

  return (
    <div id="studentTable">
      <div className="h-[calc(100vh-180px)] overflow-y-auto">
        <table id="dmsk" className="mt-4 w-full table-auto">
          <thead className="bg-gray1">
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">Phone Number</th>
            <th className="p-2 text-primary text-sm text-left">email</th>
            <th className="p-2 text-primary text-sm text-left">Location</th>
            <th className="p-2 text-primary text-sm text-left">Action</th>
          </thead>
          <tbody>
            {customersData?.map((customer) => {
              return (
                <Customer
                  customer={customer}
                  openModal2={openModal2}
                  openModal={openModal}
                />
              );
            })}
          </tbody>
        </table>

        {modal ? (
          <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
            <div className="w-3/12" onClick={closeModal}></div>
            <div className="w-6/12">
              <div className="rounded-lg bg-white mt-[10vh]">
                <div className="flex text-xl justify-between font-semibold text-primary p-2 bg-gray1">
                  <div>
                    <p>Edit Customer</p>
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

                <div className="flex justify-between text-primary p-2 bg-gray1">
                  <div onClick={closeModal}>
                    <ButtonSecondary value={"Close"} />
                  </div>
                  <div className="20">
                    {posting ? (
                      <ButtonLoader />
                    ) : (
                      <div onClick={() => {}}>
                        <Button value={"Update "} />
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
      </div>
    </div>
  );
};

export default CustomersTable;

export const Customer = ({ customer, openModal }) => {
  const [modal2, setModal2] = useState(false);
  const [adding, setAdding] = useState(false);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeAccount, setActiveAccount] = useState(null);
  const { toggleFeedback } = useFeedback();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const postPayment = async () => {
    if (activeAccount === null) {
      toggleFeedback("error", {
        title: "Error",
        text: "Please select an account",
      });
      return;
    }
    if (date === "") {
      toggleFeedback("error", {
        title: "Error",
        text: "Please select a date",
      });
      return;
    }

    if (amount === "") {
      toggleFeedback("error", {
        title: "Error",
        text: "Please select an amount",
      });
      return;
    }

    if (parseInt(amount) > parseInt(activeAccount.balance)) {
      toggleFeedback("error", {
        title: "Error",
        text: "Amount cannot be greater than balance",
      });
      return;
    }

    try {
      setAdding(true);

      const res = await axiosInstance.post("/accounts/pay", {
        date,
        amount,
        id: activeAccount.id,
      });

      const { status, payload } = res.data;

      if (status) {
        dispatch(getCustomers());
        toggleFeedback("success", {
          title: "Success",
          text: "Payment added successfully",
        });
        setDate("");
        setAmount("");
        setAdding(false);
        setActiveAccount(null);
      } else {
        toggleFeedback("error", {
          title: "Error",
          text: payload,
        });
        setAdding(false);
      }
    } catch (error) {
      toggleFeedback("error", {
        title: "Error",
        text: "An error occured",
      });
      setAdding(false);
    }
  };

  const [paymentId, setPaymentId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const editPayment = async (pay) => {
    setIsEdit(true);
    setPaymentId(pay.id);
    setAmount(pay.amount);
    setDate(pay.date);
  };
  const updatePayment = async () => {
    if (activeAccount === null) {
      toggleFeedback("error", {
        title: "Error",
        text: "Please select an account",
      });
      return;
    }
    if (date === "") {
      toggleFeedback("error", {
        title: "Error",
        text: "Please select a date",
      });
      return;
    }

    if (amount === "") {
      toggleFeedback("error", {
        title: "Error",
        text: "Please select an amount",
      });
      return;
    }

    if (parseInt(amount) > parseInt(activeAccount.balance)) {
      toggleFeedback("error", {
        title: "Error",
        text: "Amount cannot be greater than balance",
      });
      return;
    }

    try {
      setAdding(true);
      const res = await axiosInstance.put("/accounts", {
        date: date,
        amount: amount,
        id: paymentId,
      });

      const { status, payload } = res.data;
      if (status) {
        dispatch(getCustomers());
        toggleFeedback("success", {
          title: "Success",
          text: "Payment updated successfully",
        });
        setDate("");
        setAmount("");
        setAdding(false);
        setActiveAccount(null);
        setIsEdit(false);
      } else {
        toggleFeedback("error", {
          title: "Error",
          text: payload,
        });
        setAdding(false);
      }
    } catch (error) {
      toggleFeedback("error", {
        title: "Error",
        text: error,
      });
      setAdding(false);
    }
  };

  const deleteCustomer = (customer) => {
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
          const response = await axiosInstance.delete(
            `/customers/${customer.id}`
          );
          // const { data } = response;
          // const { status } = data;
          if (response?.data?.status) {
            // fetchC();
            window.location.reload();
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

  const deletePayment = (pay) => {
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
          const response = await axiosInstance.delete(`/accounts/${pay.id}`);
          // const { data } = response;
          // const { status } = data;
          if (response?.data?.status) {
            // dispatch(getCustomers());
             window.location.reload();
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

  //edit customer
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [location, setLocation] = useState(customer.location);
  const [posting, setPosting] = useState(false);

  const postCustomer = async () => {
    try {
      setPosting(true);
      const response = await axiosInstance.put(`/customers`, {
        id: customer.id,
        name,
        email,
        phone,
        location,
      });

      const { status, payload } = response.data;

      if (status) {
        toggleFeedback("success", {
          title: "Success",
          text: "Customer Updated Successfully",
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
          text: payload,
        });
        setPosting(false);
      }
    } catch (error) {
      toggleFeedback("error", {
        title: "Error",
        text: error.message,
      });
      setPosting(false);
    }
  };

  return (
    <>
      {modal ? (
        <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
          <div className="w-3/12" onClick={closeModal}></div>
          <div className="w-6/12">
            <div className="rounded-lg bg-white mt-[10vh]">
              <div className="flex text-xl justify-between font-semibold text-primary p-2 bg-gray1">
                <div>
                  <p>Edit Customer</p>
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

              <div className="flex justify-between text-primary p-2 bg-gray1">
                <div onClick={closeModal}>
                  <ButtonSecondary value={"Close"} />
                </div>
                <div className="20">
                  {posting ? (
                    <ButtonLoader />
                  ) : (
                    <div
                      onClick={() => {
                        postCustomer();
                      }}
                    >
                      <Button value={"Update "} />
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

      {modal2 ? (
        <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
          <div
            className="w-2/12"
            onClick={() => {
              setModal2(false);
            }}
          ></div>
          <div className="w-8/12">
            <div className="rounded-lg bg-white mt-[5vh]">
              <div className="flex text-xl justify-between text-primary p-2 bg-gray1">
                <div>
                  <p>Customers Payments</p>
                </div>
                <div>{customer.name}</div>
                <div>
                  <p
                    onClick={() => {
                      setModal2(false);
                    }}
                    className="cursor-pointer"
                  >
                    X
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex ">
                  {customer.accounts?.map((account) => {
                    return (
                      <div
                        className={
                          activeAccount?.id === account.id
                            ? "w-32 p-2 m-2 bg-primary text-white"
                            : "w-32 p-2 m-2 bg-gray1"
                        }
                        onClick={() => {
                          setActiveAccount(account);
                        }}
                      >
                        {account.amount.toLocaleString()}{" "}
                        {account.balance === 0 && <span>( Closed )</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="flex">
                  <div className="p-2">
                    <span className="text-primary">Amount:</span>
                    {activeAccount?.amount.toLocaleString()}
                  </div>
                  <div className="p-2">
                    <span className="text-primary">Date:</span>
                    <span
                      className={
                        new Date(activeAccount?.date).getTime() <
                        new Date().getTime()
                          ? "text-red"
                          : ""
                      }
                    >
                      {new Date(activeAccount?.date).toDateString()}
                    </span>
                  </div>
                  <div className="p-2">
                    <span className="text-primary">Balance:</span>{" "}
                    {activeAccount?.balance.toLocaleString()}
                  </div>
                </div>
                <div className="flex -mt-5">
                  {activeAccount?.balance === 0 ? (
                    <div className="p-2">
                      <span className="text-primary">Account Settled</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-1/3 p-2">
                        <InputField
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          type="date"
                        />
                      </div>
                      <div className="w-1/3 p-2">
                        <InputField
                          value={amount}
                          type="number"
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Amount"
                        />
                      </div>
                      <div className="w-42 mt-6 p-2">
                        {isEdit ? (
                          <>
                            {adding ? (
                              <ButtonLoader />
                            ) : (
                              <div onClick={updatePayment}>
                                <Button value={"update"} />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {adding ? (
                              <ButtonLoader />
                            ) : (
                              <div
                                onClick={() => {
                                  postPayment();
                                }}
                              >
                                <Button value={"Save"} />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex bg-gray2 mx-3">
                  <div className="w-1/4 p-2">Date</div>
                  <div className="w-1/4 p-2">Paid</div>
                  <div className="w-1/4 p-2">Balance</div>
                  <div className="w-1/4 p-2">#</div>
                </div>
                {loading ? (
                  <div className="w-full h-52 flex justify-center items-center">
                    {" "}
                    <Loader />{" "}
                  </div>
                ) : null}

                <div className="h-[calc(100vh-300px)] overflow-y-auto">
                  {activeAccount?.payments?.map((pay) => {
                    return (
                      <div className="flex mx-3 border-b cursor-pointer text-sm text-gray5 border-gray1 hover:bg-gray1">
                        <div className="w-1/4 p-2">
                          {new Date(pay.date).toDateString()}
                        </div>
                        <div className="w-1/4 p-2">
                          {pay.amount.toLocaleString()}
                        </div>
                        <div className="w-1/4 p-2">
                          {pay.balance.toLocaleString()}
                        </div>
                        <div className="w-1/4 p-2 flex gap-2">
                          <BsTrash
                            onClick={() => deletePayment(pay)}
                            className="text-red"
                          />
                          <BsPencilSquare
                            onClick={() => editPayment(pay)}
                            className="text-yellow"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className="h-1/4"
              onClick={() => {
                setModal2(false);
              }}
            ></div>
          </div>
          <div
            className="w-2/12"
            onClick={() => {
              setModal2(false);
            }}
          ></div>
        </div>
      ) : null}
      <tr
        className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
        key={customer.id}
      >
        <td className="text-sm p-3 text-gray5">{customer.name}</td>

        <td className="text-sm p-3 text-gray5">{customer.phone}</td>
        <td className="text-sm p-3 text-gray5">{customer.email}</td>
        <td className="text-sm p-3 text-gray5">{customer.location}</td>

        <td className="text-xs flex p-3 text-gray5">
          {/* {deleteLoading ? (
            <span className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-red"></span>
          ) : (
            <BsTrash
              onClick={() => {
                deleteCustomer(customer);
              }}
              className="text-red"
            />
          )} */}

          <BsPencilSquare
            onClick={() => {
              setModal(true);
            }}
            className="text-yellow mx-5"
          />
          <p
            onClick={() => {
              setModal2(true);
            }}
            className="px-1 bg-primary rounded-full -mt-1 cursor-pointor font-bold text-white"
          >
            A
          </p>
        </td>
      </tr>
    </>
  );
};
