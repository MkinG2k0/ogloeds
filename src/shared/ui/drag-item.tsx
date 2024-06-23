import { Ref, forwardRef } from 'react'

import { HTMLMotionProps, MotionProps, motion, useDragControls } from 'framer-motion'

export interface DragItemProps extends MotionProps, HTMLMotionProps<'div'> {}

export const DragItem = forwardRef<HTMLDivElement, DragItemProps>(
	({ children, drag = true, ...props }, ref) => {
		const controls = useDragControls()

		return (
			<motion.div
				animate={{ opacity: 1, scale: 1 }}
				drag={drag}
				dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
				dragControls={controls}
				dragElastic={1}
				dragTransition={{ bounceDamping: 20, bounceStiffness: 200 }}
				ref={ref}
				whileDrag={{ scale: 0.9 }}
				whileHover={{ scale: 0.9 }}
				whileTap={{ scale: 0.8 }}
				{...props}
			>
				{children}
			</motion.div>
		)
	},
)
