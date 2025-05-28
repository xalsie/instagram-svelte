import User from '$lib/server/models/User.js';
import { connectDB } from '$lib/server/db.js';

export async function GET() {
    await connectDB();
    const users = await User.find().select('-password').lean();
    return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' }
    });
}
