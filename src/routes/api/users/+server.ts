import { connectDB } from '$lib/server/db';
import { UserService } from '$lib/services/UserService';
import { jsonResponse } from '$lib/utils/http';

export async function GET() {
	await connectDB();
	const users = await UserService.getAll();
	return jsonResponse(users);
}
