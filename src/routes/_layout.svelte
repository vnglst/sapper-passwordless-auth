<script lang="ts">
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 56em;
    /* padding: 1em; */
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
