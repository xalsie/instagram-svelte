<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import type { IUser } from '$lib/server/models/User.ts';
    import type { IPost } from '$lib/server/models/Post.ts';
	import type { ILike } from '$lib/server/models/Like.ts';
    import type { IComment } from '$lib/server/models/Comment.ts';

    import { user, isAuthenticated } from '$lib/store.js';

    export let post: IPost;

    let commentsDiv: HTMLDivElement;
    let isHovering = false;
    let lastScrollTop = 0;
    let newComment: string = '';

    const dispatch = createEventDispatcher<{ commentsHoverChange: boolean }>();

    function checkCommentsScroll(e?: Event) {
        if (!commentsDiv) return;
        const scrollTop = commentsDiv.scrollTop;
        const atTop = scrollTop === 0;
        const atBottom = Math.abs(scrollTop + commentsDiv.clientHeight - commentsDiv.scrollHeight) < 2;
        if (e && e.type === 'scroll') {
            if (scrollTop < lastScrollTop && atTop) {
                dispatch('commentsHoverChange', false);
            } else if (scrollTop > lastScrollTop && atBottom) {
                dispatch('commentsHoverChange', false);
            } else if ((scrollTop > lastScrollTop && atTop) || (scrollTop < lastScrollTop && atBottom)) {
                // do nothing
            } else {
                dispatch('commentsHoverChange', true);
            }
            lastScrollTop = scrollTop;
        } else {
            if (isHovering && (atTop || atBottom)) {
                dispatch('commentsHoverChange', false);
            } else if (isHovering) {
                dispatch('commentsHoverChange', true);
            }
        }
    }

    function handleCommentSubmit() {
        if (!newComment.trim()) return;
        if (!post.comments) post.comments = [];
        post.comments.push({
            user: $user!,
            post: post,
            text: newComment,
            createdAt: new Date(),
            updatedAt: new Date()
        } as IComment);
        newComment = '';
    }

    function postQuickEmoji(emoji: string) {
        if (newComment.length + emoji.length <= 200) {
            newComment += emoji;
        }
    }

    function handleLike() {
        if (!post.likes) post.likes = [];
        if (!$user) return;
        const userId = ($user as IUser).id || $user.username;
        const userIndex = post.likes.findIndex((like: ILike) => like.user._id === userId);
        if (userIndex > -1) {
            post.likes.splice(userIndex, 1);
        } else {
            post.likes.push({ user: $user, post: post, createdAt: new Date(), updatedAt: new Date() } as ILike);
        }
    }

    // TODO: Remove this mock data once the backend is ready
    onMount(() => {
        if (post._id === '6834d2646d6cdd8dcc51b044' && (!post.comments || post.comments.length < 50)) {
            post.comments = Array.from({ length: 50 }, (_, i) => ({
                user: {
                    username: `User${i + 1}`,
                    displayname: `User ${i + 1}`,
                    src: '/images/profiles/default-avatar.webp',
                } as IUser,
                text: `Comment ${i + 1}`,
                post: post,
                updatedAt: new Date(Date.now() - i * 1000 * 60 * 60),
                createdAt: new Date(Date.now() - i * 1000 * 60 * 60),
            })) as IComment[];
        }
    });
</script>

