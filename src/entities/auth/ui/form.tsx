import { HTMLAttributes, SyntheticEvent, useState } from 'react'

import { authService } from 'entities/auth/model'

import { useNav } from 'shared/hook/nav'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Button, cn } from 'shared'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const navigate = useNav()

	async function onSubmit(event: SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			authService.login({ email: 'email', password: 'password', token: 'token' }).then((value) => {
				navigate.root()
			})
			setIsLoading(false)
		}, 500)
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className={'grid gap-2'}>
					<div className={'grid gap-1'}>
						<Label className={'sr-only'} htmlFor={'email'}>
							Email
						</Label>
						<Input
							autoCapitalize={'none'}
							autoComplete={'email'}
							autoCorrect={'off'}
							disabled={isLoading}
							id={'email'}
							placeholder={'name@example.com'}
							type={'email'}
						/>
					</div>
					<div className={'grid gap-1'}>
						<Label className={'sr-only'} htmlFor={'email'}>
							Password
						</Label>
						<Input
							autoCapitalize={'none'}
							autoComplete={'password'}
							autoCorrect={'off'}
							disabled={isLoading}
							id={'email'}
							placeholder={'password'}
							type={'password'}
						/>
					</div>
					<Button disabled={isLoading}>
						{/*{isLoading && <div className={'mr-2 h-4 w-4 animate-spin'} />}*/}
						Sign In
					</Button>
				</div>
			</form>
			<div className={'relative'}>
				<div className={'absolute inset-0 flex items-center'}>
					<span className={'w-full border-t'} />
				</div>
			</div>
		</div>
	)
}
