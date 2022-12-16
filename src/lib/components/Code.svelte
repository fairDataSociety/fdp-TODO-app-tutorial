<script lang="ts">
    import SveltePrism from 'svelte-prism'
    import 'prismjs/components/prism-javascript' // Language
    export let source:string;
</script>
<SveltePrism language="javascript" {source}></SveltePrism>