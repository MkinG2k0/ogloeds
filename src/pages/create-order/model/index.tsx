import { uuid } from 'shared/lib/uuid'

import { makeAutoObservable } from 'mobx'
export type TEat = 'drink' | 'food'
export interface IEat {
	name: string
	price: number
	count: number
	calories: number
	type: TEat
}

export interface IOrderItem {
	name: string
	foods: Eat[]
	drinks: Eat[]
	price: number
}

export interface IOrder {
	members: number
	orders: OrderItem[]
}

export class Order implements IOrder {
	id: string = uuid()
	members = 2
	orders = [new OrderItem(this, 'Name1'), new OrderItem(this, 'Name2')]
	price = 0
	name = ''

	constructor(id?: string) {
		makeAutoObservable(this)

		if (id) {
			this.id = id
		}
	}

	setMembers(members: number) {
		if (members < 1) {
			return
		}
		if (this.members + 1 === members) {
			this.orders.push(new OrderItem(this, `Name${members}`))
		} else if (this.members + 1 < members) {
			const dif = members - this.members
			const arr = new Array(dif)
				.fill('')
				.map((_, i) => members - i)
				.reverse()
			arr.forEach((elem) => this.orders.push(new OrderItem(this, `Name${elem}`)))
		} else {
			this.orders = this.orders.slice(0, members)
		}
		this.members = members
	}

	removeOrder(id: string) {
		this.orders = this.orders.filter((order) => order.id !== id)
	}

	updatePrice() {
		this.price = 0
		this.orders.forEach((order) => {
			this.price += order.price
		})
	}

	setName(name: string) {
		this.name = name
	}

	previewOrder() {
		const allOrders: Record<string, { count: number }> = {}

		this.orders.forEach(({ eat }) => {
			eat.forEach(({ name, count }) => {
				const curr = allOrders[name]
				if (curr) {
					allOrders[name].count += count
				} else {
					allOrders[name] = { count }
				}
			})
		})

		return Object.entries(allOrders)
	}
}

export class OrderItem {
	eat: Eat[] = []
	id: string = uuid()
	name = ''
	price = 0
	count = 1
	calories = 0
	order: Order

	constructor(order: Order, name: string) {
		makeAutoObservable(this)

		this.name = name
		this.order = order
		this.eat = [new Eat(this, 'food'), new Eat(this, 'drink')]
	}

	addEat(type: TEat = 'food') {
		this.eat.push(new Eat(this, type))
		this.updateCalc()
	}

	removeEat(id: string) {
		this.eat = this.eat.filter((eat) => eat.id !== id)
		this.updateCalc()
	}

	setName(name: string) {
		this.name = name
	}

	updateCalc() {
		this.price = 0
		this.calories = 0
		this.count = 0
		this.eat.forEach((eat) => {
			this.price += eat.count * eat.price
			this.calories += eat.calories
			this.count += eat.count
		})

		this.order.updatePrice()
	}

	getEatByType(type: TEat) {
		return this.eat.filter((eat) => eat.type === type)
	}

	remove() {
		this.order.removeOrder(this.id)
	}
}

export class Eat implements IEat {
	calories = 0
	id: string = uuid()
	name = ''
	price = 0
	count = 0
	type: TEat = 'food'
	order: OrderItem

	constructor(order: OrderItem, type: TEat = 'food', name = '', price = 0, count = 1, calories = 0) {
		makeAutoObservable(this)

		this.name = name
		this.type = type
		this.price = price
		this.count = count
		this.calories = calories
		this.order = order
	}

	setName(name: string) {
		this.name = name
	}

	setCalories(calories: number) {
		this.calories = this.validateNumber(calories)
		this.order.updateCalc()
	}

	setPrice(price: number) {
		this.price = this.validateNumber(price)
		this.order.updateCalc()
	}

	setQuantity(quantity: number) {
		this.count = this.validateNumber(quantity)
		this.order.updateCalc()
	}

	validateNumber(value: number) {
		if (Number.isNaN(value)) {
			return 0
		} else if (value < 0) {
			return 0
		} else if (value > 99_999) {
			return 99_999
		}
		return value
	}
}
