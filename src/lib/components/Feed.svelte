<script>
	import { fade } from 'svelte/transition';
	import Card from './card/Card.svelte';
	import CardSkeleton from './card/Card.Skeleton.svelte';
	// export let feed = [];
	export let loadingFeed = false;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	{#if loadingFeed}
		{#each Array(6) as _, i}
			<CardSkeleton />
		{/each}
	{:else}
		{#each Array(39) as _, index (index)}
			<div in:fade={{ delay: 50 * index, duration: 1000 }}>
				<Card />
			</div>
		{/each}
	{/if}
</div>
