export const AxiosConfig = {
	baseURL: import.meta.env.VITE_PUBLIC_URL_ENDPOINT,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: 10000,
}
