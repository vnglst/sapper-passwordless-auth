<script context="module" lang="ts">
  export const preload: Preload = async function (this, _page, { user }) {
    if (!user) {
      this.redirect(302, `account/login`);
    }
  };
</script>

<script lang="ts">
  import { stores, goto } from "@sapper/app";
  import { niceFetch } from "../_clientHelpers/niceFetch";
  const { session } = stores();

  async function handleLogout() {
    await niceFetch(`/api/logout`);
    $session.user = null;
    goto("account/logout-successful");
  }
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<h1>Account details</h1>

<p>
  You are logged in as
  <b>{$session.user?.name}</b>
  with
  <i>{$session.user?.email}</i>.
</p>

<button on:click|preventDefault={handleLogout}>Log out</button>
