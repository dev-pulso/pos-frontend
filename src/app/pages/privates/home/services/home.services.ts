import api from "@/api/api";
import { ENDPOINTS } from "@/api/endpoint";
import type { Reportes, ReportesventasResponse, VentasDto, VentasResponse } from "@/app/interface/ventas.interface";


export const crearVenta = async (body: VentasDto): Promise<VentasResponse> => {
    const response = await api.post(`${ENDPOINTS.VENTAS.CREAR_VENTAS}`, body)
    return response.data
}
export const obtenerReporteVentas = async (fechaInicial: Date, fechaFinal: Date): Promise<any> => {

    const res = await api.get(`${ENDPOINTS.build(ENDPOINTS.VENTAS.REPORTE_VENTAS)}`, {
        params: {
            fechaInicial: fechaInicial.toISOString().split('T')[0],
            fechaFinal: fechaFinal.toISOString().split('T')[0],
        }
    });

    return res.data;
}
export const obtenerReporteVentasXdia = async (): Promise<ReportesventasResponse> => {

    const res = await api.get(`${ENDPOINTS.build(ENDPOINTS.VENTAS.REPORTE_VENTAS_DIA)}`);

    return res.data;
}
export const obtenerReporteVentasDiarias = async (fechaInicial: Date, fechaFinal: Date): Promise<Reportes> => {

    const res = await api.get(`${ENDPOINTS.build(ENDPOINTS.VENTAS.REPORTE_VENTAS_X_DIA)}`, {
        params: {
            fechaInicial: fechaInicial.toISOString().split('T')[0],
            fechaFinal: fechaFinal.toISOString().split('T')[0],
        }
    });

    return res.data;
}

export const obtenerReporteVentasMensual = async (year: string): Promise<Reportes> => {

    const res = await api.get(`${ENDPOINTS.build(ENDPOINTS.VENTAS.REPORTE_VENTAS_MENSUAL)}`, {
        params: {
            year,
        }
    });

    return res.data;
}

