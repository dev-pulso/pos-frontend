import { SearchIcon, ShoppingCart, Trash2, X } from "lucide-react";
import { POSHeader } from "./component/PosHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHome } from "./hooks/useHome";
import { formatCurrency, formatNumberInputCOP } from "@/lib/utils";
import Cart from "./component/Cart";

export default function HomePage() {
  const {
    handleScan,
    barcode,
    searchResults,
    handleAddProduct,
    convertirGramosAKg,
    setBarcode,
    productos,
    selectedProduct,
    cart,
    setCart,
  } = useHome();

  return (
    <div className="flex w-full h-screen">
      {/* IZQUIERDA */}
      <div className="flex-1 flex flex-col p-6">
        <POSHeader />
        <InputGroup className="text-lg p-3 mb-4">
          <InputGroupInput
            placeholder="Buscar por nombre o código de barras..."
            autoFocus
            value={barcode}
            onChange={async (e) => {
              const value = e.target.value;
              handleScan(value);
            }}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            onClick={() => setBarcode("")}
            className="cursor-pointer"
          >
            <X />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex flex-wrap gap-4 ">
          <div className="flex-1 overflow-y-auto h-[calc(100vh-150px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {productos?.map((product) => (
                <Card
                  key={product.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow gap-2"
                  onClick={() => handleAddProduct(product)}
                >
                  <div className="h-16 rounded-md flex items-center justify-center">
                    <img
                      // src={getCategoryLogo(product.categoria.nombre)}
                      alt={product.categoria.nombre}
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3 className="font-semibold text-sm  text-balance">
                    {product.nombre}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">
                      $ {formatNumberInputCOP(product.precio.toString())}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {product.unidadMedida === "kg"
                        ? convertirGramosAKg(product.stock) + "kg"
                        : product.stock + "unid."}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* CARRITO DE COMPRAS */}

      <Cart cart={cart} setCart={setCart} />

      {/* DERECHA
      <div className="w-[380px] p-6 border-l flex flex-col">
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
                                    </p> 
                </div>
                <div className="flex items-center gap-2">
                  {!item.pesoEnGramos && (
                    <>
                      <button
                        onClick={() => {
                          const newCantidad = item.cantidad - 1;
                          if (newCantidad < 1) return;
                          updateCart(item, newCantidad);
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
                            updateCart(item, safeCantidad);
                          } else {
                            updateCart(item, parsed);
                            setEditingQuantities((prev) => ({
                              ...prev,
                              [item.id]: String(parsed),
                            }));
                          }
                        }}
                        onChange={(e) => {
                          const value = e.target.value;

                          // permitimos vacío para que el usuario pueda borrar y reescribir
                          setEditingQuantities((prev) => ({
                            ...prev,
                            [item.id]: value,
                          }));

                          // actualizar en tiempo real solo cuando el valor es válido
                          const parsed = parseInt(value, 10);
                          if (!isNaN(parsed) && parsed >= 1) {
                            updateCart(item, parsed);
                          }
                        }}
                      />

                      <button
                        onClick={() => {
                          const newCantidad = item.cantidad + 1;
                          updateCart(item, newCantidad);
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
              <span className="text-lg font-semibold text-foreground">
                Total
              </span>
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
                onCheckedChange={() => setImprimirTicket((prev) => !prev)}
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
                    className={`font-bold ${
                      change >= 0 ? "text-foreground" : "text-destructive"
                    }`}
                  >
                    {formatCurrency(change)}
                  </span>
                </div>
              )}
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
      </div> */}

      {/* MODAL DE CANTIDAD / UNIDAD 
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar producto</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Label>Gramos</Label>
            <Input
              type="number"
              min="0"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />

            {/* <Select value={unidadMedida} onValueChange={setUnidadMedida}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar unidad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unidad">Unidad</SelectItem>
                                <SelectItem value="kg">Kg</SelectItem>
                                <SelectItem value="g">Gramos</SelectItem>
                                <SelectItem value="lb">Libras</SelectItem>
                            </SelectContent>
                        </Select> 

            {selectedProduct && (
              <p className="mt-3 text-green-700 font-medium">
                Precio:
                {formatCurrency(
                  calcularPrecioUnidadMedida(
                    selectedProduct,
                    parseFloat(cantidad || "0")
                  )
                )}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmAddToCart}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      */}
    </div>
  );
}
