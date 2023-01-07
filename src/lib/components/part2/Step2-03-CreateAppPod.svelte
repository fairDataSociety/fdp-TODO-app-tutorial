<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { config } from "../../config";
  import { API_HOST, fdp, steps, topupData } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  let code = "";
  let error: {
    address: string;
    message: string;
    mnemonic: string;
  };
  let result: any;
  $: code = `let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

let data = {
    podName: "${config.todoAppNamespace}"
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v1/pod/new"

let response = await fetch(FAIROS_HOST + ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
})

let json = await response.json();
if(response.ok){
    console.log({response, json});
}else{
    console.error({response, json});
}
`;
  onMount(() => {
    $fdp = new FdpStorage(config.beeUrl, config.postageBatchId);
  });
  const createAppPod = async () => {
    console.log($topupData);
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      podName: config.todoAppNamespace,
    };

    let response = await fetch($API_HOST + "/v1/pod/new", {
      credentials: "include",
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      result = json;
      $steps[3] = true;
    } else {
      error = json;
      result = response;
      $steps[3] = true;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2 id="s3">3. Create App Pod</h2>
  <code>POST v1/pod/new : Create pod</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p>{error.message}</p>
    </div>
  {:else if result}
    <div class="notice">
      <p><b>Success</b>: {result.message}</p>
    </div>
  {/if}
  <RunButton step="3" handler={createAppPod} actionText="Create App Pod" />
</section>
