'use client'

import { useState } from 'react'
import { SignInCard } from '../sign-in-card/SignInCard'
import { SignUpCard } from '../sign-up-card/SignUpCard'

export const AuthScreen = () => {
	const [status, setStatus] = useState<'sign-in' | 'sign-up'>('sign-in')

	return <>{status === 'sign-in' ? <SignInCard setStatus={setStatus} /> : <SignUpCard setStatus={setStatus} />}</>
}
