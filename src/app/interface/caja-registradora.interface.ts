export interface MovimientoCaja {
    id: string
    tipo: "venta" | "compra" | "deposito" | "retiro" | "cierre"
    monto: number
    descripcion: string
    balance: number
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