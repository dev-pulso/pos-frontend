import type { Productos } from "@/app/interface/productos.interface";
import { useCallback, useEffect, useState } from "react";

export function useProductos() {
  const [products, setProducts] = useState<Productos[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    // setProducts(store.getProducts())
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    (product: Productos) => {
      // store.saveProductos(product)
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      // store.deleteProduct(id)
      refresh();
    },
    [refresh]
  );

  return { products, loading, refresh, save, remove };
}
