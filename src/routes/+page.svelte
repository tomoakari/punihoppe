<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";

    let metaenv: any
    let processenv: string | undefined

    metaenv = import.meta.env.VITE_ENVTEST
    processenv = process.env.VITE_ENVTEST

    let keepStr = processenv
    console.log("地の部分processenv" + processenv)
    console.log("地の部分keepStr" + keepStr)

    onMount(()=>{
        console.log("Mountの部分processenv" + processenv)
        console.log("Mountの部分keepStr" + keepStr)
    })
    
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button variant="outline">しゃどえすえぬ</Button>
<p>
    metaenv: {metaenv}
</p>
<p>
    processenv: {processenv}
</p>
<p>
    keepStr: {keepStr}
</p>


