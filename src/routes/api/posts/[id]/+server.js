import Post from '$lib/server/models/Post.js';
import { connectDB } from '$lib/server/db.js';

export async function GET({ params }) {
    await connectDB();
    const { id } = params;
    // Récupère le post principal
    const post = await Post.findById(id)
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'images', model: 'Image' })
        .populate({ path: 'comments', populate: { path: 'user', select: '-password' } })
        .populate('likes')
        .lean();
    // Correction : vérifie que post est bien un objet et possède createdAt
    if (!post || Array.isArray(post) || typeof post.createdAt === 'undefined') {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }
    const createdAt = new Date(post.createdAt);
    const prevPosts = await Post.find({ createdAt: { $lt: createdAt } })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate({ path: 'images', model: 'Image' })
        .lean();
    const nextPosts = await Post.find({ createdAt: { $gt: createdAt } })
        .sort({ createdAt: 1 })
        .limit(3)
        .populate({ path: 'images', model: 'Image' })
        .lean();
    return new Response(JSON.stringify({ post, prevPosts, nextPosts }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
