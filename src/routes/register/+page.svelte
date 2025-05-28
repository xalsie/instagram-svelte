<script>
	let username = '';
	let email = '';
	let password = '';
	let error = '';
	let success = '';
	async function handleRegister() {
		error = '';
		success = '';
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password })
		});
		const data = await res.json();
		if (!res.ok) {
			error = data.error || 'Erreur lors de l’inscription';
		} else {
			success = 'Compte créé ! Vous pouvez vous connecter.';
			setTimeout(() => (window.location.href = '/login'), 1200);
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<form
		class="w-full max-w-sm rounded bg-white p-8 shadow-md"
		on:submit|preventDefault={handleRegister}
	>
		<h2 class="mb-4 text-2xl font-bold">Créer un compte</h2>
		<span>xl@ht.com</span>
		{#if error}
			<div class="mb-2 text-red-600">{error}</div>
		{/if}
		{#if success}
			<div class="mb-2 text-green-600">{success}</div>
		{/if}
		<input
			class="mb-2 w-full rounded border p-2"
			placeholder="Nom d'utilisateur"
			bind:value={username}
			required
		/>
		<input
			class="mb-2 w-full rounded border p-2"
			type="email"
			placeholder="Email"
			bind:value={email}
			required
		/>
		<input
			class="mb-4 w-full rounded border p-2"
			type="password"
			placeholder="Mot de passe"
			bind:value={password}
			required
		/>
		<button class="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600" type="submit"
			>S'inscrire</button
		>
		<div class="mt-2 text-sm">
			Déjà un compte ? <a href="/login" class="text-blue-600 underline">Se connecter</a>
		</div>
	</form>
</div>
