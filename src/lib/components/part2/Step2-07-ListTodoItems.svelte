<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { config } from "../../config";
  import {
    API_HOST,
    fdp,
    lastTodoFile,
    steps,
    todoText,
    topupData,
  } from "../../store";
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
    dirPath: "${config.todoItemsDirectory}"
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v1/dir/ls"

let response = await fetch(
    FAIROS_HOST + ENDPOINT + "?" + new URLSearchParams(data), {
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
  const listTodoItems = async () => {
    console.log($topupData);
    let headers = {
      "Content-Type": "application/json",
    };

    let data = {
      podName: config.todoAppNamespace,
      dirPath: config.todoItemsDirectory,
    };

    let response = await fetch(
      $API_HOST + "/v1/dir/ls" + "?" + new URLSearchParams(data),
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
      $lastTodoFile = result.files[result.files.length - 1].name;
      $steps[7] = true;
    } else {
      error = json;
      result = response;
      $steps[7] = true;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2 id="s7">7. List Todo Files</h2>
  <code>GET v1/dir/ls : List directory</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p>{error.message}</p>
    </div>
  {:else if result}
    <div class="notice">
      <p><b>File List:</b>:</p>
      <ol>
        {#each result.files as file}
          <li>{file.name}</li>
        {/each}
      </ol>
    </div>
  {/if}
  <RunButton step="7" handler={listTodoItems} actionText="List Todo Items" />
</section>
