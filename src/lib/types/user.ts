export interface UserProfile {
    id: string;
    prefectures: string[];        // 都道府県
    userTypes: string[];          // ユーザ種別
    tags: string[];              // タグ
    biography: string;           // 自己紹介
    updatedAt: Date;
}