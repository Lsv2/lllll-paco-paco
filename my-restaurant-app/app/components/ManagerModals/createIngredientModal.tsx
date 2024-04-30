'use client'
import React, { useState } from "react"
import "../MenuItemModal/MenuItemModal.css"

interface ModalItemProps {
    setOpenModal: any;
    name: string;
    fun: any;
}


// Prompt the user to delete an item and based on parameters to decide from which
// setOpenModal - if the modal is open
// name - Title of modal
// item - array of which possible items maybe deleted
// thisOnClick - function used
function CreateIngredientModal({ setOpenModal, name, fun}: ModalItemProps) {
    const [ingName, setIngName] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [minStock, setMinStock] = useState("");
    const [addOn, setAddOn] = useState(true);

    const changeName = (e: any) => {
        setIngName(e.target.value);
    }
    const changeStock = (e: any) => {
        setStock(e.target.value);
    } 
    const changePrice = (e: any) => {
        setPrice(e.target.value);
    } 
    const changeMinStock = (e: any) => {
        setMinStock(e.target.value);
    } 
    const changeAddOn = (e: any) => {
        if(e.target.value == "Yes") {
            setAddOn(true);
        }
        else {
            setAddOn(false);
        }
        console.log(addOn);
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
                            Enter Ingredient Name:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40 " type="text" onChange={changeName}/>
                            <br />
                            <br />
                            Enter Stock:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changeStock}/>
                            <br />
                            <br />
                            Enter Add-on Price:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changePrice}/>
                            <br />
                            <br />
                            Enter Min-Stock:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changeMinStock}/>
                            <br />
                            <br />
                            Allowed to be an add-on:
                            <select className="self-center border-2 rounded-md m-1 bg-black w-40" onChange={changeAddOn}>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={() => {fun(ingName, stock, price, minStock, addOn), setOpenModal(false);}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Submit </button>
                <button className="self-center border-2 rounded-md bg-black p-1 m-3 w-40" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default CreateIngredientModal;