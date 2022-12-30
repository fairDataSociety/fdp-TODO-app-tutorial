<script>
  import Step_01_Checklist from "./Step-01-Checklist.svelte";
</script>

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
  <Step_01_Checklist />
</section>
