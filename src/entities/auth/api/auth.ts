export interface ReqLogin {
	email: string
	password: string
	token: string
}

export interface ReqRefresh {}

export interface ResLogin {
	token: string
}

export interface ResRefresh {
	token: string
}
