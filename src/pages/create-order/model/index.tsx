import { replaceFields } from 'shared/lib/merge'
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

export interface IOrder {
	members: number
	orders: OrderItem[]
}

export class Order implements IOrder {
	id: string = uuid()
	members = 2
	price = 0
	name = ''
	orders = [new OrderItem(this, { name: 'Name1' }), new OrderItem(this, { name: 'Name2' })]

	constructor(data?: Partial<Order>) {
		makeAutoObservable(this)

		replaceFields(this, data)
		if (data) {
			this.init()
		}
	}

	init() {
		this.orders = this.orders.map((order) => new OrderItem(this, order))
	}

	setMembers(members: number) {
		if (members < 1) {
			return
		}
		if (this.members + 1 === members) {
			this.orders.push(new OrderItem(this, { name: `Name${members}` }))
		} else if (this.members + 1 < members) {
			const dif = members - this.members
			const arr = new Array(dif)
				.fill('')
				.map((_, i) => members - i)
				.reverse()
			arr.forEach(() => this.orders.push(new OrderItem(this, { name: `Name${members}` })))
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
	id: string = uuid()
	name = ''
	price = 0
	count = 1
	calories = 0
	order: Order
	eat: Eat[] = [new Eat(this, { type: 'food' }), new Eat(this, { type: 'drink' })]

	constructor(order: Order, data?: Partial<OrderItem>) {
		makeAutoObservable(this)

		replaceFields(this, data)

		this.init()

		this.order = order
	}

	init() {
		this.eat = this.eat.map((eat) => new Eat(this, eat))
	}

	addEat(type: TEat = 'food') {
		this.eat.push(new Eat(this, { type }))
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
		this.count = 1
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
	id: string = uuid()
	name = ''
	calories = 0
	price = 0
	count = 1
	type: TEat = 'food'
	order: OrderItem

	constructor(order: OrderItem, data?: Partial<Eat>) {
		makeAutoObservable(this)

		this.order = order
		replaceFields(this, data)
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
