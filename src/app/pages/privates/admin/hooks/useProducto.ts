import type { ProductoResponse } from "@/app/interface/productos.interface";
import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../../home/services/productos.services";
import { useMemo } from "react";

export const useProductos = () => {

    const productosQuery = useQuery<ProductoResponse[], Error>({
        queryKey: ["productos"],
        queryFn: getProductos,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });


    const productos = useMemo(() => {
        return productosQuery.data
    }, [productosQuery.data])

    return {
        productos
    }
}