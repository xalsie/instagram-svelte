import Story from '$lib/server/models/Story.js';
import User from '$lib/server/models/User.js';
import Image from '$lib/server/models/Image.js';
import { connectDB } from '$lib/server/db.js';

export async function GET() {
    await connectDB();
    // Récupère toutes les stories sur les 24 dernières heures
    const now = new Date();
    const stories = await Story.find({ updatedAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } })
        .sort({ updatedAt: -1 })
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'images', model: 'Image' })
        .lean();

    // supprimer les doublons par utilisateur
    const uniqueStories = [];
    const userMap = new Map();
    for (const story of stories) {
        const userId = story.user._id.toString();
        if (!userMap.has(userId)) {
            userMap.set(userId, true);
            uniqueStories.push({
                ...story,
                user: {
                    ...story.user,
                    _id: story.user._id.toString(),
                },
                images: story.images.map(img => ({
                    ...img,
                    _id: img._id.toString(),
                    user: img.user.toString(),
                    src: img.url
                }))
            });
        }
    }

    return new Response(JSON.stringify(uniqueStories), {
        headers: { 'Content-Type': 'application/json' }
    });
}
