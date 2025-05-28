import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
