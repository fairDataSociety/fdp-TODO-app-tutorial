<script>

let links = {
  "Tutorial - Getting Started with FDP (FdpStorage & FairOS)": "https://github.com/fairDataSociety/fdp-TODO-app-tutorial",
  "Todo App Example (using FdpStorage)": "https://github.com/fairDataSociety/fdp-storage-TODO-app-example",
  "Todo App Example (using FairOS REST APIs)": "https://github.com/fairDataSociety/fairos-TODO-app-example",
}

</script>

<h1>Resource & Links</h1>
<section>
<div>
  <dl>
    {#each Object.entries(links) as [text,url]}
    <dt>{text}</dt>
    <dd><a rel="noreferrer" target="_blank" href={url}>{url}</a></dd>
    {/each}
  </dl>
</div>
</section>
