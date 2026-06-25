import { createContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode")

    if (savedTheme) {
      return JSON.parse(savedTheme)
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    )
  }, [darkMode])

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext