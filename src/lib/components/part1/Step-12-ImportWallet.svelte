<script lang="ts">
  import { importWalletCode } from "../../snippets";
  import {
    wallet,
    importedWallet,
    fdp,
    steps,
    mnemonic,
  } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";

  const importWallet = () => {
    let phrase = prompt("Enter mnemonic phrase:");
    if (phrase) {
      try {
        $mnemonic = phrase.trim();
        $fdp.account.setAccountFromMnemonic($mnemonic);
        $importedWallet = $fdp.account.wallet as any;
        $wallet = $importedWallet;
        console.log({ importedWallet: $importedWallet });
        $steps[9] = true;
      } catch (err) {
        console.error(err);
      }
    }
  };
</script>

<section>
  <h2>9. Importing a wallet</h2>
  <Code source={importWalletCode} />
  {#if $wallet?.mnemonic?.phrase}
    <dl>
      <dt>Copy this wallet's mnemonic phrase:</dt>
      <dd><p class="notice">{$wallet?.mnemonic?.phrase}</p></dd>
    </dl>
  {/if}
  {#if $importedWallet}
    <div class="notice">Your Wallet has been imported!</div>
  {/if}
  <RunButton step="9" handler={importWallet} actionText="Import Wallet" />
</section>
