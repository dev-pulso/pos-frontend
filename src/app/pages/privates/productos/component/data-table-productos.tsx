"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react";
import type { Productos } from "@/app/interface/productos.interface";
import { formatCurrency } from "@/lib/utils";

interface ProductTableProps {
  products: Productos[];
  onEdit: (product: Productos) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode?.includes(search)
  );

  const getStockBadge = (product: Productos) => {
    if (product.stock === 0) {
      return (
        <Badge
          variant="destructive"
          className="bg-destructive text-destructive-foreground"
        >
          Sin stock
        </Badge>
      );
    }
    if (product.stock <= 10) {
      return (
        <Badge className="bg-warning text-warning-foreground">Stock bajo</Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-green-500 text-green-50">
        {product.stock}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, categoría o código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-background text-foreground"
        />
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Producto</TableHead>
              <TableHead className="text-muted-foreground">Categoría</TableHead>
              <TableHead className="text-muted-foreground">Costo</TableHead>
              <TableHead className="text-muted-foreground">Precio</TableHead>
              <TableHead className="text-muted-foreground">Ganancia</TableHead>
              <TableHead className="text-muted-foreground">Stock</TableHead>
              <TableHead className="text-muted-foreground w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No se encontraron productos
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-border">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {product.nombre}
                      </p>
                      {product.barcode && (
                        <p className="text-xs text-muted-foreground">
                          {product.barcode}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-border text-foreground"
                    >
                      {product.categoria.nombre}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {formatCurrency(product.costo)}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {formatCurrency(product.precio)}
                  </TableCell>
                  <TableCell className="text-green-500 font-medium">
                    {formatCurrency(product.precio - product.costo)}
                  </TableCell>
                  <TableCell>{getStockBadge(product)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(product)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(product.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
