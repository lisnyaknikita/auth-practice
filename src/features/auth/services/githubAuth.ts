import { signInWithPopup } from 'firebase/auth'
import { auth, githubProvider } from '../../../../firebase-config'

export const signInWithGitHub = async () => {
	try {
		const result = await signInWithPopup(auth, githubProvider)
		const user = result.user
		console.log('User info:', user)
	} catch (error) {
		console.error('Error signing in with GitHub:', error)
	}
}
