import { SessionStore } from '$lib/server/session';
import { getGoogleUser } from '$lib/server/auth';
import type { RequestHandler } from '@sveltejs/kit';

const sessionStore = new SessionStore();

export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    if (!code) {
        return new Response(null, {
            status: 302,
            headers: { Location: '/' }
        });
    }

    try {
        const userData = await getGoogleUser(code);
        const sessionId = await sessionStore.createSession(userData);
        
        cookies.set('session', sessionId, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1週間
        });

        return new Response(null, {
            status: 302,
            headers: { Location: '/mypage' }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return new Response(null, {
            status: 302,
            headers: { Location: '/auth/error' }
        });
    }
};