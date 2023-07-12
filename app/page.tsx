'use client'
import {motion} from "framer-motion"
import {useState} from "react";
import './page.css'


const variants = {
  active: {
    width: '40rem',
    height: '18rem',
    borderRadius: '1rem',
  },
  inactive: {
    width: "35rem",
    height: "4rem",
    borderRadius: "2rem",
  }
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const handleExpend = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <motion.div className="border border-slate-400 text-xl "
                  onClick={() => handleExpend()}
                  initial={false} variants={variants}
                  animate={isOpen ? "active" : "inactive"}
                  transition={{
                    type: "spring",
                    duration: .4,
                    bounce: 0.35,
                  }}
      >
        <div>111</div>
      </motion.div>
    </main>
  )
}