<script>
	import { onMount } from 'svelte';
	import Card from './card/Card.svelte';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {#each Array(39) as _, index}
    <Card />
  {/each}
</div>
