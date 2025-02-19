
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { Home } from "lucide-react";

const EnergyCalculator = () => {
  const navigate = useNavigate();
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");

  const calculateConsumption = () => {
    const powerValue = parseFloat(power);
    const hoursValue = parseFloat(hours);
    const daysValue = parseFloat(days);

    if (isNaN(powerValue) || isNaN(hoursValue) || isNaN(daysValue)) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    }

    const dailyConsumption = (powerValue * hoursValue) / 1000; // kWh
    const monthlyConsumption = dailyConsumption * daysValue; // kWh

    alert(`Consumo Mensal Estimado: ${monthlyConsumption.toFixed(2)} kWh`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12 text-primary flex items-center justify-center gap-3">
          <Building2 className="h-16 w-16 text-orange-500" />
          Simulador de Poupança
        </h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="power">Potência do aparelho (Watts):</Label>
            <Input
              type="number"
              id="power"
              placeholder="Ex: 100"
              value={power}
              onChange={(e) => setPower(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hours">Horas de uso por dia:</Label>
            <Input
              type="number"
              id="hours"
              placeholder="Ex: 2"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="days">Dias de uso por mês:</Label>
            <Input
              type="number"
              id="days"
              placeholder="Ex: 20"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Button
            className="button-hover bg-primary text-white"
            onClick={calculateConsumption}
          >
            Solicitar Proposta
          </Button>
          <Button
            variant="ghost"
            className="button-hover"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
          <Button
            variant="ghost"
            className="button-hover"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyCalculator;
