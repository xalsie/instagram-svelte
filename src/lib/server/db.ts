import mongoose from 'mongoose';

import '$lib/server/models';

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Ajout d'une interface globale pour mongoose
interface MongooseCache {
	conn: any;
	promise: any;
}

declare global {
	// eslint-disable-next-line no-var
	var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose as MongooseCache;
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		if (!MONGODB_URI) {
			throw new Error('MONGODB_URI is not defined. Check your .env file.');
		}
		// For debug, do not print password
		console.log('Connecting to MongoDB at', MONGODB_URI.replace(/:[^:]+@/, ':****@'));
		cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
		cached.promise
			.then(() => {
				console.log('Connected to MongoDB');
			})
			.catch((err: unknown) => {
				console.error('MongoDB connection error:', err);
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
