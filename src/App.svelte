<script lang="ts">
  import { onMount } from 'svelte';

//@ts-ignore
  import Router from 'svelte-spa-router'
  import Layout from './lib/components/Layout.svelte';
  import { url } from './lib/store';
  import Introduction from "./routes/tutorial/introduction.svelte";
  import Part_1 from './routes/tutorial/part-1.svelte';
  import Part_2 from './routes/tutorial/part-2.svelte';
  import Part_3 from './routes/tutorial/part-3.svelte';

  const routes = {
    "/" : Introduction,
    "/building-a-todo-dapp/introduction" : Introduction,
    "/building-a-todo-dapp/fdp-storage" : Part_1,
    "/building-a-todo-dapp/fairos" : Part_2,
    "/building-a-todo-dapp/resources": Part_3
  }
  onMount(() => {
    $url = window.location.href;
  });
  
</script>
<Layout>
<Router {routes}/>
</Layout>