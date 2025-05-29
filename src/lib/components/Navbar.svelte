<script lang="ts">
	import { onMount } from 'svelte';
	import { user, isAuthenticated, token } from '$lib/store.js';
	import Notification from '$lib/components/Notification.svelte';

	let notificationMessage = '';
	let showDropdown = false;

	function handleAvatarClick() {
		showDropdown = !showDropdown;
	}

	function handleLogout() {
		user.set(null);
		isAuthenticated.set(false);
		token.set(null);
		window.location.href = '/login';
	}

	function goToProfile() {
		window.location.href = '/profile';
	}

	function goToNotification() {
		window.location.href = '/notification';
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target;
		if (!(target instanceof Element) || !target.closest('.avatar-dropdown')) {
			showDropdown = false;
		}
	}

	onMount(() => {
		console.log('Navbar mounted', $isAuthenticated, $user.username);

		setTimeout(() => {
			notificationMessage = 'Nouveau Poste';
			console.log('Notification: ', notificationMessage);
		}, 5000);
		if (typeof window !== 'undefined') {
			window.addEventListener('click', handleClickOutside);
		}
	});
</script>

<header class="sticky top-0 z-20 bg-white">
	<div
		class="container relative mx-auto flex items-center justify-between p-4 xl:max-w-3/4"
	>
		<a href="/" class="flex items-center space-x-2">
			<img src="/Instagram-wordmark.svg" alt="instagram wordmark" class="-mb-2 h-7" />
		</a>
		<div
			class="absolute left-1/2 flex -translate-x-1/2 items-center space-x-2 rounded-md bg-neutral-200 px-4 py-1.5"
		>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="text-xl text-neutral-400"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
				></path><path
					fill="none"
					stroke-linecap="round"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M338.29 338.29L448 448"
				></path></svg
			><input type="text" class="bg-transparent outline-none" placeholder="Search" />
		</div>
		<div class="flex items-center space-x-5 text-2xl">
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
				></path><path
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
				></path></svg
			><svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-linecap="round"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"
				></path></svg
			><svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
				></path><path
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M256 176v160m80-80H176"
				></path></svg
			><svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
				></path><path
					d="M350.67 150.93l-117.2 46.88a64 64 0 00-35.66 35.66l-46.88 117.2a8 8 0 0010.4 10.4l117.2-46.88a64 64 0 0035.66-35.66l46.88-117.2a8 8 0 00-10.4-10.4zM256 280a24 24 0 1124-24 24 24 0 01-24 24z"
				></path></svg
			><svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
				></path></svg
			>
			{#if $isAuthenticated}
				<div class="relative avatar-dropdown">
					<div class="flex h-7 w-7 items-center justify-center rounded-full">
						<button type="button" on:click={handleAvatarClick} class="flex items-center justify-center">
							<!-- src="https://cdn.discordapp.com/avatars/306487572740177920/ce3920162ef416ae4e22764b1f737e8c.webp?size=160" -->
							<img
								src={$user?.src || '/images/profiles/default-avatar.webp'}
								alt="avatar-{$user?.username || 'default'}"
								class="h-6 w-6 cursor-pointer rounded-full outline outline-white"
							/>
						</button>
					</div>
					{#if showDropdown}
						<div class="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 dropdown-anim" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
							<div class="py-1" role="none">
								<button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</button>
								<button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</button>
								<button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</button>
								<button type="button" on:click={handleLogout} class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<a
					href="/login"
					class="rounded-md bg-neutral-200 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
				>
					Se connecter
				</a>
			{/if}
		</div>

		<Notification message={notificationMessage} />
	</div>
</header>

<style>
.dropdown-anim {
    animation: dropdown-fade-in 0.25s cubic-bezier(0.4,0,0.2,1);
    transform-origin: top;
}
@keyframes dropdown-fade-in {
    0% {
        opacity: 0;
        transform: translateY(-20px) scaleY(0.95);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scaleY(1);
    }
}
</style>