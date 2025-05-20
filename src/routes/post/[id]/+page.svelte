<script context="module">
	export async function load({ params }) {
		const { id } = params;
		const response = await fetch(`/api/posts/${id}`);
		const post = await response.json();

		return {
			post
		};
	}
</script>

<script>
	export let post;
</script>

<article>
	<h1>{post.title}</h1>
	<img src={post.image} alt={post.title} />
	<p>{post.caption}</p>

	<section>
		<h2>Comments</h2>
		{#each post.comments as comment}
			<div>
				<strong>{comment.username}</strong>: {comment.text}
			</div>
		{/each}
	</section>
</article>