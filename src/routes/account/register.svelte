<script context="module" lang="ts">
  export const preload: Preload = async function (this, _page, { user }) {
    if (user) {
      this.redirect(302, `/account/`);
    }
  };
</script>

<script lang="ts">
  import { stores, goto } from "@sapper/app";
  import { niceFetch } from "@shared/niceFetch";
  const { session } = stores();
  let status: string;
  let email: string;
  let name: string;
  let errors = {};

  const extractErrors = (err) => {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  };

  async function handleRegister() {
    const res = await niceFetch(`/api/register.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (res.name === "ValidationError") {
      errors = extractErrors(res);
      return;
    }

    status = res.status;
    goto("account/email-sent");
  }
</script>

<svelte:head>
  <title>Register new account</title>
</svelte:head>

<h1>Register new account</h1>

<pre>Session {JSON.stringify($session)}</pre>
<p>Status {status}</p>

<form on:submit|preventDefault={handleRegister} method="post">
  <div>
    <label>Name:
      <input type="text" bind:value={name} />
      {#if errors.name}<small>{errors.name}</small>{/if}
    </label>
  </div>
  <div>
    <label>Email:
      <input type="email" bind:value={email} />
      {#if errors.email}<small>{errors.email}</small>{/if}
    </label>
  </div>
  <button type="submit">Create new account</button>
</form>
