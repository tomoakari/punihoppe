import { redirect, type RequestHandler } from '@sveltejs/kit';
import { getGoogleUser } from '$lib/server/auth';

export const GET: RequestHandler = async ({ url, cookies }) => {
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

        // ユーザーデータの保存
        // 注: 実際のアプリケーションではデータベースに保存する
        // sessions.set(sessionId, userData);
        console.log("userData: " + JSON.stringify(userData))

        // 302リダイレクトを返す
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/mypage'
            }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/auth/error'
            }
        });
    }
};
