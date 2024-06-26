import { replaceFields } from 'shared/lib/merge'

import { makeAutoObservable } from 'mobx'

export const settingsProp = {
	calcStats: 'calcStats',
	splitFood: 'splitFood',
	viewCalories: 'viewCalories',
	viewCount: 'viewCount',
	viewPrice: 'viewPrice',
	hideAddFoodBtn: 'hideAddFoodBtn',
} as const

export type SettingType = typeof settingsProp
export type SettingTypeKey = keyof SettingType

export const listSettings = Object.entries(settingsProp).map(([key]) => key) as SettingTypeKey[]

class Setting implements Record<SettingTypeKey, boolean> {
	viewCalories = true
	viewPrice = true
	viewCount = true
	calcStats = true
	splitFood = true
	hideAddFoodBtn = false

	constructor() {
		makeAutoObservable(this)

		const settings = localStorage.getItem('settings')

		if (settings) {
			const parse = JSON.parse(settings) as Setting
			replaceFields(this, parse)
		}
	}

	update() {
		const settings = JSON.stringify(this)
		localStorage.setItem('settings', settings)
	}

	set(type: SettingTypeKey, value: boolean) {
		this[type] = value
		this.update()
	}
}

export const settings = new Setting()
