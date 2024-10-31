import { Timestamp } from 'firebase/firestore'

export interface IUser {
	uid: string
	displayName: string
	email: string
	createdAt: Timestamp
	photoURL?: string
}
