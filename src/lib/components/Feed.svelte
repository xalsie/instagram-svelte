<script>
	import Card from './card/Card.svelte';
  import CardSkeleton from './card/Card.Skeleton.svelte';
	export let feed = [];
	export let loadingFeed = false;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {#if loadingFeed}
		{#each Array(6) as _, i}
			<CardSkeleton />
		{/each}
	{:else}
    {#each Array(39) as _, index}
      <Card />
    {/each}
	{/if}
</div>
