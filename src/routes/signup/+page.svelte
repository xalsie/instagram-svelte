<script>
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';

	const handleSubmit = () => {
		if (password !== confirmPassword) {
			errorMessage = "Passwords do not match.";
			return;
		}
		// Add logic to handle signup (e.g., API call)
	};

</script>

<main>
	<h1>Sign Up</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<div>
			<label for="username">Username</label>
			<input type="text" id="username" bind:value={username} required />
		</div>
		<div>
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} required />
		</div>
		<div>
			<label for="password">Password</label>
			<input type="password" id="password" bind:value={password} required />
		</div>
		<div>
			<label for="confirmPassword">Confirm Password</label>
			<input type="password" id="confirmPassword" bind:value={confirmPassword} required />
		</div>
		{#if errorMessage}
			<p class="error">{errorMessage}</p>
		{/if}
		<button type="submit">Sign Up</button>
	</form>
</main>

<style>
	main {
		max-width: 400px;
		margin: auto;
		padding: 1rem;
	}
	.error {
		color: red;
	}
</style>