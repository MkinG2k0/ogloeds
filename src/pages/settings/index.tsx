import { useNavigate } from 'react-router-dom'

import { SelectTheme } from 'pages/settings/ui/toggle-theme'
import { settings } from 'pages/settings/model'

import { Checkbox } from 'shared/ui/checkbox'
import { NAV } from 'shared/config/routing'
import { Button } from 'shared'

import { observer } from 'mobx-react-lite'

const Settings = observer(() => {
	const navigate = useNavigate()

	const onBack = () => {
		navigate(NAV.root())
	}

	const onCheckedChange = (type: 'viewCalories' | 'viewCount' | 'viewPrice') => (value: boolean) => {
		settings.set(type, value)
	}

	return (
		<div className={'col-2 text-xl'}>
			<Button onClick={onBack}>Back</Button>
			<h1>Settings</h1>
			<div className={'flex items-center space-x-2'}>
				<Checkbox checked={settings.viewPrice} id={'viewPrice'} onCheckedChange={onCheckedChange('viewPrice')} />
				<label
					className={'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}
					htmlFor={'viewPrice'}
				>
					view price
				</label>
			</div>
			<div className={'flex items-center space-x-2'}>
				<Checkbox checked={settings.viewCount} id={'viewCount'} onCheckedChange={onCheckedChange('viewCount')} />
				<label
					className={'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}
					htmlFor={'viewCount'}
				>
					view count
				</label>
			</div>
			<div className={'flex items-center space-x-2'}>
				<Checkbox
					checked={settings.viewCalories}
					id={'viewCalories'}
					onCheckedChange={onCheckedChange('viewCalories')}
				/>
				<label
					className={'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}
					htmlFor={'viewCalories'}
				>
					view calories
				</label>
			</div>
			<SelectTheme />
		</div>
	)
})

export default Settings
