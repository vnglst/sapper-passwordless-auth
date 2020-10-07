<script lang="ts">
  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<svelte:head>
  <title>Succesfully logged in</title>
</svelte:head>

<h1>Succesfully logged in</h1>

<pre>Session {JSON.stringify($session)}</pre>

<p>
  You have succesfully logged in. You can now close this window or
  <a href="/">continue to our website</a>
</p>
