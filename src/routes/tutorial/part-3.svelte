<script>

let links = {
  "Tutorial - Getting Started with FDP (FDP Storage & FairOS)": "https://github.com/fairDataSociety/fdp-TODO-app-tutorial",
  "Todo App Example (using FDP Storage)": "https://github.com/fairDataSociety/fdp-storage-TODO-app-example",
  "Todo App Example (using FairOS REST APIs)": "https://github.com/fairDataSociety/fairos-TODO-app-example",
  // "FDP Play": "https://github.com/fairDataSociety/fdp-play",
  // "FDP Storage": "https://github.com/fairDataSociety/fdp-storage",
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
