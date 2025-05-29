import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User';
import type { IUser } from './User';

export interface IFollow extends Document {
    follower: IUser;
    following: IUser;
    createdAt: Date;
    updatedAt?: Date;
}

const FollowSchema = new Schema<IFollow>({
    follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    following: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

export default (mongoose.models.Follow as Model<IFollow>) || mongoose.model<IFollow>('Follow', FollowSchema);
