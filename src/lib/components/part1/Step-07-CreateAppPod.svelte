<script lang="ts">
  import { config } from "../../config";
  import { createAppPodCode } from "../../snippets";
  import { appPod, steps, podList, fdp } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  const createAppPod = async () => {
    try {
      $appPod = await $fdp.personalStorage.create(config.todoAppNamespace);
      console.log({ appPod: $appPod });
      $podList = await $fdp.personalStorage.list();
    } catch (err) {
      console.error(err);
    }
    $steps[4] = true;
  };
</script>

<section>
  <h2>4. Create app pod:</h2>
  This<code class="in">{config.todoAppNamespace}</code> pod will serve as the
  namespace for our Todo app.
  <Code source={createAppPodCode} />
  {#if $appPod}
    <p class="notice">
      The <strong>{$appPod.name}</strong> pod has been created!
    </p>
  {/if}
  <RunButton step="4" handler={createAppPod} actionText="Create an App Pod" />
</section>