<div class="mx-auto flex w-full max-w-4xl flex-col overflow-hidden bg-white md:flex-row">
    <!-- Image à gauche -->
    <div class="flex w-full items-center justify-center bg-neutral-100 md:w-1/2 max-h-fit">
        {#if post.images && post.images.length > 0}
            <img
                src={post.images[0]?.url}
                alt={post.images[0]?.alt}
                class="h-full max-h-fit w-full object-cover md:max-h-[75vh]"
            />
        {/if}
    </div>
    <div class="flex h-[75vh] max-h-[80vh] w-full flex-col ml-1 justify-between pl-6 md:w-1/2">
        <!-- Infos à droite -->
        <div class="flex max-h-fit w-full flex-col justify-start gap-4">
            <!-- User + story ring -->
            <div class="flex items-center border-b border-gray-200 pb-4">
                <div class="relative">
                    <img
                        src={post.user?.src}
                        alt={post.user?.username}
                        class="h-14 w-14 rounded-full border-2 object-cover {post.user?.storySrc
                            ? 'animate-pulse border-pink-500'
                            : 'border-neutral-300'}"
                    />
                </div>
                <div class="pl-3">
                    <div class="text-lg font-bold">{post.user?.displayname || post.user?.username}</div>
                    <div class="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
                </div>
            </div>
            <!-- Like + description -->
            <div class="flex items-center gap-4">
                <div class="flex items-center">
                    <div class="con-like cursor-pointer transition-all hover:scale-90 active:scale-75">
                        <input class="like" type="checkbox" title="like" />
                        <div class="checkmark">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 512 512"
                                class="cursor-pointer transition-all"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="32"
                                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                ></path>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="filled"
                                viewBox="0 0 24 24"
                                height=".9em"
                                width=".9em"
                            >
                                <path
                                    d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
                                ></path>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="100"
                                width="100"
                                class="celebrate"
                            >
                                <polygon class="poly" points="10,10 20,20"></polygon>
                                <polygon class="poly" points="10,50 20,50"></polygon>
                                <polygon class="poly" points="20,80 30,70"></polygon>
                                <polygon class="poly" points="90,10 80,20"></polygon>
                                <polygon class="poly" points="90,50 80,50"></polygon>
                                <polygon class="poly" points="80,80 70,70"></polygon>
                            </svg>
                        </div>
                    </div>
                    <p class="ml-1 text-xs font-semibold">
                        {post.likes && post.likes.length > 0
                            ? post.likes.length + (post.likes.length > 1 ? ' likes' : ' like')
                            : '0 like'}
                    </p>
                </div>
            </div>
            <div class="mb-2 break-words text-base">
                <div>
                    <span class="font-bold">{post.user?.displayname || post.user?.username} :</span>
                    <span class="ml-1">{post.text}</span>
                </div>
                <span class="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
        </div>

        <!-- Commentaires -->
        <div
            class="flex-1 mt-2 overflow-y-auto"
            aria-label="Commentaires"
            role="region"
            bind:this={commentsDiv}
            on:mouseenter={() => { isHovering = true; checkCommentsScroll(); }}
            on:mouseleave={() => { isHovering = false; dispatch('commentsHoverChange', false); }}
            on:scroll={checkCommentsScroll}
        >
            {#if post.comments && post.comments.length > 0}
                <ul class="list-none p-0">
                    {#each post.comments as comment}
                        <li class="pb-1">
                            <span class="font-bold">
                                {comment.user?.displayname || comment.user?.username} :
                            </span>
                            <span>{comment.text}</span>
                            <span class="ml-2 text-xs text-gray-400">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </li>
                    {/each}
                </ul>
            {:else}
                <div class="text-gray-400">Aucun commentaire.</div>
            {/if}
        </div>

        <!-- Input pour poster un commentaire, visible seulement si l'utilisateur est connecté -->
        {#if $isAuthenticated && $user}
            <div class="flex items-end gap-2 mt-4">
                <img
                    src={$user.src}
                    alt={$user.username}
                    class="h-10 w-10 rounded-full object-cover border border-neutral-300 mt-1"
                />
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs text-gray-500">Poster un commentaire</span>
                        <!-- Emojis rapides -->
                        {#each ['😍','🔥','😂','👏','😮'] as emoji}
                            <button
                                type="button"
                                class="text-xl hover:scale-110 transition"
                                on:click={() => postQuickEmoji(emoji)}
                            >{emoji}</button>
                        {/each}
                    </div>
                    <form class="flex gap-2" on:submit|preventDefault={handleCommentSubmit}>
                        <input
                            type="text"
                            bind:value={newComment}
                            placeholder="Ajouter un commentaire..."
                            class="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-neutral-50"
                        />
                        <button
                            type="submit"
                            class="text-blue-500 font-semibold px-3 py-1 rounded hover:bg-blue-50 transition"
                        >Post</button>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .max-w-4xl {
        max-width: 64rem;
    }

    .con-like {
        --red: rgb(50, 50, 50);
        position: relative;
        height: 1em;
        width: 1em;
    }

    .con-like .like {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 20;
        cursor: pointer;
    }

    .con-like .checkmark {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .con-like .filled {
        --red: rgb(255, 50, 50);
        animation: kfr-filled 0.5s;
        display: none;
    }

    .con-like .celebrate {
        position: absolute;
        animation: kfr-celebrate 0.5s;
        animation-fill-mode: forwards;
        display: none;
    }

    .con-like .poly {
        stroke: rgb(255, 50, 50);
        fill: rgb(255, 50, 50);
    }

    .con-like .like:checked ~ .checkmark .filled {
        display: block;
    }

    .con-like .like:checked ~ .checkmark .celebrate {
        display: block;
    }

    @keyframes kfr-filled {
        0% {
            opacity: 0;
            transform: scale(0);
        }

        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }

    @keyframes kfr-celebrate {
        0% {
            transform: scale(0);
        }

        50% {
            opacity: 0.8;
        }

        100% {
            transform: scale(1.2);
            opacity: 0;
            display: none;
        }
    }
</style>
