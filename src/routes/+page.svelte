<script>
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

import Navbar from '$lib/components/Navbar.svelte';
import Feed from '$lib/components/Feed.svelte';
import Stories from '$lib/components/Stories.svelte';
let isAuthenticated = false;
	import { users } from "./mockData.js";

	export let data;

	let feed = [];
	let loadingFeed = true;
	let feedTimeout;

	async function fetchFeed() {
		loadingFeed = true;
		// Simule un appel serveur avec un délai
		feedTimeout = setTimeout(() => {
			feed = [];
			loadingFeed = false;
		}, 1200);
	}

onMount(() => {
	data = users;
	fetchFeed();
	if (typeof window !== 'undefined') {
		isAuthenticated = !!localStorage.getItem('token');
	}
});

	onDestroy(() => {
		clearTimeout(feedTimeout);
	});

	function openStory(user, imgIdx = 1) {
		goto(`/images/${user.username}/${imgIdx}`);
	}
</script>

<div id="root">
	<div class="min-h-screen bg-neutral-100 w-full">
		<div>
			<Navbar {isAuthenticated} />

			<main class="mx-auto px-2 py-2 md:px-4 md:py-6 w-full md:max-w-9/10 xl:max-w-3/4">
				<div class="grid grid-cols-12">
					<!-- Left Side -->
					<div class="col-span-12">
					<!-- Stories -->
					{#if isAuthenticated}
						<Stories bind:data={data} on:openStory={({ detail }) => openStory(detail.user, detail.imgIdx)} />
					{/if}

						<!-- Feed -->
						<Feed {loadingFeed} />
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
