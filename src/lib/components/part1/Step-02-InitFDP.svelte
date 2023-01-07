<script>
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { config } from "../../config";
  import {
    batchId,
    steps,
    fdp,
    tutorialMode,
    TutorialMode,
  } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  const init = () => {
    $fdp = new FdpStorage(config.beeUrl, $batchId);
    console.log({ fdp: $fdp });
    $steps[1] = true;
  };
  let initCode = "";
  $: initCode = `import { FdpStorage } from '@fairdatasociety/fdp-storage'
let batchId: any = "${
    $batchId ||
    "0000000000000000000000000000000000000000000000000000000000000000"
  }";
const fdp = new FdpStorage('http://localhost:1633',batchId);
console.log({fdp});
`;
</script>

{#if $tutorialMode != TutorialMode.UNDEFINED}
  <section>
    <h2 id="f1">1. Create an FdpStorage Instance</h2>
    <dl>
      <dt>
        Install <a
          href="https://github.com/fairDataSociety/fdp-storage/"
          target="_blank"
          rel="noreferrer">fdp-storage</a
        >
      </dt>
      <dd><pre>npm install @fairdatasociety/fdp-storage</pre></dd>
      <dt>Get a valid <code>batchId</code>:</dt>
      <dd>
        To generate a batchId, open a terminal with <code>curl</code> installed
        and run:
        <pre>curl -s -XPOST http://localhost:1635/stamps/10000000/18</pre>
        This should return a new <code>batchId</code> that looks like this:
        <p>
          <img alt="" src="images/newbatchid.png" />
        </p>
        {#if $tutorialMode == TutorialMode.FDP_INTERACTIVE}
          <label for="batchid">Copy the <code>batchId</code> and enter it here:</label>
          <input
            id="batchid"
            name="batchid"
            style="width:100%;"
            type="text"
            bind:value={$batchId}
            placeholder="Enter a valid batchId here"
          />
          {#if !($batchId != "" && $batchId.length == 64)}
            <mark>❌ <code>batchId</code> Missing or Invalid!</mark>
          {/if}
        {/if}
      </dd>
      <!-- <dt>Topup the <code>batchId</code></dt>
      <dd><pre>curl -s -XPATCH http://localhost:1635/stamps/topup/{$batchId}/1</pre></dd> -->
      <dt>
        Import FdpStorage in your project file and create a new instance.
      </dt>
      <dd>
        <Code source={initCode} />
        <RunButton
          disabled={$batchId == "" || $steps[1]}
          step="1"
          handler={init}
          actionText="Create an FdpStorage instance"
        />
      </dd>
    </dl>
  </section>
{/if}
