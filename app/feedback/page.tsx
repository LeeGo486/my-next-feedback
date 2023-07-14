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

const variantsLoading = {
  active: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      duration: 1,
    }
  },
  inactive: {
    rotate: 0,
  }
}

export default function Home() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [feedback, setFeedback] = useState("")
  const [required, setRequired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    if (!textAreaRef.current?.value) {
      setRequired(true)
      textAreaRef.current?.focus()
    } else {
      setRequired(false)
      setIsLoading(true)
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
            <button className="w-20 h-10 mr-2 p-2
              border rounded-lg bg-slate-950 text-slate-50
              flex items-center justify-center"
                    onClick={submitFeedback}
            >
              <motion.svg className={"icon w-10 h-10" + (isLoading ? "" : " hidden")} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                          initial={false}
                          variants={variantsLoading}
                          animate={isLoading ? "active" : "inactive"}
              >
                <path
                  d="M294.1 245.5c0 15.7 3.1 31.3 9.4 45.5 6.3 14.1 14.1 26.6 25.1 37.6 11 11 23.5 20.4 39.2 25.1 14.1 6.3 29.8 9.4 45.5 9.4s31.3-3.1 45.5-9.4c14.1-6.3 28.2-14.1 39.2-25.1 11-11 20.4-23.5 25.1-37.6 4.7-14.1 7.8-29.8 7.8-45.5s-3.1-31.3-9.4-45.5c-6.3-14.1-14.1-26.6-25.1-37.6-11-11-23.5-20.4-39.2-25.1-14.1-6.3-29.8-9.4-45.5-9.4s-31.3 3.1-45.5 9.4c-14.1 6.3-28.2 14.1-39.2 25.1-11 11-20.4 23.5-25.1 37.6-4.6 15.8-7.8 31.4-7.8 45.5zM128 474.4c0 12.5 3.1 26.6 7.8 37.6 4.7 12.5 12.5 23.5 21.9 32.9 9.4 9.4 20.4 17.2 32.9 21.9 12.5 4.7 25.1 7.8 37.6 7.8s26.6-3.1 37.6-7.8c12.5-4.7 23.5-12.5 32.9-21.9 9.4-9.4 17.2-20.4 21.9-32.9 4.7-12.5 7.8-25.1 7.8-37.6s-3.1-26.6-7.8-37.6c-4.7-12.5-12.5-23.5-21.9-32.9-9.4-9.4-20.4-17.2-32.9-21.9-12.5-4.7-25.1-7.8-37.6-7.8s-26.6 3.1-37.6 7.8c-12.5 4.7-23.5 12.5-32.9 21.9-9.4 9.4-17.2 20.4-21.9 32.9-6.2 10.9-7.8 23.5-7.8 37.6z m89.3 253.9c0 11 1.6 23.5 6.3 34.5 4.7 11 11 20.4 18.8 28.2 7.8 7.8 18.8 15.7 29.8 18.8 11 4.7 21.9 6.3 34.5 6.3 12.5 0 23.5-1.6 34.5-6.3 11-4.7 20.4-11 29.8-18.8 7.8-7.8 15.7-18.8 18.8-28.2 4.7-11 6.3-21.9 6.3-34.5 0-11-1.6-23.5-6.3-34.5-4.7-11-11-20.4-18.8-28.2-7.8-7.8-18.8-15.7-29.8-18.8-11-4.7-21.9-6.3-34.5-6.3-12.5 0-23.5 1.6-34.5 6.3-11 4.7-20.4 11-29.8 18.8-7.8 7.8-15.7 18.8-18.8 28.2-3.1 11-6.3 23.5-6.3 34.5z m241.4 90.9c0 20.4 7.8 40.7 21.9 54.9 14.1 14.1 34.5 21.9 54.9 21.9s40.7-7.8 54.9-21.9c14.1-14.1 21.9-34.5 21.9-54.9s-7.8-40.8-21.9-54.9c-14.1-14.1-34.5-21.9-54.9-21.9s-40.8 7.8-54.9 21.9c-12.5 14.2-21.9 34.5-21.9 54.9z m203.8-90.9c0 17.2 7.8 34.5 18.8 47 12.5 12.5 29.8 18.8 47 18.8s34.5-7.8 47-18.8c12.5-12.5 18.8-29.8 18.8-47s-7.8-34.5-18.8-47c-12.5-12.5-29.8-18.8-47-18.8s-34.5 7.8-47 18.8c-11 12.5-18.8 29.8-18.8 47z m94-169.3c0 15.7 6.3 29.8 17.2 40.8 11 11 25.1 17.2 40.8 17.2 15.7 0 29.8-6.3 40.8-17.2 11-11 17.2-25.1 17.2-40.8 0-15.7-6.3-29.8-17.2-40.7-11-11-25.1-17.2-40.8-17.2-15.7 0-29.8 6.3-40.8 17.2-10.9 10.9-17.2 26.6-17.2 40.7z m-6.3-158.3c0.3 23.3 19.1 42 42.3 42.3 23.3-0.3 42-19.1 42.3-42.3-0.3-23.3-19.1-42-42.3-42.3-23.2 0.3-42 19.1-42.3 42.3z m-84.6-112.8c0 7.8 3.1 17.2 9.4 21.9 6.3 6.3 14.1 9.4 21.9 9.4 7.8 0 17.2-3.1 21.9-9.4 6.3-6.3 9.4-14.1 9.4-21.9 0-7.8-3.1-17.2-9.4-21.9-6.3-6.3-14.1-9.4-21.9-9.4-7.8 0-17.2 3.1-21.9 9.4-6.3 4.6-9.4 12.5-9.4 21.9z m0 0"
                  fill="#e6e6e6"></path>
              </motion.svg>
              <span>Send</span>
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}