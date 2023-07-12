'use client'
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import './page.css'

const emojis = ['🥰', '😄', '🤨', '😰']


const variantsLayout = {
  active: {
    width: '25rem',
    height: '18rem',
    borderRadius: '1rem',
  },
  inactive: {
    width: "21rem",
    height: "3rem",
    borderRadius: "2rem",
  }
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(-1);

  useEffect(()=>{

  },[isOpen, selected])
  const handleExpend = (index: number) => {

    setSelected(index)

    if (index === selected) {
      setIsOpen(isOpen => !isOpen)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <motion.div className="border border-slate-400 text-base"
                  initial={false} variants={variantsLayout}
                  animate={isOpen ? "active" : "inactive"}
                  transition={{
                    type: "tween",
                    ease: "linear",
                    duration: .1,
                  }}
      >
        <div className="w-full h-12 px-4 py-2 gap-2 flex items-center justify-center">
          <p>Was this helpful?</p> <span className="flex items-center justify-center gap-px">
            {
              emojis.map((emoji, index) => (
                <button className="emojiButton" key={index} aria-checked={index === selected}
                        onClick={() => handleExpend(index)}>{emoji}</button>
              ))
            }
          </span>
        </div>
        <div className={"p-5" + (isOpen ? "" : " hidden")}>123</div>
      </motion.div>
    </main>
  )
}