import { createContext, useState, useEffect,
  type Dispatch, type SetStateAction, type ReactNode 
} from "react"

type ThemeContextValue = {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

type ThemeProviderProps = {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: ThemeProviderProps) {
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