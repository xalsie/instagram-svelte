import { requireAuth } from '$lib/server/requireAuth';
import { json } from '@sveltejs/kit';
import Follow from '$lib/server/models/Follow';
import User from '$lib/server/models/User';

export async function POST({ params, locals }) {
	const { username } = params;
	const me = await requireAuth(locals);
	if (!username || !me) return json({ error: 'Unauthorized' }, { status: 401 });
	if (me.username === username)
		return json({ error: 'You cannot follow yourself' }, { status: 400 });
	const target = await User.findOne({ username });
	if (!target) return json({ error: 'User not found' }, { status: 404 });
	const exists = await Follow.findOne({ follower: me._id, following: target._id });
	if (exists) return json({ ok: true, already: true });
	await Follow.create({ follower: me._id, following: target._id });
	return json({ ok: true });
}

export async function DELETE({ params, locals }) {
	const { username } = params;
	const me = await requireAuth(locals);
	if (!username || !me) return json({ error: 'Unauthorized' }, { status: 401 });
	if (me.username === username)
		return json({ error: 'You cannot unfollow yourself' }, { status: 400 });
	const target = await User.findOne({ username });
	if (!target) return json({ error: 'User not found' }, { status: 404 });
	await Follow.deleteOne({ follower: me._id, following: target._id });
	return json({ ok: true });
}
