import { db } from './firebase';
import { StorageService } from './storage';
import type { CompilationSettings, CompilationImage } from '$lib/types';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

export class CompilationStore {
    private collection = db.collection('compilations');
    private storage: StorageService;

    constructor() {
        this.storage = new StorageService();
    }

    async getCompilation(userId: string): Promise<CompilationSettings | null> {
        try {
            const doc = await this.collection.doc(userId).get();
            if (!doc.exists) {
                return null;
            }
            const data = doc.data();
            return {
                id: doc.id,
                userId,
                templateId: data?.templateId || 0,
                backgroundColor: data?.backgroundColor || '#ffffff',
                images: data?.images || [],
                updatedAt: data?.updatedAt?.toDate() || new Date()
            };
        } catch (error) {
            console.error('Error getting compilation:', error);
            return null;
        }
    }

    async updateCompilation(userId: string, settings: Partial<CompilationSettings>): Promise<void> {
        try {
            const updateData = {
                ...settings,
                updatedAt: FieldValue.serverTimestamp()
            };
            await this.collection.doc(userId).set(updateData, { merge: true });
        } catch (error) {
            console.error('Error updating compilation:', error);
            throw error;
        }
    }

    async uploadImage(userId: string, file: Buffer, order: number, mimeType: string): Promise<CompilationImage> {
        try {
            const imageUrl = await this.storage.uploadCompilationImage(userId, file, mimeType);
            const imageId = crypto.randomUUID();
            const image: CompilationImage = {
                id: imageId,
                url: imageUrl,
                order
            };
    
            const doc = this.collection.doc(userId);
            
            // ドキュメントの存在確認
            const docSnapshot = await doc.get();
            
            if (!docSnapshot.exists) {
                // ドキュメントが存在しない場合は新規作成
                await doc.set({
                    userId: userId,
                    templateId: 0,
                    backgroundColor: '#ffffff',
                    images: [image],
                    updatedAt: FieldValue.serverTimestamp()
                });
            } else {
                // 既存のドキュメントを更新
                await doc.update({
                    images: FieldValue.arrayUnion(image),
                    updatedAt: FieldValue.serverTimestamp()
                });
            }
    
            return image;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    async deleteImage(userId: string, imageId: string): Promise<void> {
        try {
            const compilation = await this.getCompilation(userId);
            if (!compilation) return;

            const image = compilation.images.find(img => img.id === imageId);
            if (!image) return;

            await this.storage.deleteCompilationImage(image.url);

            await this.collection.doc(userId).update({
                images: compilation.images.filter(img => img.id !== imageId)
            });
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }

    async updateImageOrder(userId: string, imageOrders: { id: string; order: number }[]): Promise<void> {
        try {
            const compilation = await this.getCompilation(userId);
            if (!compilation) return;

            const updatedImages = compilation.images.map(image => {
                const newOrder = imageOrders.find(o => o.id === image.id);
                return newOrder ? { ...image, order: newOrder.order } : image;
            });

            await this.collection.doc(userId).update({
                images: updatedImages
            });
        } catch (error) {
            console.error('Error updating image order:', error);
            throw error;
        }
    }
}
