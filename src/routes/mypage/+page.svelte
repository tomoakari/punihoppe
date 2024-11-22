<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { createEventDispatcher } from 'svelte';
    
    export let data: PageData;
    
    let profile = data.profile || {
        prefectures: [],
        userTypes: [],
        tags: [],
        customTags: [],
        biography: '',
        profileImageUrl: ''
    };
    
    let errorMessage = '';
    let successMessage = '';
    let customTagInput = '';
    let imagePreview: string | null = null;
    
    async function handleSubmit(event: any) {
        errorMessage = '';
        successMessage = '';
        
        const biography = event.target.biography.value;
        if (biography.length > 500) {
            errorMessage = '自己紹介は500文字以内で入力してください';
            return;
        }
    }

    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                errorMessage = '画像サイズは5MB以内にしてください';
                input.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }
    
    function addCustomTag() {
        const tag = customTagInput.trim();
        if (tag && !profile.customTags.includes(tag)) {
            if (profile.customTags.length >= 10) {
                errorMessage = 'カスタムタグは10個までしか登録できません';
                return;
            }
            if (tag.length > 20) {
                errorMessage = 'タグは20文字以内で入力してください';
                return;
            }
            profile.customTags = [...profile.customTags, tag];
            customTagInput = '';
        }
    }
    
    function removeCustomTag(tag: string) {
        profile.customTags = profile.customTags.filter(t => t !== tag);
    }
</script>

<div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">プロフィール編集</h1>
    
    {#if errorMessage}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
        </div>
    {/if}
    
    {#if successMessage}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
        </div>
    {/if}

    <form method="POST" action="?/update" use:enhance enctype="multipart/form-data" class="space-y-6">
        <!-- プロフィール画像 -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                プロフィール画像
            </label>
            <div class="mt-1 flex items-center space-x-4">
                <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                    {#if imagePreview}
                        <img src={imagePreview} alt="プレビュー" class="w-full h-full object-cover">
                    {:else if profile.profileImageUrl}
                        <img src={profile.profileImageUrl} alt="プロフィール" class="w-full h-full object-cover">
                    {:else}
                        <div class="w-full h-full flex items-center justify-center bg-gray-200">
                            <span class="text-gray-400">No Image</span>
                        </div>
                    {/if}
                </div>
                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    on:change={handleImageChange}
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                >
            </div>
            <p class="mt-1 text-sm text-gray-500">
                5MB以内のJPEG、PNG画像をアップロードしてください
            </p>
        </div>

        <!-- 既存のフォーム要素（都道府県、ユーザー種別、タグ、自己紹介） -->
        
        <!-- カスタムタグ -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                カスタムタグ（最大10個まで）
            </label>
            <div class="flex flex-wrap gap-2 mb-2">
                {#each profile.customTags as tag}
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {tag}
                        <button
                            type="button"
                            class="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:text-indigo-500 focus:outline-none"
                            on:click={() => removeCustomTag(tag)}
                        >
                            ×
                        </button>
                    </span>
                {/each}
            </div>
            <div class="flex gap-2">
                <input
                    type="text"
                    bind:value={customTagInput}
                    placeholder="新しいタグを入力"
                    class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    maxlength="20"
                >
                <button
                    type="button"
                    on:click={addCustomTag}
                    class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    追加
                </button>
            </div>
            <input type="hidden" name="customTags" value={profile.customTags.join(',')}>
        </div>
        
        <div>
            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                保存する
            </button>
        </div>
    </form>
    
    <form method="POST" action="?/update" use:enhance on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                活動エリア（複数選択可）
            </label>
            <div class="space-y-2">
                {#each data.prefectureOptions as option}
                    <label class="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            name="prefectures"
                            value={option.value}
                            checked={profile.prefectures.includes(option.value)}
                            class="form-checkbox"
                        >
                        <span class="ml-2">{option.label}</span>
                    </label>
                {/each}
            </div>
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                ユーザー種別（複数選択可）
            </label>
            <div class="space-y-2">
                {#each data.userTypeOptions as option}
                    <label class="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            name="userTypes"
                            value={option.value}
                            checked={profile.userTypes.includes(option.value)}
                            class="form-checkbox"
                        >
                        <span class="ml-2">{option.label}</span>
                    </label>
                {/each}
            </div>
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                タグ（複数選択可）
            </label>
            <div class="space-y-2">
                {#each data.tagOptions as option}
                    <label class="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            name="tags"
                            value={option.value}
                            checked={profile.tags.includes(option.value)}
                            class="form-checkbox"
                        >
                        <span class="ml-2">{option.label}</span>
                    </label>
                {/each}
            </div>
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                自己紹介（500文字以内）
            </label>
            <textarea
                name="biography"
                rows="4"
                maxlength="500"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                bind:value={profile.biography}
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">
                {profile.biography.length}/500文字
            </p>
        </div>
        
        <div>
            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                保存する
            </button>
        </div>
    </form>
</div>