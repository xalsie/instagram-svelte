<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { user, isAuthenticated } from '$lib/store.js';

	import type { IUser } from '$lib/server/models/User.ts';
	import type { IPost } from '$lib/server/models/Post.ts';
	import type { ILike } from '$lib/server/models/Like.ts';
	import type { IComment } from '$lib/server/models/Comment.ts';

	export let post: IPost;

	let newComment = '';
	let commentsDiv: HTMLDivElement | null = null;
	let isHovering = false;
	const dispatch = createEventDispatcher();

	const pendingComments = writable<
		Array<{ text: string; user: IUser; createdAt: Date; error?: string }>
	>([]);

	const comments = writable<IComment[]>(post.comments ? [...post.comments] : []);

	$: if (post.comments && post.comments !== $comments) {
		comments.set([...post.comments]);
	}

	const likes = writable<ILike[]>(post.likes ? [...post.likes] : []);

	$: if (post.likes && post.likes !== $likes) {
		likes.set([...post.likes]);
	}

	async function handleCommentSubmit() {
		if (!newComment.trim()) return;
		if (!$user) return;
		const tempComment = {
			text: newComment,
			user: $user,
			createdAt: new Date(),
			error: undefined
		};
		pendingComments.update((list) => [...list, tempComment]);
		newComment = '';
		setTimeout(() => {
			if (commentsDiv) commentsDiv.scrollTop = commentsDiv.scrollHeight;
		}, 0);
		let res;
		try {
			res = await fetch(`/api/posts/${post._id}/comments`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: tempComment.text })
			});
		} catch (e) {
			pendingComments.update((list) => {
				const idx = list.indexOf(tempComment);
				if (idx > -1)
					list[idx] = { ...list[idx], error: "Erreur réseau lors de l'envoi du commentaire" };
				return [...list];
			});
			return;
		}
		if (res.ok) {
			const comment = await res.json();
			pendingComments.update((list) => {
				const idx = list.indexOf(tempComment);
				if (idx > -1) list.splice(idx, 1);
				return [...list];
			});
			comments.update((list) => [...list, comment]);
			post.comments = $comments;
			setTimeout(() => {
				if (commentsDiv) commentsDiv.scrollTop = commentsDiv.scrollHeight;
			}, 0);
		} else {
			pendingComments.update((list) => {
				const idx = list.indexOf(tempComment);
				if (idx > -1) list[idx] = { ...list[idx], error: "Erreur lors de l'envoi du commentaire" };
				return [...list];
			});
		}
	}

	function postQuickEmoji(emoji: string) {
		if (newComment.length + emoji.length <= 200) {
			newComment += emoji;
		}
	}

	async function handleLike() {
		if (!$user) return;
		const userId = ($user as IUser)._id || $user.username;
        console.log('likes', $likes)
		let existingLike = $likes.find((like: ILike) => like.user._id === userId)
		let alreadyLiked = !!existingLike;
		let likeId = existingLike?._id;

		try {
			let res;
			if (alreadyLiked) {
				res = await fetch(`/api/posts/${post._id}/like/${likeId}`, { method: 'DELETE' });
			} else {
				res = await fetch(`/api/posts/${post._id}/like`, { method: 'POST' });
			}
			if (res.ok) {
				const data = await res.json();
				if (alreadyLiked) {
					likes.update((list) => list.filter((like: ILike) => like.user._id !== userId));
				} else {
					likes.update((list) => {
						if (!list.some((like: ILike) => like.user._id === userId)) {
							return [...list, data.like];
						}
						return list;
					});
				}
			} else {
				console.error('Failed to update like status:', await res.text());
			}
		} catch {
			console.error('Failed to update like status');
		}

		post.likes = $likes;
	}

	function canEditComment(comment: IComment) {
		if (!user || !comment.user) return false;
		const isOwner = comment.user._id === $user._id;
		const lessThanOneMinute = Date.now() - new Date(comment.createdAt).getTime() < 60 * 1000;
		return isOwner && lessThanOneMinute;
	}

	function canDeleteComment(comment: IComment) {
		return $user.role === 'admin';
	}

	async function handleEditComment(comment: IComment, newText: string) {
		const res = await fetch(`/api/posts/${post._id}/comments/${comment._id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: newText })
		});
		if (res.ok) {
			const updated = await res.json();
			comments.update((list) =>
				list.map((c) => (c._id === comment._id ? { ...c, ...updated } : c))
			);
			post.comments = $comments;
		}
	}

	async function handleDeleteComment(comment: IComment) {
		const res = await fetch(`/api/posts/${post._id}/comments/${comment._id}`, { method: 'DELETE' });
		if (res.ok) {
			comments.update((list) => list.filter((c) => c._id !== comment._id));
		}
	}

	let editingCommentId: string = '';
	let editingText: string = '';

	function startEdit(comment: IComment) {
		editingCommentId = comment._id.toString();
		editingText = comment.text;
	}

	function cancelEdit() {
		editingCommentId = '';
		editingText = '';
	}

	async function saveEdit(comment: IComment) {
		await handleEditComment(comment, editingText);
		editingCommentId = '';
		editingText = '';
	}

	// onMount(() => {});
</script>

<div class="mx-auto flex w-full max-w-4xl flex-col overflow-hidden bg-white md:flex-row">
	<!-- Image à gauche -->
	<div class="flex max-h-fit w-full items-center justify-center bg-neutral-100 md:w-1/2">
		{#if post.images && post.images.length > 0}
			<img
				src={post.images[0]?.url}
				alt={post.images[0]?.alt}
				class="h-full max-h-fit w-full object-cover md:max-h-[75vh]"
			/>
		{/if}
	</div>
	<div class="ml-1 flex h-[75vh] max-h-[80vh] w-full flex-col justify-between pl-6 md:w-1/2">
		<!-- Infos à droite -->
		<div class="flex max-h-fit w-full flex-col justify-start gap-4">
			<!-- User + story ring -->
			<div class="flex items-center border-b border-gray-200 pb-4">
				<div class="relative">
					<img
						src={post.user?.src}
						alt={post.user?.username}
						class="h-14 w-14 rounded-full border-2 border-neutral-300 object-cover"
					/>
				</div>
				<div class="pl-3">
					<div class="text-lg font-bold">{post.user?.displayname || post.user?.username}</div>
					<div class="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
				</div>
			</div>
			<!-- Like -->
			<div class="flex items-center gap-4">
				<div class="flex items-center">
					<div class="con-like cursor-pointer transition-all hover:scale-90 active:scale-75">
						<input
							class="like"
							type="checkbox"
							title="like"
							checked={$likes && $user && $likes.some((like) => like.user._id === $user._id)}
							on:change={handleLike}
							aria-label="Like this post"
						/>
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
								class="filled transform transition-all"
								viewBox="0 0 24 24"
								height=".9em"
								width=".9em"
							>
								<path
									d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
								></path>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
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
						{$likes && $likes.length > 0
							? $likes.length + ($likes.length > 1 ? ' likes' : ' like')
							: '0 like'}
					</p>
				</div>
			</div>
			<!-- Texte du post -->
			<div class="mb-2 text-base break-words">
				<div>
					<span class="font-bold">{post.user?.displayname || post.user?.username} :</span>
					<span class="ml-1">{post.text}</span>
				</div>
				<span class="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
			</div>
		</div>

		<!-- Commentaires -->
		<div
			class="mt-2 flex-1 overflow-y-auto"
			aria-label="Commentaires"
			role="region"
			bind:this={commentsDiv}
			on:mouseenter={() => {
				isHovering = true;
			}}
			on:mouseleave={() => {
				isHovering = false;
				dispatch('commentsHoverChange', false);
			}}
		>
			{#if $comments && $comments.length > 0}
				<ul class="list-none p-0">
					{#each $comments as comment (comment._id)}
						<li class="flex items-center gap-2 pb-1">
							<span class="font-bold">
								{comment.user?.displayname || comment.user?.username} :
							</span>
							{#if editingCommentId === comment._id.toString()}
								<input type="text" bind:value={editingText} class="rounded border px-1 text-sm" />
								<button class="ml-1 text-xs text-blue-500" on:click={() => saveEdit(comment)}>
									Enregistrer
								</button>
								<button class="ml-1 text-xs text-gray-400" on:click={() => cancelEdit()}>
									Annuler
								</button>
							{:else}
								<span>{comment.text}</span>

								<span class="ml-2 text-xs text-gray-400">
									{new Date(comment.createdAt).toLocaleString()}
								</span>
								{#if canEditComment(comment)}
									<button class="ml-2 text-xs text-yellow-600" on:click={() => startEdit(comment)}>
										éditer
									</button>
								{/if}
								{#if canDeleteComment(comment)}
									<button
										class="ml-2 text-xs text-red-600"
										on:click={() => handleDeleteComment(comment)}
									>
										Supprimer
									</button>
								{/if}
							{/if}
						</li>
					{/each}

					{#each $pendingComments as comment}
						<li class="pb-1">
							<span class="font-bold">
								{comment.user?.displayname || comment.user?.username} :
							</span>
							<span class={comment.error ? 'text-red-500' : ''}>{comment.text}</span>
							<span class="ml-2 text-xs text-gray-400">
								{new Date(comment.createdAt).toLocaleString()}
							</span>
							{#if comment.error}
								<span class="ml-2 text-xs text-red-500">{comment.error}</span>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<div class="text-gray-400">Aucun commentaire.</div>
			{/if}
		</div>

		{#if $isAuthenticated && $user}
			<div class="mt-4 flex items-end gap-2">
				<img
					src={$user.src}
					alt={$user.username}
					class="mt-1 h-10 w-10 rounded-full border border-neutral-300 object-cover"
				/>
				<div class="flex-1">
					<div class="mb-1 flex items-center gap-2">
						<span class="text-xs text-gray-500">Poster un commentaire</span>
						{#each ['😍', '🔥', '😂', '👏', '😮'] as emoji}
							<button
								type="button"
								class="text-xl transition hover:scale-110"
								on:click={() => postQuickEmoji(emoji)}>{emoji}</button
							>
						{/each}
					</div>
					<form class="flex gap-2" on:submit|preventDefault={handleCommentSubmit}>
						<input
							type="text"
							bind:value={newComment}
							placeholder="Ajouter un commentaire..."
							class="flex-1 rounded-xl border bg-neutral-50 px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
						/>
						<button
							type="submit"
							class="rounded px-3 py-1 font-semibold text-blue-500 transition hover:bg-blue-50"
							>Post</button
						>
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
		--red: rgb(255, 50, 50);
		position: relative;
		width: 1em;
		height: 1em;
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
		fill: var(--red);
		position: absolute;
	}

	.con-like .filled {
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
		stroke: var(--red);
		fill: var(--red);
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
