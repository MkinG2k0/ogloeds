import { CardOrder } from 'pages/main/ui/card-order'
import { appHistory } from 'pages/main/model'

import { observer } from 'mobx-react-lite'

export const HistoryOrder = observer(() => {
	return (
		<div className={'flex flex-auto flex-col gap-2 overflow-auto pr-2'}>
			{appHistory.orders.map((order) => (
				<CardOrder key={order.id} order={order} />
			))}
		</div>
	)
})
