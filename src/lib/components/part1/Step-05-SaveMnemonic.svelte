<script>
  import { next, steps, TutorialMode, tutorialMode, wallet } from "../../store";
  import RunButton from "../RunButton.svelte";
  import { saveAs } from "file-saver";
  const saveMnemonic = () => {
    var blob = new Blob(
      [JSON.stringify({ mnemonic: $wallet.mnemonic.phrase })],
      { type: "text/plain;charset=utf-8" }
    );
    saveAs(blob, "mnemonic.json");
    $steps[2.1] = true;
  };
</script>

{#if $next[2] && $tutorialMode == TutorialMode.FDP_INTERACTIVE}
  <h3>2.1 Save mnemonic phrase:</h3>
  <RunButton
    step="2.1"
    handler={saveMnemonic}
    actionText="Save mnemonic phrase"
  />
{/if}
