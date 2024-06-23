import { Order } from 'pages/create-order/model'

import { makeAutoObservable } from 'mobx'

export class History {
	orders: Order[] = []

	constructor() {
		makeAutoObservable(this)

		const orders = localStorage.getItem('history')
		if (orders) {
			const parse = JSON.parse(orders) as Order[]
			// this.orders = parse.map((data) => new Order(data))
			this.orders = parse
		}
	}

	find(id: string) {
		return this.orders.find((item) => item.id === id)
	}

	addOrder(order: Order) {
		const find = this.orders.find((item) => item.id === order.id)
		if (!find) {
			this.orders.push(order)
		} else {
			this.orders = this.orders.map((item) => {
				if (item.id === order.id) {
					return order
				}
				return item
			})
		}
	}

	save() {
		const formatObject = this.orders.map((order) => {
			return {
				...order,
				orders: order.orders.map((order) => {
					return { ...order, order: undefined, eat: order.eat.map((eat) => ({ ...eat, order: undefined })) }
				}),
			}
		})

		localStorage.setItem('history', JSON.stringify(formatObject))
	}
}

export const appHistory = new History()
