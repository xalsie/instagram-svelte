<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Feed from '$lib/components/Feed.svelte';
	import { onMount } from 'svelte';

	let welcomeMessage = 'Welcome to Instagram Clone!';

	onMount(() => {
		console.log('Component mounted');
	});
</script>

<body class="bg-neutral-100 text-sm">
	<div id="root">
		<div class="min-h-screen space-y-5">
			<header class="sticky top-0 z-20 border border-gray-300 bg-white">
				<div class="mx-auto max-w-5xl">
					<nav class="flex h-14 items-center justify-between gap-5 px-5">
						<div class="w-24">
							<img src="/src/assets/images/instagram-logo.png" alt="Intagram Logo" />
						</div>
						<div class="hidden items-center gap-2 rounded-lg bg-neutral-200 px-4 py-1.5 md:flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
								class="h-5 w-5 text-gray-400"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path></svg
							><input type="text" placeholder="Search" class="bg-transparent focus:outline-none" />
						</div>
						<div class="flex items-center gap-5">
							<ul class="hidden items-center gap-5 sm:flex">
								<li>
									<a class="cursor-pointer"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
											class="h-7 w-7"
											><path
												d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
											></path></svg
										></a
									>
								</li>
								<li>
									<a class="cursor-pointer"
										><svg
											aria-label="Messenger"
											color="#262626"
											fill="#262626"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><path
												d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
												fill="none"
												stroke="currentColor"
												stroke-miterlimit="10"
												stroke-width="1.739"
											></path><path
												d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
												fill-rule="evenodd"
											></path></svg
										></a
									>
								</li>
								<li>
									<a class="cursor-pointer"
										><svg
											aria-label="New Post"
											color="#262626"
											fill="#262626"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><path
												d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></path><line
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												x1="6.545"
												x2="17.455"
												y1="12.001"
												y2="12.001"
											></line><line
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												x1="12.003"
												x2="12.003"
												y1="6.545"
												y2="17.455"
											></line></svg
										></a
									>
								</li>
								<li>
									<a class="cursor-pointer"
										><svg
											aria-label="Find People"
											color="#262626"
											fill="#262626"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon><polygon
												fill-rule="evenodd"
												points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
											></polygon><circle
												cx="12.001"
												cy="12.005"
												fill="none"
												r="10.5"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></circle></svg
										></a
									>
								</li>
								<li>
									<a class="cursor-pointer"
										><svg
											aria-label="Activity Feed"
											color="#262626"
											fill="#262626"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><path
												d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
											></path></svg
										></a
									>
								</li>
							</ul>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
								class="w-6 sm:hidden"
								><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"
								></path></svg
							>
							<div class="h-6 w-6 cursor-pointer overflow-hidden rounded-full">
								<img
									class="w-full"
									src="https://images.unsplash.com/photo-1653471293094-9c82e30199ce?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=500"
									alt=""
								/>
							</div>
						</div>
					</nav>
				</div>
			</header>
			<main>
				<div class="mx-auto mb-10 max-w-250 lg:flex">
					<div class="space-y-3 lg:mx-0 w-full lg:w-2/3">
						<section
							class="card scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 flex gap-4 overflow-x-scroll"
						>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8UzRNS0xBc0JCNzR8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8UzRNS0xBc0JCNzR8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										/>
									</div>
								</div>
								<span class="text-xs">jordanwh...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1653471394692-e5b350475d0b?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1653471394692-e5b350475d0b?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">karinatess</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1617968763460-48f12e7351d2?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1617968763460-48f12e7351d2?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">victoria...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1653276310012-9ac8581befc5?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1653276310012-9ac8581befc5?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">alichoubin</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1652877348203-b27dd1b4b12c?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1652877348203-b27dd1b4b12c?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">ruslanza...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1649878974575-017d4dd5b6f3?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="https://images.unsplash.com/photo-1649878974575-017d4dd5b6f3?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										/>
									</div>
								</div>
								<span class="text-xs">meganruth</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650338524059-f0ae486cfa66?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1650338524059-f0ae486cfa66?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">lauracho...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1651083419411-b6a68cfcc07a?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="https://images.unsplash.com/photo-1651083419411-b6a68cfcc07a?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										/>
									</div>
								</div>
								<span class="text-xs">filippro...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1651129986050-3172a56142e6?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOXxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1651129986050-3172a56142e6?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOXxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">sergeyvi...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1651493284447-8ef2730601d7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyNXxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="https://images.unsplash.com/photo-1651493284447-8ef2730601d7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyNXxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										/>
									</div>
								</div>
								<span class="text-xs">brockweg...</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650795754086-0d4c413e549a?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1OHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
											alt="https://images.unsplash.com/photo-1650795754086-0d4c413e549a?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1OHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										/>
									</div>
								</div>
								<span class="text-xs">omidarmin</span>
							</div>
							<div class="flex cursor-pointer flex-col items-center justify-between gap-2">
								<div
									class="h-16 w-16 overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-pink-500 p-1"
								>
									<div class="h-14 overflow-hidden rounded-full ring-2 ring-white">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650860918873-bd32a96f08f9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1MHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="https://images.unsplash.com/photo-1650860918873-bd32a96f08f9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1MHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										/>
									</div>
								</div>
								<span class="text-xs">lauracho...</span>
							</div>
						</section>
						<section class="space-y-3">
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1517999129746-0a298c444bbd?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1517999129746-0a298c444bbd?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Maia Habegger</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1611526694451-21db42be4985?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Maia Habegger"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">421 likes</span>
									<p>
										<span class="font-semibold">Maia Habegger </span>Lorem ipsum dolor sit amet,
										consectetur adipiscing elit. Phasellus non nulla convallis, consectetur
									</p>
									<h3 class="text-xs text-gray-500">May 15, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1565428858497-02236d6f662e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1565428858497-02236d6f662e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Gift Habeshaw</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1597515947454-35baa6fd02bf?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Gift Habeshaw"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">923 likes</span>
									<p>
										<span class="font-semibold">Gift Habeshaw </span>Nullam finibus euismod
										tincidunt. Proin nec vestibulum purus.
									</p>
									<h3 class="text-xs text-gray-500">January 2, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1495427732560-fe5248ad6638?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1495427732560-fe5248ad6638?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Nathan Dumlao</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1515592614568-6b5248d804a0?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Nathan Dumlao"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">122 likes</span>
									<p>
										<span class="font-semibold">Nathan Dumlao </span>Curabitur pharetra placerat
										tellus sed euismod.
									</p>
									<h3 class="text-xs text-gray-500">February 14, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1640103657219-7828a41550d4image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1640103657219-7828a41550d4image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Fotis Fotopoulos</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1652720827992-e61f56b66dd4?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDk5fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										alt="Fotis Fotopoulos"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">843 likes</span>
									<p>
										<span class="font-semibold">Fotis Fotopoulos </span>Etiam sit amet libero ut
										tellus ultricies porta. Etiam porttitor,
									</p>
									<h3 class="text-xs text-gray-500">April 8, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1634678315447-cc7d48d7524fimage?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1634678315447-cc7d48d7524fimage?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Andres Molina</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1652393958190-736e886a9abd?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Andres Molina"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">356 likes</span>
									<p>
										<span class="font-semibold">Andres Molina </span>erat, scelerisque ac efficitur
										quis, dignissim a ante. Pellentesque non sem massa.
									</p>
									<h3 class="text-xs text-gray-500">March 15, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1650991426483-32395ccca584?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1650991426483-32395ccca584?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Akindele Ibukun</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1652437054217-4737d149fb56?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										alt="Akindele Ibukun"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">976 likes</span>
									<p>
										<span class="font-semibold">Akindele Ibukun </span>Ut porttitor arcu id quam
										viverra sollicitudin. Donec accumsan sagittis dui.
									</p>
									<h3 class="text-xs text-gray-500">May 10, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1572467029170-d3bcf6ddb544image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1572467029170-d3bcf6ddb544image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">sobhan joodi</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1622651783098-cec84061b1dd?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0Nnx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										alt="sobhan joodi"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">456 likes</span>
									<p>
										<span class="font-semibold">sobhan joodi </span>Mauris auctor lacinia nisi,
										mattis rutrum risus varius eu. Curabitur eu volutpat mauris,
									</p>
									<h3 class="text-xs text-gray-500">April 28, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1644938304095-c7bc47210362image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1644938304095-c7bc47210362image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">mehrab zahedbeig</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1651420549140-8cecfdd0bc9c?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxOXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="mehrab zahedbeig"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">724 likes</span>
									<p><span class="font-semibold">mehrab zahedbeig </span>Etiam posuere eros mi</p>
									<h3 class="text-xs text-gray-500">January 17, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1651397998658-0ff9287daebbimage?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1651397998658-0ff9287daebbimage?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Anton Luk</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1651396671873-d549136d73d0?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Anton Luk"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">479 likes</span>
									<p>
										<span class="font-semibold">Anton Luk </span>dignissim a ante. Pellentesque non
										sem massa.
									</p>
									<h3 class="text-xs text-gray-500">May 1, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1601327292565-cc4c02215d36image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1601327292565-cc4c02215d36image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Mathilde Langevin</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1651241848876-df639c406c32?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Mathilde Langevin"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">108 likes</span>
									<p><span class="font-semibold">Mathilde Langevin </span>interdum interdum.</p>
									<h3 class="text-xs text-gray-500">May 23, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1639148488743-57a6a47708deimage?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1639148488743-57a6a47708deimage?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Bailey Burton</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1651192498604-68ac887962db?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2M3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Bailey Burton"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">356 likes</span>
									<p><span class="font-semibold">Bailey Burton </span>interdum interdum.</p>
									<h3 class="text-xs text-gray-500">January 19, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
							<div class="card relative space-y-4">
								<div class="flex items-center justify-between">
									<div class="-m-2 flex items-center gap-3">
										<div class="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
											<img
												class="w-full"
												src="https://images.unsplash.com/profile-1610470233577-32a3cb94e6b8image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
												alt="https://images.unsplash.com/profile-1610470233577-32a3cb94e6b8image?dpr=1&amp;auto=format&amp;fit=crop&amp;w=32&amp;h=32&amp;q=60&amp;crop=faces&amp;bg=fff"
											/>
										</div>
										<h2 class=" font-semibold">Brock Wegner</h2>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
										class="h-5 w-5 cursor-pointer"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
										></path></svg
									>
								</div>
								<div class="relative -mx-5 aspect-square overflow-hidden">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1650424362683-25cd36bcf967?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixlib=rb-1.2.1&amp;q=60&amp;raw_url=true&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzNXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500"
										alt="Brock Wegner"
									/>
								</div>
								<div class="space-y-2">
									<div class="mb-2 flex justify-between">
										<div class="flex items-center gap-4">
											<svg
												aria-label="Like"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
												></path></svg
											><svg
												aria-label="Comment"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><path
													d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></path></svg
											><svg
												aria-label="Share Post"
												class="cursor-pointer hover:opacity-50"
												color="#0F172A"
												fill="#0F172A"
												height="24"
												role="img"
												viewBox="0 0 24 24"
												width="24"
												><line
													fill="none"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
													x1="22"
													x2="9.218"
													y1="3"
													y2="10.083"
												></line><polygon
													fill="none"
													points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
													stroke="currentColor"
													stroke-linejoin="round"
													stroke-width="2"
												></polygon></svg
											>
										</div>
										<svg
											aria-label="Save"
											class="cursor-pointer hover:opacity-50"
											color="#0F172A"
											fill="#0F172A"
											height="24"
											role="img"
											viewBox="0 0 24 24"
											width="24"
											><polygon
												fill="none"
												points="20 21 12 13.44 4 21 4 3 20 3 20 21"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											></polygon></svg
										>
									</div>
									<span class=" font-semibold">113 likes</span>
									<p>
										<span class="font-semibold">Brock Wegner </span>Integer tempus placerat ipsum,
										eget tristique mi feugiat eu. Aliquam eu eleifend ipsum. Etiam sit amet libero
										ut tellus ultricies porta. Etiam porttitor, orci sit amet laoreet vulputate,
									</p>
									<h3 class="text-xs text-gray-500">March 20, 2022</h3>
								</div>
								<div class="relative left-0 right-0 -mx-5 h-px bg-gray-200"></div>
								<div class="flex gap-4">
									<svg
										aria-label="Emoji"
										class="cursor-pointer hover:opacity-50"
										color="#0F172A"
										fill="#0F172A"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
										><path
											d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
										></path></svg
									><input
										class="w-full focus:outline-none"
										type="text"
										placeholder="Add a comment"
									/><button class="text-blue-500">Post</button>
								</div>
							</div>
						</section>
					</div>
					<section class="ml-170 hidden w-88 space-y-4 px-4 pt-4 lg:fixed lg:block">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="h-16 w-16 cursor-pointer overflow-hidden rounded-full">
									<img
										class="w-full"
										src="https://images.unsplash.com/photo-1651088291797-e677321b7ad8?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2OXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
										alt="Random Guy"
									/>
								</div>
								<div>
									<h2 class="text-md font-semibold">danilnischenko</h2>
									<h3 class="opacity-50">Daniil Onischenko</h3>
								</div>
							</div>
							<button class="text-xs font-semibold text-blue-500 text-blue-500">Switch</button>
						</div>
						<div class="flex items-center justify-between">
							<h1 class="font-semibold opacity-50">Suggestions For You</h1>
							<button class="text-xs font-semibold text-black text-blue-500">See All</button>
						</div>
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-8 w-8 overflow-hidden rounded-full">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650689957192-3fbad48cfe7f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3NHx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="ivan_udoy"
										/>
									</div>
									<div class="text-xs">
										<h3 class="text-sm font-semibold">ivan_udoy</h3>
										<h4 class="opacity-50">Followed by iso_udoy + 20 more</h4>
									</div>
								</div>
								<button class="text-xs font-semibold text-blue-500 text-blue-500">Follow</button>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-8 w-8 overflow-hidden rounded-full">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650484543914-e4378649fdb9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4NHx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="roadahead"
										/>
									</div>
									<div class="text-xs">
										<h3 class="text-sm font-semibold">roadahead</h3>
										<h4 class="opacity-50">Followed by ntabucejo + 12 more</h4>
									</div>
								</div>
								<button class="text-xs font-semibold text-blue-500 text-blue-500">Follow</button>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-8 w-8 overflow-hidden rounded-full">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1615965763681-f37b8a36870c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwM3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="ntabucejo"
										/>
									</div>
									<div class="text-xs">
										<h3 class="text-sm font-semibold">ntabucejo</h3>
										<h4 class="opacity-50">Followed by cha_ixgara + 12 more</h4>
									</div>
								</div>
								<button class="text-xs font-semibold text-blue-500 text-blue-500">Follow</button>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-8 w-8 overflow-hidden rounded-full">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650493102555-561bd77793c3?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxNXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="maëvavigie"
										/>
									</div>
									<div class="text-xs">
										<h3 class="text-sm font-semibold">maëvavigie</h3>
										<h4 class="opacity-50">Followed by andrmolina + 5 more</h4>
									</div>
								</div>
								<button class="text-xs font-semibold text-blue-500 text-blue-500">Follow</button>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-8 w-8 overflow-hidden rounded-full">
										<img
											class="w-full"
											src="https://images.unsplash.com/photo-1650282101540-cc4f4077f0f5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMyM3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"
											alt="stephen_audu"
										/>
									</div>
									<div class="text-xs">
										<h3 class="text-sm font-semibold">stephen_audu</h3>
										<h4 class="opacity-50">Followed by ksama + 76 more</h4>
									</div>
								</div>
								<button class="text-xs font-semibold text-blue-500 text-blue-500">Follow</button>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	</div>
</body>
