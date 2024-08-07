import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState } from 'react'

import { Order } from 'pages/create-order/model'
import { settings } from 'pages/settings/model'
import { appHistory } from 'pages/main/model'

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from 'shared/ui/table'
import { Card, CardHeader, CardTitle } from 'shared/ui/card'
import { NAV } from 'shared/config/routing'
import { Button } from 'shared'

import { observer } from 'mobx-react-lite'

const Preview = observer(() => {
	const { id = '' } = useParams()
	const [order] = useState(appHistory.find(id)!)
	const navigate = useNavigate()

	const onSave = () => {
		if (order) {
			appHistory.save()
		}
		navigate(NAV.root())
	}

	const onBack = () => {
		navigate(NAV.createOrder(id))
	}

	return (
		<div className={'col gap-2 h-full'}>
			<Button onClick={onBack}>Back</Button>
			<div className={'col gap-2 justify-between h-full'}>
				<Card>
					<TableEat order={order} />
					<CardHeader>
						<CardTitle className={'row-2 justify-between'}>{order.name || 'Cafe name'}</CardTitle>
					</CardHeader>
				</Card>
				<Button onClick={onSave}>Save</Button>
			</div>
		</div>
	)
})

export const TableEat = observer(({ order }: { order: Order }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className={'w-[100px]'}>Name</TableHead>
					<TableHead>Count</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{order
					.previewOrder()
					.filter(([value]) => value)
					.map(([name, { count }]) => (
						<TableRow key={name}>
							<TableCell className={'font-medium'}>{name}</TableCell>
							<TableCell>{count}</TableCell>
						</TableRow>
					))}
			</TableBody>
			{settings.viewPrice && (
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total price</TableCell>
						<TableCell className={'text-right'}>{order.price}</TableCell>
					</TableRow>
				</TableFooter>
			)}
		</Table>
	)
})

export default Preview
