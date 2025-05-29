import mongoose, { Schema, Document, Model } from 'mongoose';

import type { IUser } from './User';
import type { IImage } from './Image';
import type { ILike } from './Like';
import type { IComment } from './Comment';

export interface IPost extends Document {
    user: IUser;
    images: IImage[];
    text?: string;
    likes?: ILike[];
    comments?: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    text: { type: String }
}, {
    timestamps: true
});

PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

PostSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'post'
});

export default (mongoose.models.Post as Model<IPost>) || mongoose.model<IPost>('Post', PostSchema);
