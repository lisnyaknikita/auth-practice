'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@/features/auth/hooks/use-user'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IPost } from '@/types/Post.types'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PostList } from './components/post-list/PostList'
import classes from './posts-page.module.scss'
import { createPost } from './services/createService'
import { deletePost } from './services/deleteService'
import { fetchUserPosts } from './services/postsService'
import { fetchSortedPosts } from './services/sortService'

interface IFormData {
	title: string
	content: string
}

export default function PostsPage() {
	const { user, loading } = useUser()
	const [posts, setPosts] = useState<IPost[]>([])
	const [error, setError] = useState<string | null>(null)
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
	const [postToDelete, setPostToDelete] = useState<string | null>(null)
	const [sortField, setSortField] = useState<'createdAt' | 'title'>('createdAt')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({ mode: 'onChange' })

	useEffect(() => {
		const loadPosts = async () => {
			if (user) {
				try {
					const userPosts: IPost[] = await fetchUserPosts(user.uid)
					setPosts(userPosts)
				} catch (e) {
					console.error(e)
					setError('Failed to load posts')
				}
			}
		}

		loadPosts()
	}, [user])

	useEffect(() => {
		const loadSortedPosts = async () => {
			if (user) {
				try {
					const sortedPosts = await fetchSortedPosts(user.uid, sortField, sortOrder)
					setPosts(sortedPosts)
				} catch (e) {
					console.error(e)
					setError('Failed to load posts')
				}
			}
		}

		loadSortedPosts()
	}, [user, sortField, sortOrder])

	const onSubmit = async (data: IFormData) => {
		if (user) {
			try {
				const newPost = await createPost({
					authorId: user.uid,
					title: data.title,
					content: data.content,
					imageURL: 'https://picsum.photos/400/300',
				})
				setPosts(prevPosts => [newPost, ...prevPosts])
				setIsCreateDialogOpen(false)
			} catch (error) {
				console.error('Error creating post:', error)
				setError('Failed to create post')
			}
		}
	}

	const handleDeletePost = async () => {
		if (postToDelete) {
			try {
				await deletePost(postToDelete)
				setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete))
				setIsConfirmDialogOpen(false)
				setPostToDelete(null)
				//TODO: clear fields
			} catch (error) {
				console.error('Error deleting post:', error)
				setError('Failed to delete post')
			}
		}
	}

	const openDeleteConfirmDialog = (postId: string) => {
		setPostToDelete(postId)
		setIsConfirmDialogOpen(true)
	}

	const handleSortChange = (value: string) => {
		if (value.includes('createdAt')) {
			setSortField('createdAt')
		} else {
			setSortField('title')
		}
		setSortOrder(value.endsWith('Asc') ? 'asc' : 'desc')
	}

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.inner}>
					<div className={classes.header}>
						<div className={classes.create}>
							<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
								<DialogTrigger className={classes.createTrigger}>Create new post</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle className={classes.dialogTitle}>Create new post</DialogTitle>
									</DialogHeader>
									<form onSubmit={handleSubmit(onSubmit)}>
										<Input
											{...register('title', { required: 'Title is required' })}
											className={classes.createInput}
											placeholder='Post title'
										/>
										{errors.title && <p className='text-red-600'>{errors.title.message}</p>}
										<Textarea
											{...register('content', { required: 'Content is required' })}
											className={classes.createText}
											placeholder='Post text'
										/>
										{errors.content && <p className='text-red-600'>{errors.content.message}</p>}
										<DialogFooter>
											<Button type='submit'>Create</Button>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
						</div>
						<div className={classes.search}>Search</div>
						<div className={classes.sort}>
							<Select onValueChange={handleSortChange}>
								<SelectTrigger className='w-[160px]'>
									<SelectValue placeholder='Sort' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem className='cursor-pointer' value='createdAtAsc'>
										Created at(asc)
									</SelectItem>
									<SelectItem className='cursor-pointer' value='createdAtDesc'>
										Created at(desc)
									</SelectItem>
									<SelectItem className='cursor-pointer' value='titleAsc'>
										Title(asc)
									</SelectItem>
									<SelectItem className='cursor-pointer' value='titleDesc'>
										Title(desc)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className={classes.posts}>
						{loading && <Loader className='text-zinc-800 animate-spin mx-auto mt-5' />}
						{error && <p className='text-red-600'>{error}</p>}
						{posts.length === 0 ? (
							<p className='text-zinc-800 text-center mt-4'>Create your first post</p>
						) : (
							<PostList posts={posts} onDelete={openDeleteConfirmDialog} />
						)}
					</div>
					<div className={classes.pagination}>Pagination</div>
				</div>
			</div>
			<Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className={classes.dialogTitle}>Delete this post</DialogTitle>
					</DialogHeader>
					<p className='text-zinc-800'>Are you sure you want to delete this post?</p>
					<DialogFooter>
						<Button variant='default' onClick={() => setIsConfirmDialogOpen(false)}>
							Cancel
						</Button>
						<Button variant='destructive' onClick={handleDeletePost}>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
