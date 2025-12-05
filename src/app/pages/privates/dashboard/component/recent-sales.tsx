import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import type { Sale } from "@/lib/types"

interface RecentSalesProps {
  sales: any[];
}

export function RecentSales({ sales }: RecentSalesProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Ventas Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No hay ventas recientes
          </p>
        ) : (
          <div className="space-y-4">
            {sales.slice(0, 10).map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    Venta #{sale.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sale.items.length} producto(s) •{" "}
                    {formatTime(sale.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrency(sale.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
