<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Card from './card/Card.svelte';
	import CardSkeleton from './card/Card.Skeleton.svelte';

	import type { IPost } from '$lib/server/models/Post';

	let feed: IPost[] = [];
	let loadingFeed = false;

	async function fetchFeed() {
		loadingFeed = true;
		const res = await fetch('/api/posts');
		const data = res.ok ? await res.json() : { posts: [] };
		feed = data.posts;
		loadingFeed = false;

		console.log('Feed fetched:', feed)
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
				<Card {post} {index} />
			</div>
		{/each}
	{/if}
</div>
