<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { spring } from "svelte/motion";

    import { users } from '../../../mockData.js';

	export let data;

	let user = data.user;
	let imgIndex = data.imgIndex;
	let images = user.images;
	let username = user.username;
	let profileSrc = user.profileSrc;

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
			const idx = users.findIndex(u => u.username === username);
			if (idx !== -1 && idx < users.length - 1) {
				goto(`/images/${users[idx + 1].username}/1`, { replaceState: true });
			} else {
				goto("/");
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
		const idx = users.findIndex(u => u.username === username);
		if (idx > 0) {
			const prevUser = users[idx - 1];
			goto(`/images/${prevUser.username}/${prevUser.images.length}`, { replaceState: true });
		} else {
			goto("/");
		}
	}

	const onStoryPointerUp = pointerEvent => {
		if (pointerEvent.target.tagName === "A") return;
		const isClick = window.performance.now() - lastTime < 300;
		if (isClick) {
			if (pointerEvent.pageX > document.documentElement.clientWidth / 2) {
				gotoNextStory();
			} else {
				gotoPreviousStory();
			}
		}
	};

	const handleStoryMouseUp = e => {
		onStoryPointerUp(e);
	};

	const handleStoryMouseDown = () => {
		lastTime = window.performance.now();
	};

	const handleKeyUp = e => {
		if (e.key === "ArrowRight") {
			gotoNextStory();
		} else if (e.key === "ArrowLeft") {
			gotoPreviousStory();
		} else if (e.key === "Escape") {
			goto("/");
		}
	};

	const handleStoryDragStart = e => {
		yDragStartPos = e.changedTouches[0].pageY;
		xDragStartPos = e.changedTouches[0].pageX;
		lastTime = window.performance.now();
	};

	const handleStoryDrag = e => {
		yDragPos = e.changedTouches[0].pageY - yDragStartPos;
		xDragPos = e.changedTouches[0].pageX - xDragStartPos;
		if (yDragPos > 10 && $panTween === 0) {
			scaleTween.set(Math.min(initialScale, 1 - yDragPos / 600), { hard: true });
		}
		if (Math.abs(xDragPos) > 10 && $scaleTween === initialScale) {
			panTween.set(xDragPos, { hard: true });
		}
	};

	const handleStoryDragEnd = e => {
		e.preventDefault();
		if ($scaleTween === initialScale && !$panTween) {
			onStoryPointerUp(e.changedTouches[0]);
		}
		if ($panTween >= 100) {
			gotoPreviousStory();
		} else if ($panTween <= -100) {
			gotoNextStory();
		} else if ($scaleTween <= 0.8) {
			goto("/");
		}
		$scaleTween = initialScale;
		$panTween = 0;
	};

	export let autoPlay = true;
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
					imageWidth = imageElement.clientWidth - (25 * 2);
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
		const newUser = users.find(u => u.username === $page.params.username);
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
            }
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
		class="relative flex flex-col items-center justify-center min-h-screen w-full bg-white overflow-hidden"
		on:mousedown={handleStoryMouseDown}
		on:mouseup={handleStoryMouseUp}
		on:touchstart|passive={handleStoryDragStart}
		on:touchmove|passive={handleStoryDrag}
		on:touchend={handleStoryDragEnd}
		aria-label="Image story"
        aria-hidden="true"
		style="transform: translateX({$panTween}px); opacity: {$scaleTween};"
	>
		<div class="absolute top-4 right-4 z-20">
			<a class="text-gray-900 font-bold p-4" aria-label="Close story" href="/">
				✕
			</a>
		</div>

		<div class="flex items-center justify-center gap-3 mt-4 mb-2 z-30">
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
						class="w-12 h-12 object-cover rounded-full border-2 shadow-md transition-all duration-200
							{u.username === username ? 'border-blue-500 ring-2 ring-blue-400 scale-110' : 'border-gray-200 opacity-60 hover:opacity-100'}"
					/>
					<span class="text-xs mt-1 {u.username === username ? 'font-bold text-blue-700' : 'text-gray-600'}">
						{u.displayname}
					</span>
				</button>
			{/each}
		</div>

		<div class="relative flex items-center justify-center w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
            {#if imageWidth !== 0}            
                <div class="absolute top-5 left-1/2 z-20 flex items-center" style="transform: translateX(-50%); max-width: 900px; width: auto;">
                    {#each images as img, i}
                        <div
                            class="h-2 bg-black/20 rounded-2xl ml-1 first:ml-0 flex-1 overflow-hidden"
                            style="min-width: 40px; width: {imageWidth / images.length}px;"
                        >
                            <div
                                class="h-full rounded-2xl transition-all duration-100 ease-out bg-white"
                                style="width: {(i === imgIndex ? progress : (i < imgIndex ? 100 : 0)) + '%'}"
                            ></div>
                        </div>
                    {/each}
                </div>
            {/if}
			{#if imgIndex > 0}
				<img
					src={images[imgIndex-1].src}
					alt={images[imgIndex-1].alt}
					class="absolute -left-100 top-1/2 -translate-y-1/2 w-1/2 h-5/6 object-contain opacity-60 blur-sm scale-65 transition-all duration-500 z-0"
				/>
			{/if}
			<img
				src={imgPath}
				alt={images[imgIndex].alt}
				bind:this={imageElement}
				class="mask-t-from-90% mask-t-to-110% relative z-10 mx-auto w-auto h-full max-h-[80vh] object-contain rounded-xl shadow-2xl transition-transform duration-500 scale-100"
				style="transform: scale({$scaleTween}); max-width: 900px;"
			/>
			{#if imgIndex < images.length - 1}
				<img
					src={images[imgIndex+1].src}
					alt={images[imgIndex+1].alt}
					class="absolute -right-100 top-1/2 -translate-y-1/2 w-1/2 h-5/6 object-contain opacity-60 blur-sm scale-65 transition-all duration-500 z-0"
				/>
			{/if}
		</div>
	</div>
{/key}

<style>
</style>
