<script lang="ts">
  import { utils } from "ethers";
  import { listPodsCode } from "../../snippets";
  import { pods, podList, fdp, wallet, sharedPods, steps } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  const listPods = async () => {
    const balance = await $fdp.ens.provider.getBalance($wallet.address);
    console.log({ balance: utils.formatEther(balance) });
    $podList = await $fdp.personalStorage.list();
    $pods = $podList.getPods();
    $sharedPods = $podList.getSharedPods();
    console.log({ pods: $pods, sharedPods: $sharedPods });
    $steps[3] = true;
  };
</script>

<section>
  <h2>3. List existing pods:</h2>
  <Code source={listPodsCode} />
  {#if $pods}
    <dl class="notice">
      <dt><code>Pods</code>:</dt>
      <dd>
        <ol>
          {#each $podList.getPods() as pod}<li>
              <strong>{pod.name}</strong>
            </li>{:else}
            None
          {/each}
        </ol>
      </dd>
      <dt><code>Shared pods</code>:</dt>
      <dd>
        <ol>
          {#each $podList.getSharedPods() as pod}<li>
              <strong>{pod.name}</strong>
            </li>{:else}
            None
          {/each}
        </ol>
      </dd>
    </dl>
  {/if}
  <RunButton step="3" handler={listPods} actionText="List existing pods" />
</section>
