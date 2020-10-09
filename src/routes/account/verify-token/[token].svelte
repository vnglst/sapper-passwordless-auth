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
    if (status === "logged in") goto("account/verify-token/success");
  });
</script>

<svelte:head>
  <title>Verify magic link token</title>
</svelte:head>

<h1>Verify magic link token</h1>

<p>{status}</p>

<p>
  Magic link expired? Try requesting a
  <a href="account/login">new magic link here</a>.
</p>
