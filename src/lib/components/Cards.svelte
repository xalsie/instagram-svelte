<script>
    import { onMount } from 'svelte';
    import Card from './card/Card.svelte';
</script>

<section class="space-y-3">
	<!-- <Card /> -->
    <div class="grid grid-cols-1 gap-4">
        {#each Array(10) as _, index}
            <Card />
        {/each}
    </div>
</section>
