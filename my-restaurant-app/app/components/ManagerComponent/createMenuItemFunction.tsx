"use client"
import {useState} from "react"
import Modal from "../ManagerModals/createMenuItemModal";
interface ModalItemProps {
    name: string;
    items: any;
    fun: any;
}

export default function CreateMenuItem({name, items, fun}: ModalItemProps){
    const [openModal, setOpenModal] = useState(false);
    return(
        <div>
            <div className='flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52'>
                <button onClick={() => setOpenModal(true)} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40">
                        {name}
                </button>
            </div>
        {openModal && <Modal
                        setOpenModal={setOpenModal}
                        name={name}
                        items={items}
                        fun={fun} />}
        </div>
    );
}