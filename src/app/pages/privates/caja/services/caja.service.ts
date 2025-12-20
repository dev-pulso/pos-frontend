import api from "@/api/api";
import { buildEndpoint, ENDPOINTS } from "@/api/endpoint";
import type { AbrirCajaDto, CajaResponse, CerrarCajaDto, CrearMovimientoDto } from "@/app/interface/caja-registradora.interface";

export const abrirCajaRegistradora = async (body: AbrirCajaDto) => {
    const response = await api.post(`${ENDPOINTS.CAJA.ABRIR}`, body)
    return response.data
}
export const cerrarCajaRegistradora = async (id: string, body: CerrarCajaDto) => {
    const res = await api.post(`${buildEndpoint(ENDPOINTS.CAJA.CERRAR, { id })}`, body);

    return res.data;
}
export const cajaAbierta = async () => {
    const res = await api.get<CajaResponse>(`${ENDPOINTS.CAJA.LISTAR}`);
    return res.data;
}

export const crearMovimiento = async (body: CrearMovimientoDto) => {
    const res = await api.post(`${ENDPOINTS.CAJA_MOVIMIENTO.CREAR_MOVIMIENTO}`, body);
    return res.data;
}
