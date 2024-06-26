import { useLocation, useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'

import { Eat, Order, OrderItem, TEat } from 'pages/create-order/model'
import { FoodSelect } from 'pages/create-order/ui/food-select'
import { settings } from 'pages/settings/model'
import { appHistory } from 'pages/main/model'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shared/ui/card'
import { CardInput } from 'shared/ui/card-input'
import { NAV } from 'shared/config/routing'
import { Input } from 'shared/ui/input'
import { Button, NavBtn } from 'shared'

import { FaClipboardList, FaCoins, FaEdit, FaFire, FaTrash, FaUser, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { RiDrinksFill } from 'react-icons/ri'
import { IoIosRemove } from 'react-icons/io'
import { FaBowlFood } from 'react-icons/fa6'
import { observer } from 'mobx-react-lite'
import { TbAbacus } from 'react-icons/tb'

const useViewOnly = () => {
	const { state } = useLocation()
	return Boolean(state?.viewOnly)
}

const CreateOrder = observer(() => {
	const { id = 'new' } = useParams()
	const viewOnly = useViewOnly()

	const [order] = useState(id === 'new' ? new Order() : appHistory.find(id)!)
	const navigate = useNavigate()

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		order.setName(e.target.value)
	}

	const onPreview = () => {
		appHistory.addOrder(order)
		navigate(NAV.previewId(order.id))
	}

	const onBack = () => {
		navigate(-1)
	}

	return (
		<div className={'col h-full'}>
			<div className={'col gap-4 h-full overflow-auto pr-4'}>
				<div className={'row-2 w-full'}>
					<Button className={'flex-auto'} onClick={onBack}>
						Back
					</Button>
					{viewOnly && (
						<NavBtn className={'text-md'} to={NAV.createOrder(order.id)} variant={'outline'}>
							<FaEdit />
						</NavBtn>
					)}
				</div>
				<div className={'flex gap-2 justify-between'}>
					<CardInput disabled={viewOnly} onChange={onChangeName} placeholder={'Name'} value={order.name}>
						<FaClipboardList />
					</CardInput>
					<SelectMembers order={order} />
				</div>
				<OrderList order={order} />
			</div>

			{!viewOnly && (
				<div className={'w-full h-fit p-2 '}>
					{settings.viewPrice ? (
						<div className={'row-2 justify-between items-center'}>
							<div className={'text-2xl w-52'}>Total: {order.price}</div>
							<Button className={`${settings.viewPrice ? 'w-full' : ''}`} onClick={onPreview}>
								Preview
							</Button>
						</div>
					) : (
						<Button className={'w-full'} onClick={onPreview}>
							Preview
						</Button>
					)}
				</div>
			)}
		</div>
	)
})

const OrderList = observer(({ order }: { order: Order }) => {
	return (
		<div className={'col-4 '}>
			{order.orders.map((order) => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	)
})

const OrderCard: FC<{ order: OrderItem }> = observer(({ order }) => {
	const { price, name } = order
	const viewOnly = useViewOnly()
	const anyValue = settings.calcStats && (settings.viewCount || settings.viewPrice || settings.viewCalories)

	const onChangeName = (e) => {
		order.setName(e.target.value)
	}

	return (
		<Card className={'w-full h-fit'}>
			<CardHeader>
				<CardTitle className={'row-2 justify-between'}>
					<CardInput disabled={viewOnly} onChange={onChangeName} value={name}>
						<FaUser />
					</CardInput>
					{!viewOnly && (
						<Button
							onClick={() => {
								order.remove()
							}}
							variant={'danger'}
						>
							<FaTrash />
						</Button>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className={'col-2 '}>
				{settings.splitFood ? (
					<>
						<EatList eat={'Food'} order={order} type={'food'} />
						<EatList eat={'Drink'} order={order} type={'drink'} />
					</>
				) : (
					<EatList eat={'Food'} order={order} type={'any'} />
				)}
			</CardContent>
			{anyValue && (
				<CardFooter className={'flex justify-end'}>
					<TotalList calories={order.calories} count={order.count} price={price} />
				</CardFooter>
			)}
		</Card>
	)
})

const TotalList = ({ count, price, calories }: { calories: number; count: number; price: number }) => {
	return (
		<div className={'row-2 justify-end '}>
			{settings.viewCount && (
				<div className={'row-2 items-center rounded-md border border-transparent px-3 '}>
					<TbAbacus className={'text-blue-500'} />
					<div className={'px-3 py-1'}>{count}</div>
				</div>
			)}

			{settings.viewPrice && (
				<div className={'row-2 items-center rounded-md border border-transparent px-3 '}>
					<FaCoins className={'text-yellow-500'} />
					<div className={'px-3 py-1'}>{price}</div>
				</div>
			)}

			{settings.viewCalories && (
				<div className={'row-2 items-center rounded-md border border-transparent px-3 '}>
					<FaFire className={'text-red-500'} />
					<div className={'px-3 py-1'}>{calories}</div>
				</div>
			)}
			{/*<div className={'w-[46px]'}></div>*/}
		</div>
	)
}

interface EatListProps {
	order: OrderItem
	eat: string
	type: TEat
}

const foodIcon = {
	any: null,
	food: <FaBowlFood />,
	drink: <RiDrinksFill />,
}

const EatList: FC<EatListProps> = observer(({ order, eat, type }) => {
	const viewOnly = useViewOnly()
	const addBtnView = !viewOnly && !settings.hideAddFoodBtn

	const onAddEat = () => {
		order.addEat(type)
	}

	return (
		<div className={'col-2 '}>
			{type !== 'any' && (
				<div className={'row-2 items-center '}>
					{foodIcon[type]}
					{eat}:
				</div>
			)}

			{order.getEatByType(type).map((eat, index) => (
				<EatItem eat={eat} index={index} key={eat.id} order={order} type={'food'} />
			))}
			{addBtnView && (
				<Button onClick={onAddEat} variant={'outline'}>
					{`Add ${eat}`}
				</Button>
			)}
		</div>
	)
})

const EatItem: FC<{ eat: Eat; index: number; order: OrderItem; type: TEat }> = observer(
	({ eat, index, type, order }) => {
		const { name } = eat
		const viewOnly = useViewOnly()

		const onChangeFood = (value: string) => {
			eat.setName(value)
		}

		const onChangeProperties = (type: 'calories' | 'count' | 'price') => {
			return (e: React.ChangeEvent<HTMLInputElement>) => {
				const value = Number(e.target.value)

				if (type === 'calories') {
					eat.setCalories(value)
				}
				if (type === 'price') {
					eat.setPrice(value)
				}
				if (type === 'count') {
					eat.setCount(value)
				}
			}
		}

		const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter' && settings.hideAddFoodBtn) {
				order.addEat(type)
			}
		}

		return (
			<div className={'col-2 align-middle '} key={index}>
				<div className={'row-2 items-center flex-auto flex-wrap'}>
					<div className={'row-2 items-center flex-auto min-w-[200px]'}>
						<div className={'mr-2'}>{index + 1}</div>
						<FoodSelect
							className={'flex-auto '}
							disabled={viewOnly}
							onChangeFood={onChangeFood}
							onKeyDown={onKeyDown}
							placeholder={`write ${type}`}
							value={name}
						/>
						{/*<Input*/}
						{/*	*/}
						{/*/>*/}
					</div>
					{settings.viewCount && (
						<CardInput
							defaultValue={1}
							max={999}
							min={0}
							onChange={onChangeProperties('count')}
							placeholder={'count'}
							type={'number'}
						>
							<TbAbacus className={'text-blue-500'} />
						</CardInput>
					)}

					{settings.viewPrice && (
						<CardInput
							defaultValue={0}
							max={99_999}
							min={0}
							onChange={onChangeProperties('price')}
							placeholder={'price'}
							type={'number'}
						>
							<FaCoins className={'text-yellow-500'} />
						</CardInput>
					)}

					{settings.viewCalories && (
						<CardInput
							defaultValue={0}
							max={99_999}
							min={0}
							onChange={onChangeProperties('calories')}
							placeholder={'calories'}
							type={'number'}
						>
							<FaFire className={'text-red-500'} />
						</CardInput>
					)}
					{!viewOnly && (
						<Button className={'max-w-[50px]'} onClick={() => order.removeEat(eat.id)} variant={'danger'}>
							<IoIosRemove />
						</Button>
					)}
				</div>
			</div>
		)
	},
)

const SelectMembers = observer(({ order }: { order: Order }) => {
	const { members } = order
	const viewOnly = useViewOnly()

	const onChangeMembers = (e: React.ChangeEvent<HTMLInputElement>) => {
		const number = Number(e.target.value)
		if (number) {
			order.setMembers(Number(e.target.value))
		}
	}

	if (viewOnly) {
		return (
			<div className={'row-2 items-center'}>
				<CardInput disabled value={members}>
					<FaUser />
				</CardInput>
			</div>
		)
	}

	return (
		<div className={'row-2 items-center'}>
			<Button onClick={() => order.setMembers(members - 1)}>
				<FaUserMinus />
			</Button>
			<Input className={'w-12'} onChange={onChangeMembers} value={members} />
			<Button onClick={() => order.setMembers(members + 1)}>
				<FaUserPlus />
			</Button>
		</div>
	)
})

export default CreateOrder
