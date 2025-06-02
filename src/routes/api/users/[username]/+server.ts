import { json } from '@sveltejs/kit';
import { UserService } from '$lib/services/UserService';

// GET /api/users/[username]
export async function GET({ params }) {
	const { username } = params;
	if (!username) {
		return json({ error: 'Missing username' }, { status: 400 });
	}
	try {
		const user = await UserService.getProfileWithPosts(username);
		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}
		return json({ user });
	} catch (e) {
		return json({ error: e.message || 'Server error' }, { status: 500 });
	}
}
