<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Card from './card/Card.svelte';
	import CardSkeleton from './card/Card.Skeleton.svelte';

	interface Post {
		_id: string;
		createdAt: string;
		user: any;
		images: any[];
		likes?: any[];
		comments?: any[];
		text?: string;
	}

	let feed: Post[] = [];
	let loadingFeed = false;

	async function fetchFeed() {
		loadingFeed = true;
		const res = await fetch('/api/feed');
		feed = res.ok ? await res.json() : [];
		loadingFeed = false;

		console.log('Feed fetched:', feed);
	}

	onMount(() => {
		fetchFeed();
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	{#if loadingFeed}
		{#each Array(6) as _, i}
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
