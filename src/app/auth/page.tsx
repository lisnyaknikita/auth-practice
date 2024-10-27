import type { Metadata } from 'next'

import { AuthScreen } from '@/features/auth/components/auth-screen/auth-screen'
import classes from './auth-page.module.scss'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default function AuthPage() {
	return (
		<div className={classes.inner}>
			<AuthScreen />
		</div>
	)
}
