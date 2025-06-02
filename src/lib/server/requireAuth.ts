export function requireAuth(locals) {
	if (!locals.user || !locals.user.id) {
		throw new Error('Unauthorized');
	}
	return locals.user;
}
