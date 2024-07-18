import { ReactNode } from 'react'
import * as React from 'react'

import { Input, InputProps } from 'shared/ui/input'
import { cn } from 'shared/lib'

interface ICardInput extends InputProps {
	children?: ReactNode
	classNameWrap?: string
}

export const CardInput = React.forwardRef<HTMLInputElement, ICardInput>(
	({ children, className, classNameWrap, ...props }, ref) => {
		return (
			<div className={cn(classNameWrap, 'row-2 items-center rounded-md border border-input px-3 ')}>
				{children}
				<Input className={cn(className, 'flex-auto border-0')} {...props} ref={ref} />
			</div>
		)
	},
)
