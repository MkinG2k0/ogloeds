export class Cache<T> {
	private data: T | undefined

	constructor() {}

	has() {
		return Boolean(this.data)
	}
	revalidate() {
		this.data = undefined
	}
	get(): T | undefined {
		return this.data
	}
	update(data: T) {
		this.data = data
	}
}
