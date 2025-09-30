import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button2 from "../components/Button2";
import { BsFileMinus, BsPlus, BsSearch } from "react-icons/bs";
import { TbMinus } from "react-icons/tb"
import ButtonAlt from "../components/ButtonAlt";
import ButtonSecondary from "../components/ButtonSecondary";
import TodaySales from "../components/TodaySales";
import Select from "react-select"
import Expenses from "../components/Expenses";
import { useDispatch, useSelector } from "react-redux"
import { getCustomers, getStock } from "../store/slices/store";
import axiosInstance from "../axios-instance";
import { useFeedback } from "../hooks/feedback";


const Sales = () => {
    const dispatch = useDispatch()
    const { stock, customers, loading, allStock } = useSelector((state) => state.autocountStore)
    const [cart, setCart] = useState([])
    const { toggleFeedback } = useFeedback()
    const [customerOptions, setCustomerOptions] = useState([])

    useEffect(() => {
        const options = customers.map((customer) => {
            return {
                value: customer.id,
                label: customer.name,
                ...customer
            }
        })
        setCustomerOptions(options)
    }, [customers])

    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getStock(page))
    }, [dispatch, page])


    // Function to add an item to the cart
    const addItemToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    // Function to remove an item from the cart
    const removeItemFromCart = (item) => {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
        setCart(updatedCart);
    };


    // Function to decrease the qty of an item in the cart
    const decreaseItemqty = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem && existingItem.quantity > 1) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            removeItemFromCart(item);
        }
    };

    // Function to calculate the total price of items in the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.unitSell * item.quantity), 0);
    };


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const [makeSaleLoading, setMakeSaleLoading] = useState(false)
    const [customerId, setCustomerId] = useState(null)
    const [paymentDate, setPaymentDate] = useState("")

    async function makeSale() {
        if (cart.length === 0) {
            toggleFeedback("error", {
                title: "Error",
                text: "Please add items to the cart",
            })
            return
        }
        if (customerId && paymentDate === "") {
            toggleFeedback("error", {
                title: "Error",
                text: "Please select a payment date",
            })
            return
        }

        try {
            setMakeSaleLoading(true)
            const res = await axiosInstance.post("/sales", {
                sales: cart,
                customerId: customerId,
                paymentDate: paymentDate
            })
            const { status, payload } = res.data
            if (status) {
                toggleFeedback("success", {
                    title: "Success",
                    text: "Sale made successfully",
                })
                setMakeSaleLoading(false)
                setCart([])
            } else {
                toggleFeedback("error", {
                    title: "Error",
                    text: payload,
                })
                setMakeSaleLoading(false)
            }
        } catch (error) {
            toggleFeedback("error", {
                title: "Error",
                text: error.message
            })
            setMakeSaleLoading(false)
        }
    }

    // implement search 
    const [search, setSearch] = useState("")
    const [filteredStock, setFilteredStock] = useState([])

    useEffect(() => {
        if (search === "") {
            setFilteredStock(stock)
            return
        }
        const filtered = stock.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredStock(filtered)
    }, [search, stock])




    return (
        <div className="flex w-full">
            <div className="w-[55%] rounded-md shadow bg-white h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="w-full flex justify-between">
                    <div className=''>
                        <h1 className="text-secondary font-semibold text-xl mt-5 ml-3">
                            Stock
                        </h1>
                    </div>

                    <div className="w-72 mx-5">

                        <InputField
                            type="text"
                            placeholder="Search For Student ..."
                            name="lastName"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            icon={
                                <BsSearch
                                    className="w-3 -ml-7 mt-3 cursor-pointer"
                                    type="button"
                                />
                            }
                        />
                    </div>
                    <div className="mt-6 mr-2">
                        <Expenses />
                    </div>
                </div>
                {filteredStock.map((item) => {
                    return (
                        <div onClick={() => addItemToCart({
                            ...item,
                            date: new Date().toISOString().slice(0, 10),
                            stockId: item.id,
                        })} className="flex border cursor-pointer border-gray2 m-2 rounded-md p-2 hover:bg-gray1 justify-between">
                            <div>
                                <p className="">{item.name}</p>
                                <p className="text-sm text-gray5">{item.category?.type}</p>
                            </div>
                            <div>
                                <p className="font-bold">
                                    {item.qty.toLocaleString()}
                                </p>
                            </div>


                        </div>
                    )
                })}

                <div className="flex justify-center">
                    {
                        loading.stock ? (
                            <div className="bg-primary p-2 rounded-md text-white cursor-pointer">
                                Loading...
                            </div>
                        ) :
                            stock.length === allStock.length ? null :
                                (
                                    <div onClick={() => setPage(page + 1)} className="bg-primary p-2 rounded-md text-white cursor-pointer">
                                        Next
                                    </div>
                                )
                    }

                </div>

            </div>
            <div className="w-[45%] rounded-md shadow bg-white  ml-2">
                <div className="flex justify-between">
                    <div>
                        <Select
                            className="w-full mt-2 ml-2"
                            placeholder="Select Customer"
                            options={customerOptions}
                            onChange={(e) => setCustomerId(e.id)}
                        />
                    </div>
                    <div className="-mt-3">
                        <InputField
                            type="date"
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                    </div>

                    <TodaySales />
                </div>
                <div className="h-[calc(100vh-230px)] overflow-y-auto">
                    {cart.map((item) => {
                        return (
                            <div className="m-2 cursor-pointer p-2 bg-gray1 rounded-md flex">
                                <div className="w-4/12">
                                    <p>{item.name}</p>
                                </div>
                                <div className="w-4/12">
                                    {(item.unitSell * item.quantity).toLocaleString()}
                                </div>
                                <div className="w-4/12 flex">
                                    <div className="flex ml-5">
                                        <div onClick={() => decreaseItemqty(item)} className="p-1 rounded-full bg-primary my-1">
                                            <TbMinus className="text-white text-lg" />
                                        </div>
                                        <p className="mx-3 mt-1">{item.quantity}</p>
                                        <div onClick={() => addItemToCart(item)} className="p-1 rounded-full bg-primary my-1">
                                            <BsPlus className="text-white text-lg" />
                                        </div>


                                        <div>
                                            <p onClick={() => removeItemFromCart(item)} className="text-red text-xl ml-4 mr-2">X</p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    })}


                </div>
                <div className="flex justify-between p-3 bg-primary text-white">
                    {
                        makeSaleLoading ? (
                            <div className="bg-black rounded-md p-2 cursor-pointer">
                                Loading...
                            </div>
                        ) : (
                            <div onClick={makeSale} className="bg-black rounded-md p-2 cursor-pointer">
                                Make Sale
                            </div>
                        )
                    }

                    <div>

                    </div>
                    <p className="text-xl font-semibold">Total: {(calculateTotal()).toLocaleString()}</p>

                </div>


            </div>

        </div>
    )
}

export default Sales