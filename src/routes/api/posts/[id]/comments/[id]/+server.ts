import { connectDB } from '$lib/server/db';
import Comment from '$lib/server/models/Comment';
import { jsonResponse, errorResponse } from '$lib/utils/http';
import { requireAuth } from '$lib/server/requireAuth';

export async function PUT({ params, request, locals }) {
	await connectDB();
	const { id } = params;
	let user;
	try {
		user = requireAuth(locals);
	} catch {
		return errorResponse('Unauthorized', 401);
	}
	const { text } = await request.json();
	if (!text || typeof text !== 'string' || !text.trim()) {
		return errorResponse('Le commentaire ne peut pas être vide', 400);
	}
	const comment = await Comment.findById(id).populate('user');
	if (!comment) return errorResponse('Commentaire non trouvé', 404);
	// Only owner can edit, and only if less than 1 minute old
	const isOwner =
		comment.user._id.toString() === user._id || comment.user._id.toString() === user.id;
	const lessThanOneMinute = Date.now() - new Date(comment.createdAt).getTime() < 60 * 1000;
	if (!isOwner || !lessThanOneMinute) {
		return errorResponse('Non autorisé à éditer ce commentaire', 403);
	}
	// Ajoute l'ancien texte à l'historique
	if (!comment.history) comment.history = [];
	comment.history.push(comment.text);
	comment.text = text;
	comment.updatedAt = new Date();
	await comment.save();
	await comment.populate({ path: 'user', select: '-password' });
	return jsonResponse(comment);
}

export async function DELETE({ params, locals }) {
	await connectDB();
	const { id } = params;
	let user;
	try {
		user = requireAuth(locals);
	} catch {
		return errorResponse('Unauthorized', 401);
	}
	// Only admin can delete
	if (user.role !== 'admin') {
		return errorResponse('Non autorisé à supprimer ce commentaire', 403);
	}
	// Soft delete : set DELETE=true
	const comment = await Comment.findById(id);
	if (!comment) return errorResponse('Commentaire non trouvé', 404);
	comment.DELETE = true;
	await comment.save();
	return jsonResponse({ success: true });
}
