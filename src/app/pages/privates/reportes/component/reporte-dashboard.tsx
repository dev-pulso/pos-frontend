"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
} from "lucide-react";
import { calculateProfit, formatCurrency } from "@/lib/utils";
import type { Productos } from "@/app/interface/productos.interface";
import type { MovimientoInventario } from "@/app/interface/inventario.interface";
import type { Ventas } from "@/app/interface/ventas.interface";

interface ReportsDashboardProps {
  sales: Ventas[];
  products: Productos[];
  movimientosInventario: MovimientoInventario[];
}

export function ReportsDashboard({
  sales,
  products,
  movimientosInventario,
}: ReportsDashboardProps) {
  const [period, setPeriod] = useState<"today" | "week" | "month" | "year">(
    "month"
  );

  const getFilteredSales = () => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    return sales.filter((sale) => new Date(sale.createdAt) >= startDate);
  };

  const getFilteredMovements = () => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    return movimientosInventario.filter(
      (m) => new Date(m.createdAt) >= startDate
    );
  };

  const filteredSales = getFilteredSales();
  const filteredMovements = getFilteredMovements();
  const stats = calculateProfit(filteredSales);

  // Calculate top selling products
  const productSales: Record<
    string,
    { name: string; quantity: number; revenue: number }
  > = {};
  filteredSales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (!productSales[item.productoId]) {
        productSales[item.productoId] = {
          name: item.nombre || "",
          quantity: 0,
          revenue: 0,
        };
      }
      productSales[item.productoId].quantity += item.cantidad || 0;
      productSales[item.productoId].revenue += item.subtotal;
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Calculate losses and returns
  const losses = filteredMovements.filter((m) => m.tipo === "perdida");
  const returns = filteredMovements.filter((m) => m.tipo === "devolucion");

  const totalLossQuantity = losses.reduce((sum, m) => sum + m.cantidad, 0);
  const totalReturnQuantity = returns.reduce((sum, m) => sum + m.cantidad, 0);

  // Estimate loss value
  const lossValue = losses.reduce((sum, m) => {
    const product = products.find((p) => p.id === m.productoId);
    return sum + (product?.costo || 0) * m.cantidad;
  }, 0);

  const periodLabels = {
    today: "Hoy",
    week: "Esta Semana",
    month: "Este Mes",
    year: "Este Año",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Reporte: {periodLabels[period]}
        </h2>
        <Select
          value={period}
          onValueChange={(v) => setPeriod(v as typeof period)}
        >
          <SelectTrigger className="w-40 bg-background text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoy</SelectItem>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mes</SelectItem>
            <SelectItem value="year">Este Año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos Totales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(stats.revenue)}
            </p>
            <p className="text-xs text-muted-foreground">
              {filteredSales.length} transacciones
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Costo Total
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(stats.cost)}
            </p>
            <p className="text-xs text-muted-foreground">
              Costo de productos vendidos
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ganancia Neta
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                stats.profit >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {formatCurrency(stats.profit)}
            </p>
            <p className="text-xs text-muted-foreground">
              Margen:{" "}
              {stats.revenue > 0
                ? ((stats.profit / stats.revenue) * 100).toFixed(1)
                : 0}
              %
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pérdidas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(lossValue)}
            </p>
            <p className="text-xs text-muted-foreground">
              {totalLossQuantity} unidades perdidas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay ventas en este período
              </p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.quantity} vendidos
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">
                      {formatCurrency(product.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Devoluciones y Pérdidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-2">
                    <Package className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Devoluciones</p>
                    <p className="text-sm text-muted-foreground">
                      {returns.length} movimientos
                    </p>
                  </div>
                </div>
                <Badge className="bg-accent/10 text-accent">
                  {totalReturnQuantity} unidades
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-destructive/10 p-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Pérdidas/Mermas
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {losses.length} movimientos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-destructive/10 text-destructive">
                    {totalLossQuantity} unidades
                  </Badge>
                  <p className="mt-1 text-sm font-medium text-destructive">
                    {formatCurrency(lossValue)}
                  </p>
                </div>
              </div>

              {losses.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Detalle de Pérdidas
                  </p>
                  <div className="space-y-2">
                    {losses.slice(0, 5).map((loss) => (
                      <div
                        key={loss.id}
                        className="flex justify-between text-sm border-b border-border pb-2"
                      >
                        <span className="text-foreground">
                          {loss.productoNombre}
                        </span>
                        <span className="text-destructive">
                          -{loss.cantidad} unidades
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">
            Resumen por Método de Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {(["efectivo", "transferencia"] as const).map((method) => {
              const methodSales = filteredSales.filter(
                (s) => s.metodoPago === method
              );
              const methodTotal = methodSales.reduce(
                (sum, s) => sum + s.total,
                0
              );
              const labels = {
                efectivo: "Efectivo",
                transferencia: "Transferencia",
              };

              return (
                <div key={method} className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    {labels[method]}
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(methodTotal)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {methodSales.length} transacciones
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
