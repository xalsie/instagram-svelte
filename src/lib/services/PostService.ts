import { connectDB } from '$lib/server/db';

import Post from '$lib/server/models/Post';

export class PostService {
	static async getFeed(queryPost?: Object, limit: undefined | number = undefined) {
		await connectDB();

		let query = {};
		if (queryPost) {
			query = { ...queryPost };
		}

		let postQuery = Post.find(query)
			.sort({ createdAt: -1 })
			.populate({ path: 'user', select: '-password' })
			.populate({ path: 'images', model: 'Image' })
			.populate({
				path: 'comments',
				model: 'Comment',
				match: { DELETE: { $ne: true } },
				populate: { path: 'user', select: '-password' }
			})
			.populate({
				path: 'likes',
				model: 'Like',
				match: { DELETE: { $ne: true } },
				populate: { path: 'user', select: '-password' }
			});

		if (typeof limit === 'number') {
			postQuery = postQuery.limit(limit);
		}

		const posts = await postQuery.lean();

		const hasMore = posts.length === limit;
		return { posts, hasMore };
	}

	static async getPostById(id: string) {
		await connectDB();

		const post = await Post.findById(id)
			.populate({ path: 'user', select: '-password' })
			.populate({ path: 'images', model: 'Image' })
			.populate({
				path: 'comments',
				model: 'Comment',
				match: { DELETE: { $ne: true } },
				populate: { path: 'user', select: '-password' }
			})
			.populate({
				path: 'likes',
				model: 'Like',
				match: { DELETE: { $ne: true } },
				populate: { path: 'user', select: '-password' }
			})
			.lean();

		return post;
	}

	// static async getPrevPosts(createdAt: Date, limit: undefined | number = undefined) {
	//     const prevPosts = await Post.find({ createdAt: { $lt: createdAt } })
	//         .sort({ createdAt: -1 })
	//         .populate({ path: 'images', model: 'Image' })
	//         .lean();
	//     return prevPosts;
	// }
}
