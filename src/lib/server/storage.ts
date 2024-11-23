import { getStorage } from 'firebase-admin/storage';
import { db } from './firebase';
import type { Bucket } from '@google-cloud/storage';

export class StorageService {
    private bucket: Bucket;

    constructor() {
        this.bucket = getStorage().bucket("gs://punihoppe.firebasestorage.app");
    }

    async uploadProfileImage(userId: string, file: Buffer, mimeType: string): Promise<string> {
        try {
            // ファイル名を生成（ユーザーID + タイムスタンプ + 拡張子）
            const extension = mimeType.split('/')[1];
            const filename = `profile-images/${userId}/${Date.now()}.${extension}`;
            const fileUpload = this.bucket.file(filename);

            // メタデータを設定
            const metadata = {
                contentType: mimeType,
                cacheControl: 'public, max-age=31536000',
            };

            // ファイルをアップロード
            await fileUpload.save(file, {
                metadata: metadata,
            });

            // ファイルを公開設定に
            await fileUpload.makePublic();

            // 公開URLを返す
            return `https://storage.googleapis.com/${this.bucket.name}/${filename}`;
        } catch (error) {
            console.error('Error uploading profile image:', error);
            throw new Error('Failed to upload profile image');
        }
    }

    async deleteProfileImage(imageUrl: string | null): Promise<void> {
        if (!imageUrl) return;

        try {
            // URLからファイル名を抽出
            const filename = imageUrl.split(`${this.bucket.name}/`)[1];
            if (!filename) return;

            // ファイルの存在確認
            const file = this.bucket.file(filename);
            const [exists] = await file.exists();

            if (exists) {
                await file.delete();
                console.log(`Successfully deleted file: ${filename}`);
            }
        } catch (error) {
            console.error('Error deleting profile image:', error);
            // エラーを投げずに処理を続行（古い画像の削除失敗は許容）
        }
    }

    async getSignedUrl(filename: string): Promise<string> {
        try {
            const file = this.bucket.file(filename);
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 15 * 60 * 1000, // 15分
            });
            return url;
        } catch (error) {
            console.error('Error generating signed URL:', error);
            throw new Error('Failed to generate signed URL');
        }
    }

    // 作品画像アップロード用の新メソッド
    async uploadCompilationImage(userId: string, file: Buffer, mimeType: string): Promise<string> {
        try {
            // ファイル名を生成（作品画像用のディレクトリを使用）
            const extension = mimeType.split('/')[1];
            const filename = `compilation-images/${userId}/${Date.now()}.${extension}`;
            const fileUpload = this.bucket.file(filename);

            // メタデータを設定
            const metadata = {
                contentType: mimeType,
                cacheControl: 'public, max-age=31536000',
            };

            // ファイルをアップロード
            await fileUpload.save(file, {
                metadata: metadata,
            });

            // ファイルを公開設定に
            await fileUpload.makePublic();

            // 公開URLを返す
            return `https://storage.googleapis.com/${this.bucket.name}/${filename}`;
        } catch (error) {
            console.error('Error uploading compilation image:', error);
            throw new Error('Failed to upload compilation image');
        }
    }

    // 作品画像削除用の新メソッド
    async deleteCompilationImage(imageUrl: string | null): Promise<void> {
        if (!imageUrl) return;

        try {
            // URLからファイル名を抽出
            const filename = imageUrl.split(`${this.bucket.name}/`)[1];
            if (!filename) return;

            // ファイルの存在確認
            const file = this.bucket.file(filename);
            const [exists] = await file.exists();

            if (exists) {
                await file.delete();
                console.log(`Successfully deleted compilation image: ${filename}`);
            }
        } catch (error) {
            console.error('Error deleting compilation image:', error);
            throw new Error('Failed to delete compilation image');
        }
    }
}