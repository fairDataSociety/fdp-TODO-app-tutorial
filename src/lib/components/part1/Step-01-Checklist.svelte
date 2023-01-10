<script lang="ts">
  import {
    isBeeRunning,
    isLocalSetup,
    next,
    singlePageMode,
    steps,
    TutorialMode,
    tutorialMode,
  } from "../../store";

  import { scrollToBottom } from "../../utils";

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
</script>

<div class="notice">
  <strong>A Quick Checklist:</strong>
  <ul>
    <li>
      {#if $isLocalSetup}✅{:else}❌{/if} This page is being served locally at
      <a href="http://{window.location.href.split('/')[2]}"
        >http://{window.location.href.split("/")[2]}</a
      >
    </li>
    <li>
      {#if $isBeeRunning}✅{:else}❌{/if} Local bee node is running at
      <a href="http://localhost:1633/" target="_blank" rel="noreferrer"
        >http://localhost:1633</a
      >
    </li>
  </ul>
  <p>
    If all items in the checklist above are green, you should be able to start
    the tutorial below. If any of these are in red, please verify that the
    requirements and steps mentioned in the previous <b>Setup</b> section have all
    been fulfilled.
  </p>
  
  <dl>
    {#if $singlePageMode}
    <dt>Steps:</dt>
    <dd>
      <ol>
        <li>
          <a href="#f1">Create an FdpStorage Instance</a>
          <ul><li><a href="#f1_1">List accounts and balances</a></li></ul>
        </li>
        <li><a href="#f2">Create a local FDP Lite Account</a>
        </li>
        <li><a href="#f3">Create app pod</a></li>
        <li><a href="#f4">List all pods</a></li>
        <li><a href="#f5">Create a directory</a></li>
        <li><a href="#f6">Create a todo item (as a file)</a></li>
        <li><a href="#f7">List all todo items</a></li>
        <li><a href="#f8">Deleting a todo</a></li>
        <li><a href="#f9">Importing an account</a></li>
        <li><a href="#f10">Registering an account on-chain</a></li>
        <li><a href="#f11">Using Blossom</a></li>
        <li><a href="#f12">Next: Using FairOS</a></li>
      </ol>
    </dd>
    {/if}
    <dt>Create FDS portable account:</dt>
    <dd>
      <a href="fdpstorage.svg" target="_blank"
        ><img alt="FdpStorage" src="fdpstorage.svg" /></a
      >
    </dd>
    <dl />
    <p class:hide={$singlePageMode}>
    <button
      on:click={() => startInteractiveTutorial()}
      disabled={$tutorialMode == TutorialMode.FDP_INTERACTIVE}
      >Start Interactive Tutorial</button
    >
    or
    <button
      disabled={$tutorialMode == TutorialMode.FDP_NON_INTERACTIVE}
      on:click={showFullTutorial}>Show the full guide</button
    >
  </p>
  </dl>
</div>
