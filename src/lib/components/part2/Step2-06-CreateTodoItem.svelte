<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { config } from "../../config";
  import { API_HOST, fdp, steps, todoText, topupData } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  let code = "";
  let error: {
    address: string;
    message: string;
    mnemonic: string;
  };
  let result: any;
  $: code = `const id = new Date().getTime();
const todoText = prompt("Enter a Todo", "Learn Fair Data Protocol!");
const blob = new Blob(
    [
        JSON.stringify({
            id,
            createdAt: id,
            text: todoText,
            done: false,
        }),
    ],
    { type: "text/plain;charset=utf-8" }
);

const formData = new FormData();
formData.append("files", blob, "todo_" + id + ".json");
formData.set("podName", config.todoAppNamespace);
formData.set("dirPath", config.todoItemsDirectory);
formData.set("blockSize", "1Mb");

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v1/file/upload"

let response = await fetch(FAIROS_HOST + ENDPOINT, {
    credentials: "include",
    method: "POST",
    body: formData,
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
    console.log($topupData);
    const id = new Date().getTime();
    $todoText = prompt("Enter a Todo", "Learn Fair Data Protocol!");
    let blob = new Blob(
      [
        JSON.stringify({
          id,
          createdAt: id,
          text: $todoText,
          done: false,
        }),
      ],
      { type: "text/plain;charset=utf-8" }
    );

    const formData = new FormData();

    formData.append("files", blob, `todo_${id}.json`);
    formData.set("podName", config.todoAppNamespace);
    formData.set("dirPath", config.todoItemsDirectory);
    formData.set("blockSize", "1Mb");

    let response = await fetch($API_HOST + "/v1/file/upload", {
      // credentials: "include",
      // headers,
      method: "POST",
      body: formData,
    });
    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      result = json;
      $steps[6] = true;
    } else {
      error = json;
      result = response;
      $steps[6] = true;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2 id="s6">6. Create a Todo Item (as a file)</h2>
  <code>POST v1/file/upload : Upload a file</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p>{error.message}</p>
    </div>
  {:else if result}
    <div class="notice">
      <p>
        <b>Success</b>: {result.Responses[0].fileName} - {result.Responses[0]
          .message}
      </p>
    </div>
  {/if}
  <RunButton step="6" handler={createTodoItem} actionText="Create Todo Item">
    <button on:click={createTodoItem}>Create Another Todo Item</button>
  </RunButton>
</section>
