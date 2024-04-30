'use client'
import React from "react"
import {useState, useEffect} from "react"
import "./MenuItemModal.css"
import IncludedIngredientComp from "../IncludedIngredientComponent/IncludedIngredientComponet"
import AddOnIngredientComp from "../AddOnIngredientComponent/AddOnIngredientComponent"

interface IngredientItem {
    name: string,
    id: number,
    price: number,
    stock?: number
}

interface ModalItemProps {
    setOpenModal: any;
    name: string;
    price: string;
    altTxt: string;
    calorie: number;
    id: number;
    includedIngredients: IngredientItem[];
    addOns: IngredientItem[];
    thisOnClick: any;
    setCartModal: any;
}





function MenuItemModal({setOpenModal, name, price, altTxt, calorie, id, includedIngredients, addOns, thisOnClick , setCartModal}: ModalItemProps) {
    const[addedItems, setAddedItems] = useState<IngredientItem[]>([])
    const[removedItems, setRemovedItems] = useState<IngredientItem[]>([])

    useEffect(() => {

    }, [addedItems, removedItems]);
    return (
    <div className="modalBackground">
        <div className="flex flex-col relative border-zinc-700 border-2 bg-zinc-900 rounded-lg w-4/5 h-4/5">
            <div className="header flex flex-row items-center justify-items-center h-28 w-full p-5">
            <img src={"images/tacos/" + name + ".jpg"} className="w-24 pr-5" alt={name}></img>
                <div>
                    {name}
                </div>
                <div className="flex-auto">
                        
                </div>
                <div className="">
                    <button onClick={async () => {thisOnClick(removedItems)(addedItems); setOpenModal(false); await setCartModal(false); setCartModal(true)}} className="self-center p-1 m-3 h-16 w-52 text-xl border-2 border-zinc-700 bg-black">Send to Cart </button>
                    <button className="text-xl m-5" onClick={()=> setOpenModal(false)}> X </button>
                </div>
            </div>

            <div className="flex flex-col w-full overflow-auto relative justify-items center">
                <div className="flex flex-wrap relative p-5 justify-center center">
                    <div className="w-1/5 justify-self-end">
                        WHAT&apos;S INCLUDED
                    </div>
                    <div className="w-4/5">
                        {includedIngredients.map((item, index) => (
                            <IncludedIngredientComp
                                key={index}
                                name={item.name}
                                price={item.price}
                                id={item.id}
                                stock = {item.stock}
                                removedItems = {removedItems}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap relative p-5 justify-center center">
                    <div className="w-1/5 justify-self-end">
                       ADD ONS
                    </div>
                    <div className="w-4/5">
                        {addOns.map((item, index) => (
                            <AddOnIngredientComp
                                key={index}
                                name={item.name}
                                price={item.price}
                                id={item.id}
                                stock = {item.stock}
                                addedItems = {addedItems}
                                
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
} 

export default MenuItemModal;
