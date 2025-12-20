import type { AbrirCajaDto, CajaRegistradora, CajaResponse, CerrarCajaDto, CrearMovimientoDto, MovimientoCaja } from "@/app/interface/caja-registradora.interface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { abrirCajaRegistradora, cajaAbierta, cerrarCajaRegistradora, crearMovimiento } from "../services/caja.service"

export const useCajaRegistradora = () => {
    const queryClient = useQueryClient()
    const [register, setRegister] = useState<CajaRegistradora | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { data, error: queryError } = useQuery<any, any, CajaResponse>({
        queryKey: ["CajaAbiertaKey"],
        queryFn: cajaAbierta,
        retry: 1,
    })

    const { mutate: crearMovimientoMutation } = useMutation<any, Error, CrearMovimientoDto>({
        mutationFn: crearMovimiento,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["CajaAbiertaKey"]
            })
        }
    })


    const { mutate: abrirCajaMutation } = useMutation<any, Error, AbrirCajaDto>({
        mutationFn: abrirCajaRegistradora,
        onSuccess: (data) => {
            setRegister(data)
            queryClient.invalidateQueries({
                queryKey: ["CajaAbiertaKey"]
            })
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const { mutate: cerrarCajaMutation } = useMutation<any, Error, { id: string, body: CerrarCajaDto }>({
        mutationFn: (params) => cerrarCajaRegistradora(params.id, params.body),
        onSuccess: (data) => {
            setRegister(null)
            queryClient.invalidateQueries({
                queryKey: ["CajaAbiertaKey"]
            })
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const agregarMovimiento = (tipo: MovimientoCaja["tipo"], monto: number, descripcion: string) => {
        if (!register) return
        register.movimientos.push({
            id: crypto.randomUUID(),
            monto: String(monto),
            tipo,
            descripcion,
            balanceActual: String(register.balanceActual + monto),
            balanceAnterior: String(register.balanceActual),
            createdAt: new Date().toISOString(),
        })
        setRegister({ ...register })
    }

    const abrirCaja = (monto: number) => {
        const caja: CajaRegistradora = {
            id: crypto.randomUUID(),
            montoInicial: monto,
            movimientos: [],
            balanceActual: monto,
            estaAbierta: true,
            fechaApertura: new Date().toISOString(),
        }
        setRegister(caja)
    }

    // const cerrarCaja = () => {
    //     if (!register) return
    //     // register.movimientos.push({
    //     //     id: crypto.randomUUID(),
    //     //     monto: String(register.balanceActual),
    //     //     tipo: "cierre",
    //     //     descripcion: "Cierre de caja",
    //     //     balanceActual: String(register.balanceActual),
    //     //     createdAt: new Date().toISOString(),
    //     // })
    //     // register.fechaCierre = new Date().toISOString()
    //     // register.estaAbierta = false
    //     // setRegister({ ...register })
    //     cerrarCajaMutation()
    // }

    const registradoraAbierta = useMemo(() => {
        if (!data) return null
        const fechaApertura = new Date(data.fechaApertura)
        const caja: CajaRegistradora = {
            id: data.id,
            montoInicial: Number(data.saldoInicial),
            movimientos: data.movimientos,
            balanceActual: Number(data.saldoEsperado),
            estaAbierta: data.estado === "abierta" ? true : false,
            fechaApertura: fechaApertura.toISOString(),
            fechaCierre: null!,
        }
        return caja
    }, [data])




    return {
        register,
        registradoraAbierta,
        agregarMovimiento,
        abrirCaja,
        // cerrarCaja,
        abrirCajaMutation,
        cerrarCajaMutation,
        queryError,
        crearMovimientoMutation
    }

}