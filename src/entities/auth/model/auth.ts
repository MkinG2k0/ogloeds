import { UserService } from 'entities/auth/model/user'
import { ReqLogin } from 'entities/auth/api/auth'
import { RAuth } from 'entities/auth'

import { makeAutoObservable } from 'mobx'

class AuthService {
	private STATUS_KEYS = [401, 403]
	private TOKEN_KEY = 'token'
	isAuth = Boolean(localStorage.getItem(this.TOKEN_KEY))
	token?: string
	user = new UserService()

	constructor() {
		makeAutoObservable(this)
	}

	isRefresh(status?: number) {
		if (status && this.STATUS_KEYS.includes(status)) {
			this.refresh()
		}
	}

	async login(loginRequest: ReqLogin) {
		// return RAuth.login(loginRequest)
		// 	.then(({ data }) => {
		// 		this.token = data.token
		// 		this.isAuth = true
		// 		localStorage.setItem(this.TOKEN_KEY, data.token)
		// 		this.user = new UserService({ age: 12, name: 'Name' })
		//
		// 		return data
		// 	})
		// 	.catch(({ response }) => {
		// 		this.logout()
		// 		return response.data
		// 	})

		return new Promise((resolve) => {
			setTimeout(() => {
				this.isAuth = true
				localStorage.setItem(this.TOKEN_KEY, 'token')
				this.user = new UserService({ age: 12, name: 'Name' })

				resolve('success')
			}, 500)
		})
	}

	logout() {
		this.isAuth = false
		this.token = undefined
		localStorage.removeItem(this.TOKEN_KEY)
	}

	async refresh() {
		return RAuth.refresh({})
			.then(({ data }) => {
				const token = data.data.token

				if (token) {
					this.token = token
				} else {
					this.logout()
				}

				return data
			})
			.catch(({ response }) => {
				this.logout()
				return response.data
			})
	}
}

export const authService = new AuthService()
