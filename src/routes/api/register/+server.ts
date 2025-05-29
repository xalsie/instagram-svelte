import { UserService } from '$lib/services/UserService';
import { jsonResponse, errorResponse } from '$lib/utils/http';

export async function POST({ request }) {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
        return errorResponse('Missing fields', 400);
    }

    try {
        const user = await UserService.register({ username, email, password });
        return jsonResponse({ user }, 201);
    } catch (err: any) {
        return errorResponse(err.message, 409);
    }
}
