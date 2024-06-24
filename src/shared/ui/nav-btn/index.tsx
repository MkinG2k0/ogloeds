import { Link } from 'react-router-dom'
import { FC } from 'react'

import { Button, ButtonProps } from 'shared/ui/button'

export interface NavBtnProps extends ButtonProps {
	to: string
	classNameLink?: string
}

export const NavBtn: FC<NavBtnProps> = ({ children, to, classNameLink, ...props }) => {
	return (
		<Link className={classNameLink} to={to}>
			<Button {...props}>{children}</Button>
		</Link>
	)
}
