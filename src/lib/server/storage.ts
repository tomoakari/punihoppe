import { getStorage } from 'firebase-admin/storage';
import { db } from './firebase';

export class StorageService {
    // ※べた書きはNGだよ！
    private bucket = getStorage().bucket("gs://punihoppe.firebasestorage.app");

    async uploadProfileImage(userId: string, file: Buffer, mimeType: string): Promise<string> {
        const filename = `profile-images/${userId}/${Date.now()}.${mimeType.split('/')[1]}`;
        const fileUpload = this.bucket.file(filename);

        await fileUpload.save(file, {
            metadata: {
                contentType: mimeType
            }
        });

        await fileUpload.makePublic();
        return `https://storage.googleapis.com/${this.bucket.name}/${filename}`;
    }

    async deleteProfileImage(imageUrl: string): Promise<void> {
        try {
            const filename = imageUrl.split(`${this.bucket.name}/`)[1];
            await this.bucket.file(filename).delete();
        } catch (error) {
            console.error('Error deleting profile image:', error);
        }
    }
}