/**
 * @param {any} locals
 */
export function requireAuth(locals: any) {
	if (!locals.user || !locals.user.id) {
		throw new Error('Unauthorized');
	}
	return locals.user;
}
