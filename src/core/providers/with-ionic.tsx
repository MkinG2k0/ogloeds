export const WithIonic = (component: FC) => (props) => {
	return <>{component(props)}</>
}
