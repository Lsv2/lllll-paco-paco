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
function ChangePriceModal({ setOpenModal, name, items,  fun}: ModalItemProps) {
    const [menuName, setMenuName] = useState("");
    const [price, setPrice] = useState("");

    const changeName = (e: any) => {
        setMenuName(e.target.value);
    }
    const changePrice = (e: any) => {
        setPrice(e.target.value);
    } 

    return (
    <div className="modalBackground">
        <div className="'flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5">
            <div className="self-end float-right p-2">
                <button onClick={()=> setOpenModal(false)}> X </button>
            </div>
            <div className="flex flex-col">
                <div className='font-bold text-white ml-2'>
                    {name}
                </div>
                <form>
                    <label>
                        <br />
                        <select value={menuName} onChange={changeName} className="border-2 rounded-md bg-black p-1 m-3 w-3/4 ">
                            {items.map((e: any, key: any) => {
                                return <option key={key} value={e.value}>{e.name}</option>;
                            })}
                        </select>
                        <br />
                        <br />
                        <div className="ml-2">
                            Enter New Price:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changePrice}/>
                        </div>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={() => {fun(menuName, price), setOpenModal(false);}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Submit </button>
                <button className="self-center border-2 rounded-md bg-black p-1 m-3 w-40" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default ChangePriceModal;