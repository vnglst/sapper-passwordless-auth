<script lang="ts">
  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<svelte:head>
  <title>Succesfully logged in</title>
</svelte:head>

<h1>Succesfully logged in</h1>

<p>
  You are logged in as
  <b>{$session.user.name}</b>
  with
  <i>{$session.user.email}</i>. You can now close this window or
  <a href="/">continue to our website</a>.
</p>
