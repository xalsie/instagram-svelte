<script>
	import Feed from '$lib/components/Feed.svelte';
	import { onMount } from 'svelte';
	import { fetchPosts } from '$lib/utils/api';

	let posts = [];

	onMount(async () => {
		posts = await fetchPosts();
	});
</script>

<main>
	<h1>Explore</h1>
	<Feed {posts} />
</main>