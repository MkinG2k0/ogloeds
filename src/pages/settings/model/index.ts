import { makeAutoObservable } from 'mobx'

class Setting {
	viewCalories = true
	viewPrice = true
	viewCount = true
	calcStats = true

	constructor() {
		makeAutoObservable(this)

		const settings = localStorage.getItem('settings')

		if (settings) {
			const parse = JSON.parse(settings) as Setting
			this.viewCalories = parse.viewCalories
			this.viewPrice = parse.viewPrice
			this.viewCount = parse.viewCount
		}
	}

	update() {
		const settings = JSON.stringify({
			viewCalories: this.viewCalories,
			viewPrice: this.viewPrice,
			viewCount: this.viewCount,
		})
		localStorage.setItem('settings', settings)
	}

	set(type: 'calcStats' | 'viewCalories' | 'viewCount' | 'viewPrice', value: boolean) {
		this[type] = value
		this.update()
	}
}

export const settings = new Setting()
