import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import CreateOrder from 'pages/create-order'
import Settings from 'pages/settings'
import Preview from 'pages/preview'

import { Layout } from 'entities/layout'

import { NAV } from 'shared/config/routing/router'

const Main = lazy(() => import('pages/main'))
const Auth = lazy(() => import('pages/auth'))

export const router = createBrowserRouter([
	{
		element: <Layout />,
		path: NAV.root(),
		children: [
			{
				element: <Main />,
				path: NAV.root(),
			},
			{
				element: <Auth />,
				path: NAV.auth(),
			},
			{
				element: <CreateOrder />,
				path: NAV.createOrder(),
			},
			{
				element: <Preview />,
				path: NAV.previewNav(),
			},
			{
				element: <Settings />,
				path: NAV.settings(),
			},
		],
	},
])
