import mongoose, { Schema, Document, Model } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

// Define the IUser interface for TypeScript
import bcrypt from 'bcryptjs';
import Follow from './Follow';

export interface IUser extends Document {
	_id: Schema.Types.ObjectId;
	username: string;
	email?: string;
	displayname?: string;
	src?: string;
	password: string;
	bio?: string;
	followers?: Schema.Types.ObjectId[];
	following?: Schema.Types.ObjectId[];
	createdAt: Date;
	updatedAt?: Date;
	__v?: number;
	toJSON(): Omit<IUser, 'password'>;
	checkPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		displayname: { type: String },
		src: { type: String, default: '/images/profiles/default-avatar.webp' },
		password: { type: String, required: true },
		bio: { type: String }
	},
	{
		timestamps: true
	}
);

UserSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

UserSchema.pre<IUser>('save', async function (next) {
	console.log('UserSchema.pre save called');

	if (this.isNew && this.isModified('password')) {
		const saltRounds = 10;
		try {
			const hashedPassword = await bcrypt.hash(this.password, saltRounds);
			this.password = hashedPassword;
		} catch (error) {
			return next(error as Error);
		}
	}
	next();
});

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error('Password comparison failed');
	}
};

UserSchema.virtual('followers', {
	ref: 'Follow',
	localField: '_id',
	foreignField: 'following',
	justOne: false,
	options: { strictPopulate: false }
});
UserSchema.virtual('following', {
	ref: 'Follow',
	localField: '_id',
	foreignField: 'follower',
	justOne: false,
	options: { strictPopulate: false }
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
