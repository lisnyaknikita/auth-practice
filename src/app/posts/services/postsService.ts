import { IPost } from '@/types/Post.types'
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	limit as fbLimit,
	getDocs,
	orderBy,
	query,
	startAfter,
	where,
} from 'firebase/firestore'
import { db } from '../../../../firebase-config'

export const fetchUserPosts = async (
	userId: string,
	limit: number,
	startDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ posts: IPost[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; totalPosts: number }> => {
	const postsCollection = collection(db, 'posts')
	const q = startDoc
		? query(
				postsCollection,
				where('authorId', '==', userId),
				orderBy('createdAt', 'desc'),
				startAfter(startDoc),
				fbLimit(limit)
		  )
		: query(postsCollection, where('authorId', '==', userId), orderBy('createdAt', 'desc'), fbLimit(limit))

	const snapshot = await getDocs(q)
	const totalSnapshot = await getDocs(query(postsCollection, where('authorId', '==', userId)))

	const totalPosts = totalSnapshot.size
	const posts = snapshot.docs.map(
		doc =>
			({
				id: doc.id,
				authorId: doc.data().authorId,
				content: doc.data().content,
				createdAt: doc.data().createdAt,
				imageURL: doc.data().imageURL || '',
				title: doc.data().title,
				updatedAt: doc.data().updatedAt,
			} as IPost)
	)

	const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null

	return { posts, lastDoc, totalPosts }
}
