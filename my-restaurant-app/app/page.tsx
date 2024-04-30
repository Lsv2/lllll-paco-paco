'use client'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection"
import Description from "./components/Description/Description";
import Translate from "./components/Translate/Translate";
import {useState} from "react"
export default function Home() {
    const [openModal, setOpenModal] = useState(false)
    return (
        <main>
            <div className='fixed right-0 bottom-3 z-[999]'>
                <Translate></Translate>
            </div>
            <Navbar
                openModal={openModal}
                setOpenModal={setOpenModal}/>
            <HeroSection />
            <Description />
        </main>
    );
}
