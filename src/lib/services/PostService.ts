// Service métier pour la gestion des posts
import Post from '../server/models/Post';

export class PostService {
    static async getFeed(queryPost?: Object, limit: undefined | number = undefined) {
        let query = {};
        if (queryPost) {
            query = { ...queryPost };
        }

        let postQuery = Post.find(query)
            .sort({ createdAt: -1 })
            .populate({ path: 'user', select: '-password' })
            .populate({ path: 'images', model: 'Image' });

        if (typeof limit === 'number') {
            postQuery = postQuery.limit(limit);
        }

        const posts = await postQuery.lean();

        const hasMore = posts.length === limit;
        return { posts, hasMore };
    }

    static async getPostById(id: string) {
        const post = await Post.findById(id)
            .populate({ path: 'user', select: '-password' })
            .populate({ path: 'images', model: 'Image' })
            .populate({ path: 'comments', populate: { path: 'user', select: '-password' } })
            .populate('likes')
            .lean();
        return post;
    }

    // static async getPrevPosts(createdAt: Date, limit: undefined | number = undefined) {
    //     const prevPosts = await Post.find({ createdAt: { $lt: createdAt } })
    //         .sort({ createdAt: -1 })
    //         .populate({ path: 'images', model: 'Image' })
    //         .lean();
    //     return prevPosts;
    // }
}
