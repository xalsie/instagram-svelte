import { StoryService } from '$lib/services/StoryService';
import { requireAuth } from '$lib/server/requireAuth';
import User from '$lib/server/models/User';

export async function GET({ locals }) {
    const me = await requireAuth(locals);
    let followingIds = [];
    if (me) {
        const user = await User.findById(me._id).populate('following');
        followingIds = (user?.following || []).map((f: any) => f.following?.toString?.() ?? f.following?.toString?.() ?? '').filter(Boolean);
        followingIds.push(me._id.toString());
    }
    const uniqueStories = await StoryService.getRecentStories(followingIds);
    return new Response(JSON.stringify(uniqueStories), {
        headers: { 'Content-Type': 'application/json' }
    });
}
