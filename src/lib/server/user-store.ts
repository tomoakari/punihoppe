import { db } from './firebase';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import type { UserProfile } from '$lib/types/user';

export class UserStore {
    private collection = db.collection('users');
    private storage = new StorageService();

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
                customTags: data?.customTags || [],
                biography: data?.biography || '',
                profileImageUrl: data?.profileImageUrl || '',
                updatedAt: data?.updatedAt?.toDate() || new Date()
            };
        } catch (error) {
            console.error('Error getting user profile:', error);
            return null;
        }
    }

    async updateProfile(userId: string, profile: Partial<UserProfile>, profileImage?: Buffer): Promise<void> {
        try {
            const updateData: any = {
                ...profile,
                updatedAt: FieldValue.serverTimestamp()
            };

            if (profileImage) {
                // 既存の画像を削除
                const currentProfile = await this.getProfile(userId);
                if (currentProfile?.profileImageUrl) {
                    await this.storage.deleteProfileImage(currentProfile.profileImageUrl);
                }

                // 新しい画像をアップロード
                const imageUrl = await this.storage.uploadProfileImage(userId, profileImage, 'image/jpeg');
                updateData.profileImageUrl = imageUrl;
            }

            await this.collection.doc(userId).set(updateData, { merge: true });
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }
}