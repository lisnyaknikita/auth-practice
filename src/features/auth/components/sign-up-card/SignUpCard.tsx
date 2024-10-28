import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Separator } from '@/components/ui/separator'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { toast } from 'sonner'
import { auth } from '../../../../../firebase-config'
import { signInWithGitHub } from '../../services/githubAuth'
import { signInWithGoogle } from '../../services/googleAuth'
import classes from '../auth-screen/auth-screen.module.scss'

interface ISignUpCardProps {
	setStatus: (status: 'sign-in' | 'sign-up') => void
}

interface IFormData {
	userName: string
	email: string
	password: string
	confirmPassword: string
}

export const SignUpCard = ({ setStatus }: ISignUpCardProps) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		watch,
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
		if (data.password !== data.confirmPassword) {
			toast('Passwords do not match')
			return
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
			await updateProfile(userCredential.user, { displayName: data.userName })
			toast('You have successfully registered.')
			router.replace('/')
		} catch (error) {
			console.error(error)
			toast('Registration error')
		}
	}

	return (
		<div>
			<Card className={classes.authScreen}>
				<CardHeader className={classes.screenHeader}>
					<CardTitle>Sign up</CardTitle>
				</CardHeader>
				<Separator className={classes.separator} />
				<CardContent className={classes.screenContent}>
					<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
						<div className={classes.inputs}>
							<Input
								{...register('userName', { required: 'Username is required' })}
								className={classes.input}
								type='text'
								placeholder='Username'
							/>
							{errors.userName && <p className={classes.error}>{errors.userName.message}</p>}
							<Input
								{...register('email', { required: 'Email is required' })}
								className={classes.input}
								type='email'
								placeholder='Email'
							/>
							{errors.email && <p className={classes.error}>{errors.email.message}</p>}
							<Input
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
									pattern: {
										value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,
										message: 'Password must include letters, numbers, and at least one uppercase letter',
									},
								})}
								className={classes.input}
								type='password'
								placeholder='Password'
							/>
							{errors.password && <p className={classes.error}>{errors.password.message}</p>}
							<Input
								{...register('confirmPassword', {
									required: 'Please confirm your password',
									validate: value => value === watch('password') || 'Passwords do not match',
								})}
								className={classes.input}
								type='password'
								placeholder='Confirm password'
							/>
							{errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword.message}</p>}
						</div>
						<Button type='submit' className={classes.button}>
							Sign up
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
				<CardFooter>
					<p className={classes.already}>
						Already have an account? <span onClick={() => setStatus('sign-in')}>Sign in</span>
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
