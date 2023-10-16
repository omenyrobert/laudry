import React, { useState, useEffect } from "react";
import Button2 from "../components/Button2";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import { BsEye, BsPencilSquare, BsPlusCircle, BsSearch } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import ButtonAlt from "../components/ButtonAlt";
import "../assets/styles/main.css"
import Select from "react-select"
import Category from "../components/Category";
import axiosInstance from "../axios-instance";
import ButtonLoader from "../components/ButtonLoader";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Stock = () => {

    const [modal, setModal] = useState(false)

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }







    const [modal2, setModal2] = useState(false)

    const openModal2 = (stock) => {
        setModal2(true);
        seteName(stock.name);
        seteQty(stock.qty);
        seteUnitCost(stock.unitCost);
        seteUnitSell(stock.unitSell);
        seteWarningAt(stock.warningAt);
        setStockId(stock.id);
        // seteCategoryId(stock.category.id);
        seteDate(stock.date);
        console.log('ddate', stock.date);
    }

    const closeModal2 = () => {
        setModal2(false);
    }

    // stock input values
    const [ename, seteName] = useState("");
    const [eqty, seteQty] = useState("");
    const [edate, seteDate] = useState("");
    const [eunitcost, seteUnitCost] = useState("");
    const [eunitsell, seteUnitSell] = useState("");
    const [ewarningAt, seteWarningAt] = useState("");
    const [ecategoryId, seteCategoryId] = useState("");
    const [updating, setUpdating] = useState("");

    const updatePost = async () => {
        try {
            setUpdating(true)
            let formData = {
                name: ename,
                qty: eqty,
                date: edate,
                unitCost: eunitcost,
                unitSell: eunitsell,
                warningAt: ewarningAt,
                categoryId: ecategoryId,
                id: stockId,
            }
            let res = await axiosInstance.put("/stock", formData)
            if (res.status) {
                setUpdating(false)
                seteName("");
                seteQty("");
                seteUnitCost("");
                seteUnitSell("");
                seteWarningAt("");
                seteCategoryId("");
                seteDate("");
                fetchstocks();
                closeModal2();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: "success",
                    showConfirmButton: false,
                    timer: 500,
                });
            } else {
                setUpdating(false)
            }
        } catch (error) {
            console.log(error)
            setUpdating(false)
        } finally {
            setUpdating(false)
        }
    }


    // stock input values
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [date, setDate] = useState("");
    const [unitcost, setUnitCost] = useState("");
    const [unitsell, setUnitSell] = useState("");
    const [warningAt, setWarningAt] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [posting, setPosting] = useState("");

    const postStock = async () => {
        if (name !== "" && qty !== "" && date !== "" && unitcost !== "" && unitsell !== "" && warningAt !== "" && categoryId !== "") {
            try {
                setPosting(true)
                let formData = {
                    name: name,
                    qty: qty,
                    date: date,
                    unitCost: unitcost,
                    unitSell: unitsell,
                    warningAt: warningAt,
                    categoryId: categoryId
                }
                let res = await axiosInstance.post("/stock", formData)
                if (res.status) {
                    setPosting(false)
                    setName("");
                    setQty("");
                    setUnitCost("");
                    setUnitSell("");
                    setWarningAt("");
                    setCategoryId("");
                    setDate("");
                    closeModal();
                    fetchstocks();
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: "success",
                        showConfirmButton: false,
                        timer: 500,
                    });
                } else {
                    setPosting(false)
                }
            } catch (error) {
                console.log(error)
                setPosting(false)
            } finally {
                setPosting(false)
            }
        }
    }

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        let res = await axiosInstance.get("/categories");
        if (res.status) {
            let data = res.data.payload;
            let newArray = []
            data.forEach((dat) => {
                let obj = {
                    value: dat.type,
                    label: dat.type,
                    id: dat.id,
                }
                newArray.push(obj);
            })
            setCategories(newArray)
            console.log('catts', categories)

        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const [loading, setLoading] = useState(false)

    const [stocks, setstocks] = useState([]);

    const fetchstocks = async () => {
        try {
            setLoading(true)
            let res = await axiosInstance.get("/stock");
            if (res.status) {
                setLoading(false);
                setstocks(res.data.payload);
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchstocks()
    }, []);



    const deleteStock = (stock) => {
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
                        `/stock/${stock.id}`
                    );
                    const { data } = response;
                    const { status } = data;
                    if (status) {
                        fetchstocks()
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


    const [restocking, setRestocking] = useState(false)

    const [modal4, setModal4] = useState(false)
    const [stockId, setStockId] = useState("");
    const [stock, setStock] = useState("");

    const openModal4 = (stock) => {
        setModal4(true);
        setStockId(stock.id)
        setStock(stock.product)
    }

    const closeModal4 = () => {
        setModal4(false);
    }

    const restock = async () => {
        if (date && qty && unitcost && stockId) {
            try {
                setRestocking(true)
                let formData = {
                    date: date,
                    qty: qty,
                    unitcost: unitcost,
                    unitsell: unitsell,
                    stockId: stockId,
                }
                let res = await axiosInstance.post("/restock", formData);
                if (res.status === "SUCCESS") {
                    setDate("");
                    setQty("");
                    setUnitCost("");
                    setUnitSell("")
                    setRestocking(false)
                }

            } catch (error) {

            } finally {
                setRestocking(false)
            }
        }

    }

    return (
        <div className="w-full bg-white rounded-md shadow pr-5">

            {/* stock modal */}

            {modal4 ? <div className="w-[600px] ml-[30vw] -mt-[5vh] z-50 absolute bg-white shadow-2xl rounded-md border border-gray2">
                <div className="flex bg-gray1 text-lg text-primary p-3 font-medium justify-between">
                    <div>
                        <p>Add More Stock</p>
                    </div>
                    <div>
                        {stock}
                    </div>
                    <div>
                        <p className="cursor-pointer" onClick={closeModal4}>X</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 p-2">
                        <InputField value={date} onChange={(e) => setDate(e.target.value)} label="date" type="date" />
                    </div>
                    <div className="w-1/2 p-2">
                        <InputField value={qty} onChange={(e) => setQty(e.target.value)} label="Qty" placeholder="Enter qty" type="number" />
                    </div>

                </div>
                <div className="flex">
                    <div className="w-1/2 p-2">
                        <InputField value={unitcost} onChange={(e) => setUnitCost(e.target.value)} label="Unitcost" type="number" placeholder="enter Unitcost" />
                    </div>
                    <div className="w-1/2 p-2">
                        <InputField value={unitsell} onChange={(e) => setUnitSell(e.target.value)} label="unitSell" placeholder="Enter UNitSell" type="number" />
                    </div>

                </div>
                <div className="flex bg-gray1 text-primary p-3 justify-between">
                    <div onClick={closeModal4}>
                        <ButtonSecondary value={"Close"} />
                    </div>
                    <div className="w-20">
                        {restocking ? <ButtonLoader /> : <div onClick={restock}>
                            <Button value={"Add"} />
                        </div>}


                    </div>
                </div>
            </div> : null}



            <div className="flex w-full justify-between">
                <div className='flex'>
                    <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
                        Stock
                    </h1>
                </div>
                <div className="w-4/12 ">
                    <InputField
                        type="text"
                        placeholder="Search For Student ..."
                        name="lastName"
                        icon={
                            <BsSearch
                                className="w-3 -ml-7 mt-3 cursor-pointer"
                                type="button"
                            />
                        }
                    />
                </div>
                <div className="flex mt-5">
                    <div className="" onClick={openModal}>
                        <Button2 value={"Stock"} />
                    </div>
                    <div className="ml-5">
                        <Category />
                    </div>
                </div>
            </div>


            {modal ? <div className='z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex'>
                <div className='w-3/12' onClick={closeModal}>

                </div>
                <div className='w-6/12'>
                    <div className='rounded-lg bg-white mt-[5vh]'>
                        <div className='flex text-xl justify-between font-semibold text-primary p-2 bg-gray1'>
                            <div>
                                <p>Add Stock</p>
                            </div>
                            <div>
                                <p onClick={closeModal} className='cursor-pointer'>X</p>
                            </div>

                        </div>
                        <div className='flex'>
                            <div className='w-1/2 p-3 -mt-5'>
                                <InputField value={name} onChange={(e) => setName(e.target.value)} label="Product Name" placeholder="Enter Product" />
                                <InputField value={date} onChange={(e) => setDate(e.target.value)} label="Date" placeholder="" type="date" />
                                <label className="text-gray5 mt-2">Category</label>
                                <Select
                                    className="w-full mt-2"
                                    placeholder="Select Category"
                                    options={categories}
                                    onChange={(categories) => setCategoryId(categories.id)}
                                />
                            </div>
                            <div className='w-1/2 p-3 -mt-5'>
                                <InputField value={qty} onChange={(e) => setQty(e.target.value)} label="Qty" type="number" placeholder="Enter qty" />
                                <InputField value={unitcost} onChange={(e) => setUnitCost(e.target.value)} type="number" label="Unitcost" placeholder="Unitcost" />
                                <InputField value={unitsell} onChange={(e) => setUnitSell(e.target.value)} type="number" label="Unit Sell" placeholder="UnitSell" />
                                <InputField value={warningAt} onChange={(e) => setWarningAt(e.target.value)} type="number" label="Warning At" placeholder="Warning At" />
                            </div>

                        </div>

                        <div className=' justify-between flex text-primary p-2 bg-gray1'>
                            <div onClick={closeModal}>
                                <ButtonSecondary value={"Close"} />

                            </div>
                            <div className="w-36">
                                {posting ? <ButtonLoader /> : <div onClick={postStock}>
                                    <Button value={"Add Stock"} />
                                </div>}

                            </div>

                        </div>

                    </div>
                    <div className='h-1/4' onClick={closeModal}>

                    </div>

                </div>
                <div className='w-3/12' onClick={closeModal}>

                </div>

            </div> : null}


            <div className="h-[70vh] overflow-y-auto">

                <table className="mt-4 w-[98%]  table-auto mx-2">

                    <thead className="bg-gray1">
                        <th className="p-2 text-primary text-sm text-left">Date</th>
                        <th className="p-2 text-primary text-sm text-left">Product</th>
                        <th className="p-2 text-primary text-sm text-left">Unit Cost</th>
                        <th className="p-2 text-primary text-sm text-left">Unit Selling</th>
                        <th className="p-2 text-primary text-sm text-left">Qty</th>
                        <th className="p-2 text-primary text-sm text-left">Category</th>
                        <th className="p-2 text-primary text-sm text-left">Action</th>
                    </thead>
                    <tbody>

                        {stocks.map((stock) => {
                            return (
                                <tr
                                    className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
                                    key={stock.id}
                                >
                                    <td className="text-sm p-3 text-gray5">{stock.date}</td>
                                    <td className="p-3 text-sm text-gray5"> {stock.name} </td>
                                    <td className="text-sm p-3 text-gray5">{stock.unitCost}</td>
                                    <td className="text-sm p-3 text-gray5">{stock.unitSell}</td>
                                    <td className="text-sm p-3 text-gray5">{stock.qty}</td>
                                    <td className="text-sm p-3 text-gray5">{stock?.cat}</td>
                                    <td className="text-sm p-3 text-gray5 flex">
                                        <MdDeleteOutline
                                            onClick={(e) => deleteStock(stock)}
                                            className="text-red w-4 h-4"
                                        />
                                        <BsPencilSquare
                                            onClick={() => openModal2(stock)}
                                            className="text-warning h-4 w-4 mx-5"
                                        />

                                        <BsPlusCircle onClick={() => openModal4(stock)} className="bg-primary text-xl text-white rounded-full" />


                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
                {loading ? <div className="flex justify-center mt-[10vh]"> <Loader />  </div> :
                    null}
            </div>


            {modal2 ? <div className='z-50 bg-black/50 h-full w-full top-0 right-0 left-0 absolute flex'>
                <div className='w-3/12' onClick={closeModal2}>

                </div>
                <div className='w-6/12'>
                    <div className='rounded-lg bg-white mt-[5vh]'>
                        <div className='flex text-xl justify-between font-semibold text-primary p-2 bg-gray1'>
                            <div>
                                <p>Edit Stock</p>
                            </div>
                            <div>
                                <p onClick={closeModal2} className='cursor-pointer'>X</p>
                            </div>

                        </div>
                        <div className='flex'>
                            <div className='w-1/2 p-3 -mt-5'>
                                <InputField value={ename} onChange={(e) => seteName(e.target.value)} label="Product Name" placeholder="Enter Product" />
                                <InputField value={edate} onChange={(e) => seteDate(e.target.value)} label="Date" placeholder="" type="date" />
                                <label className="text-gray5 mt-2">Category</label>
                                <Select
                                    className="w-full mt-2"
                                    placeholder="Select Category"
                                    options={categories}
                                    onChange={(categories) => seteCategoryId(categories.id)}
                                />


                            </div>
                            <div className='w-1/2 p-3 -mt-5'>
                                <InputField value={eqty} onChange={(e) => seteQty(e.target.value)} label="Qty" placeholder="Enter qty" />
                                <InputField value={eunitcost} onChange={(e) => seteUnitCost(e.target.value)} label="Unitcost" placeholder="Unitcost" />
                                <InputField value={eunitsell} onChange={(e) => seteUnitSell(e.target.value)} label="Unit Sell" placeholder="UnitSell" />
                                <InputField value={ewarningAt} onChange={(e) => seteWarningAt(e.target.value)} label="Warning At" placeholder="Warning At" />
                            </div>
                        </div>

                        <div className='flex justify-between text-primary p-2 bg-gray1'>
                            <div onClick={closeModal2}>
                                <ButtonSecondary value={"Close"} />

                            </div>
                            <div className="w-32">
                                {updating ? <ButtonLoader /> : <div onClick={updatePost}>
                                    <Button value={"Update"} />
                                </div>}


                            </div>

                        </div>

                    </div>
                    <div className='h-1/4' onClick={closeModal2}>

                    </div>

                </div>
                <div className='w-3/12' onClick={closeModal2}>

                </div>

            </div> : null}




            <br />
        </div>
    )
}

export default Stock