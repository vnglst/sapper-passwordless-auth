<script lang="ts">
  import { __dev__ } from "@shared/constants";

  export let status: number;
  export let error: Error;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if __dev__ && error.stack}
  <pre>{error.stack}</pre>
{/if}
