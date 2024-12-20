'use client'

import { useState } from 'react'
import { ForgotPasswordCard } from '../forgot-password-card/ForgotPasswordCard'
import { SignInCard } from '../sign-in-card/SignInCard'
import { SignUpCard } from '../sign-up-card/SignUpCard'

export const AuthScreen = () => {
	const [status, setStatus] = useState<'sign-in' | 'sign-up' | 'forgot-password'>('sign-in')

	return (
		<>
			{status === 'sign-in' ? (
				<SignInCard setStatus={setStatus} />
			) : status === 'forgot-password' ? (
				<ForgotPasswordCard setStatus={setStatus} />
			) : (
				<SignUpCard setStatus={setStatus} />
			)}
		</>
	)
}
