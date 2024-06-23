import { replaceFields } from 'shared/lib/merge'

import { makeAutoObservable } from 'mobx'

export interface IUser {
	age: number
	name: string
}

export class UserService {
	age?: number
	name?: string

	constructor(user?: IUser) {
		makeAutoObservable(this)

		replaceFields(this, user)
	}
}
