
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Sun,
  Home,
  Building2,
  Zap,
  Calculator,
  MapPin,
  Euro,
} from "lucide-react";

type CustomerType = "residential" | "business";

const SolarCalculator = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [monthlyConsumption, setMonthlyConsumption] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [location, setLocation] = useState("");
  const [currentBill, setCurrentBill] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const calculateSavings = () => {
    const consumption = Number(monthlyConsumption);
    const bill = Number(currentBill);
    const solarProduction = consumption * 0.7; // Estimativa de 70% do consumo
    const monthlySavings = bill * 0.7; // 70% de economia média

    return {
      production: solarProduction.toFixed(0),
      monthly: monthlySavings.toFixed(2),
      annual: (monthlySavings * 12).toFixed(2),
      co2: ((solarProduction * 12) * 0.5).toFixed(0), // kg de CO2 evitados por ano
    };
  };

  const savings = monthlyConsumption && currentBill ? calculateSavings() : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!monthlyConsumption || !currentBill) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
        <div className="max-w-xl w-full text-center space-y-8 glass p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-primary">Excelente Escolha!</h2>
          <p className="text-lg text-muted-foreground">
            Parabéns por dar o primeiro passo em direção à energia solar! 
            Nossa equipe entrará em contato em breve com sua proposta personalizada.
          </p>
          <Button
            className="button-hover"
            onClick={() => navigate("/")}
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
            <Sun className="h-10 w-10 text-yellow-500" />
            Simulador Solar
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubra quanto pode poupar com energia solar
          </p>
        </div>

        <div className="glass p-8 rounded-2xl space-y-8">
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant={customerType === "residential" ? "default" : "outline"}
              className="button-hover flex gap-2 py-6 flex-1 max-w-[200px]"
              onClick={() => setCustomerType("residential")}
            >
              <Home className="h-5 w-5" />
              Residencial
            </Button>
            <Button
              type="button"
              variant={customerType === "business" ? "default" : "outline"}
              className="button-hover flex gap-2 py-6 flex-1 max-w-[200px]"
              onClick={() => setCustomerType("business")}
            >
              <Building2 className="h-5 w-5" />
              Empresarial
            </Button>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Consumo Mensal (kWh)
              </label>
              <Input
                type="number"
                placeholder="500"
                value={monthlyConsumption}
                onChange={(e) => setMonthlyConsumption(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Valor Atual da Fatura (€)
              </label>
              <Input
                type="number"
                placeholder="100"
                value={currentBill}
                onChange={(e) => setCurrentBill(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Localização
              </label>
              <Input
                type="text"
                placeholder="Ex: Lisboa"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Home className="h-4 w-4" />
                Área Disponível no Telhado (m²)
              </label>
              <Input
                type="number"
                placeholder="50"
                value={roofArea}
                onChange={(e) => setRoofArea(e.target.value)}
                className="text-lg"
              />
            </div>
          </div>

          {savings && (
            <div className="bg-primary/5 p-6 rounded-xl space-y-6">
              <div className="flex items-center gap-2 justify-center text-xl font-semibold text-primary">
                <Calculator className="h-6 w-6" />
                Estimativas Anuais
              </div>
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <span>Produção Solar:</span>
                  <span className="text-xl font-semibold text-primary">{savings.production} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poupança Mensal:</span>
                  <span className="text-xl font-semibold text-primary">{savings.monthly}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poupança Anual:</span>
                  <span className="text-xl font-semibold text-primary">{savings.annual}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Redução de CO2:</span>
                  <span className="text-xl font-semibold text-green-600">{savings.co2} kg</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant="ghost"
              className="button-hover"
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button
              onClick={handleSubmit}
              className="button-hover bg-primary text-white px-8"
            >
              Solicitar Proposta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
