import { useLocation } from 'react-router'

export const useViewOnly = () => {
	const { state } = useLocation()
	return Boolean(state?.viewOnly)
}
