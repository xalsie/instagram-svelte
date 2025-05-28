<script lang="ts">
	import StoryButton from "$lib/components/StoryButton.svelte";
	import { createEventDispatcher } from 'svelte';

	type User = {
		username: string;
		displayname: string;
		profileSrc: string;
		images?: { src: string; alt: string }[];
		storyId?: string;
		expiresAt?: string;
	};

	export let data: User[];
	const dispatch = createEventDispatcher();

	function handleOpenStory(user: User, imgIdx: number = 1) {
		dispatch('openStory', { user, imgIdx });
	}
</script>

<div class="relative mb-4 flex w-full md:max-w-8/10 justify-self-center overflow-hidden">
	<div
		class="relative flex flex-1 flex-nowrap space-x-4 overflow-hidden rounded-xl pt-2 pb-2 lg:p-4 ml-4 mr-4"
	>
		<div class="flex flex-nowrap gap-6 overflow-x-scroll scrollbar-none pl-1 pr-5 no-scrollbar">
			<ul class="flex gap-6 list-none overflow-x-auto scroll-container">
				{#each data as user}
					<li class="flex flex-col items-center">
						<StoryButton
							path={null}
							imgSrc={user.profileSrc}
							on:click={() => handleOpenStory(user, 1)}
						>
							{user.displayname}
						</StoryButton>
						<!-- Miniatures des images de l'utilisateur -->
						<!-- <div class="flex gap-1 mt-1">
							{#each user.images as img, i}
								<button type="button" on:click={() => handleOpenStory(user, i+1)}>
									<img src={img.src} alt={img.alt} class="w-6 h-6 rounded object-cover border border-white" />
								</button>
							{/each}
						</div> -->
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
