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
function IncreaseStockModal({ setOpenModal, name, items, fun}: ModalItemProps) {
    const [ingName, setIngName] = useState("");
    const [stock, setStock] = useState("");

    const changeName = (e: any) => {
        setIngName(e.target.value);
    }
    const changePrice = (e: any) => {
        setStock(e.target.value);
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
                        <div className="ml-2">
                            <br />
                            <select value={ingName} onChange={changeName} className="border-2 rounded-md bg-black p-1 m-3 w-3/4 ">
                                {items.map((e: any, key: any) => {
                                    return <option key={key} value={e.value}>{e.name}</option>;
                                })}
                            </select>
                            <br />
                            Increase Stock by:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changePrice}/>
                        </div>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={() => {fun(ingName, stock), setOpenModal(false);}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Submit </button>
                <button className="self-center border-2 rounded-md bg-black p-1 m-3 w-40" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default IncreaseStockModal;