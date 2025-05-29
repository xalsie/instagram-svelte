<script lang="ts">
	import { navigating } from "$app/stores";
	import { spring } from "svelte/motion";

	export let path: string;
	export let imgSrc: string;

	let isActive: boolean = $navigating && $navigating.from && $navigating.from.url.pathname === path;

	let tween = spring(0.2, {
		stiffness: 0.1,
		damping: 0.5,
		precision: 0.001
	});

	$: isActive && setTimeout(() => tween.set(0), 100);
</script>

<div class="cursor-pointer">
	<a data-sveltekit-prefetch href={path} on:click>
		<div
			class="flex h-16 w-16 items-center justify-self-center justify-center rounded-full bg-neutral-200 bg-gradient-to-t from-[#f09433] via-[#dc2743] to-[#bc1888]"
		>
			<img
				src={imgSrc}
				alt="Marcus Lesch avatar"
				class="h-14 w-14 rounded-full outline outline-white"
				style={isActive
					? `transform: translate3d(${$tween * 10}px, ${$tween * 10}px, 0px) scale(${
							$tween * 3 + 1
				}); transition: none;` : ''} 
			/>
		</div>
		<h3 class="text-sm font-bold text-gray-900 mt-1 flex items-center justify-center">
			<slot />
		</h3>
	</a>
</div>

<style>
</style>
