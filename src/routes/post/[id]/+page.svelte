<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/state';
	import Post from '$lib/components/post/Post.svelte';

	import type { IPost } from '$lib/server/models/Post';

	let post: IPost | null = null;
	let nextPosts: IPost[] = [];
	let olderPosts: IPost[] = [];
	let loading = true;
	let loadingMore = false;
	let hasMore = true;

	let isOverComments = false;

	const SCROLL_DEBOUNCE = 600;
	const SCROLL_THRESHOLD = 30;
	const SCROLL_MARGIN_TOP = 80;

	async function fetchOlderPosts(lastDate: Date) {
		loadingMore = true;
		try {
			const response = await fetch(`/api/posts?before=${encodeURIComponent(lastDate.toString())}`);
			if (response.ok) {
				const data = await response.json();
				olderPosts = [...olderPosts, ...data.posts];
				hasMore = data.hasMore;
			}
		} finally {
			loadingMore = false;
		}
	}

	onMount(async () => {
		const id = page.params.id;
		const response = await fetch(`/api/posts/${id}`);
		if (response.ok) {
			const data = await response.json();
			post = data.post || data;
			nextPosts = data.nextPosts || [];
			if (post) {
				await fetchOlderPosts(post.createdAt);
			}
		} else {
			post = null;
		}
		loading = false;
	});

	let observer: IntersectionObserver | null = null;
	let sentinel: HTMLDivElement;
	let postRefs: HTMLElement[] = [];
	let lastUrlId = '';
	let currentPostIndex = 0;
	let scrollLock = false;

	function setupObserver() {
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(
			async (entries) => {
				for (const entry of entries) {
					if (
						entry.isIntersecting &&
						entry.target instanceof HTMLElement &&
						entry.target.dataset.postid
					) {
						const newId = entry.target.dataset.postid;
						if (newId !== lastUrlId) {
							history.replaceState({}, '', `/post/${newId}`);
							lastUrlId = newId;
						}
					}
				}
				if (entries[0].isIntersecting && hasMore && !loadingMore) {
					await fetchOlderPosts(
						olderPosts.length > 0
							? olderPosts[olderPosts.length - 1].createdAt
							: (post?.createdAt ?? new Date())
					);
				}
			},
			{ threshold: 0.5 }
		);

		for (const ref of postRefs) {
			if (ref) observer.observe(ref);
		}
		if (sentinel) observer.observe(sentinel);
	}

	function handleWheel(e: WheelEvent) {
		if (isOverComments || scrollLock || Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;
		scrollLock = true;
		setTimeout(() => {
			scrollLock = false;
		}, SCROLL_DEBOUNCE);
		let idx = currentPostIndex;
		if (e.deltaY > 0 && idx < postRefs.length - 1) {
			idx++;
		} else if (e.deltaY < 0 && idx > 0) {
			idx--;
		} else {
			return;
		}
		currentPostIndex = idx;
		const el = postRefs[idx];
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
			const newId = el.dataset.postid;
			if (newId && newId !== lastUrlId) {
				history.replaceState({}, '', `/post/${newId}`);
				lastUrlId = newId;
			}
		}
	}

	$: if (!loading && post) setupObserver();

	$: {
		// Update currentPostIndex based on visible post
		for (let i = 0; i < postRefs.length; i++) {
			const rect = postRefs[i]?.getBoundingClientRect();
			if (rect && rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
				currentPostIndex = i;
				break;
			}
		}
	}

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div class="flex min-h-screen flex-col bg-white">
	<Navbar />
	<div
		class="flex w-full flex-1 flex-col items-center justify-center pt-8 pb-32"
		on:wheel={handleWheel}
	>
		{#if loading}
			<div class="flex h-96 items-center justify-center">
				<span>Chargement du post...</span>
			</div>
		{:else if post}
			<div
				bind:this={postRefs[0]}
				data-postid={post._id}
				class="flex w-full"
				style="scroll-margin-top: {SCROLL_MARGIN_TOP}px;"
			>
				<Post {post} on:commentsHoverChange={(event) => (isOverComments = event.detail)} />
			</div>
			{#each olderPosts as p, i}
				<div
					class="mt-40 w-full"
					bind:this={postRefs[i + 1]}
					data-postid={p._id}
					style="scroll-margin-top: {SCROLL_MARGIN_TOP}px;"
				>
					<Post post={p} on:commentsHoverChange={(event) => (isOverComments = event.detail)} />
				</div>
			{/each}
			<div bind:this={sentinel} style="height: 1px;"></div>
			{#if loadingMore}
				<div class="mb-8 text-gray-400">Chargement...</div>
			{/if}
		{:else}
			<div class="mt-10 text-center text-red-500">Post introuvable.</div>
		{/if}
	</div>
</div>
