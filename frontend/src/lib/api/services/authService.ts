import type { ApiResponse, LoginResponse, RegisterPayload } from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
    login: async(nim: string, password: string): Promise<LoginResponse> => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nim, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data
    },

    register: async(payload: RegisterPayload): Promise<ApiResponse> => {
        const formDara = new FormData();
        formDara.append('nama', payload.nama);
        formDara.append('nim', payload.nim);
        formDara.append('password', payload.password);
        formDara.append('prodi', payload.prodi);
        formDara.append('semester', payload.semester.toString());

        if (payload.photos && payload.photos.length > 0) {
            payload.photos.forEach((photo, index) => {
                formDara.append(`photos[${index}]`, photo);
            });
        }

        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            body: formDara,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    }
}

