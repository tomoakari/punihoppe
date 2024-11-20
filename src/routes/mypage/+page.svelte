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
		profile.customTags = profile.customTags.filter((t) => t !== tag);
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	<h1 class="mb-6 text-2xl font-bold">プロフィール編集</h1>

	{#if errorMessage}
		<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			{errorMessage}
		</div>
	{/if}

	{#if successMessage}
		<div class="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
			{successMessage}
		</div>
	{/if}

	<form method="POST" action="?/update" use:enhance enctype="multipart/form-data" class="space-y-6">
		<!-- プロフィール画像 -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> プロフィール画像 </label>
			<div class="mt-1 flex items-center space-x-4">
				<div class="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
					{#if imagePreview}
						<img src={imagePreview} alt="プレビュー" class="h-full w-full object-cover" />
					{:else if profile.profileImageUrl}
						<img
							src={profile.profileImageUrl}
							alt="プロフィール"
							class="h-full w-full object-cover"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center bg-gray-200">
							<span class="text-gray-400">No Image</span>
						</div>
					{/if}
				</div>
				<input
					type="file"
					name="profileImage"
					accept="image/*"
					on:change={handleImageChange}
					class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
				/>
			</div>
			<p class="mt-1 text-sm text-gray-500">5MB以内のJPEG、PNG画像をアップロードしてください</p>
		</div>

		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> 活動エリア（複数選択可） </label>
			<div class="space-y-2">
				{#each data.prefectureOptions as option}
					<label class="mr-4 inline-flex items-center">
						<input
							type="checkbox"
							name="prefectures"
							value={option.value}
							checked={profile.prefectures.includes(option.value)}
							class="form-checkbox"
						/>
						<span class="ml-2">{option.label}</span>
					</label>
				{/each}
			</div>
		</div>

		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700">
				ユーザー種別（複数選択可）
			</label>
			<div class="space-y-2">
				{#each data.userTypeOptions as option}
					<label class="mr-4 inline-flex items-center">
						<input
							type="checkbox"
							name="userTypes"
							value={option.value}
							checked={profile.userTypes.includes(option.value)}
							class="form-checkbox"
						/>
						<span class="ml-2">{option.label}</span>
					</label>
				{/each}
			</div>
		</div>

		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> タグ（複数選択可） </label>
			<div class="space-y-2">
				{#each data.tagOptions as option}
					<label class="mr-4 inline-flex items-center">
						<input
							type="checkbox"
							name="tags"
							value={option.value}
							checked={profile.tags.includes(option.value)}
							class="form-checkbox"
						/>
						<span class="ml-2">{option.label}</span>
					</label>
				{/each}
			</div>
		</div>

		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> 自己紹介（500文字以内） </label>
			<textarea
				name="biography"
				rows="4"
				maxlength="500"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				bind:value={profile.biography}
			></textarea>
			<p class="mt-1 text-sm text-gray-500">
				{profile.biography.length}/500文字
			</p>
		</div>

		<!-- カスタムタグ -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700">
				カスタムタグ（最大10個まで）
			</label>
			<div class="mb-2 flex flex-wrap gap-2">
				{#each profile.customTags as tag}
					<span
						class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800"
					>
						{tag}
						<button
							type="button"
							class="ml-2 inline-flex items-center rounded-full p-0.5 text-indigo-400 hover:text-indigo-500 focus:outline-none"
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
				/>
				<button
					type="button"
					on:click={addCustomTag}
					class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					追加
				</button>
			</div>
			<input type="hidden" name="customTags" value={profile.customTags.join(',')} />
		</div>

		<div>
			<button
				type="submit"
				class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				保存する
			</button>
		</div>
	</form>
</div>
