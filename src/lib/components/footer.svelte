<script lang="ts">
    import { SERVICE_NAME } from "./const/const";
    
	import { goto } from "$app/navigation";
    import { Button } from "./ui/button";
</script>

<footer class="flex justify-center bg-white fixed bottom-0 left-0 shadow-sm w-screen shadow-sm">
    <Button variant="ghost" size="sm" class="font-normal text-xs p-1 h-6 text-stone-400" on:click={()=>goto("/about")}>
        {SERVICE_NAME}とは
    </Button>
    <!--
    <div class="text-stone-400 text-xs p-1 mx-2">
        {SERVICE_NAME}
    </div>
    -->
    <Button variant="ghost" size="sm" class="font-normal text-xs p-1 h-6 text-stone-400" on:click={()=>goto("/term")}>
        特定商取引法の表示
    </Button>
</footer>