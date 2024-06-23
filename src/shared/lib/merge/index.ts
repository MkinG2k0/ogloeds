export const replaceFields = (context: object, obj?: object) => {
	if (!obj) {
		return
	}

	for (const keyObj in obj) {
		const value = obj[keyObj]
		const isObject = typeof value === 'object' && !Array.isArray(value) && value !== null

		if (isObject) {
			replaceFields(context[keyObj], value)
		} else {
			context[keyObj] = value
		}
	}
}
