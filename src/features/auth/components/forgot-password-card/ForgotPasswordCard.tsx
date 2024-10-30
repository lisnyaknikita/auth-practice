import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

import { Separator } from '@/components/ui/separator'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'sonner'
import { auth } from '../../../../../firebase-config'
import classes from '../auth-screen/auth-screen.module.scss'

interface IForgotPasswordCardProps {
	setStatus: (status: 'sign-in' | 'sign-up' | 'forgot-password') => void
}

interface IFormData {
	email: string
}

export const ForgotPasswordCard = ({ setStatus }: IForgotPasswordCardProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>()

	const onSubmit = async (data: IFormData) => {
		try {
			await sendPasswordResetEmail(auth, data.email)
			toast('Password reset email has been sent. Please check your inbox.')
		} catch (error) {
			console.error(error)
			toast('Error: Unable to send password reset email.')
		}
	}

	return (
		<div>
			<Card className={classes.authScreenForgot}>
				<CardHeader className={classes.screenHeader}>
					<CardTitle>Reset password</CardTitle>
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
						</div>
						<Button type='submit' className={classes.button}>
							Send reset link
						</Button>
					</form>
				</CardContent>
				<CardFooter className={classes.screenFooter}>
					<p className={classes.already}>
						<span onClick={() => setStatus('sign-in')}>Back to log in</span>
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
