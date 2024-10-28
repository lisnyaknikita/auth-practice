'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/features/auth/hooks/use-user'
import Image from 'next/image'

export default function Home() {
	const { user, loading, logout } = useUser()

	if (loading) return <p>Loading...</p>

	if (!user) return <p>Error while fetching user data</p>

	return (
		<div>
			<div>
				<h1>Welcome, {user.displayName || 'User'}!</h1>
				<p>Email: {user.email}</p>
				{user.photoURL && <Image src={user.photoURL} alt='User Avatar' width={100} height={100} />}
			</div>
			<Button onClick={logout} variant={'outline'} className='text-slate-600'>
				Logout
			</Button>
		</div>
	)
}
