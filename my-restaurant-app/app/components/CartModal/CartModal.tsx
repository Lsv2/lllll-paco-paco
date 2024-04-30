import CartItemComponent from "../MenuItemComponent/CartItemComponent";
import "./CartModal.css"
import React, { useState, useEffect } from 'react'

interface CartItemProps {
    name: string;
    price: string;
    type: number;
    addedItems: IngredientItem[];
    removedItems: IngredientItem[];
}


interface IngredientItem {
    name: string,
    id: number,
    price: number
}

function CartModal({ setOpenModal }: { setOpenModal: any }) {


    const [cart, setCart] = useState<CartItemProps[]>(localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart") as string) : [])
    

    function calculateSubtotal(cart: CartItemProps[]): number {
        let subtotal = 0;
        cart.forEach((CartItem) => {
            subtotal += parseFloat(CartItem.price);
            if (CartItem.addedItems) {
                CartItem.addedItems.forEach((addon) => {
                    subtotal += addon.price;
                });
            }
        });
        return subtotal;
    }


    return (
        <div>
            <div className="container fixed bg-white border-w rounded-md my-5 z-[999] text-black h-3/5 w-96 mr-2 right-0 top-10 items-center">
                {cart.length !== 0 &&
                <div className="h-full">
                    <div className="h-5/6 overflow-y-auto">
                        {
                        cart.map((CartItem, index) => (
                                    <CartItemComponent
                                        key={index}
                                        name={CartItem.name}
                                        price={parseFloat(CartItem.price)}
                                        addedItems={CartItem.addedItems}
                                        removedItems={CartItem.removedItems}
                                        type={CartItem.type}
                                    />
                                ))}
                    </div>
                    <div className="font-bold ml-5 float-left" >
                        Subtotal: {calculateSubtotal(cart).toFixed(2)}$
                    </div>
                    <button className="font-semibold underline float-right mr-5" onClick={() => {setCart([]); localStorage.clear();}}>
                        clear cart
                    </button>

                    <button className="flex justify-center center bg-zinc-900 font-bold text-white border rounded-md border-white w-11/12 h-12 p-2 mx-auto mt-3 text-lg" onClick={() => { if(typeof window !== 'undefined') window.location.href = '/checkout'; setOpenModal(false)}}>
                        Check out
                    </button>
                </div>
                }
                {cart.length === 0 &&
                <div className="h-full">
                    <div className="h-5/6 overflow-y-auto p-10 "> 
                        Hungry? We have something for that...
                    </div>
                
                    <button className="font-semibold underline text-white float-right mr-5">
                        clear cart
                    </button>
    
                    <button className=" flex justify-center center bg-zinc-900 font-bold text-white border rounded-md border-white w-11/12 h-12 p-2 mx-auto mt-3 text-lg" onClick={() => { if(typeof window !== 'undefined') window.location.href = '/menu' }}>
                        Go to menu
                    </button>
                </div>
                }
            </div>
        </div>
    );
}

export default CartModal;