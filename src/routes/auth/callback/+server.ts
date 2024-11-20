import { redirect } from '@sveltejs/kit';
import { getGoogleUser } from '$lib/server/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state') || '/mypage'; // リダイレクト先を取得

    if (!code) {
        return new Response(null, {
            status: 302,
            headers: { Location: '/auth/login' }
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
            maxAge: 60 * 60 * 24 * 7
        });

        return new Response(null, {
            status: 302,
            headers: { Location: state }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return new Response(null, {
            status: 302,
            headers: { Location: '/auth/error' }
        });
    }
};