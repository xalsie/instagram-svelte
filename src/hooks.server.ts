import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

function isJwtPayload(obj: any): obj is { id?: string; _id?: string } {
	return typeof obj === 'object' && obj !== null && ('id' in obj || '_id' in obj);
}

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (token) {
		try {
			const user = jwt.verify(token, JWT_SECRET);
			if (isJwtPayload(user)) {
				// @ts-ignore
				event.locals.user = {
					...user,
					id: user.id || user._id,
					_id: user._id || user.id
				};
			} else {
				// @ts-ignore
				event.locals.user = null;
			}
		} catch (e) {
			// @ts-ignore
			event.locals.user = null;
		}
	} else {
		// @ts-ignore
		event.locals.user = null;
	}
	return resolve(event);
};
