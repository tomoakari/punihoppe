<script lang="ts">
    import { page } from '$app/stores';
</script>

{#if $page.status === 404}
    <div class="text-center py-16">
        <h1 class="text-4xl font-bold">ページが見つかりません</h1>
        <a href="/" class="mt-4 text-blue-600 hover:text-blue-800">
            トップページへ戻る
        </a>
    </div>
{:else}
    <div class="text-center py-16">
        <h1 class="text-4xl font-bold">エラーが発生しました</h1>
        <p class="mt-2 text-gray-600">
            Status: {$page.status}
        </p>
    </div>
{/if}