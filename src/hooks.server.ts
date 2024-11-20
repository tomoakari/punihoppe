import { redirect, type Handle } from '@sveltejs/kit';
import { SessionStore } from '$lib/server/session';
const sessionStore = new SessionStore();

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('session');
    
    // セッションIDの存在チェック
    if (!sessionId) {
        event.locals.user = null;
    } else {
        try {
            // セッション情報の取得（前回実装したSessionStoreを使用）
            const session = await sessionStore.getSession(sessionId);
            if (session) {
                event.locals.user = session.userData;
            } else {
                event.cookies.delete('session', { path: '/' });
                event.locals.user = null;
            }
        } catch (error) {
            console.error('Error getting session:', error);
            event.locals.user = null;
        }
    }

    // 保護されたルートの定義
    const protectedRoutes = ['/mypage', '/compiling'];
    const isProtectedRoute = protectedRoutes.some(route => 
        event.url.pathname.startsWith(route)
    );

    // 未ログインで保護されたルートにアクセスした場合、ログインページにリダイレクト
    if (isProtectedRoute && !event.locals.user) {
        throw redirect(302, `/auth/login?redirect=${event.url.pathname}`);
    }

    return resolve(event);
};