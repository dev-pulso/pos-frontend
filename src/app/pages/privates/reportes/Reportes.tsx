import { useProductos } from "../admin/hooks/useProducto";
import { ReportsDashboard } from "./component/reporte-dashboard";

export default function Reportes() {
  const { productos } = useProductos();
  const sales: any[] = [];
  const movimientosInventario: any[] = [];

  if (!productos) {
    return;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
        <p className="text-muted-foreground">
          Analiza el rendimiento de tu negocio
        </p>
      </div>

      <ReportsDashboard
        sales={sales ?? []}
        products={productos}
        movimientosInventario={movimientosInventario ?? []}
      />
    </div>
  );
}
