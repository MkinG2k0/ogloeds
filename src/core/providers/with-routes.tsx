
export const WithRoutes = (component: FC) => (props) => {
	return <>{component(props)}</>
}
