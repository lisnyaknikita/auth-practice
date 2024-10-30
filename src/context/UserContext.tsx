'use client'

import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../../firebase-config'

interface UserContextType {
	user: User | null
	loading: boolean
	logout: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()

	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	const logout = async () => {
		await signOut(auth)
		router.replace('/auth')
		setUser(null)
	}

	return <UserContext.Provider value={{ user, loading, logout }}>{children}</UserContext.Provider>
}
