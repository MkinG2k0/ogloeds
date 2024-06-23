import { Suspense } from 'react'

export const WithSuspense = (component: FC) => (props) => {
	return <Suspense fallback={null}>{component(props)}</Suspense>
}
