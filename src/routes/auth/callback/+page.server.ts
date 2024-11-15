import { redirect } from '@sveltejs/kit';
import { getGoogleUser } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    if (!code) {
        throw redirect(302, '/');
    }

    try {
        const userData = await getGoogleUser(code);
        
        // セッションの作成
        const sessionId = crypto.randomUUID();
        cookies.set('session', sessionId, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1週間
        });

        // ユーザーデータの保存（この例ではメモリに保存）
        // 実際のアプリケーションではデータベースに保存する
        // sessions.set(sessionId, userData);

        throw redirect(302, '/mypage');
    } catch (error) {
        console.error('Authentication error:', error);
        throw redirect(302, '/auth/error');
    }
};