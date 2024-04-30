"use client"
import {useState} from "react"
import Modal from "../DrinkItemModal/DrinkItemModal";
interface DrinkItemProps{
    size: string;
    price: number;
    calorie: string;
    altTxt: string;
    thisOnClick: (item:any) => void;
    setCartModal: any;
}

export default function DrinkItem({size, price, altTxt, calorie, thisOnClick, setCartModal}: DrinkItemProps){
    const [openModal, setOpenModal] = useState(false);
    return(
        <div>
            <div className='flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52'>
                <div className="flex flex-col px-5 pt-5">
                    <img src={"images/drinks/" + size + ".jpg"} alt={size + " Drink"} className="w-40 h-50"></img>
                    <div className='font-bold text-white'>
                        {size}
                    </div>
                    <div className="justify-self-end text-sm">
                        {price.toFixed(2)}$ | {calorie} cal
                    </div>
                </div>
                <button onClick={() => setOpenModal(true)} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40">
                        Customize
                </button>
            </div>
        {openModal && <Modal 
                        setOpenModal={setOpenModal}
                        size={size}
                        price={price}
                        altTxt={altTxt}
                        calorie={calorie}
                        thisOnClick= {thisOnClick}
                        setCartModal={setCartModal} />}
        </div>
    );
}