// Fichier de fixtures pour MongoDB/Mongoose
import mongoose from 'mongoose';
import User from './models/User.js';
import Post from './models/Post.js';
import Image from './models/Image.js';
import Comment from './models/Comment.js';
import Like from './models/Like.js';
import Story from './models/Story.js';
import Notification from './models/Notification.js';
import Message from './models/Message.js';
import Follow from './models/Follow.js';
import { connectDB } from './db.js';

async function seed() {
    await connectDB();
    await Promise.all([
        User.deleteMany({}),
        Post.deleteMany({}),
        Image.deleteMany({}),
        Comment.deleteMany({}),
        Like.deleteMany({}),
        Story.deleteMany({}),
        Notification.deleteMany({}),
        Message.deleteMany({}),
        Follow.deleteMany({})
    ]);

    // Utilisateurs
    const alice = await User.create({
        username: 'alice',
        email: 'alice@email.com',
        password: 'hashedpassword1',
        displayname: 'Alice',
        src: '/images/profiles/profile1.jpg',
        bio: 'Bio Alice'
    });
    const bob = await User.create({
        username: 'bob',
        email: 'bob@email.com',
        password: 'hashedpassword2',
        displayname: 'Bob',
        src: '/images/profiles/profile2.jpg',
        bio: 'Bio Bob'
    });

    // Images
    const img1 = await Image.create({
        url: '/images/stories/1.jpg',
        alt: 'Story Alice',
        user: alice._id
    });
    const img2 = await Image.create({
        url: '/images/stories/2.jpg',
        alt: 'Story Bob',
        user: bob._id
    });

    // Stories
    await Story.create({
        user: alice._id,
        images: [img1._id],
        delay: 4000, // 4 secondes
    });
    await Story.create({
        user: bob._id,
        images: [img2._id],
        delay: 4000, // 4 secondes
    });

    // Post
    const post = await Post.create({
        user: alice._id,
        images: [img1._id],
        text: 'Premier post !',
        createdAt: new Date()
    });

    // Commentaire
    const comment = await Comment.create({
        user: bob._id,
        post: post._id,
        text: 'Super post Alice !',
        createdAt: new Date()
    });
    post.comments.push(comment._id);
    await post.save();

    // Like
    const like = await Like.create({
        user: bob._id,
        post: post._id,
        createdAt: new Date()
    });
    post.likes.push(like._id);
    await post.save();

    // Follow
    await Follow.create({ follower: bob._id, following: alice._id });

    // Notification
    await Notification.create({
        user: alice._id,
        type: 'like',
        from: bob._id,
        post: post._id,
        read: false,
        createdAt: new Date()
    });

    // Message
    await Message.create({
        from: alice._id,
        to: bob._id,
        text: 'Salut Bob !',
        createdAt: new Date()
    });

    console.log('Fixtures MongoDB insérées !');
    process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
