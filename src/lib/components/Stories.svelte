<script>
	export let scrollElRef = null;
</script>

<div class="stories">
	<div class="scroll-container hide-scrollbar h-full" bind:this={scrollElRef}>
		<div class="scroll-inner">
			<ul class="list">
				<slot />
			</ul>
		</div>
	</div>
</div>

<style>
	.stories {
	  position: relative;
	  z-index: 0;
	  max-width: 100%;
	}

	.stories:before {
	  display: block;
	  content: "";
	  position: absolute;
	  z-index: 1;
	  pointer-events: none;
	  top: 0;
	  left: -1px; /* Safari glitch */
	  right: -1px;
	  height: 100%;
	  background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0)),
	    linear-gradient(-90deg, #000000 0%, rgba(0, 0, 0, 0));
	  background-repeat: no-repeat;
	  background-position: left, right;
	  background-size: 7% 100%, 10% 100%;
	}

	.scroll-container {
	  display: inline-flex;
	  justify-content: center;
	  overflow: auto hidden;
	  --grid-gap: 1rem;
	}
	@media (min-width: 768px) {
	  .scroll-container {
	    --grid-gap: 2.5rem;
	  }
	}

	.scroll-inner {
	  padding: 0 1rem;
	  max-width: 100%;
	}
	@media (min-width: 768px) {
	  .scroll-inner {
	    padding: 0 4rem;
	  }
	}

	.list {
	  display: grid;
	  grid-gap: var(--grid-gap);
	  padding: 0;
	  margin: 0;
	  list-style: none;
	  grid-auto-flow: column;
	  grid-auto-columns: min-content;
	  max-width: 100%;
	}
	@media (min-width: 768px) {
	  .list {
	    margin-left: -5px;
	  }
	}

	.list:after {
	  content: "";
	  width: 1px;
	}
	@media (min-width: 768px) {
	  .list:after {
	    width: 60px;
	  }
	}
</style>
