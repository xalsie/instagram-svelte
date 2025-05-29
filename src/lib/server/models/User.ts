import mongoose, { Schema, Document, Model } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../db';
// Ensure the database connection is established
connectDB().catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process if the connection fails
});

// Define the IUser interface for TypeScript
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    email?: string;
    displayname?: string;
    srcng;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
    __v?: number;
    toJSON(): Omit<IUser, 'password'>;
    checkPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayname: { type: String },
    srce: String, default: '/images/profiles/default-avatar.webp' },
    password: { type: String, required: true },
}, {
    timestamps: true
});

// supprimer le champ password a chaque get
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

// Middleware pour hacher le mot de passe avant de créer un user
UserSchema.pre<IUser>('save', async function (next) {
    console.log('UserSchema.pre save called');

    if (this.isNew && this.isModified('password')) {
        // const bcrypt = require('bcrypt');
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

// Middleware pour vérifier le mot de passe lors de la connexion
UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
    // const bcrypt = require('bcrypt');
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
