import { StoryImageService } from '$lib/services/StoryImageService';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { username, img } = params;
    try {
        const result = await StoryImageService.getUserStoryImages(username, img);
        if ('error' in result) {
            return { status: result.status, error: result.error };
        }
        return result;
    } catch (err: any) {
        return { status: 500, error: 'Server error: ' + (err && (err as any).message ? (err as any).message : String(err)) };
    }
}
