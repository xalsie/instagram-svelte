<script lang="ts">
	export let message: string = '';
</script>

{#if message}
	<div
		class="absolute top-16 left-1/2 z-10 w-fit -translate-x-1/2 translate-y-2 cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-medium shadow-xl active:bg-neutral-100"
	>
		{message}
	</div>
{/if}
