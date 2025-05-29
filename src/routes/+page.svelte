<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Feed from '$lib/components/Feed.svelte';
	import Stories from '$lib/components/Stories.svelte';
	import { goto } from '$app/navigation';

	import { isAuthenticated } from '$lib/store.js';

	import type { IUser } from '$lib/server/models/User';
	import type { IStory } from '$lib/server/models/Story';

	let users: IUser[] = [];
	let loadingUsers = true;
	// let feedTimeout: ReturnType<typeof setTimeout>;

	type User = any;
	type OpenStoryDetail = { user: User; imgIdx: number };

	async function fetchUsers() {
		loadingUsers = true;
		// Récupère les stories depuis l'API
		const res = await fetch('/api/stories');
		if (res.ok) {
			// On adapte le format pour Stories.svelte : chaque story a un user et des images
			const stories: IStory[] = await res.json();
			users = stories.map((story) => ({
				...story.user,
				images: story.images,
				storyId: story._id,
				delay: story.delay
			}));
		} else {
			users = [];
		}
		loadingUsers = false;
	}

	onMount(() => {
		fetchUsers();
	});

	// onDestroy(() => {
	// 	clearTimeout(feedTimeout);
	// });

	function openStory(user: User, imgIdx: number = 1) {
		goto(`/images/${user.username}/${imgIdx}`);
	}
</script>

<div id="root">
	<div class="min-h-screen w-full bg-neutral-100">
		<div>
			<Navbar />

			<main class="md:max-w-9/10 xl:max-w-3/4 mx-auto w-full px-2 py-2 md:px-4 md:py-6">
				<div class="grid grid-cols-12">
					<div class="col-span-12">
						{#if $isAuthenticated}
							<Stories
								bind:data={users}
								on:openStory={({ detail }) => openStory(detail.user, detail.imgIdx)}
							/>
						{/if}

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
