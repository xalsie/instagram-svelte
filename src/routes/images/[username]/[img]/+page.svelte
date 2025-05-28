<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { spring } from 'svelte/motion';

	import { users } from '../../../mockData.js';

	export let data;

	let user = data.user;
	let imgIndex = data.imgIndex;
	let images = user.images;
	let username = user.username;
	let profileSrc = user.profileSrc;

	// Trouver l'utilisateur précédent et suivant
	let prevUser, nextUser;
	$: {
		const idx = users.findIndex((u) => u.username === username);
		prevUser = idx > 0 ? users[idx - 1] : null;
		nextUser = idx < users.length - 1 ? users[idx + 1] : null;
	}

	let imageElement;
	let imageWidth = 0;

	$: imgIndex = parseInt($page.params.img) - 1;
	$: imgPath = images[imgIndex]?.src;

	let lastTime;
	let yDragStartPos = 0;
	let xDragStartPos = 0;
	const initialScale = 1;
	$: yDragPos = 0;
	$: xDragPos = 0;
	const scaleTween = spring(initialScale);
	let panTween = spring(0);

	function gotoNextStory() {
		if (imgIndex < images.length - 1) {
			goto(`/images/${username}/${imgIndex + 2}`, { replaceState: true });
		} else {
			const idx = users.findIndex((u) => u.username === username);
			if (idx !== -1 && idx < users.length - 1) {
				goto(`/images/${users[idx + 1].username}/1`, { replaceState: true });
			} else {
				goto('/');
			}
		}
	}

	function gotoPreviousStory() {
		if (imgIndex > 0) {
			goto(`/images/${username}/${imgIndex}`, { replaceState: true });
		} else {
			gotoPreviousUser();
		}
	}

	function gotoPreviousUser() {
		const idx = users.findIndex((u) => u.username === username);
		if (idx > 0) {
			const prevUser = users[idx - 1];
			goto(`/images/${prevUser.username}/${prevUser.images.length}`, { replaceState: true });
		} else {
			goto('/');
		}
	}

	const onStoryPointerUp = (pointerEvent) => {
		if (pointerEvent.target.tagName === 'A') return;
		const isClick = window.performance.now() - lastTime < 300;
		if (isClick) {
			if (pointerEvent.pageX > document.documentElement.clientWidth / 2) {
				gotoNextStory();
			} else {
				gotoPreviousStory();
			}
		}
	};

	const handleStoryMouseUp = (e) => {
		onStoryPointerUp(e);
	};

	const handleStoryMouseDown = () => {
		lastTime = window.performance.now();
	};

	const handleKeyUp = (e) => {
		if (e.key === 'ArrowRight') {
			gotoNextStory();
		} else if (e.key === 'ArrowLeft') {
			gotoPreviousStory();
		} else if (e.key === 'Escape') {
			goto('/');
		}
	};

	const handleStoryDragStart = (e) => {
		yDragStartPos = e.changedTouches[0].pageY;
		xDragStartPos = e.changedTouches[0].pageX;
		lastTime = window.performance.now();
	};

	const handleStoryDrag = (e) => {
		yDragPos = e.changedTouches[0].pageY - yDragStartPos;
		xDragPos = e.changedTouches[0].pageX - xDragStartPos;
		if (yDragPos > 10 && $panTween === 0) {
			scaleTween.set(Math.min(initialScale, 1 - yDragPos / 600), { hard: true });
		}
		if (Math.abs(xDragPos) > 10 && $scaleTween === initialScale) {
			panTween.set(xDragPos, { hard: true });
		}
	};

	const handleStoryDragEnd = (e) => {
		e.preventDefault();
		if ($scaleTween === initialScale && !$panTween) {
			onStoryPointerUp(e.changedTouches[0]);
		}
		if ($panTween >= 100) {
			gotoPreviousStory();
		} else if ($panTween <= -100) {
			gotoNextStory();
		} else if ($scaleTween <= 0.8) {
			goto('/');
		}
		$scaleTween = initialScale;
		$panTween = 0;
	};

	export let autoPlay = false;
	export let autoPlayDelay = 4000;

	let autoPlayTimeout;
	let progress = 0;
	let progressInterval;

	function startAutoPlay() {
		if (autoPlay) {
			progress = 0;
			let lastImageSize = 0;
			clearTimeout(autoPlayTimeout);
			clearInterval(progressInterval);
			const step = 100 / (autoPlayDelay / 10);
			progressInterval = setInterval(() => {
				if (imageElement && imageElement.clientWidth !== lastImageSize) {
					imageWidth = imageElement.clientWidth - 25 * 2;
					lastImageSize = imageElement.clientWidth;
					console.log(imageWidth);
				}
				progress += step;
				if (progress >= 100) progress = 100;
			}, 10);
			autoPlayTimeout = setTimeout(() => {
				stopAutoPlay();
				gotoNextStory();
			}, autoPlayDelay + 150);
		}
	}

	function stopAutoPlay() {
		clearTimeout(autoPlayTimeout);
		clearInterval(progressInterval);
		progress = 0;
	}

	$: if (autoPlay) {
		startAutoPlay();
	}

	$: {
		imgIndex = parseInt($page.params.img) - 1;
		const newUser = users.find((u) => u.username === $page.params.username);
		if (newUser) {
			user = newUser;
			images = user.images;
			username = user.username;
			profileSrc = user.profileSrc;
			imgPath = images[imgIndex]?.src;
		} else {
			user = {
				username: '',
				displayname: '',
				profileSrc: '',
				images: []
			};
			images = [];
			imgPath = '';
		}
		progress = 0;
		stopAutoPlay();
		if (autoPlay) startAutoPlay();
	}

	import { onDestroy } from 'svelte';
	onDestroy(() => stopAutoPlay());
