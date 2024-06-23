import { useNavigate } from 'react-router-dom'

import { Order } from 'pages/create-order/model'

import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card'
import { NAV } from 'shared/config/routing'

import { FaRubleSign } from 'react-icons/fa'

export const CardOrder = ({ order }: { order: Order }) => {
	const navigate = useNavigate()

	const onNav = () => {
		navigate(NAV.previewId(order.id))
	}

	return (
		<Card className={'w-full h-fit'} onClick={onNav}>
			<CardHeader>
				<CardTitle className={'row-2 justify-between'}>
					<div>{order.name}</div>
					<div className={'row-2'}>
						{order.price}
						<FaRubleSign />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className={'row-2'}>
				{order.orders.map((order) => (
					<div key={order.id}>{order.name},</div>
				))}
			</CardContent>
			{/*<CardFooter>{order.price}</CardFooter>*/}
		</Card>
	)
}
