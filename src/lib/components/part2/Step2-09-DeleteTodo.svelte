<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { config } from "../../config";
  import {
    API_HOST,
    fdp,
    lastTodoFile,
    steps,
    topupData,
    type Todo,
  } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  let code = "";
  let error: {
    address: string;
    message: string;
    mnemonic: string;
  };
  let result = writable(null);
  $: code = `let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

let data = {
    podName: "${config.todoAppNamespace}",
    filePath: "${config.todoItemsDirectory + "/" + $lastTodoFile}"
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v1/file/delete"

let response = await fetch(FAIROS_HOST + ENDPOINT, {
    credentials: "include",
    method: "DELETE",
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
  const deleteTodoItem = async (todo: Todo) => {
    let headers = {
      "Content-Type": "application/json",
    };

    let data = {
      podName: config.todoAppNamespace,
      filePath: config.todoItemsDirectory + "/todo_" + todo.id + ".json",
    };

    let response = await fetch($API_HOST + "/v1/file/delete", {
      credentials: "include",
      method: "DELETE",
      headers,
      body: JSON.stringify(data),
    });
    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      await listTodoItems();
    } else {
      error = json;
      console.error({ response, json });
    }
  };
  const listTodoItems = async () => {
    console.log($topupData);
    let headers = {
      Accept: "application/json",
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
      Promise.all(
        json.files.map(async (file) => {
          let data = {
            podName: config.todoAppNamespace,
            filePath: config.todoItemsDirectory + "/" + file.name,
          };
          let res = await fetch(
            $API_HOST + "/v1/file/download" + "?" + new URLSearchParams(data),
            {
              credentials: "include",
              method: "GET",
              headers,
            }
          );
          return res.json();
        })
      ).then((files) => {
        $steps[9] = true;
        $result = files;
        console.log({ result });
      });
    } else {
      error = json;
      $result = response;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2 id="s9">9. Delete Todo</h2>
  <code>DELETE v1/file/delete : Delete a file</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p>{error.message}</p>
    </div>
  {:else if $result}
    <div class="notice">
      <p><b>Todos</b>:</p>
      <table>
        <tr>
          <th>id</th>
          <th>createdAt</th>
          <th>text</th>
          <th>done</th>
          <th>action</th>
        </tr>
        {#each $result as todo}
          <tr>
            <td>{todo.id}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.text}</td>
            <td>{todo.done}</td>
            <td
              ><button
                on:click={() => {
                  deleteTodoItem(todo);
                }}>Delete</button
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>
  {/if}
  <RunButton step="9" handler={listTodoItems} actionText="List Todo Items" />
</section>