</script>

<svelte:window on:keyup={handleKeyUp} />

{#key imgIndex}
	<div
		class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white"
		on:mousedown={handleStoryMouseDown}
		on:mouseup={handleStoryMouseUp}
		on:touchstart|passive={handleStoryDragStart}
		on:touchmove|passive={handleStoryDrag}
		on:touchend={handleStoryDragEnd}
		aria-label="Image story"
		aria-hidden="true"
		style="transform: translateX({$panTween}px); opacity: {$scaleTween};"
	>
		<div class="absolute right-4 top-4 z-20">
			<a class="p-4 font-bold text-gray-900" aria-label="Close story" href="/"> ✕ </a>
		</div>

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
						src={u.profileSrc}
						alt={u.displayname}
						class="h-12 w-12 rounded-full border-2 object-cover shadow-md transition-all duration-200
							{u.username === username
							? 'scale-110 border-blue-500 ring-2 ring-blue-400'
							: 'border-gray-200 opacity-60 hover:opacity-100'}"
					/>
					<span
						class="mt-1 text-xs {u.username === username
							? 'font-bold text-blue-700'
							: 'text-gray-600'}"
					>
						{u.displayname}
					</span>
				</button>
			{/each}
		</div>

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
			{#if prevUser && prevUser.images.length > 0}
				<img
					src={prevUser.images[prevUser.images.length - 1].src}
					alt={prevUser.images[prevUser.images.length - 1].alt}
					class="-left-100 scale-40 absolute top-1/2 z-0 h-5/6 w-1/2 -translate-y-1/2 object-contain opacity-60 blur-sm transition-all duration-500"
				/>
			{/if}
			<!-- Images précédentes en arrière-plan à gauche avec effet blur -->
			{#if images && images.length > 0}
				{#each images.slice(Math.max(0, imgIndex - 3), imgIndex).reverse() as img, i}
					<img
						src={img.src}
						alt={img.alt}
						class="absolute left-0 top-1/2 z-0 h-full max-h-[80vh] w-auto translate-x-1/2 -translate-y-1/2 rounded-xl object-contain opacity-40 shadow-2xl blur-md scale-65 transition-all duration-500"
						style="max-width: 900px; z-index: {5 - i};"
					/>
				{/each}
			{/if}
			<!-- Images suivantes en arrière-plan à droite avec effet blur -->
			{#if images && images.length > 0}
				{#each images.slice(imgIndex + 1, imgIndex + 4) as img, i}
					<img
						src={img.src}
						alt={img.alt}
						class="absolute right-0 top-1/2 z-0 h-full max-h-[80vh] w-auto -translate-x-1/2 -translate-y-1/2 rounded-xl object-contain opacity-40 shadow-2xl blur-md scale-65 transition-all duration-500"
						style="max-width: 900px; z-index: {5 - i};"
					/>
				{/each}
			{/if}
			<img
				src={imgPath}
				alt={images[imgIndex].alt}
				bind:this={imageElement}
				class="mask-t-from-90% mask-t-to-110% relative z-10 mx-auto h-full max-h-[80vh] w-auto scale-100 rounded-xl object-contain shadow-2xl transition-transform duration-500"
				style="transform: scale({$scaleTween}); max-width: 900px;"
			/>
			{#if nextUser && nextUser.images.length > 0}
				<img
					src={nextUser.images[0].src}
					alt={nextUser.images[0].alt}
					class="-right-100 scale-40 absolute top-1/2 z-0 h-5/6 w-1/2 -translate-y-1/2 object-contain opacity-60 blur-sm transition-all duration-500"
				/>
			{/if}
		</div>
	</div>
{/key}

<style>
</style>
