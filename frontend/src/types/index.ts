export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;   
}

export interface User {
    id: number;
    nim: string;
    name: string;
    prodi: string;
    semester: number;
    role: 'student' | 'admin' | 'security';
    url_photo?: string | null;
    face_embedding?: number[] | null;
    created_at?: string;
    updated_at?: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface RegisterPayload {
    nim: string;
    nama: string;
    prodi: string;
    semester: number;
    password: string;
    photos?: File[];
}