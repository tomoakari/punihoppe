import { getSession } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('session');
    
    if (sessionId) {
        const session = getSession(sessionId);
        if (session) {
            event.locals.user = session.userData;
        }
    }

    const response = await resolve(event);
    return response;
};