// const paths = (...paths: string[]) => ''.concat(paths.join('/'))

export const NAV = {
	all: () => '*',
	auth: () => '/auth',
	root: () => '/',
	createOrderId: () => '/create-order/:id',
	createOrder: (id: string) => `/create-order/${id}`,
	viewOrder: (id: string) => `/view-order/${id}`,
	viewOrderId: () => '/view-order/:id',
	
	previewId: (id: string) => `/preview/${id}`,
	previewNav: () => '/preview/:id',
	map: () => '/map',
	settings: () => '/settings',
}
