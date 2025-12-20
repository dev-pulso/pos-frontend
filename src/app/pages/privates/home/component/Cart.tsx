import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatNumberInputCOP } from "@/lib/utils";
import { ArrowRightLeft, Banknote, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "@/app/interface/cart.interface";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Cart({
  cart,
  setCart,
}: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) {
  const {
    descuento,
    descuentoSelect,
    imprimirTicket,
    editingQuantities,
    setDescuento,
    setEditingQuantities,
    setIsEditingQuantity,
    setMetodoPago,
    setCashReceived,
    cashReceived,
    subtotal,
    cashAmount,
    metodoPago,
    total,
    change,
    removeFromCart,
    updateQuantity,
    handleImprimirTicket,
    handleVentas,
  } = useCart(cart, setCart);

  return (
    <div className="w-[380px] p-6 border-l flex flex-col h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold mb-4">
          <ShoppingCart className="inline-block mr-2" />
          Carrito
        </h2>
        <Badge>
          {cart.reduce((sum, item) => sum + item.cantidad, 0)} items
        </Badge>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.nombre}</p>

                {item.pesoEnGramos ? (
                  <p className="text-sm text-gray-500">
                    {item.pesoEnGramos} g × {formatCurrency(item.total ?? 0)}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {item.cantidad} {item.unidadMedida ?? "unid"} ×{" "}
                    {formatCurrency(item.precio)}
                  </p>
                )}
                {/* <p className="font-medium">{item.nombre}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.cantidad} {item.unidadMedida ?? "unid"} × ${item.precio.toLocaleString()}
                                    </p> */}
              </div>
              <div className="flex items-center gap-2">
                {!item.pesoEnGramos && (
                  <>
                    <button
                      onClick={() => {
                        const newCantidad = item.cantidad - 1;
                        if (newCantidad < 1) return;
                        updateQuantity(item.id, newCantidad);
                        setEditingQuantities((prev) => ({
                          ...prev,
                          [item.id]: String(newCantidad),
                        }));
                      }}
                      disabled={item.cantidad <= 1}
                      className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      –
                    </button>

                    <Input
                      type="number"
                      min="1"
                      value={
                        editingQuantities[item.id] ?? String(item.cantidad)
                      }
                      className="w-16 text-center"
                      onFocus={() => {
                        setIsEditingQuantity(true);
                        // si aún no hay valor en edición, inicializar con la cantidad actual
                        setEditingQuantities((prev) => ({
                          ...prev,
                          [item.id]: prev[item.id] ?? String(item.cantidad),
                        }));
                      }}
                      onBlur={() => {
                        setIsEditingQuantity(false);

                        // al salir del input, normalizamos el valor
                        const raw =
                          editingQuantities[item.id] ?? String(item.cantidad);
                        const parsed = parseInt(raw, 10);

                        if (isNaN(parsed) || parsed < 1) {
                          // si está vacío o es inválido, volvemos al valor actual (>=1)
                          const safeCantidad = item.cantidad || 1;
                          setEditingQuantities((prev) => ({
                            ...prev,
                            [item.id]: String(safeCantidad),
                          }));
                        } else {
                          setEditingQuantities((prev) => ({
                            ...prev,
                            [item.id]: String(parsed),
                          }));
                          updateQuantity(item.id, parsed);
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value;

                        // permitimos vacío para que el usuario pueda borrar y reescribir
                        setEditingQuantities((prev) => ({
                          ...prev,
                          [item.id]: value,
                        }));
                      }}
                    />

                    <button
                      onClick={() => {
                        const newCantidad = item.cantidad + 1;
                        updateQuantity(item.id, newCantidad);
                        setEditingQuantities((prev) => ({
                          ...prev,
                          [item.id]: String(newCantidad),
                        }));
                      }}
                      className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </>
                )}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Descuento</span>
            <Select
              value={descuento.toString()}
              onValueChange={(value) => setDescuento(Number(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="0%" />
              </SelectTrigger>
              <SelectContent>
                {descuentoSelect.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-foreground">
              Imprimir Ticket
            </span>
            <Checkbox
              checked={imprimirTicket}
              onCheckedChange={handleImprimirTicket}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-sm font-medium text-foreground">
                Efectivo Recibido
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={cashReceived}
                onChange={(e) => {
                  const formatted = formatNumberInputCOP(e.target.value);
                  setCashReceived(formatted);
                }}
                className="text-lg w-32 text-right"
              />
            </div>
            {cashAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cambio</span>
                <span
                  className={`font-bold ${change >= 0 ? "text-foreground" : "text-destructive"
                    }`}
                >
                  {formatCurrency(change)}
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={metodoPago === "efectivo" ? "default" : "outline"}
              onClick={() => setMetodoPago("efectivo")}
              className={metodoPago === "efectivo" ? "bg-primary text-primary-foreground" : ""}
            >
              <Banknote className="mr-2 h-4 w-4" />
              Efectivo
            </Button>
            {/* <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className={paymentMethod === "card" ? "bg-primary text-primary-foreground" : ""}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Tarjeta
              </Button> */}
            <Button
              variant={metodoPago === "transferencia" ? "default" : "outline"}
              onClick={() => setMetodoPago("transferencia")}
              className={metodoPago === "transferencia" ? "bg-primary text-primary-foreground" : ""}
            >
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Transferencia
            </Button>
          </div>
        </div>
        <Button
          disabled={cart.length === 0 && cashAmount === 0}
          onClick={handleVentas}
          className="mt-4 w-full cursor-pointer"
        >
          Cobrar {formatCurrency(total)}
        </Button>
      </div>
    </div>
  );
}
