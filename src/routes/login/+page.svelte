<script>
	let email = '';
	let password = '';
	let errorMessage = '';

	const handleLogin = async () => {
		try {
			// Add your login logic here, e.g., API call to authenticate user
			// If successful, redirect to the home page or user profile
		} catch (error) {
			errorMessage = 'Login failed. Please check your credentials.';
		}
	};
</script>

<style>
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.input {
		margin: 10px 0;
		padding: 10px;
		width: 300px;
	}

	.button {
		padding: 10px;
		width: 320px;
		background-color: #0095f6;
		color: white;
		border: none;
		cursor: pointer;
	}

	.error {
		color: red;
	}
</style>

<div class="login-container">
	<h1>Login</h1>
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
	<input type="email" bind:value={email} class="input" placeholder="Email" />
	<input type="password" bind:value={password} class="input" placeholder="Password" />
	<button on:click={handleLogin} class="button">Log In</button>
</div>