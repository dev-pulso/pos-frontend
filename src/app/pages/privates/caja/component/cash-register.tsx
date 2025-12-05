"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Plus, Minus, Lock, Unlock } from "lucide-react";
import type { CashRegister, CashMovement } from "@/lib/types";

interface CashRegisterPanelProps {
  register: CashRegister | null;
  onOpen: (amount: number) => void;
  onClose: () => void;
  onAddMovement: (
    type: CashMovement["type"],
    amount: number,
    description: string
  ) => void;
}

export function CashRegisterPanel({
  register,
  onOpen,
  onClose,
  onAddMovement,
}: CashRegisterPanelProps) {
  const [openingAmount, setOpeningAmount] = useState("");
  const [movementDialogOpen, setMovementDialogOpen] = useState(false);
  const [movementType, setMovementType] = useState<
    "expense" | "withdrawal" | "deposit"
  >("expense");
  const [movementAmount, setMovementAmount] = useState("");
  const [movementDescription, setMovementDescription] = useState("");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleOpenRegister = () => {
    const amount = Number.parseFloat(openingAmount) || 0;
    onOpen(amount);
    setOpeningAmount("");
  };

  const handleAddMovement = () => {
    const amount = Number.parseFloat(movementAmount) || 0;
    onAddMovement(movementType, amount, movementDescription);
    setMovementAmount("");
    setMovementDescription("");
    setMovementDialogOpen(false);
  };

  const getMovementIcon = (type: CashMovement["type"]) => {
    switch (type) {
      case "sale":
      case "deposit":
        return <Plus className="h-4 w-4 text-success" />;
      case "expense":
      case "withdrawal":
        return <Minus className="h-4 w-4 text-destructive" />;
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (!register || !register.isOpen) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Caja Cerrada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Abre la caja para comenzar a registrar ventas y movimientos de
            efectivo.
          </p>
          <div className="space-y-2">
            <Label htmlFor="openingAmount" className="text-foreground">
              Monto Inicial
            </Label>
            <Input
              id="openingAmount"
              type="number"
              value={openingAmount}
              onChange={(e) => setOpeningAmount(e.target.value)}
              placeholder="0.00"
              className="bg-background text-foreground"
            />
          </div>
          <Button
            onClick={handleOpenRegister}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Unlock className="mr-2 h-4 w-4" />
            Abrir Caja
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Unlock className="h-5 w-5 text-success" />
            Caja Abierta
          </CardTitle>
          <Badge className="bg-success/10 text-success">Activa</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Monto Inicial</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(register.openingAmount)}
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <p className="text-sm text-muted-foreground">Saldo Actual</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(register.currentBalance)}
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Abierta el {formatDate(register.openedAt)} a las{" "}
            {formatTime(register.openedAt)}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setMovementDialogOpen(true)}
              className="flex-1"
            >
              <Plus className="mr-2 h-4 w-4" />
              Movimiento
            </Button>
            <Button variant="destructive" onClick={onClose} className="flex-1">
              <Lock className="mr-2 h-4 w-4" />
              Cerrar Caja
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Movimientos del Día</CardTitle>
        </CardHeader>
        <CardContent>
          {register.movements.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No hay movimientos registrados
            </p>
          ) : (
            <div className="space-y-3">
              {register.movements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    {getMovementIcon(movement.type)}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {movement.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(movement.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        movement.type === "expense" ||
                        movement.type === "withdrawal"
                          ? "text-destructive"
                          : "text-success"
                      }`}
                    >
                      {movement.type === "expense" ||
                      movement.type === "withdrawal"
                        ? "-"
                        : "+"}
                      {formatCurrency(movement.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Saldo: {formatCurrency(movement.balance)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={movementDialogOpen} onOpenChange={setMovementDialogOpen}>
        <DialogContent className="max-w-sm bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Nuevo Movimiento
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Tipo de Movimiento</Label>
              <Select
                value={movementType}
                onValueChange={(v) => setMovementType(v as typeof movementType)}
              >
                <SelectTrigger className="bg-background text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Gasto</SelectItem>
                  <SelectItem value="withdrawal">Retiro</SelectItem>
                  <SelectItem value="deposit">Depósito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Monto</Label>
              <Input
                type="number"
                value={movementAmount}
                onChange={(e) => setMovementAmount(e.target.value)}
                placeholder="0.00"
                className="bg-background text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Descripción</Label>
              <Input
                value={movementDescription}
                onChange={(e) => setMovementDescription(e.target.value)}
                placeholder="Descripción del movimiento"
                className="bg-background text-foreground"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setMovementDialogOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddMovement}
                className="flex-1 bg-primary text-primary-foreground"
              >
                Registrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
