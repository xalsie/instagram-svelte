<script>
	import { goto } from "$app/navigation";
	import { page, navigating } from "$app/stores";
	import { spring } from "svelte/motion";

	export let data;

	$: imgIndex = isNaN($page.params.img)
		? imgIndex
		: parseInt($page.params.img) - 1;
	$: imgPath = `/img/${imgIndex}.jpg`;

	let lastTime;

	let yDragStartPos = 0;
	let xDragStartPos = 0;

	const initialScale = 1;

	$: yDragPos = 0;
	$: xDragPos = 0;

	const scaleTween = spring(initialScale);
	let panTween = spring(0);

	function gotoNextStory() {
		if (imgIndex < data.imgs.length - 1) {
			goto(`/images/${imgIndex + 2}`, {
				replaceState: true
			}).then(() => {
				setTimeout(() => {
					stopAutoPlay();
					if (autoPlay) startAutoPlay();
				}, 0);
			});
		} else {
			goto("/");
		}
	}

	function gotoPreviousStory() {
		if (imgIndex > 0) {
			goto(`/images/${imgIndex}`, {
				replaceState: true
			}).then(() => {
				setTimeout(() => {
					stopAutoPlay();
					if (autoPlay) startAutoPlay();
				}, 0);
			});
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

	export let autoPlay = false;
	export let autoPlayDelay = 4000;

	let autoPlayTimeout;
	let progress = 0;
	let progressInterval;

	function startAutoPlay() {
		if (autoPlay) {
			progress = 0;
			clearTimeout(autoPlayTimeout);
			clearInterval(progressInterval);
			const step = 100 / (autoPlayDelay / 10);

			progressInterval = setInterval(() => {
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

		<div class="flex items-center justify-center gap-2 mt-4 mb-6 z-20">
			{#each data.imgs as img, i}
			<button type="button" class="hidden md:block" on:click={() => goto(`/images/${i+1}`)}>
				<img
					src={`/img/${i}.jpg`}
					alt=""
					class="w-14 h-14 object-cover rounded-full border-2 border-white shadow-md cursor-pointer transition-all duration-200 hover:scale-105 {i === imgIndex ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60'}"
					style="filter: {i === imgIndex ? 'none' : 'blur(2px)'};"
				/>
			</button>
			{/each}
		</div>

		<div class="relative flex items-center justify-center w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
			<div class="absolute top-5 left-1/2 z-20" style="transform: translateX(-50%); width: calc(100% - 4rem); max-width: 800px;">
				<div class="h-2 bg-black/20 w-full rounded-2xl">
					<div class="h-full bg-white rounded-2xl transition-all duration-100 ease-out" style="width: {progress}%;"></div>
				</div>
			</div>
			{#if imgIndex > 0}
				<img
					src={`/img/${imgIndex-1}.jpg`}
					alt=""
					class="absolute -left-100 top-1/2 -translate-y-1/2 w-1/2 h-5/6 object-contain opacity-60 blur-sm scale-65 transition-all duration-500 z-0"
				/>
			{/if}
			<img
				src={imgPath}
				alt=""
				class="relative z-10 mx-auto w-auto h-full max-h-[80vh] object-contain rounded-xl shadow-2xl transition-transform duration-500 scale-100"
				style="transform: scale({$scaleTween}); max-width: 900px;"
			/>
			{#if imgIndex < data.imgs.length - 1}
				<img
					src={`/img/${imgIndex+1}.jpg`}
					alt=""
					class="absolute -right-100 top-1/2 -translate-y-1/2 w-1/2 h-5/6 object-contain opacity-60 blur-sm scale-65 transition-all duration-500 z-0"
				/>
			{/if}
		</div>
	</div>
{/key}

<style>
</style>
