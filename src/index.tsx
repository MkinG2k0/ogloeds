import { StrictMode } from 'react'

import { ClickToComponent } from 'click-to-react-component'
import ReactDOM from 'react-dom/client'
import { App } from 'core'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<StrictMode>
		<App />
		{/*<ClickToComponent editor={'jetbrains'} />*/}
	</StrictMode>,
)
