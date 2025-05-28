import User from '$lib/server/models/User.js';
import Story from '$lib/server/models/Story.js';
import Image from '$lib/server/models/Image.js';
import { connectDB } from '$lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  try {
    await connectDB();
    const { username, img } = params;
    // Récupère la story active de l'utilisateur
    const user = await User.findOne({ username })
      .select('-password -email -createdAt -updatedAt -followers -following -bio -username')
      .lean();
    console.log('User found:', user);
    if (!user) {
      return { status: 404, error: 'User not found' };
    }
    // Récupère la story non expirée de cet utilisateur
    const now = new Date();
    // @ts-ignore
    const userId = user && (user._id || user.id);
    // Récupère toutes les stories de l'utilisateur et regroupe les images
    const userStories = await Story.find({ user: userId })
      .populate({ path: 'images', model: 'Image' })
      .lean();
    const images = userStories.flatMap(story => Array.isArray(story.images) ? story.images : []);
    if (images.length === 0) {
      return { status: 404, error: 'No active story for this user' };
    }
    const imgIndex = parseInt(img) - 1;
    if (isNaN(imgIndex) || imgIndex < 0 || imgIndex >= images.length) {
      return { status: 404, error: 'Image not found' };
    }
    // Liste de tous les users avec stories (regroupées)
    const allStories = await Story.find({ updatedAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } })
      .sort({ updatedAt: -1 })
      .populate({ path: 'user', select: '-password -email -createdAt -updatedAt -followers -following -bio' })
      .populate({ path: 'images', model: 'Image', select: '-createdAt -updatedAt' })
      .lean();
    // Regroupe les images par utilisateur
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
      for (const img of story.images || []) {
        arr.push({
          ...img,
          _id: img._id?.toString?.() ?? img._id,
          user: img.user?.toString?.() ?? img.user,
          delay: story.delay,
          // src: img.url
        });
      }
    }
    const users = Array.from(userMap.values());
    // Utilisateur courant au même format
    const safeUser = {
      ...user, _id: user._id?.toString?.() ?? user._id, images: images.map(img => ({
        ...img,
        _id: img._id?.toString?.() ?? img._id,
        user: img.user?.toString?.() ?? img.user,
        // src: img.url
      }))
    };

    return {
      user: safeUser,
      users,
      imgIndex
    };
  } catch (err) {
    return { status: 500, error: 'Server error: ' + (err?.message || err) };
  }
}
