<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { config } from "../../config";
  import { API_HOST, fdp, lastTodoFile, steps } from "../../store";
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
    "Content-Type": "application/json",
};

let data = {
    podName: "${config.todoAppNamespace}",
    filePath: "${config.todoItemsDirectory + "/" + $lastTodoFile}"
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v1/file/download"

let response = await fetch(
    FAIROS_HOST + ENDPOINT + '?' + new URLSearchParams(data), {
    credentials: "include",
    method: "GET",
    headers
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
  const createTodoItem = async () => {
    // console.log($lastTodoFile)
    // return;
    // console.log($topupData);
    let headers = {
      "Content-Type": "application/json",
    };

    let data = {
      podName: config.todoAppNamespace,
      filePath: config.todoItemsDirectory + "/" + $lastTodoFile,
    };

    let response = await fetch(
      $API_HOST + "/v1/file/download" + "?" + new URLSearchParams(data),
      {
        credentials: "include",
        method: "GET",
        headers,
      }
    );
    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      result = json;
      $steps[8] = true;
    } else {
      error = json;
      result = response;
      $steps[8] = true;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2>8. Read Todo Item</h2>
  <code>POST v1/file/download : Download a file</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p>{error.message}</p>
    </div>
  {:else if result}
    <div class="notice">
      <p><b>Todo Item</b>:</p>
      <ol>
        {#each Object.entries(result) as [key, value]}
          <li><b>{key}</b>: {value}</li>
        {/each}
      </ol>
    </div>
  {/if}
  <RunButton step="8" handler={createTodoItem} actionText="Read Todo Item" />
</section>
