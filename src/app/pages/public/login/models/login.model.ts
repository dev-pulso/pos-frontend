import type { User } from "@/app/interface/user.interface";

export interface LoginDto {
    username: string;
    password: string;
}
export interface LoginResponse {
    user: User;
    refreshToken: string; // si el backend devuelve token
    accessToken: string; //  // si el backend devuelve token
}