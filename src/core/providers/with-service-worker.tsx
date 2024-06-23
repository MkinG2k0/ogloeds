export const WithServiceWorker = (component: FC) => (props) => {
	return <>{component(props)}</>
}
