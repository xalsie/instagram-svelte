import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User';
import type { IUser } from './User';

export interface IMessage extends Document {
	sender: IUser;
	receiver: IUser;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
	{
		sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		content: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export default (mongoose.models.Message as Model<IMessage>) ||
	mongoose.model<IMessage>('Message', MessageSchema);
