// const paths = (...paths: string[]) => ''.concat(paths.join('/'))

export const NAV = {
	all: () => '*',
	auth: () => '/auth',
	root: () => '/',
	createOrder: () => '/create-order',
	previewId: (id: string) => `/preview/${id}`,
	previewNav: () => '/preview/:id',
	map: () => '/map',
	settings: () => '/settings',
}
