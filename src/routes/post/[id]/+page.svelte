<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/state';

	import Post from '$lib/components/post/Post.svelte';

	let post: any;
	let nextPosts: any[] = [];
	let olderPosts: any[] = [];
	let loading = !post;
	let loadingMore = false;
	let hasMore = true;


	let isAuthenticated = true; // à remplacer par la vraie logique auth
	let currentUser = {
		username: 'me',
		displayname: 'Vous',
		profileSrc: '/images/profile1.jpg' // à remplacer dynamiquement
	};

	let isOverComments = false;

	async function fetchOlderPosts(lastDate: string) {
		loadingMore = true;
		const response = await fetch(`/api/posts?before=${encodeURIComponent(lastDate)}`);
		if (response.ok) {
			const data = await response.json();
			olderPosts = [...olderPosts, ...data.posts];
			hasMore = data.hasMore;
		}
		loadingMore = false;
	}

	onMount(async () => {
		const id = page.params.id;
		const response = await fetch(`/api/posts/${id}`);
		if (response.ok) {
			const data = await response.json();
			post = data.post || data;
			nextPosts = data.nextPosts || [];
			// Charger les premiers anciens posts
			await fetchOlderPosts(post.createdAt);
		} else {
			post = null;
		}
		loading = false;
	});

	let observer: IntersectionObserver;
	let sentinel: HTMLDivElement;
	let postRefs: HTMLElement[] = [];
	let lastUrlId = '';

	let currentPostIndex = 0;
	let scrollLock = false;

	function setupObserver() {
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(async (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.target.dataset.postid) {
					const newId = entry.target.dataset.postid;
					if (newId !== lastUrlId) {
						history.replaceState({}, '', `/post/${newId}`);
						lastUrlId = newId;
					}
				}
			}
			if (entries[0].isIntersecting && hasMore && !loadingMore) {
				await fetchOlderPosts(
					olderPosts.length > 0 ? olderPosts[olderPosts.length - 1].createdAt : post.createdAt
				);
			}
		}, { threshold: 0.5 });

		// Observe all post refs
		for (const ref of postRefs) {
			if (ref) observer.observe(ref);
		}
		if (sentinel) observer.observe(sentinel);
	}

function handleWheel(e: WheelEvent) {
	if (isOverComments) return;
	if (scrollLock) return;
	if (Math.abs(e.deltaY) < 30) return; // Ignore micro scrolls
	scrollLock = true;
	setTimeout(() => { scrollLock = false; }, 600); // debounce
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

	$: {
		if (!loading && post) setupObserver();
		// Met à jour l'index courant selon le post visible
		for (let i = 0; i < postRefs.length; i++) {
			const rect = postRefs[i]?.getBoundingClientRect();
			if (rect && rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
				currentPostIndex = i;
				break;
			}
		}
	};

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div class="flex min-h-screen flex-col bg-white">
	<Navbar isAuthenticated={true} />

	<!-- <div class="flex w-full flex-1 flex-col items-center justify-center pb-32 pt-8"> -->
	<div class="flex w-full flex-1 flex-col items-center justify-center pb-32 pt-8" on:wheel={handleWheel}>
		{#if loading}
			<div class="flex h-96 items-center justify-center">
				<span>Chargement du post...</span>
			</div>
		{:else if post}
			<!-- Post principal modern layout -->

			<div bind:this={postRefs[0]} data-postid={post._id} class="flex w-full" style="scroll-margin-top: 80px;">
				<Post {post} {isAuthenticated} {currentUser} onCommentsHoverChange={(v) => isOverComments = v} />
			</div>

			<!-- Anciens posts (scroll infini) -->
			{#each olderPosts as p, i}
				<div class="w-full mt-40" bind:this={postRefs[i+1]} data-postid={p._id} style="scroll-margin-top: 80px;">
					<Post post={p} {isAuthenticated} {currentUser} onCommentsHoverChange={(v) => isOverComments = v} />
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
