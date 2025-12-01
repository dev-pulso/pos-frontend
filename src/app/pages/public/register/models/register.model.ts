import type { Rols, User } from "@/app/interface/user.interface";

export interface RegisterDto {
    password: string;
    nombres: string;
    username: string;
    rol: Rols;
}

export interface RegisterResponse {
    user: User;
    refreshToken: string; // si el backend devuelve token
    accessToken: string; // si el backend devuelve token
}