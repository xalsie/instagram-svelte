<script>
	import { navigating } from "$app/stores";
	import { fade } from "svelte/transition";

	import StoryButton from "$lib/components/StoryButton.svelte";
	import Stories from "$lib/components/Stories.svelte";
	import { storiesPos, storiesScrollWidth } from "$lib/store";

	export let data;

	let storiesEl;

	$: if ($navigating && storiesEl) {
		storiesScrollWidth.update(() => storiesEl.scrollWidth);
		storiesPos.update(() => storiesEl.getBoundingClientRect());
	}
</script>

<main in:fade={{ duration: 400 }} out:fade={{ delay: 400, duration: 0 }}>
	<div class="lg:grid lg:grid-cols-1 h-full">
		<div class="stories-container">
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
	</div>
</main>

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
