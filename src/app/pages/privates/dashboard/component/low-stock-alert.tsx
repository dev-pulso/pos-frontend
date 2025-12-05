import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import type { Productos } from "@/app/interface/productos.interface";

interface LowStockAlertProps {
  products: Productos[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <CardTitle className="text-foreground">Alertas de Stock Bajo</CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Todos los productos tienen stock suficiente
          </p>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg bg-muted p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {product.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.categoria.nombre}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="destructive"
                    className="bg-destructive text-destructive-foreground"
                  >
                    {product.stock} unidades
                  </Badge>
                  <span className="text-xs text-muted-foreground">Mín: 5</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
