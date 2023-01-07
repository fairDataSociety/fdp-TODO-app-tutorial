<script>
  import { getAccountBalancesCode } from "../../snippets";
  import { steps, fdp, tutorialMode, TutorialMode } from "../../store";
  import { getAddressBalances } from "../../utils";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
</script>

<h3 id="f1_1">1.1 List accounts and balances:</h3>
<Code source={getAccountBalancesCode} />
{#if $steps[1.1] && $tutorialMode == TutorialMode.FDP_INTERACTIVE}
  <p class="notice">
    <strong>Ganache blockchain - Accounts & Balances :</strong>
    {#await getAddressBalances($fdp)}
      <p>...waiting</p>
    {:then accounts}
      <table>
        <tr><th>#</th><th>Address</th><th>Balance in ETH</th></tr>
        {#each accounts as account, i}
          <tr
            ><td>{i + 1}</td><td>{account.address}</td><td
              ><b>{account.balance} eth</b></td
            ></tr
          >
        {/each}
      </table>
    {/await}
  </p>
{/if}
<RunButton
  step="1.1"
  handler={() => {
    $steps[1.1] = true;
  }}
  actionText="Show Blockchain (Ganache) Addresses and Balances"
/>
