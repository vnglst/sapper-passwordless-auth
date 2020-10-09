<script lang="ts">
  import { stores } from "@sapper/app";
  const { session } = stores();
  export let segment: string;
</script>

<nav>
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href="."
      >home</a>
    </li>
    <li>
      <a
        aria-current={segment === 'about' ? 'page' : undefined}
        href="about"
      >about</a>
    </li>

    {#if $session.user}
      <li>
        <a
          aria-current={segment === 'account' ? 'page' : undefined}
          href="account"
        >account</a>
      </li>
    {:else}
      <li>
        <a
          aria-current={segment === 'account' ? 'page' : undefined}
          href="account/login"
        >login</a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 0.75em 0.5em;
    display: block;
  }
</style>
