import { Timestamp } from 'firebase/firestore'

export interface IPost {
	authorId: string
	content: string
	createdAt: Timestamp
	id: string
	imageURL?: string
	title: string
	updatedAt: Timestamp
}
