<script lang="ts">
	import { onMount } from 'svelte';
	import { user, isAuthenticated, token } from '$lib/store';
	import DropDown from '$lib/components/DropDown.svelte';
	import Notification from '$lib/components/Notification.svelte';

	let notificationMessage = '';

	function handleLogout() {
		user.set({
			_id: '',
			username: '',
			email: '',
			followers: [],
			following: [],
			src: '',
			role: ''
		});
		isAuthenticated.set(false);
		token.set('');
		window.location.href = '/login';
	}

	// function goToProfile() {
	// 	window.location.href = '/profile';
	// }

	// function goToNotification() {
	// 	window.location.href = '/notification';
	// }

	const items = [
		{
			label: 'Account settings',
			action: () => {
				console.log('Action 1');
			}
		},
		{
			label: 'Support',
			action: () => {
				console.log('Action 2');
			}
		},
		{
			label: 'License',
			action: () => {
				console.log('Action 3');
			}
		},
		{
			label: 'Sign out',
			action: handleLogout
		}
	];

	onMount(() => {
		console.log('Navbar mounted', $isAuthenticated, $user?.username);

		setTimeout(() => {
			notificationMessage = 'Nouveau Poste';
			console.log('Notification: ', notificationMessage);
		}, 5000);
	});
</script>

<header class="sticky top-0 z-20 bg-white">
	<div class="relative container mx-auto flex items-center justify-between p-4 xl:max-w-3/4">
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
			>
				<path
					fill="none"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
				>
				</path>
				<path
					fill="none"
					stroke-linecap="round"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M338.29 338.29L448 448"
				>
				</path>
			</svg>
			<input type="text" class="bg-transparent outline-none" placeholder="Search" />
		</div>
		<div class="flex items-center space-x-5 text-2xl">
			<a href="/" class="flex items-center" aria-label="Home">
				<svg
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 512 512"
					class="cursor-pointer"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
						d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
					>
					</path>
					<path
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
						d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
					>
					</path>
				</svg>
			</a>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill="none"
					stroke-linecap="round"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"
				>
				</path>
			</svg>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="cursor-pointer"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill="none"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
				>
				</path>
				<path
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M256 176v160m80-80H176"
				></path>
			</svg>
			{#if $isAuthenticated}
				<DropDown {items}>
					<div slot="icon">
						<div class="flex h-7 w-7 items-center justify-center rounded-full">
							<button type="button" class="flex items-center justify-center">
								<img
									src={$user?.src || '/images/profiles/default-avatar.webp'}
									alt="avatar-{$user?.username || 'default'}"
									class="h-6 w-6 cursor-pointer rounded-full outline outline-white"
								/>
							</button>
						</div>
					</div>

					<div slot="item" let:item aria-hidden="true" on:click={() => item.action()}>
						{item.label}
					</div>
				</DropDown>
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
