import jwt from 'jsonwebtoken';
import { UserService } from '$lib/services/UserService';
import { jsonResponse, errorResponse } from '$lib/utils/http';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export async function POST({ request }) {
    const { username, password } = await request.json();
    if (!username || !password) {
        return errorResponse('Missing fields', 400);
    }

    try {
        const user = await UserService.login({ username, password });
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
        // Set JWT as HttpOnly cookie
        return new Response(JSON.stringify({ user, token }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': serialize('token', token, {
                    httpOnly: true,
                    path: '/',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 7
                })
            }
        });
    } catch (err: any) {
        return errorResponse(err.message, 401);
    }
}
