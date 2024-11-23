<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { flip } from 'svelte/animate';
    import { dndzone } from 'svelte-dnd-action';
    
    export let data: PageData;
    
    let compilation = data.compilation;
    let dragDisabled = false;
    let customColor = '';

    $: portfolioUrl = `https://punihoppe.site/portfolio/${compilation.compilation_id}`;
    
    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;
        
        const form = input.closest('form');
        if (form) form.requestSubmit();
    }
    
    function handleDnd(e: CustomEvent<{ items: any[] }>) {
        const images = e.detail.items;
        const orders = images.map((img, index) => ({
            id: img.id,
            order: index
        }));
        
        // 並び替え情報をサーバーに送信
        const formData = new FormData();
        formData.append('orders', JSON.stringify(orders));
        
        fetch('?/updateOrder', {
            method: 'POST',
            body: formData
        });
        
        compilation = {
            ...compilation,
            images: images
        };
    }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">画像編集</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 左側：画像アップロードと並び替え -->
        <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <form method="POST" action="?/uploadImage" enctype="multipart/form-data">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        on:change={handleFileSelect}
                        class="hidden"
                        id="imageUpload"
                    >
                    <label
                        for="imageUpload"
                        class="block text-center cursor-pointer py-4"
                    >
                        クリックして画像をアップロード
                        <br>
                        <span class="text-sm text-gray-500">
                            または画像をドラッグ&ドロップ
                        </span>
                    </label>
                </form>
            </div>
            
            <div
                use:dndzone={{items: compilation.images, dragDisabled}}
                on:consider={handleDnd}
                on:finalize={handleDnd}
                class="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
                {#each compilation.images as image (image.id)}
                    <div animate:flip class="relative group">
                        <img
                            src={image.url}
                            alt=""
                            class="w-full h-40 object-cover rounded"
                        >
                        <form
                            method="POST"
                            action="?/deleteImage"
                            class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <input type="hidden" name="imageId" value={image.id}>
                            <button
                                type="submit"
                                class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                                ×
                            </button>
                        </form>
                    </div>
                {/each}
            </div>
        </div>
        
        <!-- 右側：設定 -->
        <div class="space-y-6">
            <form method="POST" action="?/updateSettings" use:enhance>
                <!-- テンプレート選択 -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                        テンプレート
                    </label>
                    <select
                        name="templateId"
                        bind:value={compilation.templateId}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        {#each data.templates as template}
                            <option value={template.id}>{template.name}</option>
                        {/each}
                    </select>
                </div>
                
                <!-- 背景色選択 -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                        背景色
                    </label>
                    <div class="mt-2 space-y-2">
                        {#each data.backgroundColors as color}
                            <label class="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="backgroundColor"
                                    value={color.value}
                                    bind:group={compilation.backgroundColor}
                                    class="form-radio"
                                >
                                <span class="ml-2">{color.name}</span>
                                <div
                                    class="ml-2 w-6 h-6 border border-gray-300"
                                    style="background-color: {color.value}"
                                ></div>
                            </label>
                        {/each}
                        
                        <!-- カスタムカラー -->
                        <label class="inline-flex items-center">
                            <input
                                type="radio"
                                name="backgroundColor"
                                value={customColor}
                                bind:group={compilation.backgroundColor}
                                class="form-radio"
                            >
                            <span class="ml-2">カスタム</span>
                            <input
                                type="color"
                                bind:value={customColor}
                                class="ml-2"
                                on:input={() => compilation.backgroundColor = customColor}
                            >
                        </label>
                    </div>
                </div>
                
                <button
                    type="submit"
                    class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    設定を保存
                </button>
            </form>

            {#if compilation.compilation_id}
            <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                <h2 class="text-lg font-semibold mb-2">ポートフォリオURL</h2>
                <div class="flex items-center gap-4">
                    <a 
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                        {portfolioUrl}
                    </a>
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        on:click={() => {
                            navigator.clipboard.writeText(portfolioUrl);
                            // オプション: コピー成功を通知
                        }}
                    >
                        URLをコピー
                    </button>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>