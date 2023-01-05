<script lang="ts">
  import { createWalletCode } from "../../snippets";
  import { steps, wallet, fdp, tutorialMode, TutorialMode } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  import Step_05_Save_Mnemonic from "./Step-05-SaveMnemonic.svelte";

  const createWallet = () => {
    try {
      $wallet = $fdp.account.createWallet();
      $fdp.account.setAccountFromMnemonic($wallet.mnemonic.phrase);
      console.log({ wallet: $fdp.account.wallet, account:$fdp.account });
      $steps[2] = true;
    } catch (err) {
      console.error(err);
    }
  };
</script>

<section>
  <h2>2. Create a local FDP account:</h2>
  <Code source={createWalletCode} />
  {#if $steps[2] && $tutorialMode == TutorialMode.FDP_INTERACTIVE}
    <dl class="notice">
      <dt><code class="in">wallet.address</code>:</dt>
      <dd><strong>{$wallet?.address}</strong></dd>
      <dt><code class="in">wallet.mnemonic.phrase</code>:</dt>
      <dd>
        <em>{$wallet.mnemonic?.phrase || "Empty (imported wallet)"}</em>
      </dd>
    </dl>
  {/if}
  <RunButton
    step="2"
    handler={createWallet}
    actionText="Create an FDP wallet"
  />
  <Step_05_Save_Mnemonic />
</section>
