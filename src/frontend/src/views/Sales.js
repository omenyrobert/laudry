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


const Sales = () => {

    const [cart, setCart] = useState([])

    // Function to add an item to the cart
    const addItemToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, qty: cartItem.qty + 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
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

        if (existingItem && existingItem.qty > 1) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, qty: cartItem.qty - 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            removeItemFromCart(item);
        }
    };

    // Function to calculate the total price of items in the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.qty, 0);
    };


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const products = [
        { id: 1, name: "6 Inched Nail", cate: "Paint", qty: 200, price: 250000 },
        { id: 2, name: "Sadonlin 2ltr ", cate: "Cement", qty: 20, price: 50000 },
        { id: 3, name: "Regal Paint", cate: "cate B", qty: 100, price: 100000 },
        { id: 4, name: "Padlock", cate: "cate B", qty: 80, price: 120000 },
        { id: 5, name: "Iron Sheet", cate: "cate A", qty: 120, price: 70000 },
        { id: 6, name: "2 Inched Nail", cate: "cate B", qty: 50, price: 20000 },
        { id: 7, name: "Wires", cate: "cate A", qty: 400, price: 40000 },
        { id: 8, name: "Cement", cate: "cate B", qty: 50, price: 250000 },
        { id: 9, name: "Hoes", cate: "cate B", qty: 90, price: 250000 },
        { id: 10, name: "Spade", cate: "cate B", qty: 40, price: 250000 },
        { id: 11, name: "Travel", cate: "cate B", qty: 30, price: 250000 },
        { id: 12, name: "Garden tool", cate: "cate B", qty: 80, price: 15000 },
        { id: 13, name: "6 Inched Nail", cate: "cate B", qty: 90, price: 10000 },
        { id: 14, name: "6 Inched Nail", cate: "cate A", qty: 100, price: 150000 },
        { id: 15, name: "6 Inched Nail", cate: "cate B", qty: 120, price: 20000 },
    ]

    return (
        <div className="flex w-full">
            <div className="w-[55%] rounded-md shadow bg-white h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="w-full flex justify-between">
                    <div className=''>
                        <h1 className="text-secondary font-semibold text-xl mt-5 ml-3">
                            Products
                        </h1>
                    </div>

                    <div className="w-72 mx-5">

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
                    <div className="mt-6 mr-2">
                        <Expenses />
                    </div>
                </div>
                {products.map((item) => {
                    return (
                        <div onClick={() => addItemToCart(item)} className="flex border cursor-pointer border-gray2 m-2 rounded-md p-2 hover:bg-gray1 justify-between">
                            <div>
                                <p className="">{item.name}</p>
                                <p className="text-sm text-gray5">{item.cate}</p>
                            </div>
                            <div>
                                <p className="font-bold">
                                    {item.qty}
                                </p>
                            </div>


                        </div>
                    )
                })}

            </div>
            <div className="w-[45%] rounded-md shadow bg-white  ml-2">
                <div className="flex justify-between">
                    <div>
                        <Select
                            className="w-full mt-2 ml-2"
                            placeholder="Select Customer"
                            options={[
                                { value: 'Omeny Robert', label: 'Omeny Robert' },
                                { value: 'William Omiel', label: 'William Omiel' },
                                { value: 'Mujuni Brian', label: 'Mujuni Brian' },
                            ]}
                        />
                    </div>
                    <div className="-mt-3">
                        <InputField type="date" />
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
                                    {(item.price * item.qty).toLocaleString()}
                                </div>
                                <div className="w-4/12 flex">
                                    <div className="flex ml-5">
                                        <div onClick={() => decreaseItemqty(item)} className="p-1 rounded-full bg-primary my-1">
                                            <TbMinus className="text-white text-lg" />
                                        </div>
                                        <p className="mx-3 mt-1">{item.qty}</p>
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
                    <div className="bg-black rounded-md p-2 cursor-pointer">
                        Make Sale
                    </div>
                    <div>

                    </div>
                    <p className="text-xl font-semibold">Total: {(calculateTotal()).toLocaleString()}</p>

                </div>


            </div>

        </div>
    )
}

export default Sales