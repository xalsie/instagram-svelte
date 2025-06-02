<script lang="ts">
	import { goto } from "$app/navigation";
	import { navigating } from "$app/stores";
	import { spring } from "svelte/motion";
	import { storyViews } from '$lib/store.js';

	import type { IUser } from '$lib/server/models/User';

	export let user: IUser;

	let isActive: boolean | null = !!($navigating && $navigating.from);

	let tween = spring(0.2, {
		stiffness: 0.1,
		damping: 0.5,
		precision: 0.001
	});

	$: isActive && setTimeout(() => tween.set(0), 100);

	function isStoryViewed() {
		if (!user._id) return false;
		const images = (user as any).images as { url: string }[] | undefined;
		if (!images || !images.length) return false;
		const views = $storyViews as Record<string, { timestamp: number; imagesSeen: number[] }>;
		const userId = typeof user._id === 'string' ? user._id : user._id?.toString?.() ?? '';
		const entry = views[userId];
		if (!entry) return false;
		const now = Date.now();
		if (now - entry.timestamp > 24 * 60 * 60 * 1000) return false;

		return images.every((_img, idx) => Array.isArray(entry.imagesSeen) && entry.imagesSeen.includes(idx));
	}

	if (typeof window !== 'undefined') {
		storyViews.update((views: Record<string, { timestamp: number; imagesSeen: number[] }>) => {
			const now = Date.now();
			const filtered: Record<string, { timestamp: number; imagesSeen: number[] }> = {};
			for (const [k, v] of Object.entries(views)) {
				if (typeof v === 'object' && v && typeof v.timestamp === 'number' && now - v.timestamp < 24 * 60 * 60 * 1000) filtered[k] = v;
			}
			return filtered;
		});
	}

	function openStory() {
		const views = $storyViews as Record<string, { timestamp: number; imagesSeen: number[] }>;
		const userId = typeof user._id === 'string' ? user._id : user._id?.toString?.() ?? '';
		const entry = views[userId];
		const images = (user as any).images as { url: string }[] | undefined;
		if (!images || !images.length) return;
		let imgIdx = 0;
		if (entry && Array.isArray(entry.imagesSeen)) {
			imgIdx = images.findIndex((_img, idx) => !entry.imagesSeen.includes(idx));
			if (imgIdx === -1) {
				imgIdx = 0;
			}
		}
		goto(`/images/${user.username}/${imgIdx+1}`);
	}
</script>

<div>
	<button type="button" data-sveltekit-prefetch class="cursor-pointer" on:click={() => openStory()}>
		<div
			class="flex h-16 w-16 items-center justify-self-center justify-center rounded-full bg-neutral-200 {isStoryViewed() ? '' : 'bg-gradient-to-t from-[#f09433] via-[#dc2743] to-[#bc1888]'}"
		>
			<img
				src={user.src}
				alt="Marcus Lesch avatar"
				class="h-14 w-14 rounded-full outline outline-white"
				style={isActive
					? `transform: translate3d(${$tween * 10}px, ${$tween * 10}px, 0px) scale(${
						$tween * 3 + 1
					}); transition: none;`
					: ''}
			/>
		</div>
		<h3 class="text-sm font-bold text-gray-900 mt-1 flex items-center justify-center">
			<slot />
		</h3>
	</button>
</div>
