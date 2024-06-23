import { replaceFields } from './'

import { it } from 'vitest'

it('test', async () => {
	const user = { age: 12, data: { isMale: true, number: 123 }, name: 'Name' }
	replaceFields(user, { age: 100, data: { number: 1000 }, name: 'new Name' })
	console.log(user)
})
