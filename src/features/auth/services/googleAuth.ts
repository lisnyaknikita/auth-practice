import { signInWithPopup } from 'firebase/auth'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../../../../firebase-config'

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider)
		const user = result.user

		const userDocRef = doc(db, 'users', user.uid)
		const userSnapshot = await getDoc(userDocRef)

		if (!userSnapshot.exists()) {
			await setDoc(userDocRef, {
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL || user.displayName?.[0].toUpperCase(),
				createdAt: Timestamp.now(),
			})
		}

		console.log('User info:', user)
	} catch (error) {
		console.error('Error signing in with Google:', error)
	}
}
