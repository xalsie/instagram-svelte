import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ url }) {
	throw redirect(301, `${url.pathname}/1`);
}
