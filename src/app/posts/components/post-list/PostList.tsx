import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'

import { IPost } from '@/types/Post.types'
import Link from 'next/link'
import classes from './post-list.module.scss'

interface IPostListProps {
	posts: IPost[]
	onDelete: (postId: string) => void
}

export const PostList = ({ posts, onDelete }: IPostListProps) => {
	return (
		<ul className={classes.postList}>
			{posts.map(post => (
				<li key={post.id} className={classes.postItem}>
					<Link className={classes.postHeader} href={`/posts/${post.id}`}>
						<p className={classes.postTitle}>{post.title}</p>
					</Link>
					<p className={classes.postText}>{post.content}</p>
					<div className={classes.dropdown}>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Menu />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => onDelete(post.id)} className='cursor-pointer'>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</li>
			))}
		</ul>
	)
}
