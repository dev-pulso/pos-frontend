import type { Productos } from "./productos.interface";

export interface CartItem extends Productos {
    cantidad: number,
    total?: number,
    pesoEnGramos?: number,
}

