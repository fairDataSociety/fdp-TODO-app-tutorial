<script lang="ts">
  import { onMount } from "svelte";
  import {
    fdp,
    steps,
    todoItems,
    type Todo,
    isBeeRunning,
    isLocalSetup,
    batchId,
    next,
  } from "../../lib/store";
  import { config } from "../../lib/config";
  import type { ContentItem } from "@fairdatasociety/fdp-storage/dist/content-items/content-item";
  import urlExist from "url-exist";
  import Step_00_Setup from "../../lib/components/part1/Step-00-Setup.svelte";
  import Step_02_InitFDP from "../../lib/components/part1/Step-02-InitFDP.svelte";
  import Step_03_ListAccounts from "../../lib/components/part1/Step-03-ListAccounts.svelte";
  import Step_04_CreateWallet from "../../lib/components/part1/Step-04-Create-Wallet.svelte";
  import Step_07_ListPods from "../../lib/components/part1/Step-07-ListPods.svelte";
  import Step_06_CreateAppPod from "../../lib/components/part1/Step-06-CreateAppPod.svelte";
  import Step_08_CreateAppDir from "../../lib/components/part1/Step-08-CreateAppDir.svelte";
  import Step_09_CreateTododItem from "../../lib/components/part1/Step-09-CreateTododItem.svelte";
  import Step_10_ListTodos from "../../lib/components/part1/Step-10-ListTodos.svelte";
  import Step_11_DeleteTodo from "../../lib/components/part1/Step-11-DeleteTodo.svelte";
  import Step_12_ImportWallet from "../../lib/components/part1/Step-12-ImportWallet.svelte";
  import Step_13RegisterAccount from "../../lib/components/part1/Step-13-RegisterAccount.svelte";
  import { scrollPageToTop } from "../../lib/utils";

  const listTodoItems = async () => {
    const dir = await $fdp.directory.read(
      config.todoAppNamespace,
      config.todoItemsDirectory
    );
    let promises = dir.content.map(async (file: ContentItem) => {
      return await $fdp.file.downloadData(
        config.todoAppNamespace,
        `${config.todoItemsDirectory}/${file.name}`
      );
    });
    $todoItems = (
      await Promise.all(promises).then((items) => {
        console.log({ content: dir.content, dir, todoItems: $todoItems });
        $steps[7] = true;
        return items;
      })
    ).map((data) => data.json() as Todo);
  };

  onMount(async () => {
    $batchId = "";
    $isBeeRunning = await urlExist("http://localhost:1633/");
    $isLocalSetup = window.location.href
      .split("//")[1]
      .startsWith("localhost:");
      scrollPageToTop();
  });
</script>

<h1>Using FdpStorage & Blossom</h1>
<Step_00_Setup />
<Step_02_InitFDP />
{#if $next[1]}
  <Step_03_ListAccounts />
{/if}
{#if $next[1.1]}
  <Step_04_CreateWallet />
{/if}
<!-- {#if $next[2.1]}
  <Step_07_ListPods />
{/if} -->
{#if $next[2.1]}
  <Step_06_CreateAppPod />
  {#if $next[3]}
    <Step_07_ListPods />
  {/if}
  {#if $next[4]}
    <Step_08_CreateAppDir />
  {/if}
  {#if $next[5]}
    <Step_09_CreateTododItem {listTodoItems} />
  {/if}
  {#if $next[6]}
    <Step_10_ListTodos {listTodoItems} />
  {/if}
  {#if $next[7]}
    <Step_11_DeleteTodo {listTodoItems} />
  {/if}
  {#if $next[8]}
    <Step_12_ImportWallet />
  {/if}
  {#if $next[9]}
    <Step_13RegisterAccount />
  {/if}
  {#if $next[10]}
    <section>
      <h2>12. Next: Using FairOS</h2>
      <div class="notice">
        <p>
          In <strong>Part 1</strong>, we have now covered how to create and use
          local FDP Lite accounts to store and retrieve private data. We also
          covered how to import an existing local account using the recovery
          phrase (mnemonic) and making it portable by registering it on-chain.
        </p>
        <p>
          In the next part we will cover an alternative approach to build on FDP
          using FairOS endpoints.
        </p>
        <a href="#/building-a-todo-dapp/fairos" role="button"
          >Option 2: Using FairOS</a
        >
      </div>
    </section>
  {/if}
{/if}
