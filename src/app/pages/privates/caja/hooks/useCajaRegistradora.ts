import type { CajaRegistradora, MovimientoCaja } from "@/app/interface/caja-registradora.interface"
import { useState } from "react"

export const useCajaRegistradora = () => {
    const [register, setRegister] = useState<CajaRegistradora | null>(null)


    const agregarMovimiento = (tipo: MovimientoCaja["tipo"], monto: number, descripcion: string) => {
        if (!register) return
        register.movimientos.push({
            id: crypto.randomUUID(),
            monto,
            tipo,
            descripcion,
            balance: register.balanceActual + monto,
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

    const cerrarCaja = () => {
        if (!register) return
        register.movimientos.push({
            id: crypto.randomUUID(),
            monto: register.balanceActual,
            tipo: "cierre",
            descripcion: "Cierre de caja",
            balance: register.balanceActual,
            createdAt: new Date().toISOString(),
        })
        register.fechaCierre = new Date().toISOString()
        register.estaAbierta = false
        setRegister({ ...register })
    }


    return {
        register,
        agregarMovimiento,
        abrirCaja,
        cerrarCaja,
    }

}