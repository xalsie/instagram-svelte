<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { spring } from 'svelte/motion';

	import { storyViews } from '$lib/store.js';

	// export let data: any;

	let user: any;
	let users: any[];
	let imgIndex: number;
	let images: any[];
	let username: string;
	let src: string;
	let prevUser: any = null, nextUser: any = null;

	$: user = $page.data.user;
	$: users = ($page.data.users || [$page.data.user]).filter((u: any) => u && u.username);
	$: imgIndex = $page.data.imgIndex;
	$: images = user?.images ?? [];
	$: username = user?.username ?? '';
	$: src = user?.src ?? '';
	$: {
		const idx = users.findIndex((u: any) => u.username === username);
		prevUser = idx > 0 ? users[idx - 1] : null;
		nextUser = idx < users.length - 1 ? users[idx + 1] : null;
	}
	$: imgPath = images?.[imgIndex]?.url ?? '';

	let imageElement: HTMLImageElement | null = null;
	let imageWidth = 0;

	let lastTime = 0;
	let yDragStartPos = 0,
		xDragStartPos = 0;
	const initialScale = 1;
	let yDragPos = 0,
		xDragPos = 0;
	const scaleTween = spring(initialScale);
	let panTween = spring(0);

	function gotoNextStory() {
		if (typeof imgIndex === 'number' && imgIndex < images.length - 1) {
			goto(`/images/${username}/${imgIndex + 2}`, { replaceState: true });
		} else {
			const idx = users.findIndex((u: any) => u.username === username);
			if (idx !== -1 && idx < users.length - 1) {
				const next = users[idx + 1];
				if (!next || !next.username) {
					goto('/');
					return;
				}
				const views = $storyViews;
				const entry = views[next._id];
				const now = Date.now();
				let allSeen = false;
				let firstNotSeenIdx = 0;
				if (entry && (now - entry.timestamp < 24 * 60 * 60 * 1000)) {
					const seen = Array.isArray(entry.imagesSeen) ? entry.imagesSeen : [];
					if (next.images?.length) {
						allSeen = seen.length >= next.images.length;
						if (!allSeen) {
							for (let i = 0; i < next.images.length; i++) {
								if (!seen.includes(i)) {
									firstNotSeenIdx = i;
									break;
								}
							}
						}
					}
				}
				if (allSeen) {
					goto('/');
				} else {
					goto(`/images/${next.username}/${firstNotSeenIdx + 1}`, { replaceState: true });
				}
			} else {
				goto('/');
			}
		}
	}

	function gotoPreviousStory() {
		if (typeof imgIndex === 'number' && imgIndex > 0) {
			goto(`/images/${username}/${imgIndex}`, { replaceState: true });
		} else {
			gotoPreviousUser();
		}
	}

	function gotoPreviousUser() {
		const idx = users.findIndex((u: any) => u.username === username);
		if (idx > 0) {
			const prevUser = users[idx - 1];
			goto(`/images/${prevUser.username}/${prevUser.images.length}`, { replaceState: true });
		} else {
			goto('/');
		}
	}

	function handlePointerUp(e: any) {
		if (e.target.tagName === 'A') return;
		const isClick = window.performance.now() - lastTime < 300;
		if (isClick) {
			if (e.pageX > document.documentElement.clientWidth / 2) {
				gotoNextStory();
			} else {
				gotoPreviousStory();
			}
		}
	}

	function handleMouseUp(e: any) {
		handlePointerUp(e);
	}

	function handleMouseDown() {
		lastTime = window.performance.now();
	}

	function handleKeyUp(e: any) {
		if (e.key === 'ArrowRight') gotoNextStory();
		else if (e.key === 'ArrowLeft') gotoPreviousStory();
		else if (e.key === 'Escape') goto('/');
	}

	function handleDragStart(e: any) {
		yDragStartPos = e.changedTouches[0].pageY;
		xDragStartPos = e.changedTouches[0].pageX;
		lastTime = window.performance.now();
	}

	function handleDrag(e: any) {
		yDragPos = e.changedTouches[0].pageY - yDragStartPos;
		xDragPos = e.changedTouches[0].pageX - xDragStartPos;
		if (yDragPos > 10 && $panTween === 0)
			scaleTween.set(Math.min(initialScale, 1 - yDragPos / 600), { hard: true });
		if (Math.abs(xDragPos) > 10 && $scaleTween === initialScale)
			panTween.set(xDragPos, { hard: true });
	}

	function handleDragEnd(e: any) {
		e.preventDefault();
		if ($scaleTween === initialScale && !$panTween) handlePointerUp(e.changedTouches[0]);
		if ($panTween >= 100) gotoPreviousStory();
		else if ($panTween <= -100) gotoNextStory();
		else if ($scaleTween <= 0.8) goto('/');
		$scaleTween = initialScale;
		$panTween = 0;
	}

	let autoPlay: boolean = true;

	let autoPlayTimeout: ReturnType<typeof setTimeout>;
	let progressInterval: ReturnType<typeof setInterval>;
	let progress = 0;

	function startAutoPlay() {
		stopAutoPlay();
		if (autoPlay) {
			progress = 0;
			let lastImageSize = 0;
			let autoPlayDelay: number =  images?.[imgIndex]?.delay || 4000;
			const step = 100 / (autoPlayDelay / 10);
			progressInterval = setInterval(() => {
				if (imageElement && imageElement.clientWidth !== lastImageSize) {
					imageWidth = imageElement.clientWidth - 50;
					lastImageSize = imageElement.clientWidth;
				}
				progress += step;
				if (progress >= 100) progress = 100;
			}, 10);
			autoPlayTimeout = setTimeout(() => {
				stopAutoPlay();
				markStoryViewed();
				gotoNextStory();
			}, autoPlayDelay + 150);
		}
	}

	function markStoryViewed() {
		if (!user || !user._id || !user.images?.length) return;
		const now = Date.now();
		storyViews.update((views: Record<string, { timestamp: number; imagesSeen: number[] }>) => {
			const prev = views[user._id] || { imagesSeen: [] };
			const seen = new Set(prev.imagesSeen || []);
			seen.add(imgIndex);
			return {
				...views,
				[user._id]: { timestamp: now, imagesSeen: Array.from(seen) }
			};
		});
	}

	function stopAutoPlay() {
		clearTimeout(autoPlayTimeout);
		clearInterval(progressInterval);
		progress = 0;
	}

	onMount(() => {
		if (autoPlay) startAutoPlay();
		console.log("datas", $page.data)
		return () => stopAutoPlay();
	});

	$: {
		const newUser = users.find((u: any) => u && u.username === $page.params.username);
		if (newUser) {
			user = newUser;
			images = user.images;
			username = user.username;
			src = user.src;
			imgPath = images?.[imgIndex]?.url ?? '';
		} else {
			user = { displayname: '', src: '', images: [] };
			images = [];
			imgPath = '';
		}
		progress = 0;
		stopAutoPlay();
		if (autoPlay) startAutoPlay();
	}

	onDestroy(() => stopAutoPlay());
