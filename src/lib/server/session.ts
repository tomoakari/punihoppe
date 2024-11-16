import { db } from './firebase';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

interface SessionData {
    id: string;
    userData: {
        email?: string;
        name?: string;
        picture?: string;
        [key: string]: any;
    };
    createdAt: Timestamp;
    expiresAt: Timestamp;
}

export class SessionStore {
    private collection = db.collection('sessions');
    private readonly SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 1週間

    async createSession(userData: any): Promise<string> {
        const sessionId = crypto.randomUUID();
        const now = Timestamp.now();
        const expiresAt = Timestamp.fromMillis(now.toMillis() + this.SESSION_DURATION);

        const sessionData: SessionData = {
            id: sessionId,
            userData,
            createdAt: now,
            expiresAt: expiresAt
        };

        await this.collection.doc(sessionId).set(sessionData);
        return sessionId;
    }

    /**
     * セッション情報を取得
     * @param sessionId 
     * @returns 
     */
    async getSession(sessionId: string): Promise<SessionData | null> {
        try {
            const doc = await this.collection.doc(sessionId).get();
            if (!doc.exists) {
                return null;
            }

            const data = doc.data() as SessionData;
            
            // セッションの有効期限チェック
            if (data.expiresAt.toDate() < new Date()) {
                await this.deleteSession(sessionId);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }

    /**
     * セッション情報を削除
     * @param sessionId 
     */
    async deleteSession(sessionId: string): Promise<void> {
        try {
            await this.collection.doc(sessionId).delete();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    }

    /**
     * セッションの更新（有効期限の延長）
     * @param sessionId 
     */
    async updateSession(sessionId: string): Promise<void> {
        try {
            const expiresAt = Timestamp.fromMillis(Date.now() + this.SESSION_DURATION);
            await this.collection.doc(sessionId).update({
                expiresAt,
                updatedAt: FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating session:', error);
        }
    }

    /**
     * 期限切れセッションの削除
     * ※これは毎日Cloud functionsから呼び出して実行するとよいかも
     */
    async cleanExpiredSessions(): Promise<void> {
        try {
            const now = Timestamp.now();
            const expiredSessions = await this.collection
                .where('expiresAt', '<', now)
                .get();

            const batch = db.batch();
            expiredSessions.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            if (expiredSessions.docs.length > 0) {
                await batch.commit();
            }
        } catch (error) {
            console.error('Error cleaning expired sessions:', error);
        }
    }
}