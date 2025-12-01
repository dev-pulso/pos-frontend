export interface RegisterDto {
    password: string;
    nombres: string;
    username: string;
    rol: Rols;
}

export interface RegisterResponse {
    user: User;
    refreshToken: string;
    accessToken: string;
}
export interface LoginDto {
    username: string;
    password: string;
}
export interface LoginResponse {
    user: User;
    refreshToken: string;
    accessToken: string;
}

export interface User {
    id: string;
    nombres: string;
    username: string;
    rol: Rols;
}
export type Rols = "super_admin" | "admin" | "cashier";

