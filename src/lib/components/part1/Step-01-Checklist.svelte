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
  import TocFdpStorage from "../TocFdpStorage.svelte";

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
      {#if $isLocalSetup}✅{:else}❌{/if} This page is being served locally
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
      <TocFdpStorage></TocFdpStorage>
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
