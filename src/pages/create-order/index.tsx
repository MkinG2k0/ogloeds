import { CarouselChoose } from 'pages/create-order/ui/carousel-choose'
import { ListChoose } from 'pages/create-order/ui/list-choose'
import { settings } from 'pages/settings/model'

import { observer } from 'mobx-react-lite'

const CreateOrder = observer(() => {
	const { carouselChoose } = settings

	if (carouselChoose) {
		return <CarouselChoose />
	}
	return <ListChoose />
})

export default CreateOrder
