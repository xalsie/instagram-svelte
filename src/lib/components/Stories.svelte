<script>
	// import { onMount } from 'svelte';
	import StoryButton from "$lib/components/StoryButton.svelte";

	export let data;
</script>

<div class="relative mb-4 flex w-full md:max-w-8/10 justify-self-center overflow-hidden">
	<div
		class="relative flex flex-1 flex-nowrap space-x-4 overflow-hidden rounded-xl pt-2 pb-2 lg:p-4 ml-4 mr-4"
	>
		<div class="flex flex-nowrap gap-6 overflow-x-scroll scrollbar-none pl-1 pr-5 no-scrollbar">
			<ul class="flex gap-6 list-none overflow-x-auto scroll-container">
				{#each data.images as img}
					<li>
						<StoryButton
							path={`/images/${data.images.indexOf(img) + 1}`}
							imgSrc={"https://cdn.discordapp.com/avatars/306487572740177920/ce3920162ef416ae4e22764b1f737e8c.webp?size=160"}
						>
							{img}
						</StoryButton>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div
		class="absolute top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full bg-white p-1.5 shadow-xl"
	>
		<svg
			stroke="currentColor"
			fill="currentColor"
			stroke-width="0"
			viewBox="0 0 512 512"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="48"
				d="M328 112L184 256l144 144"
			></path></svg
		>
	</div>
	<div
		class="absolute top-1/2 transform -translate-y-1/2 -right-0 cursor-pointer rounded-full bg-white p-1.5 shadow-xl"
	>
		<svg
			stroke="currentColor"
			fill="currentColor"
			stroke-width="0"
			viewBox="0 0 512 512"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="48"
				d="M184 112l144 144-144 144"
			></path></svg
		>
	</div>
</div>
