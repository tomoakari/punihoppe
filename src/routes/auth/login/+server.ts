import { redirect, type RequestHandler } from '@sveltejs/kit';
import { getGoogleAuthURL } from '$lib/server/auth';

export const GET: RequestHandler = async () => {
    const authUrl = getGoogleAuthURL();
    return new Response(null, {
        status: 302,
        headers: {
            Location: authUrl
        }
    });
};