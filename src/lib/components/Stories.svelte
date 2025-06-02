<script lang="ts">
	import { onMount } from 'svelte';
	import StoryButton from '$lib/components/StoryButton.svelte';

	import { isAuthenticated } from '$lib/store.js';

	import type { IStory } from '$lib/server/models/Story';

	let users: any[] = [];
	let loadingUsers = true;

	async function fetchUsers() {
		loadingUsers = true;
		const res = await fetch('/api/stories');
		if (res.ok) {
			const stories: IStory[] = await res.json();
			users = stories.map((story) => ({
				...story.user,
				images: story.images,
				storyId: story._id
			}));
		} else {
			users = [];
		}
		loadingUsers = false;
	}

	onMount(() => {
		fetchUsers();
	});
</script>

{#if isAuthenticated}
	<div class="relative mb-4 flex w-full justify-self-center overflow-hidden md:max-w-8/10">
		<div
			class="relative mr-4 ml-4 flex flex-1 flex-nowrap space-x-4 overflow-hidden rounded-xl pt-2 pb-2 lg:p-4"
		>
			<div class="scrollbar-none no-scrollbar flex flex-nowrap gap-6 overflow-x-scroll pr-5 pl-1">
				<ul class="scroll-container flex list-none gap-6 overflow-x-auto">
					{#each users as user}
						<li class="flex flex-col items-center">
							<StoryButton {user}>
								{user.displayname}
							</StoryButton>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div
			class="absolute top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-1.5 shadow-xl"
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
			class="absolute top-1/2 -right-0 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-1.5 shadow-xl"
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
{/if}
