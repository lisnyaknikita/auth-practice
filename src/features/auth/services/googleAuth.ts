import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../../../firebase-config'

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider)
		const user = result.user
		console.log('User info:', user)
	} catch (error) {
		console.error('Error signing in with Google:', error)
	}
}
