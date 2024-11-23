import { CompilationStore } from '$lib/server/compilation-store';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const compilationStore = new CompilationStore();
const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user?.email) {
        throw error(401, 'Unauthorized');
    }

    let compilation = await compilationStore.getCompilation(locals.user.email);
    
    // コンピレーションが存在しない場合は新規作成
    if (!compilation) {
        compilation = await compilationStore.createCompilation(locals.user.email);
    }

    return {
        compilation,
        templates: [
            { id: 0, name: 'テンプレート1' },
            { id: 1, name: 'テンプレート2' },
            { id: 2, name: 'テンプレート3' }
        ],
        backgroundColors: [
            { value: '#ffffff', name: '白' },
            { value: '#fffff0', name: 'アイボリー' },
            { value: '#000000', name: '黒' },
            { value: '#4e454a', name: 'チャコール' }
        ]
    };
};

export const actions: Actions = {
    uploadImage: async ({ request, locals }) => {
        if (!locals.user?.email) {
            throw error(401, 'Unauthorized');
        }
    
        const formData = await request.formData();
        const file = formData.get('image') as File;
        
        if (!file) {
            return fail(400, { error: '画像ファイルを選択してください' });
        }
    
        if (file.size > MAX_FILE_SIZE) {
            return fail(400, { error: 'ファイルサイズは5MB以下にしてください' });
        }
    
        const compilation = await compilationStore.getCompilation(locals.user.email);
        if (compilation && compilation.images.length >= MAX_IMAGES) {
            return fail(400, { error: '画像は最大10枚までアップロードできます' });
        }
    
        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            const order = compilation ? compilation.images.length : 0;
            await compilationStore.uploadImage(
                locals.user.email,
                buffer,
                order,
                file.type  // MIMEタイプを追加
            );
            return { success: true };
        } catch (err) {
            return fail(500, { error: '画像のアップロードに失敗しました' });
        }
    },

    deleteImage: async ({ request, locals }) => {
        if (!locals.user?.email) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const imageId = formData.get('imageId')?.toString();

        if (!imageId) {
            return fail(400, { error: '画像IDが指定されていません' });
        }

        try {
            await compilationStore.deleteImage(locals.user.email, imageId);
            return { success: true };
        } catch (err) {
            return fail(500, { error: '画像の削除に失敗しました' });
        }
    },

    updateSettings: async ({ request, locals }) => {
        if (!locals.user?.email) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const templateId = parseInt(formData.get('templateId')?.toString() || '0');
        const backgroundColor = formData.get('backgroundColor')?.toString() || '#ffffff';

        try {
            await compilationStore.updateCompilation(locals.user.email, {
                templateId,
                backgroundColor
            });
            return { success: true };
        } catch (err) {
            return fail(500, { error: '設定の更新に失敗しました' });
        }
    },

    updateOrder: async ({ request, locals }) => {
        if (!locals.user?.email) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const orders = JSON.parse(formData.get('orders')?.toString() || '[]');

        try {
            await compilationStore.updateImageOrder(locals.user.email, orders);
            return { success: true };
        } catch (err) {
            return fail(500, { error: '画像の並び替えに失敗しました' });
        }
    }
};
