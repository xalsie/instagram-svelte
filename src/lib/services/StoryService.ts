// Service métier pour la gestion des stories
import Story from '../server/models/Story';

export class StoryService {
    static async getRecentStories() {
        const now = new Date();
        const stories = await Story.find({ updatedAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } })
            .sort({ updatedAt: -1 })
            .populate({ path: 'user', select: '-password' })
            .populate({ path: 'images', model: 'Image' })
            .lean();
        // Supprime les doublons par utilisateur
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
                    images: story.images.map((img: any) => ({
                        ...img,
                        _id: img._id.toString(),
                        user: img.user,
                        src: img.url
                    }))
                });
            }
        }
        return uniqueStories;
    }
}
