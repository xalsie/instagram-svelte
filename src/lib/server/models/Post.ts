import mongoose, { Schema, Document, Model } from 'mongoose';

import type { IUser } from './User';
import type { IImage } from './Image';
import type { ILike } from './Like';
import type { IComment } from './Comment';

import { connectDB } from '../db';
// Ensure the database connection is established
connectDB().catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process if the connection fails
});

export interface IPost extends Document {
    user: IUser;
    images: IImage[];
    text?: string;
    likes: ILike[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    text: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default (mongoose.models.Post as Model<IPost>) || mongoose.model<IPost>('Post', PostSchema);
