<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { config } from "../../config";
  import { API_HOST, fdp, steps, topupData } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  let userName = $topupData.userName || "fdp-test-user-1672108830527";
  let password = "fdp-test-password";
  let code = "";
  let error: {
    address: string;
    message: string;
  };
  let result: any;
  $: code = `let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

let data = {
    userName: "${userName}",
    password: "${password}",
};

let FAIROS_HOST = "http://localhost:9090"
let ENDPOINT = "/v2/user/login"

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
  onMount(() => {
    $fdp = new FdpStorage(config.beeUrl, config.postageBatchId);
  });
  const loginUser = async () => {
    console.log($topupData);
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      userName,
      password,
    };

    let response = await fetch($API_HOST + "/v2/user/login", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    let json = await response.json();
    if (response.ok) {
      console.log({ response, json });
      result = json;
      $steps[2] = true;
    } else {
      error = json;
      result = response;
      console.error({ response, json });
    }
  };
</script>

<section>
  <h2 id="s2">2. Login to a portable account</h2>
  <p>
    If the on-chain registration in the previous step was successful, we can now
    log into this account with a username and password.
  </p>
  <code>POST v2/user/login : Login User</code>
  <Code source={code} />
  {#if error}
    <div class="notice error">
      <p>{error.message}</p>
    </div>
  {:else if result}
    <div class="notice">
      <p><b>Success</b>: {result.message}</p>
      <p>
        If the POST request at <code>/user/login</code> was successful, it
        should return a cookie named <code>fairOS-dfs</code> in the response.
      </p>
    </div>
  {/if}
  <RunButton
    step="2"
    handler={loginUser}
    actionText="Login to FairOS Account"
  />
</section>
