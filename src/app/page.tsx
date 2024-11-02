'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/features/auth/hooks/use-user'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()

	const { user, loading, logout } = useUser()

	useEffect(() => {
		if (!loading && !user) {
			router.replace('/auth')
		}
	}, [loading, user, router])

	if (loading) return <p>Loading...</p>
	if (!user) return null

	return (
		<div>
			<div>
				<h1>Welcome, {user.displayName || 'User'}!</h1>
				<p>Email: {user.email}</p>
				{user.photoURL && <Image src={user.photoURL} alt='User Avatar' width={100} height={100} />}
			</div>
			<Link href={'/posts'}>Posts</Link>
			<Button onClick={logout} variant={'outline'} className='text-slate-600'>
				Logout
			</Button>
		</div>
	)
}
