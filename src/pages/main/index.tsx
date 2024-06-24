import { HistoryOrder } from 'pages/main/ui/history-order'

import { NAV } from 'shared/config/routing'
import { NavBtn } from 'shared'

import { IoMdSettings } from 'react-icons/io'

const Main = () => {
	return (
		<div className={'col-2 justify-between h-full'}>
			<div className={'col-2 overflow-auto '}>
				<HistoryOrder />
			</div>
			<div className={'row-2 w-full'}>
				<NavBtn to={NAV.settings()}>
					<IoMdSettings />
				</NavBtn>
				<NavBtn className={'w-full'} classNameLink={'flex-auto'} to={NAV.createOrder('new')}>
					Add new order
				</NavBtn>
			</div>
		</div>
	)
}

export default Main
