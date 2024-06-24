import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const themeContext = createContext({
	themes: ['light', 'dark', 'system'],
	setTheme: (prev: string) => {},
	theme: 'dark',
})

const isDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useTheme = () => {
	return useContext(themeContext)
}

export const ThemeContext = ({ children }) => {
	const defaultTheme = useRef<string>(localStorage.getItem('theme') || (isDark() ? 'dark' : 'light'))
	const html = useRef(document.getElementsByTagName('html')[0])
	const [theme, setTheme] = useState<string>(defaultTheme.current)

	useLayoutEffect(() => {
		html.current.classList.add(defaultTheme.current)
	}, [defaultTheme])

	useEffect(() => {
		const match = (e) => {
			setTheme(e.matches ? 'dark' : 'light')
		}
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', match)

		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', match)
		}
	}, [])

	const _setTheme = (value: string) => {
		if (value === 'system') {
			if (isDark()) {
				value = 'dark'
			} else {
				value = 'light'
			}
		}

		html.current.classList.remove(theme)
		html.current.classList.add(value)

		localStorage.setItem('theme', value)

		setTheme(value)
	}

	return (
		<themeContext.Provider value={{ setTheme: _setTheme, theme, themes: ['light', 'dark', 'green', 'red', 'system'] }}>
			{children}
		</themeContext.Provider>
	)
}
