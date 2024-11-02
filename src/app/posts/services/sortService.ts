import { IPost } from '@/types/Post.types'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase-config'

export const fetchSortedPosts = async (userId: string, sortField: 'createdAt' | 'title', sortOrder: 'asc' | 'desc') => {
	const postsRef = collection(db, 'posts')
	const postsQuery = query(postsRef, where('authorId', '==', userId), orderBy(sortField, sortOrder))

	const querySnapshot = await getDocs(postsQuery)
	const posts: IPost[] = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as IPost[]

	return posts
}
