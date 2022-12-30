<script>

let links = {
  "Tutorial - Getting Started with FDP": "https://github.com/fairDataSociety/fdp-storage-tutorial",
  "Todos App Example (using FDP Storage)": "https://github.com/fairDataSociety/fdp-storage-todos",
  "Todos App Example (using FairOS REST APIs)": "https://github.com/fairDataSociety/fairos-todos-example",
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
