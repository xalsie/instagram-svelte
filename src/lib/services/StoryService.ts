import { connectDB } from '$lib/server/db';

import Story from '$lib/server/models/Story';

export class StoryService {
    static async getRecentStories() {
        await connectDB();

        const now = new Date();
        const stories = await Story.find({ updatedAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } })
            .sort({ updatedAt: -1 })
            .populate({ path: 'user', select: '-password' })
            .populate({ path: 'image', model: 'Image' })
            .lean();
        // Supprime les doublons par utilisateur et groupe les images par user
        const userMap = new Map();
        for (const story of stories) {
            const userId = story.user._id.toString();
            if (!userMap.has(userId)) {
                userMap.set(userId, {
                    // ...story.user,
                    _id: story.user._id.toString(),
                    images: [],
                    user: story.user
                });
            }
            // Ajoute toutes les images de cette story à l'utilisateur
            const userEntry = userMap.get(userId);
            const imagesArray = Array.isArray(story.image) ? story.image : (story.image ? [story.image] : []);
            for (const img of imagesArray) {
                userEntry.images.push({
                    ...img,
                    _id: img._id.toString(),
                    user: img.user,
                    src: img.url
                });
            }
        }
        // Retourne un tableau d'utilisateurs avec leurs images de story (max 24h)
        return Array.from(userMap.values());
    }
}
