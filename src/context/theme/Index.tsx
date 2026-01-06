import { createContext, useState, type ReactNode } from "react"

type themeContextProps = {
    theme : 'light' | 'dark',
    setTheme : React.Dispatch<React.SetStateAction<"light" | "dark">>,
}

export const Themecontext = createContext<themeContextProps>({} as themeContextProps);

type themeProviderProps = {
    children : ReactNode,
}
const ThemeProvider = ({children} : themeProviderProps) => {
    const [theme,setTheme] = useState<'light'|'dark'>('dark');
    return (
        <Themecontext.Provider value = {{theme,setTheme}}>
            {children}
        </Themecontext.Provider>
    )
}

export default ThemeProvider

