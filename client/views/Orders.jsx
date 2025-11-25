import React, { useState, useEffect } from "react";
import Button2 from "../components/Button2";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonAlt from "../components/ButtonAlt";
import ButtonLoader from "../components/ButtonLoader";
import Loader from "../components/Loader";
import {
  BsEye,
  BsPencilSquare,
  BsPlusCircle,
  BsSearch,
  BsPrinter,
} from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import "../assets/styles/main.css";
import Select from "react-select";
import axiosInstance from "../axios-instance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useFeedback } from "../hooks/feedback";
import { usePrint } from "../hooks/print";

const MySwal = withReactContent(Swal);

const Orders = () => {
  const { toggleFeedback } = useFeedback
    ? useFeedback()
    : { toggleFeedback: () => {} };

  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const { printContent } = usePrint();

  const [search, setSearch] = useState("");

  // ==== Modals ====
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [paidModal, setPaidModal] = useState(false);

  // ====== CREATE ORDER STATE ======
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cAddress, setCAddress] = useState("");
  const [cDate, setCDate] = useState("");
  const [cPaid, setCPaid] = useState("");
  const [cSelectedItems, setCSelectedItems] = useState([]);

  const [posting, setPosting] = useState(false);

  // ====== EDIT ORDER STATE ======
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [eName, setEName] = useState("");
  const [ePhone, setEPhone] = useState("");
  const [eAddress, setEAddress] = useState("");
  const [eDate, setEDate] = useState("");
  const [eStatus, setEStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  // ====== UPDATE PAID STATE ======
  const [paidOrderId, setPaidOrderId] = useState(null);
  const [paidAmount, setPaidAmount] = useState("");
  const [updatingPaid, setUpdatingPaid] = useState(false);

  // ====== FETCH DATA ======

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/orders");
      if (res.status) {
        setOrders(res.data.payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/items");
      if (res.status) {
        setItems(res.data.payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchItems();
  }, [page]);

  // ====== SEARCH ======
  const searchOrders = async () => {
    if (!search) {
      fetchOrders();
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/orders/search?search=${search}`
      );
      const { status, payload } = response.data;
      if (status) {
        setOrders(payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ====== CREATE ORDER LOGIC ======

  const addSelectedItem = () => {
    setCSelectedItems([...cSelectedItems, { itemId: 0, quantity: 1 }]);
  };

  const updateSelectedItem = (index, field, value) => {
    const updated = [...cSelectedItems];
    if (field === "itemId") {
      updated[index].itemId = Number(value);
      const found = items.find((it) => it.id === Number(value));
      if (found) {
        updated[index].item = found;
      }
    } else {
      updated[index].quantity = Number(value);
    }
    setCSelectedItems(updated);
  };

  const removeSelectedItem = (index) => {
    const updated = [...cSelectedItems];
    updated.splice(index, 1);
    setCSelectedItems(updated);
  };

  const calculateCreateAmount = () => {
    let total = 0;
    cSelectedItems.forEach((si) => {
      const item = si.item || items.find((it) => it.id === si.itemId);
      if (item) {
        total += Number(item.cost) * Number(si.quantity || 0);
      }
    });
    return total;
  };

  const postOrder = async () => {
    const hasInvalidRow = cSelectedItems.some(
      (si) => !si.itemId || si.itemId === 0 || !si.quantity || si.quantity <= 0
    );

    if (hasInvalidRow) {
      MySwal.fire({
        icon: "error",
        title: "Incomplete items",
        text: "Make sure each item row has an item selected and quantity > 0.",
      });
      return;
    }

    if (!cName || !cPhone || !cAddress || !cDate) {
      MySwal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Name, phone, address and date are required",
      });
      return;
    }

    if (!cSelectedItems.length) {
      MySwal.fire({
        icon: "error",
        title: "No items",
        text: "Please add at least one item",
      });
      return;
    }

    const amount = calculateCreateAmount();
    const paid = Number(cPaid || 0);

    const itemsPayload = cSelectedItems.map((si) => ({
      itemId: si.itemId,
      quantity: si.quantity,
    }));

    try {
      setPosting(true);
      const formData = {
        name: cName,
        phone: cPhone,
        address: cAddress,
        amount,
        paid,
        date: cDate,
        items: itemsPayload,
      };

      const res = await axiosInstance.post("/orders", formData);
      const { status, payload } = res.data;
      if (status) {
        setPosting(false);
        setCName("");
        setCPhone("");
        setCAddress("");
        setCDate("");
        setCPaid("");
        setCSelectedItems([]);
        setCreateModal(false);
        fetchOrders();
        MySwal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 800,
        });
      } else {
        setPosting(false);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: payload || "Failed to create order",
        });
      }
    } catch (error) {
      console.log(error);
      setPosting(false);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create order",
      });
    }
  };

  // ====== EDIT ORDER LOGIC ======

  const openEditModal = (order) => {
    setEditingOrderId(order.id);
    setEName(order.name);
    setEPhone(order.phone);
    setEAddress(order.address);
    setEDate(order.date);
    setEStatus(order.orderStatus);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditingOrderId(null);
  };

  const updateOrder = async () => {
    if (!editingOrderId) return;

    try {
      setUpdating(true);
      const formData = {
        orderId: editingOrderId,
        name: eName,
        phone: ePhone,
        address: eAddress,
        date: eDate,
        orderStatus: eStatus,
      };

      const res = await axiosInstance.put("/orders", formData);
      const { status, payload } = res.data;

      if (status) {
        setUpdating(false);
        closeEditModal();
        fetchOrders();
        MySwal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 800,
        });
      } else {
        setUpdating(false);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: payload || "Failed to update order",
        });
      }
    } catch (error) {
      console.log(error);
      setUpdating(false);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update order",
      });
    }
  };

  // ====== DELETE ORDER ======

  const deleteOrder = (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post(`/orders/${order.id}`);
          const { status } = response.data;
          if (status) {
            fetchOrders();
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

  // ====== UPDATE STATUS ONLY ======

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axiosInstance.put("/orders/status", {
        orderId,
        orderStatus: newStatus,
      });
      const { status, payload } = res.data;
      if (status) {
        fetchOrders();
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: payload || "Failed to change status",
        });
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to change status",
      });
    }
  };

  // ====== UPDATE PAID ONLY ======

  const openPaidModal = (order) => {
    setPaidOrderId(order.id);
    setPaidAmount(order.paid);
    setPaidModal(true);
  };

  const closePaidModal = () => {
    setPaidModal(false);
    setPaidOrderId(null);
    setPaidAmount("");
  };

  const updatePaidOnly = async () => {
    if (!paidOrderId && paidOrderId !== 0) return;

    try {
      setUpdatingPaid(true);
      const res = await axiosInstance.put("/orders/paid", {
        orderId: paidOrderId,
        paid: Number(paidAmount),
      });
      const { status, payload } = res.data;
      if (status) {
        setUpdatingPaid(false);
        closePaidModal();
        fetchOrders();
        MySwal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 800,
        });
      } else {
        setUpdatingPaid(false);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: payload || "Failed to update paid",
        });
      }
    } catch (error) {
      console.log(error);
      setUpdatingPaid(false);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update paid",
      });
    }
  };

  // ====== PRINT ORDER ======

  // const printOrder = (order) => {
  //   const printContents = `
  //     <h2>Order #${order.id}</h2>
  //     <div className="grid grid-cols-2 gap-2">
  //     <p><strong>Date:</strong> ${order.date}</p>
  //     <p><strong>Name:</strong> ${order.name}</p>
  //     <p><strong>Phone:</strong> ${order.phone}</p>
  //     <p><strong>Address:</strong> ${order.address}</p>
  //     <p><strong>Status:</strong> ${order.orderStatus}</p>
  //     <div>

  //     <h3>Items</h3>
  //     <ul>
  //       ${order.items
  //         .map(
  //           (oi) =>
  //             `<li>${oi.item.name} x ${
  //               oi.quantity
  //             } @ ${oi.item.cost.toLocaleString()}</li>`
  //         )
  //         .join("")}
  //     </ul>
  //     <p><strong>Amount:</strong> ${order.amount.toLocaleString()}</p>
  //     <p><strong>Paid:</strong> ${order.paid.toLocaleString()}</p>
  //     <p><strong>Balance:</strong> ${(
  //       order.amount - order.paid
  //     ).toLocaleString()}</p>
  //   `;

  //   const w = window.open("", "_blank");
  //   if (!w) return;
  //   w.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Order #${order.id}</title>
  //       </head>
  //       <body>${printContents}</body>
  //     </html>
  //   `);
  //   w.document.close();
  //   w.focus();
  //   w.print();
  //   w.close();
  // };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const printOrder = (order) => {
    // Set the order to render
    setSelectedOrder(order);

    setTimeout(() => {
      printContent("receipt-design");
      const printContents = document.getElementById("print-order");
      if (!printContents) return;

      w.document.close();
      w.focus();
      w.print();
      w.close();
    }, 100); // small delay to render
  };

  // ====== STATUS OPTIONS ======
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#fcf8f0] text-[#fca503]";
      case "processing":
        return "bg-[#d7e3fa] text-[#033cad]";
      case "completed":
        return "bg-[#ccffd0] text-[#01910d]";
      case "paid":
        return "bg-[#01910d] text-[#ffffff]";
      case "cancelled":
        return "bg-red-100 text-[#ff0000]";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow p-2">
      {/* HEADER ROW */}
      <div className="flex w-full justify-between -mt-5">
        <div className="flex">
          <h1 className="text-secondary font-semibold text-2xl mt-2">
            Orders
          </h1>
        </div>
        <div className="w-4/12 ">
          <InputField
            type="text"
            placeholder="Search order ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={
              <BsSearch
                className="w-3 -ml-7 mt-3 cursor-pointer"
                type="button"
                onClick={searchOrders}
              />
            }
          />
        </div>
        <div className="flex mt-5">
          <div onClick={() => setCreateModal(true)}>
            <Button2 value={"New Order"} />
          </div>
        </div>
      </div>

      {/* CREATE ORDER MODAL */}
      {createModal && (
        <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
          <div className="w-2/12" onClick={() => setCreateModal(false)}></div>
          <div className="w-10/12">
            <div className="rounded-lg bg-white">
              <div className="flex text-xl justify-between font-semibold text-primary p-2 bg-gray1">
                <div>
                  <p>Add Order</p>
                </div>
                <div>
                  <p
                    onClick={() => setCreateModal(false)}
                    className="cursor-pointer"
                  >
                    X
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 p-3 -mt-5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="">
                      <InputField
                        value={cName}
                        onChange={(e) => setCName(e.target.value)}
                        label="Customer Name"
                        placeholder="Enter Customer Name"
                      />
                    </div>
                    <div className="">
                      <InputField
                        value={cPhone}
                        onChange={(e) => setCPhone(e.target.value)}
                        label="Phone"
                        placeholder="Enter Phone"
                        type="text"
                      />
                    </div>
                    <div className="-mt-10">
                      <InputField
                        value={cAddress}
                        onChange={(e) => setCAddress(e.target.value)}
                        label="Address"
                        placeholder="Enter Address"
                        type="text"
                      />
                    </div>
                    <div className="-mt-10">
                      <InputField
                        value={cDate}
                        onChange={(e) => setCDate(e.target.value)}
                        label="Date"
                        type="date"
                      />
                    </div>
                    <div className="-mt-10">
                      <InputField
                        value={cPaid}
                        onChange={(e) => setCPaid(e.target.value)}
                        label="Amount Paid (optional)"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-5 h-[calc(100vh-120px)] overflow-y-auto">
                  <div className="flex justify-between mb-2 -mt-1">
                    <p className="font-semibold">Items</p>
                    <ButtonAlt value={"+ Add Item"} onClick={addSelectedItem} />
                  </div>

                  {cSelectedItems.map((si, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                      <Select
                        className="w-7/12 -mt-5"
                        placeholder="Select Item"
                        value={
                          si.itemId
                            ? {
                                value: si.itemId,
                                label:
                                  items.find((it) => it.id === si.itemId)
                                    ?.name || "Item",
                              }
                            : null
                        }
                        options={items.map((it) => ({
                          value: it.id,
                          label: `${it.name} (${Number(
                            it.cost
                          ).toLocaleString()})`,
                        }))}
                        onChange={(opt) =>
                          updateSelectedItem(index, "itemId", opt.value)
                        }
                      />
                      <div className="-mt-6">
                        <InputField
                          type="number"
                          placeholder="Qty"
                          value={si.quantity}
                          onChange={(e) =>
                            updateSelectedItem(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeSelectedItem(index)}
                      >
                        X
                      </span>
                    </div>
                  ))}

                  <div className="mt-3 text-sm">
                    <p>
                      <strong>Total Amount: </strong>
                      {calculateCreateAmount().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-primary p-2 bg-gray1">
                <div onClick={() => setCreateModal(false)}>
                  <ButtonSecondary value={"Close"} />
                </div>
                <div className="w-36">
                  {posting ? (
                    <ButtonLoader />
                  ) : (
                    <div onClick={postOrder}>
                      <Button value={"Add Order"} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-1/4" onClick={() => setCreateModal(false)}></div>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {editModal && (
        <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
          <div className="w-3/12" onClick={closeEditModal}></div>
          <div className="w-6/12">
            <div className="rounded-lg bg-white mt-[5vh]">
              <div className="flex text-xl justify-between font-semibold text-primary p-2 bg-gray1">
                <div>
                  <p>Edit Order</p>
                </div>
                <div>
                  <p onClick={closeEditModal} className="cursor-pointer">
                    X
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 p-3 -mt-5">
                  <InputField
                    value={eName}
                    onChange={(e) => setEName(e.target.value)}
                    label="Customer Name"
                    placeholder="Enter Customer"
                  />
                  <InputField
                    value={ePhone}
                    onChange={(e) => setEPhone(e.target.value)}
                    label="Phone"
                    placeholder="Enter Phone"
                    type="text"
                  />
                  <InputField
                    value={eAddress}
                    onChange={(e) => setEAddress(e.target.value)}
                    label="Address"
                    placeholder="Enter Address"
                    type="text"
                  />
                  <InputField
                    value={eDate}
                    onChange={(e) => setEDate(e.target.value)}
                    label="Date"
                    placeholder=""
                    type="date"
                  />
                </div>
                <div className="w-1/2 p-3 -mt-5">
                  <label className="text-gray5 mt-2">Order Status</label>
                  <Select
                    className="w-full mt-2"
                    placeholder="Select Status"
                    value={
                      eStatus
                        ? statusOptions.find((st) => st.value === eStatus)
                        : null
                    }
                    onChange={(opt) => setEStatus(opt.value)}
                    options={statusOptions}
                  />
                </div>
              </div>

              <div className="flex justify-between text-primary p-2 bg-gray1">
                <div onClick={closeEditModal}>
                  <ButtonSecondary value={"Close"} />
                </div>
                <div className="w-32">
                  {updating ? (
                    <ButtonLoader />
                  ) : (
                    <div onClick={updateOrder}>
                      <Button value={"Update"} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-1/4" onClick={closeEditModal}></div>
          </div>
          <div className="w-3/12" onClick={closeEditModal}></div>
        </div>
      )}

      {/* UPDATE PAID MODAL */}
      {paidModal && (
        <div className="z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex">
          <div className="w-4/12" onClick={closePaidModal}></div>
          <div className="w-4/12">
            <div className="rounded-lg bg-white mt-[20vh]">
              <div className="flex text-xl justify-between font-semibold text-primary p-2 bg-gray1">
                <div>
                  <p>Update Paid Amount</p>
                </div>
                <div>
                  <p onClick={closePaidModal} className="cursor-pointer">
                    X
                  </p>
                </div>
              </div>

              <div className="p-4">
                <InputField
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  label="Paid Amount"
                  type="number"
                />
              </div>

              <div className="flex justify-between text-primary p-2 bg-gray1">
                <div onClick={closePaidModal}>
                  <ButtonSecondary value={"Close"} />
                </div>
                <div className="w-32">
                  {updatingPaid ? (
                    <ButtonLoader />
                  ) : (
                    <div onClick={updatePaidOnly}>
                      <Button value={"Update"} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12" onClick={closePaidModal}></div>
        </div>
      )}

      {/* ORDERS TABLE */}
      <div className=" -mt-4">
        <div className="bg-gray1 grid grid-cols-12 border-b text-sm">
          <div className="p-2">Order ID</div>
          <div className="p-2">Date</div>
          <div className="p-2">Name</div>
          <div className="p-2">Phone</div>
          <div className="p-2">Address</div>
          <div className="p-2">Amount</div>
          <div className="p-2">Paid</div>
          <div className="p-2">Balance</div>
          <div className="p-2">Status</div>
          <div className="p-2">Change Status</div>
          <div className="p-2">Items</div>
          <div className="p-2">Action</div>
        </div>
        <div className="h-[calc(100vh-205px)] overflow-y-auto">
          {orders.map((order) => (
            <div
              className="shadow-sm grid grid-cols-12 border-b border-gray1 cursor-pointer hover:shadow-md"
              key={order.id}
            >
              <div className="text-sm p-2 text-gray5">#{order.id} </div>
              <div className="p-2 text-sm text-gray5">{order.date}</div>
              <div className="text-sm p-2 text-gray5">{order.name}</div>
              <div className="text-sm p-2 text-gray5">{order.phone}</div>
              <div className="text-sm p-2 text-gray5">{order.address}</div>
              <div className="text-sm p-2 text-gray5">
                {Number(order.amount).toLocaleString()}
              </div>
              <div
                className="text-sm p-2 text-gray5 underline text-blue-600"
                onClick={() => openPaidModal(order)}
                title="Click to update paid"
              >
                {Number(order.paid).toLocaleString()}
              </div>
              <div className="text-sm p-2 text-gray5">
                {(Number(order.amount) - Number(order.paid)).toLocaleString()}
              </div>
              <div className="text-xs flex p-2 text-gray5">
                <div>
                  <span
                    className={
                      "p-1 text-xs mb-1 rounded-md border " +
                      getStatusClasses(order.orderStatus)
                    }
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              <div className="p-2">
                <Select
                  className="text-xs mt-1"
                  menuPortalTarget={document.body}
                  // styles={{
                  //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  //   control: (base) => ({ ...base, minHeight: "24px" }),
                  //   indicatorsContainer: (base) => ({ ...base, padding: 0 }),
                  //   valueContainer: (base) => ({
                  //     ...base,
                  //     padding: "0 4px",
                  //   }),
                  // }}
                  value={
                    statusOptions.find(
                      (st) => st.value === order.orderStatus
                    ) || null
                  }
                  onChange={(opt) => updateOrderStatus(order.id, opt.value)}
                  options={statusOptions}
                />
              </div>
              <div className="text-xs p-3 text-gray5">
                {order.items && order.items.length > 0
                  ? order.items
                      .map(
                        (oi) => `${oi.item?.name || "Item"} x ${oi.quantity}`
                      )
                      .join(", ")
                  : "No items"}
              </div>

              <div className="text-sm p-3 text-gray5 flex gap-2">
                <BsPrinter
                  onClick={() => printOrder(order)}
                  className="text-primary w-4 h-4"
                  title="Print"
                />
                <MdDeleteOutline
                  onClick={() => deleteOrder(order)}
                  className="text-red w-4 h-4"
                  title="Delete"
                />
                <BsPencilSquare
                  onClick={() => openEditModal(order)}
                  className="text-warning h-4 w-4"
                  title="Edit"
                />
              </div>
            </div>
          ))}
        </div>

        {/* LOADING + PAGINATION
        <div className="">
          {loading && (
            <div className="flex justify-center mt-[10vh]">
              <Loader />
            </div>
          )}
          <div className="flex justify-center">
            <ButtonAlt value={"Next >>"} onClick={() => setPage(page + 1)} />
          </div>
        </div> */}
      </div>

      {/* Hidden print container */}
      <div id="receipt-design" className="">
        <div className="p-6 bg-white text-gray-800 w-full">
          <div className="grid grid-cols-3 gap-2">
            <h5 className="text-md font-bold mb-4">
              Order #{selectedOrder?.id}
            </h5>
            <h5 className="text-md font-bold mb-4">
              Date #{selectedOrder?.date}
            </h5>
            <h5 className="text-md font-bold mb-4">Receipt</h5>
          </div>

          <h4 className="text-2xl font-bold mb-4">Laundry Business name</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>Address</p>
            <p>Phone</p>
          </div>
          <hr className="mb-2" />

          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <p>
              <strong>Date:</strong> {selectedOrder?.date}
            </p>
            <p>
              <strong>Name:</strong> {selectedOrder?.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder?.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder?.address}
            </p>
            <p>
              <strong>Status:</strong>
              <span className="p-2 bg-gray1">{selectedOrder?.orderStatus}</span>
            </p>
          </div>

          <h3 className="font-semibold mb-2">Items</h3>
          <div className="mb-4 list-disc list-inside text-sm">
            <div className="grid grid-cols-4 font-bold">
              <div className="p-2 border">Item</div>
              <div className="p-2 border">Qty</div>
              <div className="p-2 border">Cost</div>
              <div className="p-2 border">Total</div>
            </div>
            {selectedOrder?.items.map((oi) => (
              <div className="grid grid-cols-4" key={oi.itemId}>
                <div className="p-2 border">{oi.item.name}</div>
                <div className="p-2 border"> {oi.quantity}</div>
                <div className="p-2 border">
                  {oi.item.cost.toLocaleString()}
                </div>
                <div className="p-2 border">
                  {(oi.item.cost * oi.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Amount:</strong> {selectedOrder?.amount.toLocaleString()}
            </p>
            <p>
              <strong>Paid:</strong> {selectedOrder?.paid.toLocaleString()}
            </p>
            <p>
              <strong>Balance:</strong>{" "}
              {(selectedOrder?.amount - selectedOrder?.paid).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
