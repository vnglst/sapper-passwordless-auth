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
  import { isEmpty } from "../../sharedHelpers/isEmpty";
  import { extractErrors } from "./_response.model";
  import type { ExtractErrors } from "./_response.model";

  let status: string;
  let email: string;
  let name: string;
  let errors: ReturnType<ExtractErrors> = {};

  async function handleRegister() {
    const res = await niceFetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    errors = extractErrors(res);
    if (!isEmpty(errors)) return;

    status = res.status;
    goto("account/email-sent");
  }
</script>

<svelte:head>
  <title>Create account</title>
</svelte:head>

<h1>Create account</h1>

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
  {#if status}
    <p>{status}</p>
  {/if}
  <button type="submit">Create new account</button>
  <p>Already have an account? <a href="account/login">Login here</a>.</p>
</form>
