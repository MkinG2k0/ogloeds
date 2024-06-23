import { RouterProvider } from 'react-router-dom'

import { router } from 'shared/config/routing'

import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { setDefaultOptions } from 'date-fns'
// TODO
import { ru } from 'date-fns/locale'

setDefaultOptions({locale: ru})

export const Pages: FC = () => {
	return <RouterProvider router={router}/>

}

// Call the element loader before the render call
defineCustomElements(window)
