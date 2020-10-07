<script context="module" lang="ts">
  export async function preload(_page, { user }) {
    // if (user) {
    //   this.redirect(302, `account`);
    // }
  }
</script>

<script lang="ts">
  import { niceFetch } from "@shared/niceFetch";
  import { stores, goto } from "@sapper/app";
  import { onMount } from "svelte";

  const { session, page } = stores();
  const { token } = $page.params;

  let status: string;

  onMount(async () => {
    const res = await niceFetch(`/api/login/${token}.json`);
    status = res.status;
    $session.user = res.user;
    goto("account/verify-token/success");
  });
</script>

<svelte:head>
  <title>Verify magic link token</title>
</svelte:head>

<h1>Verify magic link token</h1>

<pre>{JSON.stringify($session)}</pre>

<p>{status}</p>
