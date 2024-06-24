import { makeAutoObservable } from 'mobx'

class Setting {
	viewCalories = true
	viewPrice = true
	viewCount = true

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

	setViewCalories(viewCalories: boolean) {
		this.viewCalories = viewCalories
		this.update()
	}

	setViewPrice(viewPrice: boolean) {
		this.viewPrice = viewPrice
		this.update()
	}

	setViewCount(viewCount: boolean) {
		this.viewCount = viewCount
		this.update()
	}

	set(type: 'viewCalories' | 'viewCount' | 'viewPrice', value: boolean) {
		this[type] = value
		this.update()
	}
}

export const settings = new Setting()
