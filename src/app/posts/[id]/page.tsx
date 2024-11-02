'use client'

import { IPost } from '@/types/Post.types'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchPostById } from '../services/fetchByIdService'
import classes from './post-page.module.scss'

export default function PostPage() {
	const { id } = useParams()
	const [post, setPost] = useState<IPost | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadPost = async () => {
			if (id) {
				try {
					const fetchedPost = await fetchPostById(id as string)
					setPost(fetchedPost)
				} catch (e) {
					console.error(e)
					setError('Failed to load post')
				} finally {
					setLoading(false)
				}
			}
		}

		loadPost()
	}, [id])

	if (loading) return <Loader className='text-zinc-800 animate-spin mx-auto mt-5' />
	if (error) return <p className='text-red-600'>{error}</p>
	if (!post) return <p className='text-zinc-800'>Post not found</p>

	return (
		<div className={classes.wrapper}>
			<div className={classes.inner}>
				<div className={classes.postContent}>
					<h1 className={classes.postTitle}>{post.title}</h1>
					<p className={classes.postText}>{post.content}</p>
				</div>
				<div className={classes.postImage}>
					<Image src={post.imageURL ?? 'https://picsum.photos/400/300'} alt='Post image' width={400} height={300} />
				</div>
			</div>
		</div>
	)
}
