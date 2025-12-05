import { CashRegisterPanel } from "./component/cash-register";

export default function Caja() {
  const { register, open, close, addMovement } = useCashRegister();
  return (
    <div className="space-y-6">
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
          onOpen={open}
          onClose={close}
          onAddMovement={addMovement}
        />
      </div>
    </div>
  );
}
