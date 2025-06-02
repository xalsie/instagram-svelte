<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { user as userStore } from '$lib/store.js';

	let user: any = null;
	let posts: any[] = [];
	let loading = true;
	let error = '';
	let isFollowed = false;

	async function fetchProfile() {
		loading = true;
		error = '';
		try {
			const res = await fetch(`/api/users/${window.location.pathname.split('/').pop()}`);
			if (!res.ok) throw new Error('Erreur lors du chargement du profil');
			const data = await res.json();
			user = data.user;
			posts = user?.posts || [];
		} catch (e: any) {
			error = e.message || 'Erreur inconnue';
		} finally {
			loading = false;
		}
	}

	async function toggleFollow() {
		if (!user) return;
		const me = $userStore;
		if (!me || !me.username) return;
		const method = user.isFollowed ? 'DELETE' : 'POST';
		const res = await fetch(`/api/users/${user.username}/follow`, { method });
		if (res.ok) {
			user.isFollowed = !user.isFollowed;
			if (user.isFollowed) {
				user.followers = [...(user.followers || []), me._id];
			} else {
				user.followers = (user.followers || []).filter((id: string) => id !== me._id);
			}
		}
	}

	onMount(async () => {
		await fetchProfile();
		const me = $userStore;
		if (user && me && me._id && user.followers) {
			user.isFollowed = user.followers.includes(me._id);
			user.isMe = user.username === me.username;
		}
	});
</script>

<div id="root">
	<div class="min-h-screen w-full bg-neutral-100">
		<div>
			<Navbar />

			<main class="mx-auto w-full px-2 py-2 md:px-4 md:py-6">
				{#if loading}
					<div class="flex h-96 items-center justify-center text-lg text-gray-500">
						Chargement...
					</div>
				{:else if error}
					<div class="flex h-96 items-center justify-center text-red-500">{error}</div>
				{:else if user}
					<div class="ml-2 flex w-full flex-col gap-8 p-4 md:flex-row">

						<!-- Colonne gauche : Détail du profil -->
						<div class="w-full md:w-1/4">
							<header class="flex flex-col p-4 md:p-0">
								<img
									class="mb-4 h-32 w-32 rounded-full border-2 border-pink-600 object-cover mx-auto md:h-40 md:w-40"
									src={user?.src || '/images/profiles/default-avatar.webp'}
									alt="profile"
								/>
								<div class="mt-3 mb-2 flex justify-center gap-4">
									<div class="flex flex-col items-center">
										<span class="font-bold">{user?.posts?.length ?? 0}</span>
										<span class="text-gray-400 text-xs"
											>posts</span>
									</div>
									<div class="flex flex-col items-center">
										<span class="font-bold">{user?.followers?.length ?? 0}</span>
										<span class="text-gray-400 text-xs"
											>followers</span>
									</div>
									<div class="flex flex-col items-center">
										<span class="font-bold">{user?.following?.length ?? 0}</span>
										<span class="text-gray-400 text-xs"
											>following</span>
									</div>
								</div>
								{#if !user?.isMe}
									<button
										on:click={toggleFollow}
										class="mb-12 mt-2 block rounded bg-blue-500 px-4 py-2 text-center text-sm font-semibold text-white"
									>{user?.isFollowed ? 'Unfollow' : 'Follow'}</button>
								{/if}
								{#if user?.displayname}
									<h1 class="font-semibold">{user.displayname}</h1>
								{/if}
								{#if user?.bio}
									<p class="mb-2 text-sm text-gray-700">{user.bio}</p>
								{/if}
								{#if user?.website}
									<a href={user.website} class="text-sm text-blue-600" target="_blank"
										>{user.website}</a
									>
								{/if}
							</header>
						</div>

						<!-- Colonne droite : Posts de l'utilisateur -->
						<div class="w-full md:w-/4">
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{#if posts.length === 0}
									<p class="col-span-full text-center text-gray-400">No posts yet.</p>
								{:else}
									{#each posts as post}
										<a
											href={`/post/${post._id}`}
											class="group relative block overflow-hidden rounded-lg bg-neutral-100 hover:shadow-lg"
										>
											{#if post.images && post.images.length > 0}
												<img
													src={post.images[0].url}
													alt={post.images[0].alt || ''}
													class="h-96 w-full object-cover transition-transform duration-200 group-hover:scale-105"
												/>
											{/if}
											<div
												class="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
											>
												<div class="flex gap-4 text-white">
													<span><i class="fas fa-heart"></i> {post.likes?.length ?? 0}</span>
													<span><i class="fas fa-comment"></i> {post.comments?.length ?? 0}</span>
												</div>
											</div>
										</a>
									{/each}
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</main>
		</div>
	</div>
</div>
