<script context="module" lang="ts">
  export const preload: Preload = async function (this, _page, { user }) {
    if (user) {
      this.redirect(302, `/account/`);
    }
  };
</script>

<script lang="ts">
  import { goto } from "@sapper/app";
  import { niceFetch } from "../_clientHelpers/niceFetch";
  import { extractErrors } from "./_response.model";
  import type { ExtractErrors } from "./_response.model";
  import { isEmpty } from "../../sharedHelpers/isEmpty";

  let status: string;
  let email: string;
  let errors: ReturnType<ExtractErrors> = {};

  async function handleLogin() {
    const res = await niceFetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    errors = extractErrors(res);
    if (!isEmpty(errors)) return;

    status = res.status;
    goto("account/email-sent");
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>

<form on:submit|preventDefault={handleLogin} method="post">
  <label>Email:
    <input type="email" bind:value={email} />
    {#if errors.email}<small>{errors.email}</small>{/if}
  </label>
  {#if status}
    <p>{status}</p>
  {/if}
  <button type="submit">Send magic link</button>
  <p>No account yet? <a href="account/register">Register here</a>.</p>
</form>
