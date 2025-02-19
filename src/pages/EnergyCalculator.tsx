
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Home } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EnergyCalculator = () => {
  const navigate = useNavigate();
  const [consumption, setConsumption] = useState("");
  const [power, setPower] = useState("6.90");
  const [rate, setRate] = useState("0.1529");
  const [email, setEmail] = useState("");
  const [observations, setObservations] = useState("");
  const [selectedType, setSelectedType] = useState<"residential" | "business">("residential");

  const powerOptions = [
    { value: "1.15", label: "1,15 kVA" },
    { value: "2.30", label: "2,30 kVA" },
    { value: "3.45", label: "3,45 kVA" },
    { value: "4.60", label: "4,60 kVA" },
    { value: "5.75", label: "5,75 kVA" },
    { value: "6.90", label: "6,90 kVA" },
    { value: "10.35", label: "10,35 kVA" },
    { value: "13.80", label: "13,80 kVA" },
    { value: "17.25", label: "17,25 kVA" },
    { value: "20.70", label: "20,70 kVA" },
    { value: "27.60", label: "27,60 kVA" },
    { value: "34.50", label: "34,50 kVA" },
    { value: "41.40", label: "41,40 kVA" }
  ];

  const calculateSavings = () => {
    const consumptionValue = parseFloat(consumption);
    const rateValue = parseFloat(rate);

    if (isNaN(consumptionValue) || isNaN(rateValue)) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    }

    // Simulação de poupança (25% de desconto)
    const currentBill = consumptionValue * rateValue;
    const newBill = currentBill * 0.75;
    const monthlySavings = currentBill - newBill;
    const annualSavings = monthlySavings * 12;
    const savingsPercentage = 25;

    alert(
      `Poupança Mensal Estimada: ${monthlySavings.toFixed(2)}€\n` +
      `Poupança Anual: ${annualSavings.toFixed(2)}€\n` +
      `Poupança em Percentagem: ${savingsPercentage}%`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Building2 className="h-12 w-12 md:h-16 md:w-16 text-primary" />
            Simulador de Poupança em Energia
          </h1>
          <p className="text-xl text-muted-foreground">Fornecedor atual: EDP</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant={selectedType === "residential" ? "default" : "outline"}
            onClick={() => setSelectedType("residential")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Residencial
          </Button>
          <Button
            variant={selectedType === "business" ? "default" : "outline"}
            onClick={() => setSelectedType("business")}
            className="gap-2"
          >
            <Building2 className="h-4 w-4" />
            Empresarial
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="consumption">Consumo Mensal (kWh):</Label>
            <Input
              type="number"
              id="consumption"
              placeholder="Ex: 150"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="power">Potência Contratada (kVA):</Label>
            <Select value={power} onValueChange={setPower}>
              <SelectTrigger className="h-10 text-base">
                <SelectValue placeholder="Selecione a potência" />
              </SelectTrigger>
              <SelectContent>
                {powerOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-base py-3 font-medium"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="rate">Tarifa Atual (€/kWh):</Label>
            <Input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="observations">Observações:</Label>
            <Textarea
              id="observations"
              placeholder="Adicione aqui qualquer informação adicional relevante..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Button
            className="button-hover bg-primary text-white font-bold w-full max-w-md"
            onClick={calculateSavings}
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
