import { connectDB } from '$lib/server/db';

import User from '$lib/server/models/User';
import Story from '$lib/server/models/Story';

export class StoryImageService {
    static async getUserStoryImages(username: string, img: string) {
        await connectDB();

        const user = await User.findOne({ username })
            .select('-password -email -createdAt -updatedAt -followers -following -bio')
            .lean();
        if (!user) {
            return { error: 'User not found', status: 404 };
        }
        const now = new Date();
        const userId = user && (user._id || user.id);
        // Correction : le champ dans le modèle Story est 'image' (pas 'images')
        const userStories = await Story.find({ user: userId })
            .populate({ path: 'image', model: 'Image' })
            .lean();
        const images = userStories.flatMap(story => Array.isArray(story.image) ? story.image : (story.image ? [story.image] : []));
        if (images.length === 0) {
            return { error: 'No active story for this user', status: 404 };
        }
        const imgIndex = parseInt(img) - 1;
        if (isNaN(imgIndex) || imgIndex < 0 || imgIndex >= images.length) {
            return { error: 'Image not found', status: 404 };
        }
        // Liste de tous les users avec stories (regroupées)
        const allStories = await Story.find({ updatedAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } })
            .sort({ updatedAt: -1 })
            .populate({ path: 'user', select: '-password -email -createdAt -updatedAt -followers -following -bio' })
            .populate({ path: 'image', model: 'Image', select: '-createdAt -updatedAt' })
            .lean();
        const userMap = new Map();
        for (const story of allStories) {
            const u = story.user;
            if (!userMap.has(u.username)) {
                userMap.set(u.username, {
                    ...u,
                    _id: u._id?.toString?.() ?? u._id,
                    images: [],
                    storyId: story._id?.toString?.() ?? story._id,
                    delay: story.delay
                });
            }
            const arr = userMap.get(u.username).images;
            for (const img of story.image || []) {
                arr.push({
                    ...img,
                    _id: img._id?.toString?.() ?? img._id,
                    user: img.user?.toString?.() ?? img.user,
                    delay: story.delay,
                });
            }
        }
        const users = Array.from(userMap.values());
        const safeUser = {
            ...user,
            _id: user._id?.toString?.() ?? user._id,
            images: images.map(img => ({
                ...img,
                _id: img._id?.toString?.() ?? img._id,
                user: img.user?.toString?.() ?? img.user
            })),
            storyId: user.storyId ? user.storyId.toString() : undefined,
        };
        return { user: safeUser, users, imgIndex };
    }
}
