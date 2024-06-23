import { useCallback, useRef } from 'react'

export const useToggleRef = (
	state = false,
): [{ current: boolean }, (state?: boolean) => boolean] => {
	const ref = useRef(state)

	const setToggle = (state?: boolean) => {
		if (typeof state === 'boolean') {
			ref.current = state
		} else {
			ref.current = !ref.current
		}

		return ref.current
	}

	return [ref, setToggle]
}
