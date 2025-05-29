import mongoose, { Schema, Document, Model } from 'mongoose';

import type { IUser } from './User';
import type { IImage } from './Image';

export interface IStory extends Document {
    user: IUser;
    images: IImage[];
    delay: number; // Delay in milliseconds
    createdAt: Date;
    updatedAt: Date;
}

const StorySchema = new Schema<IStory>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    delay: { type: Number, default: 5000 }, // Default delay of 5 seconds
}, {
    timestamps: true
});

export default (mongoose.models.Story as Model<IStory>) || mongoose.model<IStory>('Story', StorySchema);
