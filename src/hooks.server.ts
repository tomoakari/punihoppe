import { SessionStore } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

const sessionStore = new SessionStore();

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('session');
    
    if (sessionId) {
        const session = await sessionStore.getSession(sessionId);
        if (session) {
            event.locals.user = session.userData;
            // セッションの有効期限を延長
            await sessionStore.updateSession(sessionId);
        }
    }

    const response = await resolve(event);
    return response;
};