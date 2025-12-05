import { calculateProfit } from "@/lib/utils";
import { useProductos } from "../admin/hooks/useProducto";
import { LowStockAlert } from "./component/low-stock-alert";
import { RecentSales } from "./component/recent-sales";
import { StatsCards } from "./component/stats-cards";
import type { VentasDto } from "@/app/interface/ventas.interface";

export default function Dashboard() {
  const { productos } = useProductos();

  if (!productos) return null;
  // const todaySales = getTodaySales();
  // const monthSales = getMonthSales();

  const todaySales: VentasDto[] = [];
  const monthSales: VentasDto[] = [];

  const todayStats = calculateProfit(todaySales);
  const monthStats = calculateProfit(monthSales);

  const lowStockCount = productos.filter((p) => p.stock <= 5).length;

  return (
    <div className="px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema POS de Tienda Oriental
        </p>
      </div>

      <StatsCards
        todaySales={todayStats.revenue}
        monthSales={monthStats.revenue}
        todayProfit={todayStats.profit}
        monthProfit={monthStats.profit}
        totalProducts={productos.length}
        lowStockCount={lowStockCount}
      />

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <RecentSales sales={todaySales} />
        <LowStockAlert products={productos} />
      </div>
    </div>
  );
}
