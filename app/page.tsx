'use client'
import {motion} from "framer-motion"
import {useState} from "react";
import './page.css'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const handleExpend = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
        <div className="relative w-[35rem] h-20">
          <div className={"w-[35rem] border border-slate-400 " +
            "absolute top-0 text-xl "
            + (isOpen ? " h-72 scale-x-110 rounded-3xl" : " w-[35rem] h-20 rounded-full")}
               onClick={() => handleExpend()}
          >
            <div className={(isOpen ? "scale-x-90" : "")}>Was this helpful?</div>
          </div>
        </div>

    </main>
  )
}