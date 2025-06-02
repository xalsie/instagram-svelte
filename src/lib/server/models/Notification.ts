import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User';
import type { IUser } from './User';

export interface INotification extends Document {
	user: IUser;
	type: string;
	data?: Record<string, unknown>;
	read: boolean;
	createdAt: Date;
	updatedAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		type: { type: String, required: true },
		data: { type: Object },
		read: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

export default (mongoose.models.Notification as Model<INotification>) ||
	mongoose.model<INotification>('Notification', NotificationSchema);
