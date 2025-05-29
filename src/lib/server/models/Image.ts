import User from './User';
import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IUser } from './User';

export interface IImage extends Document {
    _id: string;
    url: string;
    alt?: string;
    user: IUser;
    createdAt: Date;
    updatedAt?: Date;
}

const ImageSchema = new Schema<IImage>({
    url: { type: String, required: true },
    alt: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

export default (mongoose.models.Image as Model<IImage>) || mongoose.model<IImage>('Image', ImageSchema);
