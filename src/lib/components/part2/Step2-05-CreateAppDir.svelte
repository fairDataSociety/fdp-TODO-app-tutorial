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
    podName: "${config.todoAppNamespace}",
    dirPath: "${config.todoItemsDirectory}"
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v1/dir/mkdir"

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
  const createAppDir = async () => {
    console.log($topupData);
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      podName: config.todoAppNamespace,
      dirPath: config.todoItemsDirectory,
    };

    let response = await fetch($API_HOST + "/v1/dir/mkdir", {
      credentials: "include",
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      result = json;
      $steps[5] = true;
    } else {
      error = json;
      result = response;
      $steps[5] = true;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2>5. Create App Directory</h2>
  <code>POST v1/dir/mkdir : Create directory</code>
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
  <RunButton
    step="5"
    handler={createAppDir}
    actionText="Create App Directory"
  />
</section>
