export interface UserProfile {
    id: string;
    prefectures: string[];
    userTypes: string[];
    tags: string[];
    customTags: string[];
    biography: string;
    profileImageUrl: string;
    updatedAt: Date;
}