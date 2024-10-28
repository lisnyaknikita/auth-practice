import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import {} from 'react-icons'

import { Separator } from '@/components/ui/separator'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { toast } from 'sonner'
import { auth } from '../../../../../firebase-config'
import { signInWithGitHub } from '../../services/githubAuth'
import { signInWithGoogle } from '../../services/googleAuth'
import classes from '../auth-screen/auth-screen.module.scss'

interface ISignInCardProps {
	setStatus: (status: 'sign-in' | 'sign-up') => void
}

interface IFormData {
	email: string
	password: string
}

export const SignInCard = ({ setStatus }: ISignInCardProps) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>()

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithGoogle()
			router.replace('/')
			toast('You have successfully logged in using Google.')
		} catch (error) {
			console.error(error)
			toast('Authorization error')
		}
	}

	const handleSignInWithGithub = async () => {
		try {
			await signInWithGitHub()
			router.replace('/')
			toast('You have successfully logged in using Github.')
		} catch (error) {
			console.error(error)
			toast('Authorization error')
		}
	}

	const onSubmit = async (data: IFormData) => {
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password)
			toast('You have successfully logged in.')
			router.replace('/')
		} catch (error) {
			console.error(error)
			toast('Login error: Please check your email and password.')
		}
	}

	return (
		<div>
			<Card className={classes.authScreenSignIn}>
				<CardHeader className={classes.screenHeader}>
					<CardTitle>Sign in</CardTitle>
				</CardHeader>
				<Separator className={classes.separator} />
				<CardContent className={classes.screenContent}>
					<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
						<div className={classes.inputs}>
							<Input
								{...register('email', { required: 'Email is required' })}
								className={classes.input}
								type='email'
								placeholder='Email'
							/>
							{errors.email && <p className={classes.error}>{errors.email.message}</p>}
							<Input
								{...register('password', { required: 'Password is required' })}
								className={classes.input}
								type='password'
								placeholder='Password'
							/>
							{errors.password && <p className={classes.error}>{errors.password.message}</p>}
						</div>
						<Button type='submit' className={classes.button}>
							Sign in
						</Button>
						<div className={classes.or}>
							<Separator className={classes.line} />
							<span>or</span>
							<Separator className={classes.line} />
						</div>
					</form>
					<div className={classes.alternativeButtons}>
						<Button onClick={handleSignInWithGoogle} variant={'outline'} className={classes.alternativeButton}>
							<FaGoogle /> <span>Google</span>
						</Button>
						<Button onClick={handleSignInWithGithub} variant={'outline'} className={classes.alternativeButton}>
							<FaGithub /> <span>Github</span>
						</Button>
					</div>
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
