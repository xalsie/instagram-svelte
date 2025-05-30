import { connectDB } from '$lib/server/db';
import Comment from '$lib/server/models/Comment';
import User from '$lib/server/models/User';
import { jsonResponse, errorResponse } from '$lib/utils/http';
import { requireAuth } from '$lib/server/requireAuth';

export async function POST({ params, request, locals }) {
    await connectDB();
    const { id } = params;
    let userId;
    try {
        const user = requireAuth(locals);
        userId = user.id || user._id;
    } catch {
        return errorResponse('Unauthorized', 401);
    }
    const { text } = await request.json();
    if (!text || typeof text !== 'string' || !text.trim()) {
        return errorResponse('Le commentaire ne peut pas être vide', 400);
    }
    const user = await User.findById(userId).select('-password');
    if (!user) return errorResponse('Utilisateur non trouvé', 404);
    // Lors de la création d'un commentaire, DELETE=false et history=[] par défaut
    const comment = await Comment.create({
        user: user._id,
        post: id,
        text,
        createdAt: new Date(),
        updatedAt: new Date(),
        DELETE: false,
        history: []
    });
    await comment.populate({ path: 'user', select: '-password' });
    return jsonResponse(comment, 201);
}
