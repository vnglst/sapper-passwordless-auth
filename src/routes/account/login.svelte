<script context="module" lang="ts">
  export async function preload(_page, { user }) {
    if (user) {
      this.redirect(302, `/account/`);
    }
  }
</script>

<script lang="ts">
  import { stores, goto } from "@sapper/app";
  import { niceFetch } from "@shared/niceFetch";
  const { session } = stores();
  let status: string;
  let email: string;

  async function handleLogin() {
    const res = await niceFetch(`/api/login.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });
    status = res.status;
    goto("account/email-sent");
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>

<pre>Session {JSON.stringify($session)}</pre>
<p>Status {status}</p>

<form on:submit|preventDefault={handleLogin} method="post">
  <label>Email: <input type="email" bind:value={email} /> </label>
  <button type="submit">Send magic link</button>
</form>
