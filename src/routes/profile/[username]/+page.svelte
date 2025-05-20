<script context="module">
	export async function load({ params }) {
		const { username } = params;
		const user = await fetch(`/api/users/${username}`).then(res => res.json());
		const posts = await fetch(`/api/users/${username}/posts`).then(res => res.json());
		return { user, posts };
	}
</script>

<script>
	export let user;
	export let posts;
</script>

<Profile {user} />

<Feed {posts} />