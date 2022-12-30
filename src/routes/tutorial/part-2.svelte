<script>
  import { onMount } from "svelte";
  import Step2_01_RegisterAccount from "../../lib/components/part2/Step2-01-RegisterAccount.svelte";
  import Step2_02_LoginUser from "../../lib/components/part2/Step2-02-LoginUser.svelte";
  import Step2_03_CreateAppPod from "../../lib/components/part2/Step2-03-CreateAppPod.svelte";
  import Step2_04_OpenPod from "../../lib/components/part2/Step2-04-OpenPod.svelte";
  import Step2_05_CreateAppDir from "../../lib/components/part2/Step2-05-CreateAppDir.svelte";
  import Step2_06_CreateTodoItem from "../../lib/components/part2/Step2-06-CreateTodoItem.svelte";
  import Step2_07_ListTodoItems from "../../lib/components/part2/Step2-07-ListTodoItems.svelte";
  import Step2_08_ReadTodoItem from "../../lib/components/part2/Step2-08-ReadTodoItem.svelte";
  import Step2_09_DeleteTodo from "../../lib/components/part2/Step2-09-DeleteTodo.svelte";
  import { api } from "../../lib/fairos";
  import {
    API_HOST,
    next,
    steps,
    TutorialMode,
    tutorialMode,
    wallet,
  } from "../../lib/store";
  import { apiHost, scrollToBottom } from "../../lib/utils";
  const startInteractiveTutorial = () => {
    $tutorialMode = TutorialMode.FDP_INTERACTIVE;
    $steps = {};
    $next = {};
    scrollToBottom();
  };
  const showFullTutorial = () => {
    $tutorialMode = TutorialMode.FDP_NON_INTERACTIVE;
    [...Array(11).keys(), 1.1, 2.1].map((i) => {
      $steps[i] = true;
      $next[i] = true;
    });
  };
  onMount(() => {
    console.log($wallet);
    $API_HOST = apiHost();
    startInteractiveTutorial();
  });
</script>

<h1>Using FairOS Endpoints</h1>
<section>
  <p>
    We can use the REST API endpoints provided at <code
      >http://localhost:9090</code
    > by FairOS to accomplish all of the steps covered in the previous page.
  </p>
  <dl>
    <dt>FairOS Endpoints:</dt>
    <dd>
      <dl>
        {#each Object.entries(api) as [topic, data]}
          <dt>{topic}</dt>
          <dd>
            <ul>
              {#each Object.entries(data) as [path, json]}
                {@const method = json.method == "del" ? "delete" : json.method}
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://docs.fairos.fairdatasociety.org/api/index.html#tag/${topic}/paths/~1${path.replace(
                      /\//g,
                      "~1"
                    )}/${method}`}
                  >
                    <code>
                      <strong>{method.toUpperCase()}</strong>
                      {path}
                    </code>
                  </a>
                  : {json.endpoint}
                </li>
              {/each}
            </ul>
          </dd>
        {/each}
      </dl>
    </dd>
  </dl>
</section>
<section>
  <p />
  <div class="notice">
    <dl>
      <dt>Steps:</dt>
      <dd>
        <ol>
          <li>
            Create an FdpStorage Instance
            <ul><li>List accounts and balances</li></ul>
          </li>
          <li>
            Create an FDP wallet
            <ul><li>Save mnemonic phrase</li></ul>
          </li>
          <li>List existing pods</li>
          <li>Create app pod</li>
          <li>Create a directory</li>
          <li>Create a todo item (as a file)</li>
          <li>List all todo items</li>
          <li>Deleting a todo</li>
          <li>Importing a wallet</li>
          <li>Next Steps</li>
        </ol>
      </dd>
    </dl>
    <button
      on:click={() => startInteractiveTutorial()}
      disabled={$tutorialMode == TutorialMode.FAIROS_INTERACTIVE}
      >Start Interactive Tutorial</button
    >
    or
    <button
      disabled={$tutorialMode == TutorialMode.FAIROS_NON_INTERACTIVE}
      on:click={showFullTutorial}>Show the full guide</button
    >
  </div>
</section>

<Step2_01_RegisterAccount />
{#if $next[1]}
  <Step2_02_LoginUser />
{/if}
{#if $next[2]}
  <Step2_03_CreateAppPod />
{/if}
{#if $next[3]}
  <Step2_04_OpenPod />
{/if}
{#if $next[4]}
  <Step2_05_CreateAppDir />
{/if}
{#if $next[5]}
  <Step2_06_CreateTodoItem />
{/if}
{#if $next[6]}
  <Step2_07_ListTodoItems />
{/if}
{#if $next[7]}
  <Step2_08_ReadTodoItem />
{/if}
{#if $next[8]}
  <Step2_09_DeleteTodo />
{/if}
{#if $next[9]}
  <section>
    <h2>10. Next Steps:</h2>
    <div class="notice">
      <p>
        In <strong>Part 2</strong>, we have now covered how to create and use
        FDP portable accounts to store and retrieve private data.
      </p>
      <a href="#/building-a-todo-dapp/resources" role="button"
        >Links & Resources</a
      >
    </div>
  </section>
{/if}
