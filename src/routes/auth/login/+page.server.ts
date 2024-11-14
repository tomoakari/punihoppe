import { redirect } from '@sveltejs/kit';
import { getGoogleAuthURL } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    throw redirect(302, getGoogleAuthURL());
};