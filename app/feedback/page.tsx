'use client'
import {motion} from "framer-motion"
import {useEffect, useRef, useState} from "react";
import './page.css'

const emojis = ['🥰', '😄', '🤨', '😰']

const variantsLayout = {
  active: {
    width: '23.5rem',
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
const variantsSubmit = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      delay: .1,
    }
  },
  inactive: {
    opacity: 0,
    y: 15,
  }
}

async function submitFeedbackInfo(emojiIndex: number, feedback: string) {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({index: emojiIndex, feedback}),
    })

    return await response.json()
  } catch (e) {
    console.info(`feedback error message is: ${JSON.stringify(e)}`)
  }
  return
}

export default function Home() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [required, setRequired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [emojiIndex, setEmojiIndex] = useState(-1)

  useEffect(() => {
    if (!isOpen) {
      setSelected(-1)
      setIsComplete(false)
    } else {
      textAreaRef.current?.focus()
    }
  }, [isOpen, textAreaRef])
  const handleExpend = (index: number) => {

    setSelected(index)
    setEmojiIndex(index)
    textAreaRef.current?.focus()

    if (index === selected) {
      setIsOpen(isOpen => !isOpen)
    } else {
      setIsOpen(true)
      setIsComplete(false)
    }
  }
  const submitFeedback = async () => {
    if (!textAreaRef.current?.value) {
      setRequired(true)
      textAreaRef.current?.focus()
    } else {
      setRequired(false)
      setIsLoading(true)

      submitFeedbackInfo(emojiIndex, textAreaRef.current.value).then(() => {
        setIsLoading(false)
        setIsComplete(true)
        if (textAreaRef.current) {
          textAreaRef.current.value = ""
        }
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
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
                <button className="emojiButton" key={index} aria-checked={index === selected} value={index}
                        onClick={() => handleExpend(index)}>{emoji}</button>
              ))
            }
          </span>
        </div>
        <div className={"w-full h-[calc(100%-3rem)] flex flex-col item-center justify-between" + ((isOpen && !isComplete) ? "" : " hidden")}>
          <motion.textarea disabled={isLoading}
                           className="w-[22.5rem] h-32 border rounded-lg px-1 mx-auto focus:outline-none focus:ring-1 focus:ring-slate-800"
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
            <motion.button disabled={isLoading} className={"w-20 h-10 mr-2 p-2 " +
              "border rounded-lg bg-[var(--ds-gray-1000)] text-slate-50 " +
              " flex items-center justify-center " +
              " hover:" + (!isLoading ? "bg-slate-800" : "") + (isLoading ? " bg-slate-300" : "")}
                           whileTap={!isLoading ? {scale: .95} : {scale: 1}}
                           onClick={submitFeedback}
                           type="submit"
            >
              <motion.img src="/loading.svg" alt="loading" className={"w-6 h-6" + (isLoading ? "" : " hidden")}
                          initial={false}
                          animate={isLoading ? {
                            rotate: 360,
                            transition: {
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "linear",
                              duration: 1,
                            }
                          } : {}}
              />
              <span>Send</span>
            </motion.button>
          </div>
        </div>
        <motion.div
          className={"w-full h-[calc(100%-3rem)] flex flex-col item-center justify-center" + ((isOpen && isComplete) ? "" : " hidden")}
          initial={{opacity: 0}}
          variants={variantsSubmit}
          animate={(isOpen && isComplete) ? "active" : "inactive"}
        >
          <p className={"mx-auto my-1 h-10"}>
            <img src="/success.svg" alt="success"/>
          </p>
          <p className={"mx-auto my-1 h-10"}>Your feedback has been received!</p>
          <p className={"mx-auto h-10"}>Thank you for your help.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}