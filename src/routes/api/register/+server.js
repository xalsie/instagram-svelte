import { connectDB } from '$lib/server/db.js';
import User from '$lib/server/user.model.js';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }
    await connectDB();
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    return new Response(JSON.stringify({ user: { username: user.username, email: user.email } }), { status: 201 });
}
