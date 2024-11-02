import { IPost } from '@/types/Post.types'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../firebase-config'

export const createPost = async (postData: Omit<IPost, 'id' | 'createdAt' | 'updatedAt'>) => {
	const postsCollection = collection(db, 'posts')
	const newPost = {
		...postData,
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now(),
	}

	const docRef = await addDoc(postsCollection, newPost)
	return { ...newPost, id: docRef.id }
}
