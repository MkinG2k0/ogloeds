import { useNavigate } from 'react-router-dom'

import { SettingTypeKey, listSettings, settings } from 'pages/settings/model'
import { SelectTheme } from 'pages/settings/ui/toggle-theme'

import { Checkbox } from 'shared/ui/checkbox'
import { NAV } from 'shared/config/routing'
import { Switch } from 'shared/ui/switch'
import { Label } from 'shared/ui/label'
import { Button } from 'shared'

import { observer } from 'mobx-react-lite'

const settingsMapText: Record<SettingTypeKey, string> = {
	viewCalories: 'View Calories',
	viewCount: 'View Count',
	viewPrice: 'View Price',
	splitFood: 'Split Food',
	calcStats: 'Calc Stats',
	hideAddFoodBtn: 'Hide Add Food Btn (Press Enter for add food)',
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
					<Switch checked={settings[setting]} id={setting} onCheckedChange={onCheckedChange(setting)} />
					<Label htmlFor={setting}>{settingsMapText[setting]}</Label>
				</div>
			))}
			<SelectTheme />
		</div>
	)
})

export default Settings
