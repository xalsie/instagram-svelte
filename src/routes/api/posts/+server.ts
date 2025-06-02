import { PostService } from '$lib/services/PostService';
import { jsonResponse } from '$lib/utils/http';
import { requireAuth } from '$lib/server/requireAuth';
import User from '$lib/server/models/User';

export async function GET({ url, locals }) {
	try {
		const beforeParam = url.searchParams.get('before') || undefined;

		if (beforeParam && isNaN(Date.parse(beforeParam))) {
			return new Response(JSON.stringify({ error: 'Invalid date format for "before" parameter' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const me = await requireAuth(locals);
		let followingIds = [];
		if (me) {
			const user = await User.findById(me._id).populate('following');
			followingIds = (user?.following || [])
				.map((f: any) => f.following?.toString?.() ?? f.following?.toString?.() ?? '')
				.filter(Boolean);
			followingIds.push(me._id.toString());
		}

		let param;
		if (beforeParam) {
			param = {
				createdAt: { $lt: new Date(beforeParam) },
				$or: [{ user: { $in: followingIds } }, { likes: { $elemMatch: { user: me._id } } }]
			};
		} else if (followingIds.length > 0) {
			param = {
				$or: [{ user: { $in: followingIds } }, { likes: { $elemMatch: { user: me._id } } }]
			};
		} else {
			param = undefined;
		}

		const result = await PostService.getFeed(param);
		return jsonResponse(result);
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : err }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
