import { Outlet } from 'react-router'
import { FC } from 'react'

export const Layout: FC = () => {
	return (
		<div className={'relative w-[100dvw] h-[100dvh] overflow-hidden p-4'}>
			<Outlet />
		</div>
	)
}
