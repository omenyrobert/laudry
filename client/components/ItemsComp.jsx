import React, { useEffect, useState } from "react";
import ButtonAlt from "./ButtonAlt";
import InputField from "./InputField";
import Button from "./Button";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Select from "react-select";
import axiosInstance from "../axios-instance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonLoader from "./ButtonLoader";
import Loader from "./Loader";
import Button2 from "./Button2";
import ButtonSecondary from "./ButtonSecondary";

const ItemsComp = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [modal2, setModal2] = useState(false);

  const openModal2 = (item) => {
    seteName(item.name);
    setecost(item.cost);
    setModal2(true);
    setId(item.id);
  };

  // posting sales
  const [updating, setUpdating] = useState(false);
  const [ename, seteName] = useState("");
  const [ecost, setecost] = useState("");
  const [id, setId] = useState("");

  const updateitem = async () => {
    if (
      ename === "" ||
      ecost === "" 
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    try {
      setUpdating(true);
      let formData = {
        itemId: id,
        name: ename,
        cost: ecost
      };
      console.log('update items',formData);
      let res = await axiosInstance.put("/items", formData);
      console.log('update items',res);
      if (res.data.status) {
        setUpdating(false);
        seteName("");
        setecost("");
        setId("");
        closeModal2();
        fetchitems();
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } catch (error) {
    } finally {
      setUpdating(false);
    }
  };

  const closeModal2 = () => {
    setModal2(false);
  };

  // posting sales
  const [posting, setPosting] = useState(false);
  const [name, setName] = useState("");
  const [cost, setcost] = useState("");

  const postitem = async () => {
    // alert(type)
    if (
      name !== "" &&
      cost !== ""
    ) {
      try {
        setPosting(true);
        let formData = {
          name: name,
          cost: cost
        };
        let res = await axiosInstance.post("/items", formData);
        if (res.status) {
          setPosting(false);
          setName("");
          setcost("");
          fetchitems();
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            icon: "success",
            showConfirmButton: false,
            timer: 500,
          });
        }
      } catch (error) {
      } finally {
        setPosting(false);
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const [itemData, setitemData] = useState([]);
  const [total, setTotal] = useState("");
  const fetchitems = async () => {
    try {
      setLoading(true);
      let res = await axiosInstance.get("/items");
      if (res.status) {
        setLoading(false);
        setitemData(res.data.payload);
        const sumOfAges = res.data.payload.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue.cost;
          },
          0
        );

        setTotal(sumOfAges);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchitems();
  }, []);

  const deleteitem = (item) => {
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
          const response = await axiosInstance.post(
            `/items/${item.id}`
          );
          const { data } = response;
          const { status } = data;
          if (status) {
            fetchitems();
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

  const types = [
    { label: "Utility", value: "Utility" },
    { label: "Meals", value: "Meals" },
    { label: "Commissions", value: "Commissions" },
    { label: "Causal Labour", value: "Labour" },
    { label: "Transport", value: "Transport" },
  ];

  return (
    <div className="p-2 bg-white rounded-md">
      {/* edit modal */}
      {modal2 ? (
        <div className="absolute z-50 w-[400px] shadow-xl bg-white rounded-md">
          <div className="flex p-3 justify-between bg-gray1 font-medium text-primary">
            <div>Edit item</div>
            <div>
              <p className="cursor-pointer" onClick={closeModal2}>
                X
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 p-2">
              <InputField
                value={ename}
                onChange={(e) => seteName(e.target.value)}
                label="name"
                type="text"
              />
            </div>
            <div className="w-1/2 p-2">
              <InputField
                value={ecost}
                onChange={(e) => setecost(e.target.value)}
                label="cost"
                type="number"
                placeholder="Enter cost"
              />
            </div>
           
          </div>
          

          <div className="flex p-3 justify-between bg-gray1 font-medium text-primary">
            <div onClick={closeModal2}>
              <ButtonSecondary value={"Close"} />
            </div>
            <div className="w-32">
              {updating ? (
                <ButtonLoader />
              ) : (
                <div onClick={updateitem}>
                  <Button value={"Update"} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <p className="text-xl font-semibold">items</p>
      </div>
      <div className="grid grid-cols-3 -mt-8">
        <div className=" p-2">
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Item"
            placeholder="Item Name"
            type="text"
          />
        </div>
        <div className=" p-2">
          <InputField
            label="cost"
            value={cost}
            onChange={(e) => setcost(e.target.value)}
            type="number"
            placeholder="Enter cost"
          />
        </div>

        <div className="w-32 mt-14">
          {posting ? (
            <ButtonLoader />
          ) : (
            <div onClick={postitem}>
              <Button value={"Add"} />
            </div>
          )}
        </div>
      </div>

      <div className="flex bg-gray1 font-medium">
        <div className="w-1/3 p-2">Item</div>
        <div className="w-1/3 p-2">Cost</div>
        <div className="w-1/3 p-2">Action</div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          {" "}
          <Loader />{" "}
        </div>
      ) : null}

      <div className="h-[calc(100vh-310px)] overflow-y-auto">
        {itemData.map((item) => {
          return (
            <div className="flex hover:bg-gray1 text-sm text-gray5 border-b border-gray1 cursor-pointer">
             
              <div className="w-1/3 p-2">{item.name}</div>
              <div className="w-1/3 p-2">{item.cost?.toLocaleString()}</div>
              <div className="w-1/3 p-2">{item.type}</div>
              <div className="w-1/3 flex p-2">
                <BsTrash
                  onClick={() => deleteitem(item)}
                  className="text-red"
                />
                <BsPencilSquare
                  onClick={() => openModal2(item)}
                  className="text-yellow ml-5"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex bg-secondary text-white font-medium mt-2">
        <div className="w-1/3 p-2">Total</div>
        <div className="w-1/3 p-2"></div>
        <div className="w-1/3 p-2">{total.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default ItemsComp;
