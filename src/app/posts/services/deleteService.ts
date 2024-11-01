import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebase-config'

export const deletePost = async (postId: string) => {
	try {
		const postRef = doc(db, 'posts', postId)
		await deleteDoc(postRef)
	} catch (error) {
		console.error('Error deleting post:', error)
		throw new Error('Failed to delete post')
	}
}
