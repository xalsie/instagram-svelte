<script context="module" lang="ts">
	export async function load({ params }: { params: { username: string } }) {
		const { username } = params;
		const user = await fetch(`/api/users/${username}`).then(res => res.json());
		const posts = await fetch(`/api/users/${username}/posts`).then(res => res.json());
		return { user, posts };
	}
</script>

<script lang="ts">
	export let user: any;
	export let posts: any;
</script>

<Profile {user} />

<Feed {posts} />