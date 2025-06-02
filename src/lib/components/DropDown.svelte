<script lang="ts">
    import { onMount } from 'svelte';

    export let items: any[] = [];

    let showDropdown = false;

    function handleAvatarClick() {
        showDropdown = !showDropdown;
    }

    function handleClickOutside(event: MouseEvent) {
		const target = event.target;
		if (!(target instanceof Element) || !target.closest('.avatar-dropdown')) {
			showDropdown = false;
		}
	}

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<div class="relative avatar-dropdown">
    <button type="button" aria-label="icon-plus" on:click={handleAvatarClick} class="flex items-center justify-center">
        <slot name="icon"></slot>
    </button>
    {#if showDropdown}
        <!-- actions -->
        <div class="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 dropdown-anim" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <!-- <button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-md" role="menuitem" tabindex="-1" id="menu-item-0">
                    <span class="">Signaler</span>
                </button>
                <button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-md" role="menuitem" tabindex="-1" id="menu-item-1">
                    <span class="">Supprimer (Admin)</span>
                </button> -->
                {#each items as item}
                    <button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-md" role="menuitem" tabindex="-1" id="menu-item-0">
                        <slot name="item" item={item} />
                    </button>
                    <!-- <slot name="action" item={item} >
                        <button type="button" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-md" role="menuitem" tabindex="-1">
                            {item.label}
                        </button>
                    </slot> -->
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .dropdown-anim {
		animation: dropdown-fade-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: top;
	}

	@keyframes dropdown-fade-in {
		0% {
			opacity: 0;
			transform: translateY(-20px) scaleY(0.95);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scaleY(1);
		}
	}
</style>