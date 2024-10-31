import { initializeApp } from 'firebase/app'
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyAeDxLfHdJwQx26dScIgCyjUYVtT8_Vb9Q',
	authDomain: 'auth-practice-471fa.firebaseapp.com',
	projectId: 'auth-practice-471fa',
	storageBucket: 'auth-practice-471fa.appspot.com',
	messagingSenderId: '1007754059409',
	appId: '1:1007754059409:web:567ebdd5756ed226e6a930',
	measurementId: 'G-WSM2JKNBB6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()

export const db = getFirestore(app)
