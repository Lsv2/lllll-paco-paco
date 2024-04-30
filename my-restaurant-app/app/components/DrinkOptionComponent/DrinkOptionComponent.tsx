"use client"
interface DrinkOptionCompProp {
    name: string;
    setOpenModal: any;
    price: number;
    thisOnClick: any;
    size: string
    setCartModal: any;
}

interface CartItem {
    name: string;
    price: number;
    type: number;
}


export default function DrinkOptionComp({name, setOpenModal, price, thisOnClick,size, setCartModal}:DrinkOptionCompProp) {
    const Item:CartItem = {name: size + " " + name, price: price, type: 1}
    return(
        <button onClick={async () => {setOpenModal(false); thisOnClick(Item)()(); await setCartModal(false); setCartModal(true)}} className="border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52">
            <img className="w-42" src={"images/drinks/drinkOptions/" + name + ".jpg"} alt={name}></img>
            {name}
        </button>
    );
}
