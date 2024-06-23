import { Photo } from '@capacitor/camera'
import { create } from 'zustand'

interface PointStore {

	photos: Photo[]
	setPhotos: (photos: Photo[]) => void
}

export const usePointStore = create<PointStore>((set) => ({
	photos: [],
	setPhotos: (photos: Photo[]) => set((state) => ({...state, photos})),
}))
