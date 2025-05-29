import { StoryService } from '$lib/services/StoryService';

export async function GET() {
    const uniqueStories = await StoryService.getRecentStories();
    return new Response(JSON.stringify(uniqueStories), {
        headers: { 'Content-Type': 'application/json' }
    });
}
