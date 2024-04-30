'use client'
import React, { useState } from "react"
import "../MenuItemModal/MenuItemModal.css"

interface ModalItemProps {
    setOpenModal: any;
    name: string;
    items: any;
    fun: any;
}
interface menuIngredients {
    name: string;
}

// Prompt the user to delete an item and based on parameters to decide from which
// setOpenModal - if the modal is open
// name - Title of modal
// item - array of which possible items maybe deleted
// thisOnClick - function used
function CreateMenuItemModal({ setOpenModal, name, items, fun}: ModalItemProps) {
    const [menuName, setMenuName] = useState("");
    const [price, setPrice] = useState("");
    const [calories, setCalories] = useState("");
    const [ing, setIng] = useState("");
    const [ingredients, setIngredients] = useState<menuIngredients[]>([]);

    const changeName = (e: any) => {
        setMenuName(e.target.value);
    }
    const changePrice = (e: any) => {
        setPrice(e.target.value);
    }
    const changeCalories = (e: any) => {
        setCalories(e.target.value);
    }
    const changeIngredients = (e: any) => {
        setIngredients([e.target.value, ...ingredients]);
        console.log(ingredients);
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
                            Enter Menu Item Name:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40 float-right" type="text" onChange={changeName}/>
                            <br />
                            <br />
                            Enter Price:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changePrice}/>
                            <br />
                            <br />
                            Total Calories:
                            <input className="self-center border-2 rounded-md m-1 bg-black w-40" type="text" onChange={changeCalories}/>
                            <br />
                            <br />
                            Ingredients Used:
                            <br />
                            <select multiple id="test" onChange={changeIngredients} className="self-center border-2 rounded-md bg-black p-1 m-1 h-56 w-3/4">
                                {items.map((e: any, key: any) => {
                                    return <option key={key} value={e.value}>{e.name}</option>;
                                })}
                            </select>
                        </div>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={() => {fun(menuName, price, calories, ingredients), setOpenModal(false);}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Submit </button>
                <button className="self-center border-2 rounded-md bg-black p-1 m-3 w-40" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default CreateMenuItemModal;