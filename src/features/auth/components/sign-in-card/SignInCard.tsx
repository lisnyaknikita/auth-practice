import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Separator } from '@/components/ui/separator'
import classes from '../auth-screen/auth-screen.module.scss'

interface ISignInCardProps {
	setStatus: (status: 'sign-in' | 'sign-up') => void
}

export const SignInCard = ({ setStatus }: ISignInCardProps) => {
	return (
		<div>
			<Card className={classes.authScreenSignIn}>
				<CardHeader className={classes.screenHeader}>
					<CardTitle>Sign in</CardTitle>
				</CardHeader>
				<Separator className={classes.separator} />
				<CardContent className={classes.screenContent}>
					<form className={classes.form}>
						<div className={classes.inputs}>
							<Input className={classes.input} type='email' placeholder='Email' />
							<Input className={classes.input} type='password' placeholder='Password' />
						</div>
						<Button className={classes.button}>Sign in</Button>
						<div className={classes.or}>
							<Separator className={classes.line} />
							<span>or</span>
							<Separator className={classes.line} />
						</div>
						<div className={classes.alternativeButtons}>
							<Button variant={'outline'} className={classes.alternativeButton}>
								Google
							</Button>
							<Button variant={'outline'} className={classes.alternativeButton}>
								Github
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className={classes.screenFooter}>
					<p className={classes.already}>
						No account? <span onClick={() => setStatus('sign-up')}>Sign up</span>
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
