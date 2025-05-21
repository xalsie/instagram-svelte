<script>
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import { fly, scale } from 'svelte/transition';
	import { spring } from 'svelte/motion';

	import { storiesPos, storiesScrollWidth } from '$lib/store';

	export let data;

	$: imgIndex = isNaN($page.params.img) ? imgIndex : parseInt($page.params.img) - 1;
	$: imgPath = `/img/${imgIndex}.jpg`;
	$: config;

	let lastTime;
	let width = typeof window !== 'undefined' ? document.documentElement.clientWidth : 0;

	let yDragStartPos = 0;
	let xDragStartPos = 0;

	const initialScale = 1;

	$: yDragPos = 0;
	$: xDragPos = 0;

	const scaleTween = spring(initialScale);
	let panTween = spring(0);

	function gotoNextStory() {
		if (imgIndex <= data.imgs.length - 1) {
			goto(`/images/${imgIndex + 2}`, {
				replaceState: true
			});
		} else {
			goto('/');
		}
	}

	function gotoPreviousStory() {
		if (imgIndex > 0) {
			goto(`/images/${imgIndex}`, {
				replaceState: true
			});
		} else {
			goto('/');
		}
	}

	const onStoryPointerUp = (pointerEvent) => {
		// If we clicked a link, do not do anything
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
			gotoPreviousProject();
		} else if ($panTween <= -100) {
			gotoNextProject();
		} else if ($scaleTween <= 0.8) {
			goto('/');
		}

		$scaleTween = initialScale;
		$panTween = 0;
	};

	const customFly = (node, options) => {
		panTween.set(0, { hard: true });
		return fly(node, options);
	};

	const customScale = (node, options) => {
		const imgIndex = parseInt($page.params.img);
		const thumbnailWidth = $storiesScrollWidth / (data.imgs.length + 1);
		const thumbnailCenterPos = thumbnailWidth * imgIndex - thumbnailWidth / 2;

		node.style.setProperty(
			'transform-origin',
			`${$storiesPos.x + thumbnailCenterPos}px ${$storiesPos.y + 30}px`
		);
		node.style.setProperty('z-index', 1);

		return scale(node, options);
	};

	$: configs = [
		{
			condition: (c) => c.toAncestor || c.toDescendant,
			transition: customScale
		},
		{
			condition: (c) => c.toHigherIndex,
			transition: customFly,
			inParams: { x: width, duration: 400, opacity: 1 },
			outParams: { x: -width, duration: 400, opacity: 1 }
		},
		{
			condition: (c) => c.toLowerIndex,
			transition: customFly,
			inParams: { x: -width, duration: 400, opacity: 1 },
			outParams: { x: width, duration: 400, opacity: 1 }
		}
	];

	$: config = configs.find(({ condition }) => {
		if (!$navigating) return false;

		const { from, to } = $navigating;

		if (!from || !to) return false;

		const fromIndex = parseInt(from.params.img);
		const toIndex = parseInt(to.params.img);

		if (!fromIndex || !toIndex) {
			return condition({
				toDescendant: to.url.pathname.split('/').length > from.url.pathname.split('/').length,
				toAncestor: to.url.pathname.split('/').length < from.url.pathname.split('/').length
			});
		}

		return condition({
			toHigherIndex: fromIndex < toIndex,
			toLowerIndex: fromIndex > toIndex
		});
	}) || {
		transition: () => {},
		inParams: {},
		outParams: {}
	};

	$: ({ transition, inParams, outParams } = config);
</script>

<svelte:window on:keyup={handleKeyUp} />

{#key imgIndex}
	<main
		in:transition={inParams}
		out:transition={outParams}
		on:mousedown={handleStoryMouseDown}
		on:mouseup={handleStoryMouseUp}
		on:touchstart|passive={handleStoryDragStart}
		on:touchmove|passive={handleStoryDrag}
		on:touchend={handleStoryDragEnd}
		style="transform: translateX({$panTween}px); opacity: {$scaleTween};"
	>
		<div class="inner" style="transform: scale({$scaleTween})">
			<a class="story-close-btn" aria-label="Close story" href="/">✕</a>
			<img src={imgPath} />
		</div>
	</main>
{/key}

<style>
	main {
		width: 100%;
		height: 100%;
	}

	.inner {
		width: 100%;
		height: 100%;
		transform-origin: bottom;
		background-color: var(--color-bg);
		align-items: flex-start;
	}

	.story-close-btn {
		position: absolute;
		right: var(--site-padding);
		display: none;
		text-decoration: none;
		color: white;
		font-size: 1.4rem;

		&:hover {
			color: var(--color-red);
		}

		@media (min-width: 768px) {
			display: block;
		}
	}

	img {
		width: 100%;
		height: 100%;
		max-height: 900px;
		object-fit: contain;
	}
</style>
