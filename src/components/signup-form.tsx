import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Eye, EyeOff, Vegan } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Rols } from "@/app/interface/productos.interface";
import { useRegister } from "@/app/pages/public/register/hooks/useRegistrar";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState("super_admin");
  const [nombres, setNombres] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate } = useRegister();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(
      {
        nombres,
        username: usuario,
        password,
        rol: rol as Rols,
      },
      {
        onSuccess: () => {
          toast.success("Usuario registrado exitosamente");
          navigate("/punto-venta");
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Registrate</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Ingresa tus datos para crear tu cuenta
                </p>
              </div>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="nombres">Nombres</FieldLabel>
                  <Input
                    id="nombres"
                    type="text"
                    placeholder="Nombres"
                    required
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="usuario">Usuario</FieldLabel>
                  <Input
                    id="usuario"
                    type="text"
                    placeholder="Usuario"
                    required
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </Field>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="rol">Rol</FieldLabel>
                    <Select onValueChange={(value) => setRol(value)}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectLabel>Rol</SelectLabel>
                          <SelectItem value={Rols.SUPER_ADMIN}>
                            Super Admin
                          </SelectItem>
                          <SelectItem value={Rols.ADMIN}>Admin</SelectItem>
                          <SelectItem value={Rols.CASHIER}>Cajero</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit">Registrate</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                ¿Ya tienes una cuenta? <Link to="/auth">Inicia sesión</Link>
              </FieldSeparator>
            </FieldGroup>
          </form>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Vegan className="h-40 w-40" />
              <p className="text-center text-5xl font-bold">Tienda Oriental</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
