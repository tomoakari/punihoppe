<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    let profile = data.profile || {
        prefectures: [],
        userTypes: [],
        tags: [],
        biography: ''
    };
    
    let errorMessage = '';
    let successMessage = '';
    
    async function handleSubmit(event: any) {
        errorMessage = '';
        successMessage = '';
        
        const biography = event.target.biography.value;
        if (biography.length > 500) {
            errorMessage = '自己紹介は500文字以内で入力してください';
            return;
        }
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