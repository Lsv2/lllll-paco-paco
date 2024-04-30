'use client'
import React, { useState } from "react"
import "../MenuItemModal/MenuItemModal.css"

interface ModalItemProps {
    setOpenModal: any;
    name: string;
    items: any;
    fun: any;
}

// Prompt the user to delete an item and based on parameters to decide from which
// setOpenModal - if the modal is open
// name - Title of modal
// item - array of which possible items maybe deleted
// thisOnClick - function used
function DeleteItemModal({ setOpenModal, name, items, fun}: ModalItemProps) {
    const [itemName, setitemName] = useState("");

    const handleChange = (e: any) => {
        setitemName(e.target.value);
    }
    return (
    <div className="modalBackground">
        <div className="border-zinc-700 border-2 bg-zinc-900 rounded-lg">
            <div className="self-end float-right p-2">
                <button onClick={()=> setOpenModal(false)}> X </button>
            </div>
            <div className="">
                <div className='font-bold text-white place-self-center ml-2'>
                    {name}:
                </div>
                <form>
                    <select value={itemName} onChange={handleChange} className="border-2 rounded-md bg-black p-1 m-3 w-1/2 ">
                        {items.map((e: any, key: any) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                        })}
                    </select>
                </form>
            </div>
            <div>
                <button onClick={() => {fun(itemName), setOpenModal(false);}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Submit </button>
                <button className="self-center border-2 rounded-md bg-black p-1 m-3 w-40" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default DeleteItemModal;