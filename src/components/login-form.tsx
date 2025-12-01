import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import Logo from "@/assets/image/logo.png";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Eye, EyeOff, Vegan } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/app/pages/public/login/hooks/useLogin";
import { useAuthStore } from "@/store/auth.store";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { mutate } = useLogin();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usuario || !password) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    mutate(
      { username: usuario, password },
      {
        onSuccess: (data) => {
          login(data.user, data.accessToken);
          navigate("/inicio");
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
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión para continuar
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Usuario</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Usuario"
                  required
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
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
                <Button type="submit">Iniciar sesión</Button>
              </Field>
              <FieldDescription className="text-center">
                ¿No tienes una cuenta?{" "}
                <Link to="/auth/register">Registrate</Link>
              </FieldDescription>
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
