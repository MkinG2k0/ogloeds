export const getEnvVar = (key: keyof NodeJS.ProcessEnv | string) => {
	// console.log(process.env.VITE_PUBLIC_URL_ENDPOINT)
	// if (process.env[key] === undefined) {
	// 	throw new Error(`Env variable ${key} is required`)
	// }
	return import.meta.env[key] || ''
}

