<script lang="ts">
  import { FdpStorage } from "@fairdatasociety/fdp-storage";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import {
    createAppPodCode,
    createTodoItemCode,
    createTodoItemsDirectoryCode,
    createWalletCode,
    getAccountBalancesCode,
    listTodoItemsCode,
    listPodsCode,
    updateTodoCode,
    importWalletCode,
  } from "../../lib/snippets";
  import { getAddressBalances } from "../../lib/utils";
  import {
    fdp,
    steps,
    wallet,
    podList,
    pods,
    sharedPods,
    appPod,
    todoItems,
    todoText,
    newTodo,
    type Todo,
    started,
    isBeeRunning,
    isLocalSetup,
    batchId,
    next,
    importedWallet,
  } from "../../lib/store";
  import RunButton from "../../lib/components/RunButton.svelte";
  import { config, TODOS_NS, TODO_ITEMS_DIR } from "../../lib/config";
  import Code from "../../lib/components/Code.svelte";
  import { utils } from "ethers";
  import { saveAs } from "file-saver";
  import type { ContentItem } from "@fairdatasociety/fdp-storage/dist/content-items/content-item";
  import urlExist from "url-exist";
  import { scrollToBottom } from "../../lib/utils";

  const init = () => {
    $fdp = new FdpStorage(config.beeUrl, $batchId);
    console.log({ fdp: $fdp });
    $steps[1] = true;
  };

  const importWallet = () => {
    let phrase = prompt("Enter mnemonic phrase:");
    if (phrase) {
      $fdp.account.setAccountFromMnemonic(phrase.trim());
      $importedWallet = $fdp.account.wallet as any;
      console.log({ importedWallet: $importedWallet });
    }
  };

  const createWallet = () => {
    try {
      $wallet = $fdp.account.createWallet();
      $fdp.account.setAccountFromMnemonic($wallet.mnemonic.phrase);
      $steps[2] = true;
    } catch (err) {
      console.error(err);
    }
    console.log({ wallet: $fdp.account.wallet });
  };

  const createAppPod = async () => {
    try {
      $appPod = await $fdp.personalStorage.create(TODOS_NS);
      console.log({ appPod: $appPod });
      $podList = await $fdp.personalStorage.list();
    } catch (err) {
      console.error(err);
    }
    $steps[4] = true;
  };

  const listPods = async () => {
    const balance = await $fdp.ens.provider.getBalance($wallet.address);
    console.log({ balance: utils.formatEther(balance) });
    $podList = await $fdp.personalStorage.list();
    $pods = $podList.getPods();
    $sharedPods = $podList.getSharedPods();
    console.log({ pods: $pods, sharedPods: $sharedPods });
    $steps[3] = true;
  };

  const saveMnemonic = () => {
    var blob = new Blob(
      [JSON.stringify({ mnemonic: $wallet.mnemonic.phrase })],
      { type: "text/plain;charset=utf-8" }
    );
    saveAs(blob, "mnemonic.json");
    $steps[2.1] = true;
  };
  const createTodoItemsDirectory = async () => {
    $fdp.directory.create(TODOS_NS, TODO_ITEMS_DIR).then(() => {
      console.log(`Directory "${TODO_ITEMS_DIR}" created in "${TODOS_NS}" pod`);
    });
    $steps[5] = true;
  };
  const createTodoItem = async () => {
    $todoText = prompt("Enter a Todo");
    const id = new Date().getTime();
    const uploadedTodoMetadata = await $fdp.file.uploadData(
      TODOS_NS,
      `${TODO_ITEMS_DIR}/todo_${id}.json`,
      JSON.stringify({ id, createdAt: id, text: $todoText, done: false })
    );
    console.log({ uploadedTodoMetadata });
    $newTodo = uploadedTodoMetadata;
    $steps[6] = true;
    if ($steps[7]) {
      listTodoItems();
    }
  };
  const deleteTodoItem = async (todo: Todo) => {
    console.log({ todo });
    return $fdp.file
      .delete(TODOS_NS, `${TODO_ITEMS_DIR}/todo_${todo.id}.json`)
      .then(async () => {
        return listTodoItems();
      });
  };
  const toggleTodoItem = async (todo: Todo) => {
    console.log({ todo });
    return $fdp.file
      .delete(TODOS_NS, `${TODO_ITEMS_DIR}/todo_${todo.id}.json`)
      .then(() => {
        console.log("deleted ", { todo });
        try {
          let createdAt = new Date().getTime();
          let newTodo = {
            id: todo.id,
            createdAt,
            text: todo.text,
            done: !todo.done,
          };
          console.log({ newTodo });
          return $fdp.file
            .uploadData(
              TODOS_NS,
              `${TODO_ITEMS_DIR}/todo_${createdAt}.json`,
              JSON.stringify(newTodo)
            )
            .then(() => {
              return listTodoItems();
            });
        } catch (err) {
          console.error(err);
        }
      });
  };
  const listTodoItems = async () => {
    const dir = await $fdp.directory.read(TODOS_NS, TODO_ITEMS_DIR);
    let promises = dir.content.map(async (file: ContentItem) => {
      return await get(fdp).file.downloadData(
        TODOS_NS,
        `${TODO_ITEMS_DIR}/${file.name}`
      );
    });
    $todoItems = (
      await Promise.all(promises).then((items) => {
        console.log({ content: dir.content, dir, todoItems: $todoItems });
        $steps[7] = true;
        return items;
      })
    ).map((data) => data.json() as Todo);
  };

  const startTutorial = () => {
    $started = true;
    scrollToBottom();
  };
  $: initCode = `import { FdpStorage } from '@fairdatasociety/fdp-storage'
let batchId: any = "${
    $batchId ||
    ""
  }";
const fdp = new FdpStorage('http://localhost:1633',batchId);
console.log({fdp});
`;
  onMount(async () => {
    $batchId = "";
    $isBeeRunning = await urlExist("http://localhost:1633/");
    $isLocalSetup = window.location.href
      .split("//")[1]
      .startsWith("localhost:");
  });
  
