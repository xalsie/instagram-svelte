<script>
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Feed from '$lib/components/Feed.svelte';
	import Stories from '$lib/components/Stories.svelte';

	export let data;

	onMount(() => {
	});
</script>

<div id="root">
	<div class="min-h-screen bg-neutral-100 w-full">
		<div>
			<Navbar />

			<main class="mx-auto px-2 py-2 md:px-4 md:py-6 w-full md:max-w-9/10 xl:max-w-3/4">
				<div class="grid grid-cols-12">
					<!-- Left Side -->
					<div class="col-span-12">
						<!-- Stories -->
						<Stories bind:data={data} />

						<!-- <div class="">
							<div class="flex items-center justify-center mb-6 z-20">
								<Stories bind:scrollElRef={storiesEl}>
									{#each data.images as img}
										<li>
											<StoryButton
												path={`/images/${data.images.indexOf(img) + 1}`}
												imgSrc={`/img/${img}`}
											>
												{img}
											</StoryButton>
										</li>
									{/each}
								</Stories>
							</div>
						</div> -->

						<!-- Feed -->
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

	.stories-container {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
