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

async function submitFeedbackInfo(feedback: string) {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({feedback}),
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

      submitFeedbackInfo(textAreaRef.current.value).then(() => {
        setIsLoading(false)
        setIsComplete(true)
        if (textAreaRef.current) {
          textAreaRef.current.value = ""
        }
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen border border-amber-700">

    </div>
  )
}