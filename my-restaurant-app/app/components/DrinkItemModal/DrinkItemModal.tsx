'use client'
import React, { useState } from "react"
import "./DrinkItemModal.css"
import DrinkOptionComp from "../DrinkOptionComponent/DrinkOptionComponent"

interface ModalItemProps {
    setOpenModal: any;
    price: number;
    altTxt: string;
    calorie: string
    size: string;
    thisOnClick: (item: any) => void;
    setCartModal: any;
}


let drinkOptions :string[] = ["Pepsi", "Dr.Pepper","Unsweet Tea","Sweet Tea","Street", "Cane Cola","Berry Blast","Orange Creamsicle","Mug Root Beer","Columbian Hot Coffee","Iced Coffee"]

function DrinkItemModal({ setOpenModal, price, altTxt, calorie, size, thisOnClick, setCartModal }: ModalItemProps) {
    return (
    <div className="modalBackground">
        <div className="flex flex-col relative border-zinc-700 border-2 bg-zinc-900 rounded-lg w-4/5 h-4/5">
            <div className="header flex flex-row items-center justify-items-center h-28 w-full p-5">
            <img src={"images/drinks/" + size + ".jpg"} alt={size + "Drink"} className="w-24 pr-5"></img>
                <div>
                    {"Select " + size + " Drink"}
                </div>
                <div className="flex-auto">
                        
                </div>
                <div className="">
                    <button className="text-xl m-5" onClick={()=> setOpenModal(false)}> X </button>
                </div>
            </div>
            <div className="flex flex-wrap overflow-y-auto relative p-5 justify-center center">
                {drinkOptions.map((drink,index) => (
                    <DrinkOptionComp
                        key={index}
                        name={drink}
                        price={price}
                        size = {size}
                        setOpenModal = {setOpenModal}
                        thisOnClick = {thisOnClick}
                        setCartModal={setCartModal}
                    />
                ))}
            </div>
        </div>
    </div>
    );
} 

export default DrinkItemModal;