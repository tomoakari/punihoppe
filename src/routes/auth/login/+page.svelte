<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                ログイン
            </h2>
        </div>
        <div class="mt-8 space-y-6">
            <div>
                <a
                    href={data.authUrl}
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Googleでログイン
                </a>
            </div>
        </div>
    </div>
</div>