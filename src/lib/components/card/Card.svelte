<div class="rounded-xl bg-white">
	<div class="w-full rounded-t-xl bg-neutral-200">
		<img
			src="https://loremflickr.com/640/480/technics"
			alt=""
			class="h-full min-h-[220px] w-full rounded-t-xl object-cover"
		/>
	</div>
	<div class="p-3">
		<div class="flex items-center justify-between text-2xl">
			<div class="flex items-center space-x-4">
				<div class="flex items-center">
					<div class="h-10 w-10 rounded-full bg-neutral-200">
						<img
							src="https://cdn.discordapp.com/avatars/306487572740177920/ce3920162ef416ae4e22764b1f737e8c.webp?size=160"
							alt="kristine_heaneyavatar"
							class="rounded-full"
						/>
					</div>
					<div class="ml-2.5">
						<p class="text-sm font-medium">LeGrizzly</p>
						<p style="font-size: 12px;">Los Santos</p>
					</div>
				</div>
			</div>

			<div class="flex items-center justify-between gap-3">
				<div class="flex items-center">
					<div class="cursor-pointer transition-all hover:scale-90 active:scale-75 con-like">
						<input class="like" type="checkbox" title="like" />
						<div class="checkmark">
							<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="cursor-pointer transition-all" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="32"
									d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
								></path>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24" height=".9em" width=".9em">
								<path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
								<polygon class="poly" points="10,10 20,20"></polygon>
								<polygon class="poly" points="10,50 20,50"></polygon>
								<polygon class="poly" points="20,80 30,70"></polygon>
								<polygon class="poly" points="90,10 80,20"></polygon>
								<polygon class="poly" points="90,50 80,50"></polygon>
								<polygon class="poly" points="80,80 70,70"></polygon>
							</svg>
						</div>
					</div>
					<p class="ml-1 text-xs font-semibold">20 000</p>
				</div>

				<div class="flex items-center">
					<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="cursor-pointer transition-all hover:opacity-50 active:scale-75" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="none"
							stroke-linecap="round"
							stroke-miterlimit="10"
							stroke-width="32"
							d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"
						></path>
					</svg>
					<p class="ml-1 text-xs font-semibold">10</p>
				</div>

				<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="cursor-pointer transition-all hover:opacity-50 active:scale-75" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6 12H18M12 6V18"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
	</div>
</div>

<style>
	.con-like {
		--red: rgb(50, 50, 50);
		position: relative;
		height: 1em;
		width: 1em;
	}

	.con-like .like {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 20;
		cursor: pointer;
	}

	.con-like .checkmark {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.con-like .outline,
	.con-like .filled {
		fill: var(--red);
		position: absolute;
	}

	.con-like .filled {
		--red: rgb(255, 50, 50);
		animation: kfr-filled 0.5s;
		display: none;
	}

	.con-like .celebrate {
		position: absolute;
		animation: kfr-celebrate 0.5s;
		animation-fill-mode: forwards;
		display: none;
	}

	.con-like .poly {
		stroke: rgb(255, 50, 50);
		fill: rgb(255, 50, 50);
	}

	.con-like .like:checked ~ .checkmark .filled {
		display: block
	}

	.con-like .like:checked ~ .checkmark .celebrate {
		display: block
	}

	@keyframes kfr-filled {
		0% {
			opacity: 0;
			transform: scale(0);
		}

		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	@keyframes kfr-celebrate {
		0% {
			transform: scale(0);
		}

		50% {
			opacity: 0.8;
		}

		100% {
			transform: scale(1.2);
			opacity: 0;
			display: none;
		}
	}
</style>