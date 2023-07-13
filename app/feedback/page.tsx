'use client'
import {motion} from "framer-motion"
import {useEffect, useRef, useState} from "react";
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
const variantsTextarea = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
  }
}

export default function Home() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [feedback, setFeedback] = useState("")
  const [required, setRequired] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSelected(-1)
      setFeedback("")
    } else {
      textAreaRef.current?.focus()
    }
  }, [isOpen, textAreaRef, feedback])
  const handleExpend = (index: number) => {

    setSelected(index)
    if (index === selected) {
      setIsOpen(isOpen => !isOpen)
    } else {
      setIsOpen(true)
    }
  }
  const submitFeedback = () => {

    console.info(`feedback length is: ${feedback.length}`)
    if (!textAreaRef.current?.value) {
      setRequired(true)
      textAreaRef.current?.focus()
    } else {
      setRequired(false)
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <motion.div className="border border-slate-400 text-base "
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
        <div
          className={"w-full h-[calc(100%-3rem)] flex flex-col item-center justify-between" + (isOpen ? "" : " hidden")}>
          <motion.textarea
            className="w-96 h-32 border rounded-lg p-2 mx-auto focus:outline-none focus:ring-1 focus:ring-slate-800"
            placeholder="Your feedback..."
            ref={textAreaRef}
            initial={false} variants={variantsTextarea}
            animate={isOpen ? "active" : "inactive"}
            required={required}
          />
          <motion.p className="text-red-700 text ml-2"
                    initial={{opacity: 0}}
                    animate={required ? {opacity: 1} : {opacity: 0}}
          >Please enter your feedback
          </motion.p>
          <div className="w-full h-16
              border-t border-t-slate-400 bg-[var(--accents-2)] rounded-b-[1rem]
              flex flex-row-reverse items-center">
            <button className="w-20 h-10 border rounded-lg bg-slate-950 text-slate-50 mr-2"
                    onClick={submitFeedback}
            >Send
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}