import { PostService } from '$lib/services/PostService';
import { jsonResponse, errorResponse } from '$lib/utils/http';

export async function GET({ params }) {
    const { id } = params;
    const post = await PostService.getPostById(id);
    if (!post || Array.isArray(post) || typeof post.createdAt === 'undefined') {
        return errorResponse('Not found', 404);
    }
    const createdAt = new Date(post.createdAt);
        
    const param = createdAt
        ? { createdAt: { $lt: createdAt } }
        : undefined;

    const prevPosts = await PostService.getFeed(param);
    // nextPosts peut être ajouté dans le service si besoin
    return jsonResponse({ post, prevPosts });
}
