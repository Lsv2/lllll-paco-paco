"use client"
import React from "react";
import Translate from "../components/Translate/Translate";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItemComponent from "../components/MenuItemComponent/CartItemComponent";
import "./page.css"

interface CartItemProps {
    name: string;
    price: number;
    addedItems: IngredientItem[];
    removedItems: IngredientItem[];
    type: number;
}

interface IngredientItem {
    name: string,
    id: number,
    price: number
}


export default function CheckOut() {
    const [cart, setCart] = useState<CartItemProps[]>([])

    function calculateSubtotal(cart: CartItemProps[]): number {
        let subtotal = 0;
        cart.forEach((CartItem) => {
            subtotal += CartItem.price;
            if (CartItem.addedItems) {
                CartItem.addedItems.forEach((addon) => {
                    subtotal += addon.price;
                });
            }
        });
        return subtotal;
    }
    let subtotal = calculateSubtotal(cart)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
    }, []);

    const [cardNumber, setCardNumber] = useState("");
    const [cardholderName, setCardholderName] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (cardNumber && cardholderName && expirationDate && cvv) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [cardNumber, cardholderName, expirationDate, cvv]);

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value);
    };

    const handleCardholderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardholderName(event.target.value);
    };

    const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(event.target.value);
    };

    const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCvv(event.target.value);
    };

    const handleCheckout = () => {
        const cartItemNames: string[] = [];
        const drinkNames: string[] = [];
        const addOns: string[] = [];
        const removedItems: string[] = [];

        cart.forEach((CartItem) => {
            if (CartItem.type === 2) {
                cartItemNames.push(CartItem.name);
            } else if (CartItem.type === 1) {
                drinkNames.push(CartItem.name.split(' ')[0]);
            }
            CartItem.addedItems.forEach((Ingredient) => {
                addOns.push(Ingredient.name);
            })
            CartItem.removedItems.forEach((Ingredient) => {
                removedItems.push(Ingredient.name);
            })
        });
        console.log(JSON.stringify({ cartItemNames, drinkNames, addOns, removedItems }));
        fetch(' https://csce-331-project-3-10.onrender.com/new_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cartItemNames,drinkNames, addOns, removedItems})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send order');
            }
            else {
                localStorage.clear();
            }
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            alert(data.orderId)
            localStorage.clear()
            if(typeof window !== undefined) {
                window.location.href = "/";
            }
        });
    };

    return (
        <main className="bg-zinc-200 text-black h-screen">
            <div className='fixed right-0 bottom-0 z-[999]'>
                <Translate></Translate>
            </div>
            <div>
                <div className='flex w-100vw bg-white text-black'>
                    <Link className='text-[25px] mt-[14px] ml-[16px] text-bold' href="/" passHref>
                        PACO PACO
                    </Link>
                    <Link className='text-[25px] mt-[14px] ml-[16px] text-semibold' href="/menu">
                        {"<"} Back to Menu
                    </Link>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between h-5/6 flex-wrap p-20">
                <h1 className=" w-full text-[50px] text-black">CHECK OUT</h1>
                <div className="flex  flex-col justify-around relative border-zinc-400 border-2 rounded-lg w-2/5 h-full">
                    <h2 className="flex flex-row items-center justify-items-center h-28 w-full text-[25px]">
                        <div className="border-b-2 border-zinc-400 w-full p-5">
                            MY CART
                        </div>
                    </h2>
                    <div className="h-4/5 overflow-y-auto">
                        {cart.map((CartItem, index) => (
                            <CartItemComponent
                                key={index}
                                name={CartItem.name}
                                price={CartItem.price}
                                addedItems={CartItem.addedItems}
                                removedItems={CartItem.removedItems}
                                type={CartItem.type}
                            />
                        ))}
                    </div>
                    <footer className="flex flex-col items-start justify-items-start h-28 w-full text-md p-5 text-gray-700">
                        <div className="w-full flex flex-row font-bold">
                            <div className="">
                                Subtotal:
                            </div>
                            <div className="ml-auto">
                                {subtotal.toFixed(2)}$
                            </div>
                        </div>
                        <div className="w-full flex flex-row font-semibold border-b-2 border-zinc-400 border-dashed">
                            <div>
                                Tax:
                            </div>
                            <div className="ml-auto">
                                {(subtotal * 0.08).toFixed(2)}$
                            </div>
                        </div>
                        <div className="w-full flex flex-row font-bold text-black text-lg">
                            <div>
                                Order Total:
                            </div>
                            <div className="ml-auto">
                                {(subtotal * 1.08).toFixed(2)}$
                            </div>
                        </div>
                    </footer>
                </div>
                <div className="flex flex-col relative border-zinc-400 border-2 rounded-lg w-1/2 h-3/4">
                    <h2 className="flex flex-row items-center justify-items-center h-28 w-full text-[25px]">
                        <div className="border-b-2 border-zinc-400 w-full p-5">
                            CREDIT CARD INFORMATION
                        </div>
                    </h2>
                    <div className="flex flex-col p-5">
                        <label className="text-lg font-semibold mb-2">Card Number</label>
                        <input type="text" className="border border-gray-300 p-2 rounded-md" value={cardNumber} onChange={handleCardNumberChange} />
                    </div>
                    <div className="flex flex-col p-5">
                        <label className="text-lg font-semibold mb-2">Cardholder Name</label>
                        <input type="text" className="border border-gray-300 p-2 rounded-md" value={cardholderName} onChange={handleCardholderNameChange} />
                    </div>
                    <div className="flex flex-row p-5">
                        <div className="flex flex-col mr-5">
                            <label className="text-lg font-semibold mb-2">Expiration Date</label>
                            <input type="text" className="border border-gray-300 p-2 rounded-md" value={expirationDate} onChange={handleExpirationDateChange} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold mb-2">CVV</label>
                            <input type="text" className="border border-gray-300 p-2 rounded-md" value={cvv} onChange={handleCvvChange} />
                        </div>
                    </div>
                    <button className={`py-2 px-4 rounded-md mt-4 ${isFormValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'}`} onClick={handleCheckout} disabled={!isFormValid}>
                        Checkout
                    </button>
                </div>
            </div>
        </main>
    );
}
