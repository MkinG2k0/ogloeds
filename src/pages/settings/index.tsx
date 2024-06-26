import { useNavigate } from 'react-router-dom'

import { SettingTypeKey, listSettings, settings } from 'pages/settings/model'
import { SelectTheme } from 'pages/settings/ui/toggle-theme'

import { Checkbox } from 'shared/ui/checkbox'
import { NAV } from 'shared/config/routing'
import { Button } from 'shared'

import { observer } from 'mobx-react-lite'

const settingsMapText: Record<SettingTypeKey, string> = {
	viewCalories: 'View Calories',
	viewCount: 'View Count',
	viewPrice: 'View Price',
	splitFood: 'Split Food',
	calcStats: 'Calc Stats',
}

const Settings = observer(() => {
	const navigate = useNavigate()

	const onBack = () => {
		navigate(NAV.root())
	}

	const onCheckedChange = (type: SettingTypeKey) => (value: boolean) => {
		settings.set(type, value)
	}

	return (
		<div className={'col-4 text-xl'}>
			<Button onClick={onBack}>Back</Button>
			<h1>Settings</h1>
			{listSettings.map((setting) => (
				<div className={'flex items-center space-x-2'} key={setting}>
					<Checkbox checked={settings[setting]} id={setting} onCheckedChange={onCheckedChange(setting)} />
					<label
						className={'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}
						htmlFor={setting}
					>
						{settingsMapText[setting]}
					</label>
				</div>
			))}
			<SelectTheme />
		</div>
	)
})

export default Settings
