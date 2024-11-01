import { IPost } from '@/types/Post.types'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../firebase-config'

export const fetchPostById = async (id: string): Promise<IPost | null> => {
	try {
		const postRef = doc(db, 'posts', id)
		const postSnap = await getDoc(postRef)

		if (postSnap.exists()) {
			return { id: postSnap.id, ...postSnap.data() } as IPost
		} else {
			console.warn('No such document!')
			return null
		}
	} catch (error) {
		console.error('Error fetching post:', error)
		throw new Error('Failed to fetch post')
	}
}
