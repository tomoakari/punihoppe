<script lang="ts">
	import { goto } from "$app/navigation";
    import { Button } from "./ui/button";
    import { SERVICE_TITLE } from "./const/const";
    import { page } from '$app/stores';
</script>

<header class="fixed left-0 top-0 bg-white w-screen flex shadow-sm h-[60px]">
    <div class="">
        <Button variant="ghost" class="text-3xl edu-au-vic-wa-nt-pre-400 text-stone-600 h-[60px]" on:click={()=>goto("/")}>
            {SERVICE_TITLE}
        </Button>
    </div>
    <div class="ml-auto mr-5">
        <Button variant="ghost" size="sm" class="my-3 edu-au-vic-wa-nt-pre-400 text-stone-600" on:click={()=>goto("/search")}>
            Search
        </Button>

        {#if $page.data.user}
        <Button variant="ghost" size="sm" class="my-3 edu-au-vic-wa-nt-pre-400 text-stone-600" on:click={()=>goto("/mypage")}>
            Mypage
        </Button>
        
        <Button variant="ghost" size="sm" class="my-3 edu-au-vic-wa-nt-pre-400 text-stone-600" on:click={()=>goto("/compiling")}>
            Edit
        </Button>
        {/if}

        {#if !$page.data.user}
        <Button variant="outline" size="sm" class="my-3 edu-au-vic-wa-nt-pre-400 text-stone-600"
            on:click={()=>{goto("/auth/login")}}>
            Login
        </Button>
        {/if}
    </div>
</header>

<div class="w-screen h-[60px]"></div>