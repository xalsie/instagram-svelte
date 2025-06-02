import { connectDB } from '$lib/server/db';
import Post from '$lib/server/models/Post';
import Like from '$lib/server/models/Like';
import { jsonResponse, errorResponse } from '$lib/utils/http';
import { requireAuth } from '$lib/server/requireAuth';

import type { ILike } from '$lib/server/models/Like';

export async function POST({ params, locals }) {
	await connectDB();
	const { id } = params;
	let user;
	try {
		user = requireAuth(locals);
	} catch {
		return errorResponse('Unauthorized', 401);
	}
	const post = await Post.findById(id);
	if (!post) return errorResponse('Post non trouvé', 404);
	// Vérifie si déjà liké (non supprimé)
	let existing: ILike | null = await Like.findOne({
		post: id,
		user: user._id,
		DELETE: { $ne: true }
	});

	if (existing) {
		return errorResponse('Vous avez déjà liké ce post', 400);
	}

	const newLike = await Like.create({ post: id, user: user._id });
	const postLikes = await Like.findById(newLike._id)
		.populate({
			path: 'user',
			select: '-password'
		})
		.populate({
			path: 'post',
			model: 'Post'
		});
	return jsonResponse({ liked: true, like: postLikes });
}
