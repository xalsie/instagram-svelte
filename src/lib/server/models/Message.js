import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    read: { type: Boolean, default: false },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
