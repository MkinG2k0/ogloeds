import { HistoryOrder } from 'pages/main/ui/history-order'

import { NAV } from 'shared/config/routing'
import { NavBtn } from 'shared'

import { IoMdSettings } from 'react-icons/io'

const Main = () => {
	return (
		<div className={'col-2 justify-between h-full'}>
			<div className={'col-2 overflow-auto '}>
				<div className={'row-2'}>
					<NavBtn to={NAV.settings()}>
						<IoMdSettings />
					</NavBtn>
				</div>
				<HistoryOrder />
			</div>
			<NavBtn className={'w-full'} to={NAV.createOrder()}>
				Add new order
			</NavBtn>
		</div>
	)
}

export default Main
