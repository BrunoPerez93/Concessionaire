"use client"

import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="ml-4 p-2 rounded bg-gray-700 dark:bg-gray-700 dark:text-white"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  )
}