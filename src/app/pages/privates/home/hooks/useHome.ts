import type { CartItem } from "@/app/interface/cart.interface";
import type { Productos, UnidadMedida } from "@/app/interface/productos.interface";
import { useRef, useState } from "react";
import { useProductos } from "../../admin/hooks/useProducto";

type Timeout = ReturnType<typeof setTimeout>;

export const useHome = () => {

    const scanTimeout = useRef<Timeout>(null!);
    const [barcode, setBarcode] = useState('')
    const [searchResults, setSearchResults] = useState<Productos[]>([])
    const [cart, setCart] = useState<CartItem[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Productos | null>(null)
    const [imprimirTicket, setImprimirTicket] = useState<boolean>(false)
    const [descuento, setDescuento] = useState<number>(0)
    const [cantidad, setCantidad] = useState<string>('1')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [unidadMedida, setUnidadMedida] = useState<UnidadMedida>('unidad')

    const { productos } = useProductos()

    const handleScan = (val: string) => {
        const isNumber = /^\d+$/.test(val)
        const isString = /^[a-zA-Z\s]+$/.test(val)

        const value = val.trim()
        setBarcode(value)

        if (scanTimeout.current) clearTimeout(scanTimeout.current)

        scanTimeout.current = setTimeout(() => {
            const code = value.trim()

            let product = null
            if (isNumber) {
                product = productos?.find(p => p.barcode === code)
                if (code.length > 0 && product) {
                    handleAddProduct(product)
                    setBarcode("")
                }
            } else if (isString) {
                const match = productos?.find(p => p.nombre.toLowerCase().includes(code.toLowerCase()))

                setSearchResults(match ? [match] : [])
            }


        }, 200)

    }
    const handleAddProduct = (product: Productos) => {

        const existing = cart.find(p => p.id === product.id)
        if (existing) {
            existing.cantidad += 1
            setSelectedProduct(product)
            setCantidad(existing.cantidad.toString())
            // setUnidadMedida(existing.unidadMedida ?? "unidad")
            // setIsDialogOpen(true)
            return
        }

        // Categorías con unidades especiales
        const categoriasConUnidad = ["Verduras", "Frutas", "Granos"]

        if (categoriasConUnidad.includes(product.categoria.nombre)) {

            setSelectedProduct(product)
            setCantidad("1")
            setUnidadMedida("kg")

            setIsDialogOpen(true)
        } else {
            // Agregar directo con 1 unidad
            setCart(prev => [...prev, { ...product, cantidad: 1 }])
        }
    }
    const calcularPrecioUnidadMedida = (producto: Productos, cantidad: number) => {
        const precioBase = producto.precio
        return precioBase * (cantidad / 1000)
    }
    const handleImprimirTicket = () => setImprimirTicket(!imprimirTicket)
    const convertirGramosAKg = (gramos: number) => gramos / 1000;


    return {
        handleScan,
        calcularPrecioUnidadMedida,
        handleAddProduct,
        handleImprimirTicket,
        convertirGramosAKg,
        barcode,
        searchResults,
        cart,
        selectedProduct,
        imprimirTicket,
        descuento,
        cantidad,
        isDialogOpen,
        unidadMedida,
        productos,
        setIsDialogOpen,
        setUnidadMedida,
        setDescuento,
        setCantidad,
        setBarcode,
        setCart
    }
}