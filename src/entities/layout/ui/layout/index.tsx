import { Outlet } from 'react-router'
import { FC } from 'react'

import { Toaster } from 'shared/ui/toaster'

export const Layout: FC = () => {
	return (
		<div className={'relative w-[100dvw] h-[100dvh] overflow-hidden p-4'}>
			<Outlet />
			<Toaster />
		</div>
	)
}
