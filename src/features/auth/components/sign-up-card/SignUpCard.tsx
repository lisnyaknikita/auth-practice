import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Separator } from '@/components/ui/separator'
import classes from '../auth-screen/auth-screen.module.scss'

interface ISignUpCardProps {
	setStatus: (status: 'sign-in' | 'sign-up') => void
}

export const SignUpCard = ({ setStatus }: ISignUpCardProps) => {
	return (
		<div>
			<Card className={classes.authScreen}>
				<CardHeader className={classes.screenHeader}>
					<CardTitle>Sign up</CardTitle>
				</CardHeader>
				<Separator className={classes.separator} />
				<CardContent className={classes.screenContent}>
					<form className={classes.form}>
						<div className={classes.inputs}>
							<Input className={classes.input} type='text' placeholder='Username' />
							<Input className={classes.input} type='email' placeholder='Email' />
							<Input className={classes.input} type='password' placeholder='Password' />
							<Input className={classes.input} type='password' placeholder='Confirm password' />
						</div>
						<Button className={classes.button}>Sign up</Button>
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
				<CardFooter>
					<p className={classes.already}>
						Already have an account? <span onClick={() => setStatus('sign-in')}>Sign in</span>
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
