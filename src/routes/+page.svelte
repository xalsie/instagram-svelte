<script>
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Feed from '$lib/components/Feed.svelte';
	import Stories from '$lib/components/Stories.svelte';

	onMount(() => {
	});
</script>

<div id="root">
	<div class="min-h-screen bg-neutral-100 w-fit">
		<div>
			<Navbar />

			<main class="mx-auto px-2 py-2 md:px-4 md:py-6 w-full md:max-w-9/10 xl:max-w-3/4">
				<div class="grid grid-cols-12">
					<!-- Left Side -->
					<div class="col-span-12">
						<!-- Stories -->
						<Stories />

						<!-- Feed -->
						<Feed />
					</div>
				</div>
			</main>
		</div>
	</div>
</div>
