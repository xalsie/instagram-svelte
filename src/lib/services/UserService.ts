import { connectDB } from '$lib/server/db';

import User from '$lib/server/models/User';

export class UserService {
	static async register({
		username,
		email,
		password
	}: {
		username: string;
		email: string;
		password: string;
	}) {
		await connectDB();

		const existing = await User.findOne({ $or: [{ username }, { email }] });
		console.log('Checking existing user:', existing);
		if (existing) {
			throw new Error(
				`Username or email already taken: ${existing.username === username ? 'username' : 'email'}`
			);
		}

		const user = await User.create({ username, email, password });
		return { username: user.username, email: user.email };
	}

	static async login({ username, password }: { username: string; password: string }) {
		await connectDB();

		const user = await User.findOne({ username });
		if (!user) {
			throw new Error('User not found');
		}
		// const valid = await bcrypt.compare(password, user.password);
		const valid = await user.checkPassword(password);
		if (!valid) {
			throw new Error('Invalid credentials');
		}
		return user;
	}

	static async getAll() {
		await connectDB();

		return User.find().select('-password').lean();
	}

	static async getByUsername(username: string) {
		await connectDB();

		return User.findOne({ username }).select('-password').lean();
	}

	static async getProfileWithPosts(username: string) {
		await connectDB();
		const user = await User.findOne({ username })
			.select('-password')
			.populate({ path: 'followers' })
			.populate({ path: 'following' })
			.lean();
		if (!user) return null;

		const Post = (await import('$lib/server/models/Post')).default;
		const posts = await Post.find({ user: user._id })
			.populate('images')
			.populate('likes')
			.populate('comments')
			.lean();

		user.followers = (user.followers || []).map((f: any) => f.follower?._id || f.follower);
		user.following = (user.following || []).map((f: any) => f.following?._id || f.following);
		return { ...user, posts };
	}
}
