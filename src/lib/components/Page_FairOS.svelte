<script>
    import { onMount } from "svelte";
    import Step2_01_RegisterAccount from "./part2/Step2-01-RegisterAccount.svelte";
    import Step2_02_LoginUser from "./part2/Step2-02-LoginUser.svelte";
    import Step2_03_CreateAppPod from "./part2/Step2-03-CreateAppPod.svelte";
    import Step2_04_OpenPod from "./part2/Step2-04-OpenPod.svelte";
    import Step2_05_CreateAppDir from "./part2/Step2-05-CreateAppDir.svelte";
    import Step2_06_CreateTodoItem from "./part2/Step2-06-CreateTodoItem.svelte";
    import Step2_07_ListTodoItems from "./part2/Step2-07-ListTodoItems.svelte";
    import Step2_08_ReadTodoItem from "./part2/Step2-08-ReadTodoItem.svelte";
    import Step2_09_DeleteTodo from "./part2/Step2-09-DeleteTodo.svelte";
    import { api } from "../fairos";
    import {
      API_HOST,
      next,
      singlePageMode,
      steps,
      TutorialMode,
      tutorialMode,
      wallet,
    } from "../store";
    import { apiHost, scrollPageToTop, scrollToBottom } from "../utils";
    const startInteractiveTutorial = () => {
      $tutorialMode = TutorialMode.FDP_INTERACTIVE;
      $steps = {};
      $next = {};
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
      if(!$singlePageMode){
        startInteractiveTutorial();
      }else{
        showFullTutorial();
      }
      scrollPageToTop();
    });
  </script>
  
  <h1>Using FairOS</h1>
  <section>
    <p>
      We can use the FairOS REST API endpoints provided at <code
        >http://localhost:9090</code
      > by FairOS to accomplish all of the steps covered in the previous page.
    </p>
    <div class="notice">
      <dl>
        <dt>FairOS Steps:</dt>
        <dd>
          <ol>
            <li><a href="#s1">Register an account on-chain</a> <code>v2/user/signup</code>
            </li>
            <li><a href="#s2">Login to a portable account</a> <code>v2/user/login</code>
            </li>
            <li><a href="#s3">Create App Pod</a> <code>v1/pod/new</code></li>
            <li><a href="#s4">Open App Pod</a> <code>v1/pod/open</code></li>
            <li><a href="#s5">Create App Directory</a> <code>v1/dir/mkdir</code></li>
            <li><a href="#s6">Create a todo item (as a file)</a> <code>v1/file/upload</code></li>
            <li><a href="#s7">List Todo Files</a> <code>v1/dir/ls</code></li>
            <li><a href="#s8">Read Todo Item</a> <code>v1/file/download</code></li>
            <li><a href="#s9">Delete Todo</a> <code>v1/file/delete</code></li>
            <li><a href="#s10">All FairOS Endpoints</a></li>
            <li><a href="#s11">Next Steps: Additonal Resources</a></li>
          </ol>
        </dd>
      </dl>
      {#if !$singlePageMode}
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
      {/if}
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
      <h2 id="s10">10. All FairOS Endpoints</h2>
      <p>A complete list of all available endpoints provided by FairOS is listed below.</p>
      <div class="notice">
      <dl>
        <dt>FairOS-dfs API</dt>
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
      </dl></div>
    </section>
    <section>
      <h2 id="s11">11. Next Steps: Additonal Resources</h2>
      <div class="notice">
        <p>
          In <strong>Part 2</strong>, we have now covered how to use specific FairOS REST API endpoints to create FDP portable accounts as well as to build a Todo dapp that stores and retrieves personal data.</p>
        <br/>
        {#if !$singlePageMode}
        <a href="#/building-a-todo-dapp/resources" role="button"
          >Additional Links & Resources</a
        >
        {/if}
      </div>
    </section>
  {/if}
  