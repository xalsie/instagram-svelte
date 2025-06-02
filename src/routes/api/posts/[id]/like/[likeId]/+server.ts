import { connectDB } from '$lib/server/db';
import Post from '$lib/server/models/Post';
import Like from '$lib/server/models/Like';
import { jsonResponse, errorResponse } from '$lib/utils/http';
import { requireAuth } from '$lib/server/requireAuth';

// DELETE
export async function DELETE({ params, locals }) {
	await connectDB();
	const { id, likeId } = params;
	if (!likeId) return errorResponse('likeId manquant', 400);
	if (!id) return errorResponse('ID du post manquant', 400);
	let user;
	try {
		user = requireAuth(locals);
	} catch {
		return errorResponse('Unauthorized', 401);
	}
	const post = await Post.findById(id);
	if (!post) return errorResponse('Post non trouvé', 404);
	// Vérifie si déjà liké (non supprimé)
	const existing = await Like.findOne({ post: id, user: user._id, _id: likeId });
	if (!existing) return errorResponse('Like non trouvé', 404);
	// Si le like existe et n'est pas supprimé, on le supprime (soft delete)
	if (existing && !existing.DELETE) {
		// Soft delete
		existing.DELETE = true;
		await existing.save();
		return jsonResponse({ liked: false });
	}
	return errorResponse('Like non trouvé', 404);
}
