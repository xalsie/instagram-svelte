<script>
	import { onMount } from 'svelte';
	import StoryPicture from './stories/StoryPicture.svelte';
</script>

<div class="relative mb-4 flex w-full md:max-w-8/10 justify-self-center overflow-hidden">
	<div
		class="relative flex flex-1 flex-nowrap space-x-4 overflow-hidden rounded-xl pt-2 pb-2 lg:p-4 ml-4 mr-4"
	>
		<div class="flex flex-nowrap gap-6 overflow-x-scroll scrollbar-none pl-1 pr-5 no-scrollbar">
			{#each Array(20) as _, index}
				<StoryPicture />
			{/each}
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
