import { ReactNode } from 'react'
import * as React from 'react'

import { Input, InputProps } from 'shared/ui/input'
import { cn } from 'shared/lib'

interface ICardInput extends InputProps {
	children?: ReactNode
}

export const CardInput = React.forwardRef<HTMLInputElement, ICardInput>(({ children, ...props }, ref) => {
	return (
		<div className={'row-2 items-center rounded-md border border-input px-3 w-[150px]'}>
			{children}
			<Input className={cn(props.className, 'w-[100px] border-0')} {...props} ref={ref} />
		</div>
	)
})
