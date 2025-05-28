import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Celui qui suit
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Celui qui est suivi
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Follow || mongoose.model('Follow', FollowSchema);
