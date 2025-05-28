import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    delay: { type: Number, required: true, default: 4000 } // en millisecondes
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
