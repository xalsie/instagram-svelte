<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Feed from '$lib/components/Feed.svelte';
	import Stories from '$lib/components/Stories.svelte';
</script>

<div id="root">
	<div class="min-h-screen w-full bg-neutral-100">
		<div>
			<Navbar />

			<main class="mx-auto w-full px-2 py-2 md:max-w-9/10 md:px-4 md:py-6 xl:max-w-3/4">
				<div class="grid grid-cols-12">
					<div class="col-span-12">
						<Stories />

						<Feed />
					</div>
				</div>
			</main>
		</div>
	</div>
</div>

<style>
	:global(.transition) {
		transform-origin: var(--transition-origin-x) var(--transition-origin-y);
		z-index: 1;
	}
	main {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
