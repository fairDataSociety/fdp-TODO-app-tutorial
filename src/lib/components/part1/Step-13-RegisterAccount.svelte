<script lang="ts">
  import {
    wallet,
    importedWallet,
    fdp,
    steps,
    mnemonic,
  } from "../../store";
  import Code from "../Code.svelte";
  import { Blossom } from '@fairdatasociety/blossom'
  let code = 
`await fdp.account.register('myusername', 'mypassword')
`
</script>

<section>
  <h2 id="f10">10. Registering an account on-chain</h2>
  Once a new local account has been created or an existing account has been imported, we can register it on-chain to make it portable. The account's wallet address needs to have a minimum of 0.05 GETH for registration to succeed.
  <Code source={code} />
</section>
<section>
  <h2 id="f11">11. Using Blossom</h2>
  <!-- <button on:click={logBlossom}>Blossom</button> -->
  <div class="notice">
    <p>The <a href="https://github.com/fairDataSociety/blossom">Blossom browser extension</a> acts as a FDS account manager for end-users.</p>
    <p>The Blossom extension can be used to create, import and register both FDS Accounts</p>
    All interaction with the Blossom browser extension is established through the Blossom class. The Blossom class provides some key functionality such as:
    <ul>
      <li>a <code>dappId</code> property containing the App ENS name from its BZZ URL.
        <ul>
          <li><code>http://dApp-or-ENS-name.swarm.localhost:1633</code> or <code>http://localhost:1633/bzz/dApp-or-ENS-name/</code></li>
          <li>If dApp is loaded from an invalid URL, the value will be null.</li>
          <li>Each dApp can have only one pod and its name must be the same as the <code>blossom.dappId</code> property.</li>
          <li>If the user is logged in, dApp can access its own pod.</li>
        </ul>
      </li>
      <li>an <code>fdpStorage</code> instance extended with a few additional methods
      </li>
      <li>a <code>signer</code> instance that can be used to sign any data</li>
    </ul> 
    <a href="blossom.svg" target="_blank"
  ><img alt="Blossom" src="blossom.svg" /></a
> 
</div>
<h3>11.1 Importing Blossom</h3>
    <Code source={`import { Blossom } from '@fairdatasociety/blossom'`}></Code>
    <h3>11.2 Create an Instance</h3>
    <Code source={`const blossom = new Blossom(); // Using the default Blossom ID from the Google store`}></Code>
    or
    <Code source={`const blossom = new Blossom('Blossom Extension ID...'); // Using custom Blossom ID`}></Code>
    <h3>11.3 Test if connection with the Blossom extension is established</h3>
    <Code source={`const text = await blossom.echo<string>('test');\nconsole.log(text); // 'test'`}></Code>
    <h3>11.4 Check if dApp's default pod is already created</h3>
    <Code source={`const podIsCreated = await blossom.fdpStorage`+`\n.personalStorage.isDappPodCreated();`}></Code>
    <h3>11.5 Create default dApp pod</h3>
    <Code source={`const pod = await blossom.fdpStorage\n.personalStorage.create(blossom.dappId);`}></Code>
    <h3>11.6 Creating a directory</h3>
    <Code source={`const directory = await blossom.fdpStorage\n.directory.create(blossom.dappId, '/example');`}></Code>
    <h3>11.7 Upload a file</h3>
    <Code source={
    `const content = await blossom.fdpStorage\n.file.downloadData(blossom.dappId, '/example/new-file.txt');\n`
    +`console.log(content.text()) // 'File content'`}></Code>
    <h3>11.8 Signing Data</h3>
    Each dApp can sign any data using it's default pod's private key.
    <Code source={`const signature = await blossom.signer\n.signMessage(blossom.dappId, 'Data...');`}></Code>
    <h3>11.9 Terminating connection</h3>
    <Code source={`blossom.closeConnection();`}></Code>
  <!-- <Code source={code} /> -->
</section>
