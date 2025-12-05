import type { Productos } from "@/app/interface/productos.interface";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductForm } from "./component/producto-form";
import { ProductTable } from "./component/data-table-productos";
import { useProductos } from "../admin/hooks/useProducto";

export default function Productos() {
  const { productos } = useProductos();
  // const { categories } = useCategories();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Productos | null>(
    null
  );

  const handleEdit = (product: Productos) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleSave = (product: Productos) => {
    // save(product);
    setFormOpen(false);
    setSelectedProduct(null);
  };

  const remove = (id: string) => {
    // deleteProduct(id);
    setFormOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Productos</h1>
          <p className="text-muted-foreground">
            Administra el catálogo de productos de tu tienda
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <ProductTable
        products={productos!}
        onEdit={handleEdit}
        onDelete={remove}
      />

      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
        categories={[]}
      />
    </div>
  );
}
