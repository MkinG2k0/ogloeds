import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import CreateOrder from 'pages/create-order'
import Settings from 'pages/settings'
import Preview from 'pages/preview'
import Auth from 'pages/auth'
import Main from 'pages/main'

import { Layout } from 'entities/layout'

import { NAV } from 'shared/config/routing/router'

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
				element: <Preview />,
				path: NAV.previewNav(),
			},
			{
				element: <Settings />,
				path: NAV.settings(),
			},
			{
				element: <CreateOrder />,
				path: NAV.createOrderId(),
			},
			{
				element: <CreateOrder />,
				path: NAV.viewOrderId(),
			},
		],
	},
])
