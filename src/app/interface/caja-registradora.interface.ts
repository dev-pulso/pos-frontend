export interface MovimientoCaja {
    id: string
    tipo: "venta" | "gasto" | "deposito" | "retiro" | "cierre"
    monto: string
    descripcion: string
    balanceActual: string
    balanceAnterior: string
    createdAt: string
}
export interface CajaRegistradora {
    id: string
    montoInicial: number
    balanceActual: number
    estaAbierta: boolean
    fechaApertura: string
    fechaCierre?: string
    movimientos: MovimientoCaja[]
}
export interface CrearMovimientoDto {
    tipo: "gasto" | "retiro" | "deposito"
    monto: number
    descripcion: string
    cajaId: string
}
export interface AbrirCajaDto {
    saldoInicial: number
    notas?: string
    usuarioId: string
}
export interface CerrarCajaDto {
    saldoFinal: number
    notas?: string
    usuarioId: string
}

export interface CajaResponse {
    id: string;
    saldoInicial: string;
    saldoFinal: null;
    saldoEsperado: string;
    saldoReal: null;
    diferencia: null;
    totalVentasEfectivo: string;
    totalTransferencias: string;
    totalGastos: string;
    totalRetiros: string;
    totalDepositos: string;
    totalMovimientos: number;
    estado: string;
    fechaApertura: Date;
    fechaCierre: null;
    notasApertura: null;
    notasCierre: null;
    usuarioAperturaId: string;
    usuarioCierreId: null;
    createdAt: Date;
    updatedAt: Date;
    movimientos: MovimientoCaja[]
}