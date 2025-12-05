import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  todaySales: number;
  monthSales: number;
  todayProfit: number;
  monthProfit: number;
  totalProducts: number;
  lowStockCount: number;
}

export function StatsCards({
  todaySales,
  monthSales,
  todayProfit,
  monthProfit,
  totalProducts,
  lowStockCount,
}: StatsCardsProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);

  const stats = [
    {
      title: "Ventas Hoy",
      value: formatCurrency(todaySales),
      icon: ShoppingCart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Ventas del Mes",
      value: formatCurrency(monthSales),
      icon: TrendingUp,
      color: "text-green",
      bgColor: "bg-green-100",
    },
    {
      title: "Ganancia Hoy",
      value: formatCurrency(todayProfit),
      icon: DollarSign,
      color: "text-green",
      bgColor: "bg-green-100",
    },
    {
      title: "Ganancia del Mes",
      value: formatCurrency(monthProfit),
      icon: TrendingUp,
      color: "text-green",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Productos",
      value: totalProducts.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Stock Bajo",
      value: lowStockCount.toString(),
      icon: AlertTriangle,
      color: lowStockCount > 0 ? "text-red" : "text-green",
      bgColor: lowStockCount > 0 ? "bg-red-100" : "bg-green-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mt-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={cn("rounded-lg p-2", stat.bgColor)}>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
