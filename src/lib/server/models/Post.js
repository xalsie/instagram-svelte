import mongoose from 'mongoose';
import User from './User.js'; // Assure l'enregistrement du schéma User
import Like from './Like.js'; // Assure l'enregistrement du schéma Like
import Comment from './Comment.js'; // Pour la même raison si besoin
import Image from './Image.js';

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    text: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
