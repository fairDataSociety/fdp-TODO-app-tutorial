<script lang="ts">
  import {
    isBeeRunning,
    isLocalSetup,
    next,
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
      <a href="http://{window.location.href.split("/")[2]}">http://{window.location.href.split("/")[2]}</a>
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
    disabled={$tutorialMode == TutorialMode.FDP_INTERACTIVE}
    >Start Interactive Tutorial</button
  >
  or
  <button
    disabled={$tutorialMode == TutorialMode.FDP_NON_INTERACTIVE}
    on:click={showFullTutorial}>Show the full guide</button
  >
</div>
