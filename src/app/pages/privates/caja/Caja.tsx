import { toast } from "sonner";
import { CashRegisterPanel } from "./component/cash-register";
import { useCajaRegistradora } from "./hooks/useCajaRegistradora";

export default function Caja() {
  const { queryError, abrirCaja, agregarMovimiento, registradoraAbierta } =
    useCajaRegistradora();

  if (queryError) {
    toast.error('',
      {
        description: queryError.response?.data.message as any,
      }
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Caja Registradora
        </h1>
        <p className="text-muted-foreground">
          Administra el flujo de efectivo de tu tienda
        </p>
      </div>
      <div className="flex justify-center">

        <div className="max-w-xl">
          <CashRegisterPanel
            register={registradoraAbierta!}
            onOpen={abrirCaja}
            onAddMovement={agregarMovimiento}
          />
        </div>
      </div>

    </div>
  );
}
