import type { ProductoResponse } from "./productos.interface";

export interface CategoriaDto {
    nombre: string;
}
export interface CategoriaResponse {
    id: string;
    nombre: string;
    productos: ProductoResponse[];
}