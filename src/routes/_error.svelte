<script lang="ts">
  export let status: number;
  export let error: Error;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if process.env.NODE_ENV === 'development' && error.stack}
  <pre>{error.stack}</pre>
{/if}
