import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User';
import type { IUser } from './User';
import type { IPost } from './Post';

export interface IComment extends Document {
	_id: Schema.Types.ObjectId;
	user: IUser;
	post: IPost;
	text: string;
	createdAt: Date;
	updatedAt?: Date;
	DELETE?: boolean; // Soft delete flag
	history?: string[]; // Edit history
}

const CommentSchema = new Schema<IComment>(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
		text: { type: String, required: true },
		DELETE: { type: Boolean, default: false },
		history: { type: [String], default: [] }
	},
	{
		timestamps: true
	}
);

export default (mongoose.models.Comment as Model<IComment>) ||
	mongoose.model<IComment>('Comment', CommentSchema);
