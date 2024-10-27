import { AuthScreen } from '@/features/auth/components/auth-screen/auth-screen'

import classes from './auth-page.module.scss'

export default function AuthPage() {
	return (
		<div className={classes.inner}>
			<AuthScreen />
		</div>
	)
}
