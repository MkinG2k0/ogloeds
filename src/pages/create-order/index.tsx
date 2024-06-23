import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { FC, useState } from 'react'

import { Eat, Order, OrderItem, TEat } from 'pages/create-order/model'
import { appHistory } from 'pages/main/model'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shared/ui/card'
import { CardInput } from 'shared/ui/card-input'
import { NAV } from 'shared/config/routing'
import { Input } from 'shared/ui/input'
import { Button } from 'shared'

import { FaClipboardList, FaCoins, FaFire, FaTrash, FaUser, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { RiDrinksFill } from 'react-icons/ri'
import { IoIosRemove } from 'react-icons/io'
import { FaBowlFood } from 'react-icons/fa6'
import { observer } from 'mobx-react-lite'
import { TbAbacus } from 'react-icons/tb'

const CreateOrder = observer(() => {
	const { id } = useParams()
	const [order] = useState(new Order(id))
	const navigate = useNavigate()

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		order.setName(e.target.value)
	}

	const onPreview = () => {
		appHistory.addOrder(order)
		navigate(NAV.previewId(order.id))
	}

	const onBack = () => {
		navigate(NAV.root())
	}

	return (
		<div className={'col gap-4 h-full'}>
			<Button onClick={onBack}>Back</Button>

			<div className={'flex gap-2 justify-between '}>
				<CardInput onChange={onChangeName} placeholder={'Name'}>
					<FaClipboardList />
				</CardInput>
				<SelectMembers order={order} />
			</div>
			<OrderList order={order} />
			<Card className={'w-full h-fit p-2'}>
				<div className={'row-2 justify-between items-center'}>
					<div className={'text-2xl'}>Total: {order.price}</div>
					<Button onClick={onPreview}>Preview</Button>
				</div>
			</Card>
		</div>
	)
})

const OrderList = observer(({ order }: { order: Order }) => {
	return (
		<div className={'col-4 pr-2 overflow-auto'}>
			{order.orders.map((order) => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	)
})

const OrderCard: FC<{ order: OrderItem }> = observer(({ order }) => {
	const { price, name } = order

	const onChangeName = (e) => {
		order.setName(e.target.value)
	}

	return (
		<Card className={'w-full h-fit'}>
			<CardHeader>
				<CardTitle className={'row-2 justify-between'}>
					<CardInput onChange={onChangeName} value={name}>
						<FaUser />
					</CardInput>
					<Button
						onClick={() => {
							order.remove()
						}}
						variant={'danger'}
					>
						<FaTrash />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent className={'col-2 '}>
				<EatList eat={'Food'} order={order} type={'food'} />
				<EatList eat={'Drink'} order={order} type={'drink'} />
			</CardContent>
			<CardFooter className={'flex justify-end'}>
				<TotalList calories={order.calories} count={order.count} price={price} />
			</CardFooter>
		</Card>
	)
})

const TotalList = ({ count, price, calories }: { calories: number; count: number; price: number }) => {
	return (
		<div className={'row-2 justify-end '}>
			<div className={'row-2 items-center rounded-md border border-transparent px-3 w-[150px]'}>
				<TbAbacus className={'text-blue-500'} />
				<div className={'px-3 py-1'}>{count}</div>
			</div>
			<div className={'row-2 items-center rounded-md border border-transparent px-3 w-[150px]'}>
				<FaCoins className={'text-yellow-500'} />

				<div className={'px-3 py-1'}>{price}</div>
			</div>
			<div className={'row-2 items-center rounded-md border border-transparent px-3 w-[150px]'}>
				<FaFire className={'text-red-500'} />
				<div className={'px-3 py-1'}>{calories}</div>
			</div>
			<div className={'w-[46px]'}></div>
		</div>
	)
}

interface EatListProps {
	order: OrderItem
	eat: string
	type: TEat
}

const EatList: FC<EatListProps> = observer(({ order, eat, type }) => {
	const onAddEat = () => {
		order.addEat(type)
	}

	return (
		<div className={'col-2'}>
			<div className={'row-2 items-center '}>
				{type === 'food' ? <FaBowlFood /> : <RiDrinksFill />}
				{eat}:
			</div>

			{order.getEatByType(type).map((eat, index) => (
				<EatItem eat={eat} index={index} key={eat.id} order={order} type={'food'} />
			))}

			<Button onClick={onAddEat} variant={'outline'}>
				{`Add ${eat}`}
			</Button>
		</div>
	)
})

const EatItem: FC<{ eat: Eat; index: number; order: OrderItem; type: 'drink' | 'food' }> = observer(
	({ eat, index, type, order }) => {
		const { calories, name, price, count } = eat

		const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			eat.setName(e.target.value)
		}
		const onChangeProperties = (type: 'calories' | 'price' | 'quantity') => {
			return (e: React.ChangeEvent<HTMLInputElement>) => {
				const value = Number(e.target.value)
				if (!value) {
					return
				}
				if (type === 'calories') {
					eat.setCalories(value)
				}
				if (type === 'price') {
					eat.setPrice(value)
				}
				if (type === 'quantity') {
					eat.setQuantity(value)
				}
			}
		}

		return (
			<div className={'row-2 items-center'} key={index}>
				<div className={'mr-2'}>{index + 1}</div>
				<Input onChange={onChange} placeholder={`write ${type}`} value={name} />
				<CardInput
					className={'w-[100px] border-0'}
					max={99_999}
					min={0}
					onChange={onChangeProperties('quantity')}
					placeholder={'quantity'}
					type={'number'}
					value={count}
				>
					<TbAbacus className={'text-blue-500'} />
				</CardInput>

				<CardInput
					className={'w-[100px] border-0'}
					max={99_999}
					min={0}
					onChange={onChangeProperties('price')}
					placeholder={'price'}
					type={'number'}
					value={price}
				>
					<FaCoins className={'text-yellow-500'} />
				</CardInput>
				<CardInput
					className={'w-[100px] border-0'}
					max={99_999}
					min={0}
					onChange={onChangeProperties('calories')}
					placeholder={'calories'}
					type={'number'}
					value={calories}
				>
					<FaFire className={'text-red-500'} />
				</CardInput>
				<Button color={'red'} onClick={() => order.removeEat(eat.id)} variant={'danger'}>
					<IoIosRemove />
				</Button>
			</div>
		)
	},
)

const SelectMembers = observer(({ order }: { order: Order }) => {
	const { members } = order

	const onChangeMembers = (e: React.ChangeEvent<HTMLInputElement>) => {
		const number = Number(e.target.value)
		if (number) {
			order.setMembers(Number(e.target.value))
		}
	}

	return (
		<div className={'row-2 items-center'}>
			<div className={'mr-2'}>Choose members</div>
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
