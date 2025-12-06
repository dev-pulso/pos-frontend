export interface MovimientoInventario {
    id: string
    productoId: string
    productoNombre: string
    tipo: "entrada" | "salida" | "ajuste" | "devolucion" | "perdida"
    cantidad: number
    stockAnterior: number
    stockNuevo: number
    motivo: string
    createdAt: string
}

export interface Inventario {
    id: string
    productoId: string
    productoNombre: string
    stock: number
    createdAt: string
}