</script>

<h1>Part 1 - Building a Todo dapp</h1>
<section>
  <p>
    In Part 1 of this tutorial, we'll cover various keys aspects of FDP using
    fdp-play and fdp-storage. By the end of this tutorial, we'll have an inline
    Todo dapp that:
  </p>
  <ul>
    <li>allows users to log into a wallet account using a mnemonic phrase</li>
    <li>allows logged in users to create and list todo items</li>
    <li>allows logged in users to delete todo items</li>
    <li>
      adheres to <a href="https://principles.fairdatasociety.org"
        >Fair Data Principles</a
      >
    </li>
    <li>
      brings all the added benefits of <a
        href="https://fairdataprotocol.bzz.link">Fair Data Protocol</a
      > such as interoperability, self-sovereignty and privacy
    </li>
  </ul>
  <h2 id="setup">Setup</h2>
  Before we begin building our Todo app interactively, we need to make sure we have
  all the tools and environment set up to run this interactive tutorial locally.
  <dl>
    <dt>Requirements</dt>
    <dd>
      <ul>
        <li><code>node</code> and <code>npm</code> must be installed</li>
        <li>docker must be installed</li>
        <li>
          the following ports must be free and available for FDP Play to use
          <ul>
            <li><b>1634</b> and <b>1635</b> - for the queen bee node</li>
            <li><b>9545</b> - for the blockhain</li>
            <li><b>9090</b> - for fairOS</li>
          </ul>
        </li>
      </ul>
    </dd>
    <dt>Install and run FDP Play</dt>
    <dd>
      Open a terminal and run:
      <pre>npm install -g @fairdatasociety/fdp-play</pre>
    </dd>
    <dt>Spin up the local FDP development cluster</dt>
    <dd><pre>fdp-play start --fairos</pre></dd>
    <dt>Clone the tutorial locally</dt>
    <dd>
      Open a new terminal and run:
      <pre>git clone https://github.com/rampall/getting-started-with-fdp</pre>
    </dd>
    <dt>Switch to the project directory</dt>
    <dd><pre>cd getting-started-with-fdp</pre></dd>
    <dt>Install dependencies</dt>
    <dd><pre>npm install</pre></dd>
    <dt>Run the tutorial app</dt>
    <dd><pre>npm run dev</pre></dd>
    <dt>Open the tutorial app</dt>
    <dd>
      Visit the link - <a href="http://localhost:5173/"
        >http://localhost:5173/</a
      >
    </dd>
  </dl>
