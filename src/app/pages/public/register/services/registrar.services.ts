import api from "@/api/api";
import type { RegisterDto, RegisterResponse } from "../models/register.model";
import { ENDPOINTS } from "@/api/endpoint";

export async function registerUser(data: RegisterDto): Promise<RegisterResponse> {
    const res = await api.post(`${ENDPOINTS.build(ENDPOINTS.USUARIO.REGISTER)}`, data);

    if (!res.data) {
        throw new Error(res.data.message || "Error al registrar usuario");
    }
    return res.data;
}