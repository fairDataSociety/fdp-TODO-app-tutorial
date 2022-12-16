
<script>
  import { onMount } from "svelte";
</script>
<h1>Introduction</h1>
<section>
<p>
  In this interactive guide for beginners, we will cover key concepts of the
  Fair Data Protocol (FDP) and walkthrough the various steps involved in getting
  developing dapps with Fair Data Protocol.
</p>
<div class="notice">
  For this how-to guide we will use two tools from the FDP toolkit that offer us
  the easiest way to get started:
  <dl>
    <dt>FDP Play</dt>
    <dd>
      <a href="https://github.com/fairDataSociety/fdp-play"
        ><code>fdp-play</code></a
      > : a command line tool to spin up a local development fdp environment with
      docker. It includes a cluster of bees a fair OS instance and a blockchain node
      which is all you need to experiment with the stack
    </dd>
    <dt>FDP Storage</dt>
    <dd>
      <a href="https://github.com/fairDataSociety/fdp-storage"
        ><code>fdp-storage</code></a
      >
      : a typescript library and an easy-to-use implementation of the FairOS
      decentralized filesystem
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
<h3>Glossary</h3>
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
    an ethical standard for collecting, processing, and storing personal data. They
    are a social contract of our members and technologies we develop.
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
    <a href="https://fairdataprotocol.bzz.link">Fair Data Protocol</a> (FDP) is a
    data interoperability protocol promoting self-sovereignty and privacy for dApps
    that use personal data in the decentralized cloud.
  </dd>
</dl>
</section>
<a href="#/building-a-todo-dapp/getting-started" role="button">Next: Part 1: Getting Started</a>