export const Bottom: FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
	return <div {...props} className={'absolute z-20 bottom-0 left-[50%] translate-x-[-50%] '.concat(props.className = '')}>{children}</div>
}

export const Top: FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
	return <div {...props} className={'absolute z-20 top-0 left-[50%] translate-x-[-50%] '.concat(props.className = '')}>{children}</div>
}

export const Left: FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
	return <div {...props} className={'absolute z-20 top-[50%] left-0 translate-y-[-50%] '.concat(props.className = '')}>{children}</div>
}

export const Right: FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
	return <div {...props} className={'absolute z-20 top-[50%] right-0 translate-y-[-50%] '.concat(props.className = '')}>{children}</div>
}

