import type { NavigateOptions } from 'react-router/dist/lib/context'

import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

import { NAV } from 'shared/config/routing'

export const useNav = () => {
	const navigate = useNavigate()

	const objNav = useMemo(() => {
		const newObj = {} as Record<keyof typeof NAV, (options?: NavigateOptions) => void>

		for (const navKey in NAV) {
			newObj[navKey] = (options?: NavigateOptions) => navigate(NAV[navKey](), options)
		}

		return newObj
	}, [NAV, navigate])

	return objNav
}
