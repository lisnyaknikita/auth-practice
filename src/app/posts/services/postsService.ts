import { IPost } from '@/types/Post.types'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase-config'

export const fetchUserPosts = async (userId: string): Promise<IPost[]> => {
	const postsCollection = collection(db, 'posts')
	const q = query(postsCollection, where('authorId', '==', userId))
	const snapshot = await getDocs(q)

	return snapshot.docs.map(doc => {
		const data = doc.data()
		return {
			id: doc.id,
			authorId: data.authorId,
			content: data.content,
			createdAt: data.createdAt,
			imageURL: data.imageURL || '',
			title: data.title,
			updatedAt: data.updatedAt,
		} as IPost
	})
}
