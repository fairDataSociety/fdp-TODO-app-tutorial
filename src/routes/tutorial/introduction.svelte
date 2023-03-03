<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import PageFairOs from "../../lib/components/Page_FairOS.svelte";
  import PageFdpStorage from "../../lib/components/Page_FdpStorage.svelte";
  import PageResources from "../../lib/components/Page_Resources.svelte";
  import TocFairos from "../../lib/components/TocFairos.svelte";
  import TocFdpStorage from "../../lib/components/TocFdpStorage.svelte";
  import { singlePageMode } from "../../lib/store";
  import { scrollPageToTop } from "../../lib/utils";

  let url = writable("");
  onMount(() => {
    $url = window.location.origin;
    scrollPageToTop();
  });
</script>

<h1>Getting Started with FDP</h1>
{#if $singlePageMode}
  <div class="notice">
    <ul>
      <li>
        <a href="/">Getting Started with FDP</a>
        <ul>
          <li><a href="#glossary">Glossary</a></li>
          <li><a href="#setup">Setup</a></li>
          <li><a href="#next1">Next steps</a></li>
        </ul>
      </li>
      <li>
        <a href="#fdpstorage">Option 1: Using FdpStorage & Blossom</a>
        <TocFdpStorage></TocFdpStorage>
      </li>
      <li>
        <a href="#fairos">Option 2: Using FairOS</a>
        <TocFairos></TocFairos>
      </li>
      <li>
        <a href="#resources">Resource & Links</a>
      </li>
    </ul>
  </div>
{/if}
<section>
  <p>
    In this interactive guide for beginners, we will cover key concepts of the
    Fair Data Protocol (FDP) and walkthrough the various steps involved in
    getting developing dapps with Fair Data Protocol.
  </p>
  <div class="notice">
    For this how-to guide we will use two tools from the FDP toolkit that offer
    us the easiest way to get started:
    <dl>
      <dt>FDP Play</dt>
      <dd>
        <a href="https://github.com/fairDataSociety/fdp-play"
          ><code>fdp-play</code></a
        > : a command line tool to spin up a local development fdp environment with
        docker. It includes a cluster of bees, a FairOS instance and a blockchain
        node which is all you need to experiment with the stack
      </dd>
      <dt>FdpStorage</dt>
      <dd>
        <a href="https://github.com/fairDataSociety/fdp-storage"
          ><code>fdp-storage</code></a
        >
        : a typescript library and an easy-to-use implementation of the FairOS decentralized
        filesystem
        <a href="https://github.com/fairDataSociety/fairOS-dfs"
          ><code>FairOS-dfs</code></a
        >
        that can run in the browser, in Node.js and in mobile applications using
        <a href="https://reactnative.dev/">React Native</a>.
      </dd>
    </dl>
  </div>
</section>
<section>
  <h3><a id="glossary">Glossary</a></h3>
  <dl>
    <dt>Fair Data</dt>
    <dd>
      <b>Fair Data</b> is based on the simple premise that personal data is a part
      of the individual. As such, it should be treated as any other inalienable part
      of human identity.
    </dd>
    <dt>Fair Data Principles</dt>
    <dd>
      <a href="https://principles.fairdatasociety.org">Fair Data Principles</a> are
      an ethical standard for collecting, processing, and storing personal data.
      They are a social contract of our members and technologies we develop.
    </dd>
    <dt>Fair Data Society</dt>
    <dd>
      <a href="https://fairdatasociety.org">Fair Data Society</a> is an initiative
      for decentralized self-sovereign data commons. Fair Data Society is a coordinated
      network developing infrastructure and dApps for a fairer data economy and promoting
      human rights through digital sovereignty.
    </dd>
    <dt>Fair Data Protocol</dt>
    <dd>
      <a href="https://fairdataprotocol.bzz.link">Fair Data Protocol</a> (FDP) is
      a data interoperability protocol promoting self-sovereignty and privacy for
      dApps that use personal data in the decentralized cloud.
    </dd>
  </dl>
</section>
<section>
  <h2 id="setup"><a id="setup">Setup</a></h2>
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
      <pre>git clone https://github.com/fairDataSociety/fdp-TODO-app-tutorial</pre>
    </dd>
    <dt>Switch to the project directory</dt>
    <dd><pre>cd fdp-TODO-app-tutorial</pre></dd>
    <dt>Copy .env file</dt>
    <dd><pre>cp .env.example .env</pre></dd>
    <dt>Install dependencies</dt>
    <dd><pre>npm install</pre></dd>
    <dt>Run the tutorial app</dt>
    <dd><pre>npm run dev</pre></dd>
    <dt>Open the tutorial app</dt>
    <dd>
      Visit the link - <a href="http://localhost:5173/">http://localhost:5173/</a>
    </dd>
  </dl>
</section>
<section>
  <h2><a id="next1">Next Steps:</a></h2>
  <div class="notice">
    <a href="fdp.svg" target="_blank"
      ><img alt="Fair Data Protocol" src="fdp.svg" /></a
    >
    <p>
      In the next chapters, we will cover two different ways to build with Fair
      Data Protocol.
    </p>
    <ul>
      {#if $singlePageMode}
        <li><a href="#fdpstorage">Option 1: Using FdpStorage & Blossom</a></li>
        <li><a href="#fairos">Option 2: Using FairOS REST API endpoints</a></li>
      {:else}
        <li>
          <a href="#/building-a-todo-dapp/fdp-storage"
            >Option 1: Using FdpStorage & Blossom</a
          >
        </li>
        <li>
          <a href="#/building-a-todo-dapp/fairos"
            >Option 2: Using FairOS REST API endpoints</a
          >
        </li>
      {/if}
    </ul>
    <br />
    <a
      class:hide={$singlePageMode}
      href="#/building-a-todo-dapp/fdp-storage"
      role="button">Option 1: Using FdpStorage & Blossom</a
    >
  </div>
</section>
{#if $singlePageMode}
  <PageFdpStorage />
  <PageFairOs />
  <PageResources />
{/if}
