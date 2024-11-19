<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";

    let metaenv: any
    let processenv: string | undefined

    onMount(()=>{
        metaenv = import.meta.env.GOOGLE_CLIENT_ID
        processenv = process.env.GOOGLE_CLIENT_ID
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

