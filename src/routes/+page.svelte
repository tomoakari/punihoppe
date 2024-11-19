<script lang="ts">
    import { Button } from "$lib/components/ui/button";

    let metaenv = import.meta.env.FIREBASE_CLIENT_ID

    let processenv = process.env.FIREBASE_CLIENT_ID
    
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

