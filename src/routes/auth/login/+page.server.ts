import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGoogleAuthURL } from '$lib/server/auth';

export const load: PageServerLoad = async ({ url, locals }) => {
    // すでにログインしている場合は、リダイレクト先またはマイページへ
    if (locals.user) {
        const redirectTo = url.searchParams.get('redirect') || '/mypage';
        throw redirect(302, redirectTo);
    }

    const redirectTo = url.searchParams.get('redirect') || '/mypage';
    return {
        authUrl: getGoogleAuthURL(redirectTo)
    };
};