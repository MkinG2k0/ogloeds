import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { OrderCard, SelectMembers } from 'pages/create-order/ui/list-choose'
import { useViewOnly } from 'pages/create-order/utils'
import { Order } from 'pages/create-order/model'
import { settings } from 'pages/settings/model'
import { appHistory } from 'pages/main/model'
import { TableEat } from 'pages/preview'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from 'shared/ui/carousel'
import { CardInput } from 'shared/ui/card-input'
import { useToast } from 'shared/ui/use-toast'
import { NAV } from 'shared/config/routing'
import { Card } from 'shared/ui/card'
import { Button } from 'shared'

import { FaClipboardList } from 'react-icons/fa'
import { observer } from 'mobx-react-lite'

export const CarouselChoose = observer(() => {
	const navigate = useNavigate()
	const { id = 'new' } = useParams()
	const [order] = useState(id === 'new' ? new Order() : appHistory.find(id)!)
	const viewOnly = useViewOnly()
	const [api, setApi] = useState<CarouselApi>()
	const { toast } = useToast()

	useEffect(() => {
		if (!api) {
			return
		}

		if (viewOnly) {
			return
		}

		api.on('scroll', () => {
			const curr = api.selectedScrollSnap()
			const offset = settings.community ? 3 : 2

			if (curr === 1) {
				if (!order.name.trim()) {
					api.scrollTo(curr - 1)
					toast({
						title: 'Write name',
					})
				}
				return
			}

			if (curr === 2 && settings.community) {
				return
			}

			if (curr === 0) {
				return
			}

			const selectedItem = order.orders[curr - offset]
			if (!selectedItem?.name?.trim()) {
				api.scrollTo(curr - 1)
				toast({
					title: 'Write name',
				})
			}
		})
	}, [api, order])

	const onBack = () => {
		navigate(NAV.root())
	}

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		order.setName(e.target.value)
	}

	const onSave = () => {
		if (order) {
			appHistory.addOrder(order)
			appHistory.save()
		}
		navigate(NAV.root())
	}

	return (
		<div className={'col gap-4 h-full '}>
			<div className={'row-2 w-full'}>
				<Button className={'flex-auto'} onClick={onBack}>
					Back
				</Button>
			</div>

			<Carousel className={'h-full '} setApi={setApi}>
				<CarouselContent className={'h-full mr-10'}>
					<CarouselItem className={'h-full'}>
						<Card className={'flex flex-col justify-center gap-2 items-center h-full'}>
							<div className={'w-[350px] flex flex-col justify-center gap-2 items-center'}>
								<div>Settings cafe</div>
								<CardInput disabled={viewOnly} onChange={onChangeName} placeholder={'Name'} value={order.name}>
									<FaClipboardList />
								</CardInput>
								<div> Select count members</div>
								<SelectMembers order={order} />
							</div>
						</Card>
					</CarouselItem>
					{settings.community && (
						<CarouselItem className={'h-full '}>
							<OrderCard isCommunity order={order.community} />
						</CarouselItem>
					)}

					{order.orders.map((order, index) => (
						<CarouselItem className={'h-full '} key={index}>
							<OrderCard order={order} />
						</CarouselItem>
					))}
					<CarouselItem className={'h-full'}>
						<Card className={'col gap-2 h-full'}>
							<TableEat order={order} />
							<div className={'p-2 flex-auto'}>
								{!viewOnly && (
									<Button className={'w-full'} onClick={onSave}>
										Save
									</Button>
								)}
							</div>
						</Card>
					</CarouselItem>
				</CarouselContent>
				{/*<CarouselPrevious />*/}
				{/*<CarouselNext />*/}
			</Carousel>
			<div className={'text-center text-sm text-gray'}>Scroll right to see more</div>
		</div>
	)
})
