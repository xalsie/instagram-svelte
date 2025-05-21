<script>
	import { navigating } from "$app/stores";
	import { spring } from "svelte/motion";

	export let path;
	export let imgSrc;

	let isActive = $navigating && $navigating.from.url.pathname === path;

	let tween = spring(1, {
		stiffness: 0.03,
		damping: 0.15,
		precision: 0.001
	});

	$: isActive && setTimeout(() => tween.set(0), 100);
</script>

<a data-sveltekit-prefetch href={path} on:click>
	<span class="img">
		<img
			src={imgSrc} 
			width="70" 
			height="70" 
			style={isActive
				? `transform: translate3d(${$tween * -140}px, ${$tween * 120}px, 0px) scale(${
						$tween * 3 + 1
				}); transition: none;`
				: ''} 
		/>
	</span>
	<h3>
		<slot />
	</h3>
</a>

<style>
	a {
	  display: flex;
	  text-decoration: none;
	  color: white;
	  flex-direction: column;
	  align-items: center;
	  -webkit-tap-highlight-color: transparent;
	}

	.img {
	  border: 2px solid var(--color-red);
	  padding: 2px;
	  box-sizing: content-box;
	  background-color: black;
	  margin: auto;
	  border-radius: 100%;
	  overflow: hidden;
	  flex-shrink: 0;
	  width: 58px;
	  height: 58px;
	}
	.img:hover img {
	  transform: scale(1.07);
	}
	@media (min-width: 768px) {
	  .img {
	    width: 65px;
	    height: 65px;
	  }
	}

	img {
	  border-radius: 100%;
	  width: 100%;
	  height: 100%;
	  transition: transform 250ms;
	}

	a:visited .img {
	  border-color: #333333;
	  background-color: black;
	}

	h3 {
	  text-transform: uppercase;
	  text-align: center;
	  font-weight: var(--font-weight-body);
	  font-family: var(--font-body);
	  white-space: nowrap;
	  margin-bottom: 0;
	  font-size: 0.5rem;
	}
	@media (min-width: 768px) {
	  h3 {
	    font-size: 0.625rem;
	  }
	}
</style>
