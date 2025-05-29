import { PostService } from '$lib/services/PostService';
import { jsonResponse } from '$lib/utils/http';

export async function GET({ url }) {
    try {
        const beforeParam = url.searchParams.get('before') || undefined;

        if (beforeParam && isNaN(Date.parse(beforeParam))) {
            return new Response(JSON.stringify({ error: 'Invalid date format for "before" parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const param = beforeParam
            ? { createdAt: { $lt: new Date(beforeParam) } }
            : undefined;

        const result = await PostService.getFeed(param);
        return jsonResponse(result);
    } catch (err) {
        return new Response(JSON.stringify({ error: err instanceof Error ? err.message : err }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
