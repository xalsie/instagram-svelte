<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Card from './card/Card.svelte';
	import CardSkeleton from './card/Card.Skeleton.svelte';
	import { user as userStore } from '$lib/store.js';

	import type { IPost } from '$lib/server/models/Post';

	let feed: IPost[] = [];
	let loadingFeed: boolean = false;
	let followingIds: string[] = [];

	async function fetchFeed() {
		loadingFeed = true;
		const me = $userStore;
		followingIds = (me?.following || []).map((id: any) => id.toString());
		if (me?._id) followingIds.push(me._id.toString());
		const res = await fetch('/api/posts');

		const data = res.ok ? await res.json() : { posts: [] };
		feed = data.posts;
		loadingFeed = false;
	}

	onMount(() => {
		fetchFeed();
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	{#if loadingFeed}
		{#each Array(12) as _, i}
			<CardSkeleton />
		{/each}
	{:else}
		{#each feed as post, index}
			<div in:fade={{ delay: 50 * index, duration: 1000 }}>
				<Card {post} currentUserId={$userStore?._id?.toString?.() ?? ''} />
			</div>
		{/each}
	{/if}
</div>
