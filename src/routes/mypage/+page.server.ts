import { UserStore } from '$lib/server/user-store';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const userStore = new UserStore();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user?.email) {
        throw error(401, 'Unauthorized');
    }

    const profile = await userStore.getProfile(locals.user.email);
    return {
        profile,
        prefectureOptions: [
            { value: '1', label: '東京都' },
            { value: '2', label: '神奈川県' },
            { value: '3', label: '千葉県' },
            { value: '4', label: '埼玉県' }
        ],
        userTypeOptions: [
            { value: 'カメラマン', label: 'カメラマン' },
            { value: 'モデル', label: 'モデル' }
        ],
        tagOptions: [
            { value: 'ポートレート', label: 'ポートレート' },
            { value: '風景', label: '風景' },
            { value: 'スナップ', label: 'スナップ' },
            { value: 'ファッション', label: 'ファッション' }
        ]
    };
};

export const actions: Actions = {
    update: async ({ request, locals }) => {
        if (!locals.user?.email) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const prefectures = formData.getAll('prefectures');
        const userTypes = formData.getAll('userTypes');
        const tags = formData.getAll('tags');
        const customTags = formData.get('customTags')?.toString().split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0) || [];
        const biography = formData.get('biography')?.toString() || '';
        const profileImage = formData.get('profileImage') as File | null;

        // バリデーション
        if (biography.length > 500) {
            return fail(400, { error: '自己紹介は500文字以内で入力してください' });
        }

        if (customTags.length > 10) {
            return fail(400, { error: 'カスタムタグは10個までしか登録できません' });
        }

        if (customTags.some(tag => tag.length > 20)) {
            return fail(400, { error: 'タグは20文字以内で入力してください' });
        }

        let profileImageBuffer: Buffer | undefined;
        if (profileImage && profileImage.size > 0) {
            if (profileImage.size > MAX_FILE_SIZE) {
                return fail(400, { error: '画像サイズは5MB以内にしてください' });
            }

            if (!profileImage.type.startsWith('image/')) {
                return fail(400, { error: '画像ファイルをアップロードしてください' });
            }

            profileImageBuffer = Buffer.from(await profileImage.arrayBuffer());
        }

        try {
            await userStore.updateProfile(locals.user.email, {
                prefectures: prefectures.map(p => p.toString()),
                userTypes: userTypes.map(t => t.toString()),
                tags: tags.map(t => t.toString()),
                customTags,
                biography
            }, profileImageBuffer);

            return { success: true };
        } catch (err) {
            return fail(500, { error: 'プロフィールの更新に失敗しました' });
        }
    }
};