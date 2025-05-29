import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User';
import type { IUser } from './User';
import type { IPost } from './Post';

export interface ILike extends Document {
    user: IUser;
    post: IPost;
    createdAt: Date;
    updatedAt: Date;
}

const LikeSchema = new Schema<ILike>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
}, {
    timestamps: true
});

export default (mongoose.models.Like as Model<ILike>) || mongoose.model<ILike>('Like', LikeSchema);
