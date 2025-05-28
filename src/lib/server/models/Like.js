import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Like || mongoose.model('Like', LikeSchema);
