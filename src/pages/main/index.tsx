import { HistoryOrder } from 'pages/main/ui/history-order'

import { NAV } from 'shared/config/routing'
import { NavBtn } from 'shared'

const Main = () => {
	return (
		<div className={'col gap-2 justify-between h-full'}>
			<HistoryOrder />
			<NavBtn className={'w-full'} to={NAV.createOrder()}>
				Add new order
			</NavBtn>
		</div>
	)
}

export default Main
