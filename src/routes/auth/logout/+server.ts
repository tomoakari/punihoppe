import { SessionStore } from '$lib/server/session';
import type { RequestHandler } from '@sveltejs/kit';

const sessionStore = new SessionStore();

export const POST: RequestHandler = async ({ cookies }) => {
    const sessionId = cookies.get('session');
    
    if (sessionId) {
        await sessionStore.deleteSession(sessionId);
        cookies.delete('session', { path: '/' });
    }

    return new Response(null, {
        status: 302,
        headers: { Location: '/' }
    });
};