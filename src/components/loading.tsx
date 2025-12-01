"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, CreditCard, Package, BarChart3 } from "lucide-react";

export function POSLoading() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: ShoppingCart, text: "Cargando inventario..." },
    { icon: CreditCard, text: "Conectando métodos de pago..." },
    { icon: Package, text: "Sincronizando productos..." },
    { icon: BarChart3, text: "Preparando reportes..." },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 w-full">
      {/* Logo y nombre */}
      <div className="flex items-center gap-3 mb-12">
        <div className="relative">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingCart className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-card rounded-full flex items-center justify-center border-2 border-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            QuickPOS
          </h1>
          <p className="text-sm text-muted-foreground">
            Sistema de Punto de Venta
          </p>
        </div>
      </div>

      {/* Animación de loading principal */}
      <div className="relative mb-10">
        <div className="w-24 h-24 rounded-full border-4 border-muted flex items-center justify-center">
          {/* Spinner animado */}
          <svg
            className="absolute w-24 h-24 animate-spin"
            style={{ animationDuration: "1.5s" }}
          >
            <circle
              cx="48"
              cy="48"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 200"
              className="text-primary"
            />
          </svg>
          {/* Icono central con transición */}
          <div className="relative z-10 transition-all duration-300">
            <CurrentIcon className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-xs mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            Iniciando sistema
          </span>
          <span className="text-xs font-medium text-foreground">
            {progress}%
          </span>
        </div>
      </div>

      {/* Texto de estado actual */}
      <div className="h-6 flex items-center">
        <p className="text-sm text-muted-foreground animate-pulse">
          {loadingSteps[currentStep].text}
        </p>
      </div>

      {/* Indicadores de pasos */}
      <div className="flex gap-2 mt-8">
        {loadingSteps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                index === currentStep
                  ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                  : index < currentStep || progress === 100
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <StepIcon className="w-5 h-5" />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 QuickPOS • Versión 2.0.1
        </p>
      </div>
    </div>
  );
}
