export interface CompilationSettings {
    id: string;
    userId: string;
    templateId: number;
    backgroundColor: string;
    images: CompilationImage[];
    updatedAt: Date;
}

export interface CompilationImage {
    id: string;
    url: string;
    order: number;
}