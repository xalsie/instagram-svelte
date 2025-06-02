<script lang="ts">
	import { user, token, isAuthenticated } from '$lib/store';
	let username: string = '';
	let password: string = '';
	let errorMessage: string = '';

	const handleLogin = async (): Promise<void> => {
		errorMessage = '';
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		const data = await res.json();
		if (!res.ok) {
			errorMessage = data.error || 'Login failed. Please check your credentials.';
		} else {
			token.set(data.token);
			isAuthenticated.set(true);
			if (data.user) {
				user.set(data.user);
			}
			window.location.href = '/';
		}
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div class="w-full max-w-sm rounded bg-white p-8 shadow-md">
		<h2 class="mb-4 text-2xl font-bold">Login</h2>
		{#if errorMessage}
			<p class="error">{errorMessage}</p>
		{/if}

		<input
			type="text"
			bind:value={username}
			class="mb-2 w-full rounded border p-2"
			placeholder="Nom d'utilisateur"
			required
		/>
		<input
			type="password"
			bind:value={password}
			class="mb-2 w-full rounded border p-2"
			placeholder="Password"
			required
		/>

		<button
			type="button"
			on:click={handleLogin}
			class="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600">Se connecter</button
		>

		<div class="mt-2 text-sm">
			Vous n'avez pas de compte ? <a href="/register" class="text-blue-600 underline">S'inscrire</a>
		</div>
	</div>
</div>