</section>
<section>
  <h2>The Interactive Guide</h2>
  <div class="notice">
    <strong>A Quick Checklist:</strong>
    <ul>
      <li>
        {#if $isLocalSetup}✅{:else}❌{/if} This page is being served locally - <b>{window.location.href.split('/')[2]}</b>
      </li>
      <li>
        {#if $isBeeRunning}✅{:else}❌{/if} Local bee node is running at <a
          href="http://localhost:1633/"
          target="_blank"
          rel="noreferrer">http://localhost:1633</a
        >
      </li>
    </ul>
    <p>
      If all items in the checklist above are green, you should be able to start
      the tutorial below. If any of these are in red, please verify that the
      requirements and steps mentioned in the previous <b>Setup</b> section have
      all been fulfilled.
    </p>
    <nav>
      <button on:click={startTutorial} disabled={$started}
        >Start the Tutorial</button
      >
    </nav>
  </div>
  {#if $started}
    <h3>1. Create an FdpStorage Instance</h3>
    <dl>
      <dt>
        Install <a
          href="https://github.com/fairDataSociety/fdp-storage/"
          target="_blank"
          rel="noreferrer">FDP Storage</a
        >
      </dt>
      <dd><pre>npm install @fairdatasociety/fdp-storage</pre></dd>
      <dt>Get a valid Batch Id:</dt>
      <dd>
        To generate a Batch Id, open a terminal with <code>curl</code> installed
        and run:
        <pre>curl -s -XPOST http://localhost:1635/stamps/10000000/18</pre>
        This should return a new batch Id that looks like this:
        <p>
          <img alt="" src="images/newbatchid.png" />
        </p>
        <label for="batchid">Copy the batch id and enter it here:</label>
        <input
          id="batchid"
          name="batchid"
          style="width:100%;"
          type="text"
          bind:value={$batchId}
          placeholder="Enter a valid batch id here"
        />
        {#if !($batchId != "" && $batchId.length == 64)}
          <mark>❌ Batch Id Missing or Invalid!</mark>
        {:else}
          <button
            disabled={$next["init"]}
            on:click={() => {
              $next["init"] = true;
              scrollToBottom();
            }}>Next</button
          >
        {/if}
      </dd>
      {#if $next["init"] && $batchId != "" && $batchId.length == 64}
        <dt>
          Import Fdp Storage in your project file and create a new instance.
        </dt>
        <dd>
          <Code source={initCode} />
          <RunButton
            disabled={$batchId == "" || $steps[1]}
            step="1"
            handler={init}
            actionText="Create an fdpStorage instance"
          />
        </dd>
      {/if}
    </dl>
  {/if}
  {#if $fdp && $next[1]}
    <h3>1.1 List accounts and balances:</h3>
    <Code source={getAccountBalancesCode} />
    {#if $steps[1.1]}
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
  {/if}
</section>
{#if $next[1.1]}
  <section>
    <h2>2. Create an FDP wallet:</h2>
    <Code source={createWalletCode} />
    {#if $steps[2]}
      <dl class="notice">
        <dt><code class="in">wallet.address</code>:</dt>
        <dd><strong>{$wallet.address}</strong></dd>
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
    {#if $next[2]}
      <h3>2.1 Save mnemonic phrase:</h3>
      <RunButton
        step="2.1"
        handler={saveMnemonic}
        actionText="Save mnemonic phrase"
      />
    {/if}
  </section>
{/if}
{#if $next[2.1]}
  <h2>3. List existing pods:</h2>
  <Code source={listPodsCode} />
  {#if $pods}
    <dl class="notice">
      <dt><code>Pods</code>:</dt>
      <dd>
        <ol>
          {#each $podList.getPods() as pod}<li>
              <strong>{pod.name}</strong>
            </li>{:else}
            None
          {/each}
        </ol>
      </dd>
      <dt><code>Shared pods</code>:</dt>
      <dd>
        <ol>
          {#each $podList.getSharedPods() as pod}<li>
              <strong>{pod.name}</strong>
            </li>{:else}
            None
          {/each}
        </ol>
      </dd>
    </dl>
  {/if}
  <RunButton step="3" handler={listPods} actionText="List existing pods" />
{/if}
{#if $next[3]}
  <section>
    <h2>4. Create app pod <code class="in">{TODOS_NS}</code>:</h2>
    This<code class="in">{TODOS_NS}</code> pod will serve as the namespace for
    our dapp.
    <Code source={createAppPodCode} />
    {#if $appPod}
      <p class="notice">
        The <strong>{$appPod.name}</strong> pod has been created!
      </p>
    {/if}
    <RunButton step="4" handler={createAppPod} actionText="Create an App Pod" />
  </section>
  {#if $next[4]}
    <section>
      <h2>5. Create a directory:</h2>
      This<code class="in">{TODO_ITEMS_DIR}</code> directory inside the
      <code class="in">{TODOS_NS}</code>
      pod will hold each of our todo items as individual files.
      <Code source={createTodoItemsDirectoryCode} />
      {#if $steps[5]}
        <p class="notice">
          The <code class="in">{TODO_ITEMS_DIR}</code> directory has been
          created in <code class="in">{TODOS_NS}</code> pod!
        </p>
      {/if}
      <RunButton
        step="5"
        handler={createTodoItemsDirectory}
        actionText="Create a '{TODO_ITEMS_DIR}' directory"
      />
    </section>
  {/if}
  {#if $next[5]}
    <section>
      <h2>6. Create a todo item (as a file):</h2>
      <Code source={createTodoItemCode} />
      {#if $newTodo}
        <dl class="notice">
          <em>New Todo has been added!</em>
          <dt><code>filePath</code>:</dt>
          <dd>{$newTodo.filePath}</dd>
          <dt><code>filename</code>:</dt>
          <dd>{$newTodo.fileName}</dd>
        </dl>
      {/if}
      <RunButton
        step="6"
        handler={createTodoItem}
        actionText="Create a Todo Item"
      />
      {#if $steps[6]}
        <RunButton
          step="6.1"
          handler={createTodoItem}
          actionText="Create another Todo Item"
        />
      {/if}
    </section>
  {/if}
  {#if $next[6]}
    <section>
      <h2>7. List all todo items:</h2>
      <Code source={listTodoItemsCode} />
      {#if $steps[7] && $todoItems.length}
        <table class="notice">
          <tr><td>#</td><th>id</th><th>todo</th><th>done</th></tr>
          {#each $todoItems as todo, i}
            <tr
              ><td>{i + 1}</td><td>{todo.id}</td><td>{todo.text}</td><td
                >{todo.done}</td
              ></tr
            >
          {/each}
        </table>
      {/if}
      <RunButton
        step="7"
        handler={listTodoItems}
        actionText="List all Todo Items"
      />
    </section>
  {/if}
  {#if $next[7]}
    <section>
      <h2>8. Deleting a todo:</h2>
      <Code source={updateTodoCode} />
      {#if $steps[7] && $todoItems.length}
        <table class="notice">
          <h4>Todos</h4>
          <tr
            ><th>#</th><th>id</th><th>todo</th><th>done</th><th>actions</th></tr
          >
          {#each $todoItems as todo, i (todo.id)}
            <tr>
              <td>{i + 1}</td>
              <td>{todo.id}</td>
              <td>{todo.text}</td>
              <td>{todo.done}</td>
              <td>
                <button
                  on:click={() => {
                    deleteTodoItem(todo);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          {/each}
        </table>
      {/if}
      <button
        on:click={() => {
          $next[8] = true;
          scrollToBottom();
        }}>Next</button
      >
    </section>
  {/if}
  {#if $next[8]}
    <section>
      <h2>9. Importing a wallet</h2>
      <Code source={importWalletCode} />
      <dl>
        <dt>Copy this wallet's mnemonic phrase:</dt>
        <dd><p class="notice">{$wallet?.mnemonic.phrase}</p></dd>
      </dl>
      {#if $importedWallet}
        <div class="notice">Your Wallet has been imported!</div>
      {/if}
      <button disabled={!!$importedWallet} on:click={importWallet}
        >Import Wallet</button
      >
    </section>
  {/if}
  {#if $importedWallet}
    <section>
      <h2>10. Next Steps:</h2>
      <div class="notice">
        <dl>
          <dt>Coming soon : <b>Part 2</b> & <b>part 3</b></dt>
          <dd>
            covering more advanced aspects such as data sharing,
            interoperability, configurations for mainnet / testnet environments.
            <p>Watch out for updates.</p>
          </dd>
        </dl>
      </div>
    </section>
  {/if}
{/if}
