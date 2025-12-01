import { ShoppingCart, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <ShoppingCart className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Tienda Oriental
          </h1>
          <p className="text-xs text-muted-foreground">
            Sistema de Punto de Venta
          </p>
        </div>
      </div>

      {/* Ilustración 404 */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2">
          <span className="text-8xl font-bold text-primary">4</span>
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
              <Search className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-ping" />
          </div>
          <span className="text-8xl font-bold text-primary">4</span>
        </div>
      </div>

      {/* Mensaje de error */}
      <div className="text-center mb-10 max-w-md">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground">
          La página que buscas no existe o ha sido movida. Verifica la URL o
          regresa al inicio del sistema.
        </p>
      </div>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="gap-2">
          <Link to="/auth">
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="gap-2 bg-transparent"
        >
          <Link to="/auth">
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </Link>
        </Button>
      </div>

      {/* Código de error */}
      <div className="mt-12 px-4 py-2 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground font-mono">
          Error 404 • Recurso no disponible
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Tienda Oriental • Versión 1.0.0
        </p>
      </div>
    </div>
  );
}
