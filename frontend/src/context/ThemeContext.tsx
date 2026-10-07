import { createContext, useState, useEffect,
  type Dispatch, type SetStateAction 
} from "react"

type ThemeContextValue = {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContextb()

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
    document.body.classList.toggle("dark", darkMode)
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