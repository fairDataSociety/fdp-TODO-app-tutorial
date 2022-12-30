<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { config } from "../../config";
  import { fdp, mnemonic, steps, topupData } from "../../store";
  import { topUpAddress } from "../../utils";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  let userName = "fdp-test-user-" + new Date().getTime();
  let password = "fdp-test-password";
  let code = "";
  let topped = false;
  let error: {
    address: string;
    message: string;
    mnemonic: string;
  };
  let action = "";
  let result: any;
  $: code = `let headers = {
    "Content-Type": "application/json",
};

let data = {
    userName: "${userName}",
    password: "${password}",
    mnemonic: "${wallet?.mnemonic?.phrase}"
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v2/user/signup"

let response = await fetch(FAIROS_HOST + ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
})

let json = await response.json();
if(response.ok){
    console.log({response, json});
}else{
    console.error({response, json});
}
`;
  let wallet;
  onMount(() => {
    $fdp = new FdpStorage(config.beeUrl, config.postageBatchId);
    wallet = $fdp.account.createWallet();
    console.log({ wallet });
  });
  const registerUser = async () => {
    let headers = {
      "Content-Type": "application/json",
    };
    let data = {
      userName,
      password,
      mnemonic: wallet.mnemonic.phrase,
    };

    let response = await fetch("http://localhost:9090/v2" + "/user/signup", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      result = json;
    } else {
      error = json;
      result = response;
      console.error({ response, json });
    }
  };
  const topUp = async () => {
    action = "Topping...";
    $topupData = { data: error, userName, password };
    return topUpAddress($fdp, error.address).then((reciept) => {
      console.log({ reciept });
      action = "Registering...";
      topped = true;
      console.log("Topped address", error.address, $mnemonic);
      console.log("Registering FairOS Account...");
      registerUser().then(() => {
        console.log("Finished Registering");
        $steps[1] = true;
        error = null;
        result = null;
      });
    });
  };
</script>

<section>
  <h2>1. Register an account on-chain</h2>
  <p>Registering an account on-chain makes it portable.</p>
  <code>POST v2/user/signup : Register New User</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p><b>Message:</b> {error.message}</p>
      <p><b>Address:</b> {error.address}</p>
      <p><b>Mnemonic:</b> {error.mnemonic}</p>
      {#if result.status == 402}
        <button disabled={action != ""} on:click={topUp}
          >{action ? action : "Topup and Register!"}
        </button>
      {/if}
    </div>
  {:else}
    {#if result}
      <p>Success! {result.message}</p>
    {/if}
    <RunButton
      step="1"
      handler={registerUser}
      actionText="Register FairOS Account"
    />
  {/if}
</section>
