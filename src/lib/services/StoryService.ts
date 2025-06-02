import { connectDB } from '$lib/server/db';

import Story from '$lib/server/models/Story';

export class StoryService {
    static async getRecentStories(userIds?: string[]) {
        await connectDB();

        const now = new Date();
        const query: any = { updatedAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } };
        if (userIds && userIds.length > 0) {
            query.user = { $in: userIds };
        }
        const stories = await Story.find(query)
            .sort({ updatedAt: -1 })
            .populate({ path: 'user', select: '-password' })
            .populate({ path: 'image', model: 'Image' })
            .lean();
        const userMap = new Map();
        for (const story of stories) {
            const userId = story.user._id.toString();
            if (!userMap.has(userId)) {
                userMap.set(userId, {
                    _id: story.user._id.toString(),
                    images: [],
                    user: story.user
                });
            }
            const userEntry = userMap.get(userId);
            const imagesArray = Array.isArray(story.image) ? story.image : (story.image ? [story.image] : []);
            for (const img of imagesArray) {
                userEntry.images.push({
                    ...img,
                    _id: img._id.toString(),
                    user: img.user,
                    src: img.url,
                    delay: story.delay,
                });
            }
        }
        return Array.from(userMap.values());
    }
}
