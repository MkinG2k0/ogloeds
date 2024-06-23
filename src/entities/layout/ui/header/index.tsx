'use client'
import { NavLink } from 'react-router-dom'

import { ModeToggle } from 'entities/layout/ui/toggle-theme'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from 'shared/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from 'shared/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar'
import { Command, CommandGroup, CommandItem } from 'shared/ui/command'
import { NAV } from 'shared/config/routing'
import { Button } from 'shared/ui/button'

// import { signIn, signOut, useSession } from 'next-auth/react'

interface HeaderProps {
}

export const Header: FC<HeaderProps> = ({}) => {
	return (
		<div className={'row justify-between h-14 items-center border-b  px-4 py-2 text-accent-foreground'}>
			<Menu/>
			<div className={'row gap-4 items-center'}>
				<ModeToggle/>
				<UserAvatar/>
			</div>
		</div>
	)
}

const UserAvatar = () => {
	// const { data: session, status } = useSession()
	// const image = session?.user?.image || ''
	// const name = (session?.user?.name || '').slice(0, 2)
	//
	// const onSignOut = () => {
	// 	signOut({ callbackUrl: NAV.MAIN })
	// }
	//
	// const onSignIn = () => {
	// 	signIn('google', { callbackUrl: NAV.DASHBOARD })
	// }
	//
	// if (status === 'loading') {
	// 	return null
	// }
	//
	// if (status === 'unauthenticated') {
	// 	return <Button onClick={onSignIn}>Sign in</Button>
	// }

	return (
		<Popover>
			<PopoverTrigger>
				<Avatar>
					{/*<AvatarImage src={image} />*/}
					{/*<AvatarFallback>{name}</AvatarFallback>*/}
				</Avatar>
			</PopoverTrigger>
			<PopoverContent>
				<Command>
					<CommandGroup heading={'Settings'}>
						<CommandItem>Profile</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
					<CommandItem onSelect={() => {
					}}>Out</CommandItem>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

const Menu = () => {
	// const { status } = useSession()
	const authenticated = true

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink className={navigationMenuTriggerStyle()}>Main</NavigationMenuLink>
					{/*<NavLink to={NAV.root()}>*/}
					{/*</NavLink>*/}
				</NavigationMenuItem>
				{authenticated && (
					<>
						<NavigationMenuItem>
							{/*<NavLink to={NAV.root()}>*/}
							{/*</NavLink>*/}
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem></NavigationMenuItem>
					</>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
