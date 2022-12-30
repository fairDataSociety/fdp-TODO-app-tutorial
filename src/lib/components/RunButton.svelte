<script lang="ts">
  import { fdp, next, steps, tutorialMode, TutorialMode } from "../store";
  import { scrollToBottom } from "../utils";
  export let handler: any;
  export let step: string;
  export let actionText;
  export let disabled = false;
</script>

{#if $tutorialMode == TutorialMode.FDP_INTERACTIVE}
  {#if !$fdp || !$steps[step]}
    <button
      {disabled}
      on:click={async () => {
        await handler();
        scrollToBottom();
      }}>Step {step} : {actionText}!</button
    >
  {:else}
    <button disabled>Step {step} : {actionText} - done ✓ </button>
    <slot />
    <button
      disabled={$next[step]}
      on:click={() => {
        $next[step] = true;
        scrollToBottom();
      }}>Next</button
    >
  {/if}
{/if}