</script>

<svelte:window on:keyup={handleKeyUp} />

{#key imgIndex}
	<div
		class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white"
		on:mousedown={handleMouseDown}
		on:mouseup={handleMouseUp}
		on:touchstart|passive={handleDragStart}
		on:touchmove|passive={handleDrag}
		on:touchend={handleDragEnd}
		aria-label="Image story"
		aria-hidden="true"
		style="transform: translateX({$panTween}px); opacity: {$scaleTween};"
	>
		<div class="absolute right-4 top-4 z-20">
			<a class="p-4 font-bold text-gray-900" aria-label="Close story" href="/">✕</a>
		</div>

		<!-- Liste utilisateurs -->
		<div class="z-30 mb-6 mt-4 flex items-center justify-center gap-3">
			{#each users as u}
				<button
					type="button"
					on:click={() => goto(`/images/${u.username}/1`)}
					title={u.displayname}
					class="flex flex-col items-center focus:outline-none"
					aria-current={u.username === username ? 'true' : undefined}
				>
					<img
						src={u.src}
						alt={u.displayname}
						class="h-12 w-12 rounded-full border-2 object-cover shadow-md transition-all duration-200 {u.username ===
						username
							? 'scale-110 border-blue-500 ring-2 ring-blue-400'
							: 'border-gray-200 opacity-60 hover:opacity-100'}"
					/>
					<span
						class="mt-1 text-xs {u.username === username
							? 'font-bold text-blue-700'
							: 'text-gray-600'}">{u.displayname}</span
					>
				</button>
			{/each}
		</div>

		<!-- Progress bars -->
		<div class="relative flex h-[60vh] w-full items-center justify-center md:h-[70vh] lg:h-[80vh]">
			{#if imageWidth !== 0}
				<div
					class="absolute left-1/2 top-5 z-20 flex items-center"
					style="transform: translateX(-50%); max-width: 900px; width: auto;"
				>
					{#each images as img, i}
						<div
							class="ml-1 h-2 flex-1 overflow-hidden rounded-2xl bg-black/20 first:ml-0"
							style="min-width: 40px; width: {imageWidth / images.length}px;"
						>
							<div
								class="h-full rounded-2xl bg-white transition-all duration-100 ease-out"
								style="width: {(i === imgIndex ? progress : i < imgIndex ? 100 : 0) + '%'}"
							></div>
						</div>
					{/each}
				</div>
			{/if}
			<!-- Images précédentes et suivantes (blur) -->
			{#if prevUser && prevUser.images.length > 0} <!-- Previous User -->
				<img
					src={prevUser.images[prevUser.images.length - 1].url}
					alt={prevUser.images[prevUser.images.length - 1].alt}
					class="hidden md:block -left-25 md:-left-100 scale-40 absolute top-1/2 z-0 h-5/6 w-1/2 -translate-y-1/2 object-contain opacity-60 blur-md transition-all duration-500"
				/>
			{/if}
			{#if images && images.length > 0} <!-- Previous User Images -->
				{#each images.slice(Math.max(0, imgIndex - 3), imgIndex).reverse() as img, i}
					<img
						src={img.url}
						alt={img.alt}
						class="scale-65 absolute left-0 top-1/2 z-0 h-full max-h-[80vh] w-auto -translate-y-1/2 -translate-x-1/2 md:translate-x-1/2 rounded-xl object-contain opacity-40 shadow-2xl blur-md transition-all duration-500"
						style="max-width: 900px; z-index: {5 - i};"
					/>
				{/each}
			{/if}
			{#if images && images.length > 0} <!-- Next User Images -->
				{#each images.slice(imgIndex + 1, imgIndex + 4) as img, i}
					<img
						src={img.url}
						alt={img.alt}
						class="scale-65 absolute right-0 top-1/2 z-0 h-full max-h-[80vh] w-auto translate-x-10 md:-translate-x-1/2 -translate-y-1/2 rounded-xl object-contain opacity-400 shadow-2xl blur-md transition-all duration-500"
						style="max-width: 900px; z-index: {5 - i};"
					/>
				{/each}
			{/if}

			{#key imgPath} <!-- Image Center -->
				<img
					src={imgPath}
					alt={images?.[imgIndex]?.alt || ''}
					bind:this={imageElement}
					class="mask-t-from-90% mask-t-to-110% relative z-10 mx-auto h-full max-h-[80vh] w-auto scale-100 rounded-xl object-contain shadow-2xl transition-transform duration-500"
					style="transform: scale({$scaleTween}); max-width: 900px;"
				/>
			{/key}
			{#if nextUser && nextUser.images.length > 0}
				<img
					src={nextUser.images[0].url}
					alt={nextUser.images[0].alt}
					class="hidden md:block -right-25 md:-right-100 scale-40 absolute top-1/2 z-0 h-5/6 w-1/2 -translate-y-1/2 object-contain opacity-60 blur-sm transition-all duration-500"
				/>
			{/if}
		</div>
	</div>
{/key}

<style>
</style>
