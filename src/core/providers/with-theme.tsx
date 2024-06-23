import 'core/styles/index.scss'

import { ThemeContext } from 'shared/hook/use-theme'

export const WithTheme = (component: FC) => (props) => {
	return (
		<ThemeContext>
			<div className={'bg-background text-foreground'}>{component(props)}</div>
		</ThemeContext>
	)
}
