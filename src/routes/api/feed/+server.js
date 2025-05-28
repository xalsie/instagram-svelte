import Post from '$lib/server/models/Post.js';
import User from '$lib/server/models/User.js';
import Image from '$lib/server/models/Image.js';
import Comment from '$lib/server/models/Comment.js';
import { connectDB } from '$lib/server/db.js';

export async function GET() {
    await connectDB();
    const feed = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
            path: 'user',
            select: '-password'
        })
        .populate({
            path: 'images',
            model: 'Image'
        })
        .populate({
            path: 'comments',
            populate: { path: 'user', select: '-password' }
        })
        .populate('likes')
        .lean();
    return new Response(JSON.stringify(feed), {
        headers: { 'Content-Type': 'application/json' }
    });
}
