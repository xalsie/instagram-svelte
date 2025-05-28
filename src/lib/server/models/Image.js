import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    alt: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
