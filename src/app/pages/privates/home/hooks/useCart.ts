import type { CartItem } from "@/app/interface/cart.interface";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { crearVenta } from "../services/home.services";
import type { VentasResponse, VentasDto, DetalleVentas } from "@/app/interface/ventas.interface";

export const useCart = (cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
    const [descuento, setDescuento] = useState(0)
    const [imprimirTicket, setImprimirTicket] = useState<boolean>(false)
    const [editingQuantities, setEditingQuantities] = useState<Record<string, string>>({});
    const [isEditingQuantity, setIsEditingQuantity] = useState(false)
    const [cashReceived, setCashReceived] = useState("")
    const [metodoPago, setMetodoPago] = useState<"efectivo" | "transferencia">("efectivo")
    const [message, setMessage] = useState("")

    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.user)

    let subtotal = cart.reduce((sum, p) => {
        if (p.pesoEnGramos) {
            return sum + (p.precio * p.pesoEnGramos) / 1000
        }
        return sum + (p.precio * p.cantidad)
    }, 0)


    const discount = subtotal * descuento / 100
    let total = subtotal - discount
    const cashAmount = cashReceived ? Number.parseInt(cashReceived.replace('.', '')) : 0
    const change = cashAmount - total


    const handleImprimirTicket = () => setImprimirTicket(!imprimirTicket)


    const descuentoSelect = [
        { label: "0%", value: 0 },
        { label: "1%", value: 1 },
        { label: "2%", value: 2 },
        { label: "3%", value: 3 },
        { label: "4%", value: 4 },
        { label: "5%", value: 5 },
        { label: "6%", value: 6 },
        { label: "7%", value: 7 },
        { label: "8%", value: 8 },
    ];

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(p => p.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, cantidad: quantity }
            }
            return item
        }))
    }

    const mutationVentas = useMutation<VentasResponse, Error, VentasDto>({
        mutationFn: crearVenta,
    })

    const handleVentas = () => {
        const newDetalleVenta: DetalleVentas[] = []

        cart.map((venta) => {
            if (venta.pesoEnGramos) {
                const detalleVenta: DetalleVentas = {
                    productoId: venta.id,
                    gramos: venta.pesoEnGramos,
                    precioUnitario: venta.precio,
                    subtotal: (venta.precio * venta.pesoEnGramos) / 1000
                }
                newDetalleVenta.push(detalleVenta)
            } else {
                const detalleVenta: DetalleVentas = {
                    productoId: venta.id,
                    cantidad: venta.cantidad,
                    precioUnitario: venta.precio,
                    subtotal: venta.precio * venta.cantidad
                }
                newDetalleVenta.push(detalleVenta)
            }
        })

        const nuevaVenta: VentasDto = {
            detalles: newDetalleVenta,
            total: total,
            subtotal: subtotal,
            cashRecibido: cashAmount,
            imprimirFactura: imprimirTicket,
            usuario: user?.nombres || "",
            descuento: discount || 0,
            metodoPago: metodoPago
        }

        mutationVentas.mutate(nuevaVenta, {
            onSuccess() {
                setMessage("Venta registrada exitosamente")
                setCart([])
                total = 0
                subtotal = 0
                setCashReceived('')
                queryClient.invalidateQueries({
                    queryKey: ['reporteVentasXDia', 'productos'],
                })
            },
            onError(error: any) {
                const errorMessage = error.response?.data?.message || 'Error desconocido';
                setMessage(errorMessage)
            },
        })
    }


    return {
        handleVentas,
        setDescuento,
        setImprimirTicket,
        handleImprimirTicket,
        // setCart, // Removed as it's now an argument
        setEditingQuantities,
        setIsEditingQuantity,
        removeFromCart,
        updateQuantity,
        setCashReceived,
        setMetodoPago,
        descuento,
        descuentoSelect,
        imprimirTicket,
        // cart, // Removed as it's now an argument
        editingQuantities,
        isEditingQuantity,
        cashReceived,
        subtotal,
        discount,
        cashAmount,
        total,
        change,
        message,
        metodoPago,
    }
}