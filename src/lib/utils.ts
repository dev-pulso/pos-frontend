import type { Ventas, VentasDto } from "@/app/interface/ventas.interface";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (isNaN(value)) return '$0';
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
}
export function formatNumberInputCOP(value: string): string {
  // Quita todo lo que no sea dígito
  const numericValue = value.replace(/\D/g, '');
  if (!numericValue) return '';

  // Convierte a número y aplica formato con puntos
  return Number(numericValue).toLocaleString('es-CO');
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateProfit(sales: Ventas[]): { revenue: number; cost: number; profit: number } {
  const revenue = sales.reduce((sum, sale) => sum + sale.total, 0)
  const cost = sales.reduce(
    (sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.precioUnitario * item.cantidad!, 0),
    0,
  )
  return { revenue, cost, profit: revenue - cost }
}

export const formatDate = (date: Date): string => {
  const fecha = new Date(date)

  console.log('fecha', fecha)

  return fecha.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const formatTime = (date: string): string =>
  new Date(date).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

