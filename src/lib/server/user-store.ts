import { db } from './firebase';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

import type { UserProfile } from '../types/user';

export class UserStore {
    private collection = db.collection('users');

    async getProfile(userId: string): Promise<UserProfile | null> {
        try {
            const doc = await this.collection.doc(userId).get();
            if (!doc.exists) {
                return null;
            }
            const data = doc.data();
            return {
                id: doc.id,
                prefectures: data?.prefectures || [],
                userTypes: data?.userTypes || [],
                tags: data?.tags || [],
                biography: data?.biography || '',
                updatedAt: data?.updatedAt?.toDate() || new Date()
            };
        } catch (error) {
            console.error('Error getting user profile:', error);
            return null;
        }
    }

    async updateProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
        try {
            const updateData = {
                ...profile,
                updatedAt: FieldValue.serverTimestamp()
            };
            await this.collection.doc(userId).set(updateData, { merge: true });
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }
}