import { connectDB } from '../server/db';

import User from '../server/models/User';

export class UserService {
    static async register({ username, email, password }: { username: string, email: string, password: string }) {
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        console.log('Checking existing user:', existing);
        if (existing) {
            throw new Error(`Username or email already taken: ${existing.username === username ? 'username' : 'email'}`);
        }

        const user = await User.create({ username, email, password });
        return { username: user.username, email: user.email };
    }

    static async login({ username, password }: { username: string, password: string }) {
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
        return User.find().select('-password').lean();
    }

    static async getByUsername(username: string) {
        return User.findOne({ username }).select('-password').lean();
    }
}
