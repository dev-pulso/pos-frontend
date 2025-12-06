import { CashRegisterPanel } from "./component/cash-register";
import { useCajaRegistradora } from "./hooks/useCajaRegistradora";

export default function Caja() {
  const { register, abrirCaja, cerrarCaja, agregarMovimiento } =
    useCajaRegistradora();
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

      <div className="max-w-xl">
        <CashRegisterPanel
          register={register}
          onOpen={abrirCaja}
          onClose={cerrarCaja}
          onAddMovement={agregarMovimiento}
        />
      </div>
    </div>
  );
}
