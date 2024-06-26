import { FC, useEffect, useState } from 'react'
import * as React from 'react'

import { Input, InputProps } from 'shared/ui/input'
import { Separator } from 'shared/ui/separator'

interface Food {
	name: string
	data: string[]
}

const foods = [
	{
		name: 'бургер',
		data: ['мистер бист', 'камбой'],
	},
	{
		name: 'ролы',
		data: ['ойси', 'цезарь'],
	},
	{
		name: 'пицца',
		data: ['маргарита', 'мексиканская'],
	},
]

interface FoodSelectProps extends InputProps {
	onChangeFood?: (value: string) => void
}

export const FoodSelect: FC<FoodSelectProps> = (props) => {
	const [value, setValue] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [filterFoods, setFilterFoods] = useState<Food[]>([])

	useEffect(() => {
		const filterFoods: Food[] = []

		foods.forEach((food) => {
			const findData = { name: food.name, data: [] as string[] }
			const valueLow = value.toLowerCase().trim()
			const findNameLow = food.name.toLowerCase()
			const findByName = valueLow.includes(findNameLow) || findNameLow.includes(valueLow)

			food.data.forEach((data) => {
				const find = data.toLowerCase().includes(valueLow)
				if (find) {
					findData.data.push(data)
				}
			})

			if (findData.data.length > 0) {
				filterFoods.push(findData)
			} else if (findByName) {
				filterFoods.push(food)
			}
		})

		setFilterFoods(filterFoods)

		props.onChangeFood?.(value)
	}, [value])

	return (
		<div
			className={'row-2 relative flex-auto'}
			onBlur={() => {
				setIsOpen(false)
			}}
			onFocus={() => setIsOpen(true)}
		>
			<Input onChange={(e) => setValue(e.target.value)} value={value} {...props} />
			<div className={'absolute left-0 top-12 z-10 flex-auto min-w-56 '} tabIndex={-1}>
				<div
					className={' rounded-md border bg-background max-h-[45vh] overflow-auto'}
					style={{ display: isOpen && filterFoods.length > 0 ? 'block' : 'none' }}
				>
					<div className={'p-4 '}>
						{filterFoods.map((food) => (
							<div key={food.name}>
								<h4 className={'mb-4 text-sm font-medium leading-none'}>{food.name}</h4>
								<Separator className={'my-2'} />
								<div className={'pl-4'}>
									{food.data.map((data) => (
										<div
											key={data}
											onClick={() => {
												setValue(`${food.name} ${data}`)
												setIsOpen(false)
											}}
										>
											{data}
											<Separator className={'my-2'} />
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
