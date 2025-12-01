import api from "@/api/api";
import { ENDPOINTS } from "@/api/endpoint";
import type { LoginDto, LoginResponse } from "../models/login.model";

export async function loginUser(data: LoginDto): Promise<LoginResponse> {
    const res = await api.post(`${ENDPOINTS.build(ENDPOINTS.USUARIO.LOGIN)}`, data);
    return res.data;
}