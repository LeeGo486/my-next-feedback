'use client'
import {motion} from "framer-motion"
import {useEffect, useState, useRef} from "react";
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(-1);

  useEffect(()=>{
    if(!isOpen) {
      setSelected(-1)
    } else {
      textAreaRef.current?.focus()
    }
  },[isOpen, textAreaRef])
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
          <p>Was this helpful?</p>
          <span className="flex items-center justify-center gap-px">
            {
              emojis.map((emoji, index) => (
                <button className="emojiButton" key={index} aria-checked={index === selected}
                        onClick={() => handleExpend(index)}>{emoji}</button>
              ))
            }
          </span>
        </div>
        <div className={"p-3" + (isOpen ? "" : " hidden")}>
          <textarea className="w-full h-32 border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-800"
                    placeholder="Your feedback..."
                    ref={textAreaRef}/>
        </div>
      </motion.div>
    </main>
  )
}