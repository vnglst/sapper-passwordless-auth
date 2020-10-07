<script context="module" lang="ts">
  export const preload: Preload = async function (this, _page, { user }) {
    if (!user) {
      this.redirect(302, `account/login`);
    }
  };
</script>

<script lang="ts">
  import { stores } from "@sapper/app";
  import { niceFetch } from "@shared/niceFetch";
  const { session } = stores();

  async function handleLogout() {
    await niceFetch(`/api/logout.json`);
    $session.user = null;
  }
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<h1>You are logged in</h1>

<pre>{JSON.stringify($session)}</pre>

<button on:click|preventDefault={handleLogout}>Log out</button>
