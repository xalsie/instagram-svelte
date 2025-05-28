import Post from '$lib/server/models/Post.js';
import User from '$lib/server/models/User.js';
import { connectDB } from '$lib/server/db.js';

export async function GET({ url }) {
    await connectDB();
    // Pagination : /api/posts?before=2024-05-25T12:00:00.000Z
    const before = url.searchParams.get('before');
    const limit = 5;
    let query = {};
    if (before) {
        query = { createdAt: { $lt: new Date(before) } };
    }
    const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'images', model: 'Image' })
        .lean();
    // Pour le scroll infini : savoir s'il y a encore des posts à charger
    const hasMore = posts.length === limit;
    return new Response(JSON.stringify({ posts, hasMore }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
