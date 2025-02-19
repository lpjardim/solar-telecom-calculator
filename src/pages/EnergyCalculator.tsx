
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Home, Building2, Zap, Lightbulb, Euro, Calculator } from "lucide-react";

type CustomerType = "residential" | "business";

const contractedPowerOptions = [
  "1.15",
  "2.30",
  "3.45",
  "4.60",
  "5.75",
  "6.90",
  "10.35",
  "13.80",
  "17.25",
  "20.70"
];

const EnergyCalculator = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [monthlyConsumption, setMonthlyConsumption] = useState("");
  const [contractedPower, setContractedPower] = useState("6.90");
  const [currentRate, setCurrentRate] = useState("0.1529");
  const [submitted, setSubmitted] = useState(false);

  const calculateSavings = () => {
    const consumption = Number(monthlyConsumption);
    const rate = Number(currentRate);
    const currentBill = consumption * rate;
    const estimatedSavings = currentBill * 0.25; // 25% savings
    return {
      monthly: estimatedSavings.toFixed(2),
      annual: (estimatedSavings * 12).toFixed(2),
      percentage: "25.0",
    };
  };

  const savings = monthlyConsumption ? calculateSavings() : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!monthlyConsumption) {
      toast.error("Por favor, insira o seu consumo mensal");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
        <div className="max-w-xl w-full text-center space-y-8 glass p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-primary">Obrigado!</h2>
          <p className="text-lg text-muted-foreground">
            Agradecemos o seu interesse. Entraremos em contato em breve com a sua proposta personalizada.
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
            <Calculator className="h-8 w-8 text-primary" />
            Simulador de Poupança em Energia
          </h1>
          <p className="text-lg text-muted-foreground">
            Fornecedor atual: {providerId?.toUpperCase()}
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
                placeholder="150"
                value={monthlyConsumption}
                onChange={(e) => setMonthlyConsumption(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Potência Contratada (kVA)
              </label>
              <Select value={contractedPower} onValueChange={setContractedPower}>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Selecione a potência" />
                </SelectTrigger>
                <SelectContent>
                  {contractedPowerOptions.map((power) => (
                    <SelectItem key={power} value={power}>
                      {power} kVA
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Tarifa Atual (€/kWh)
              </label>
              <Input
                type="number"
                value={currentRate}
                onChange={(e) => setCurrentRate(e.target.value)}
                className="text-lg"
                step="0.0001"
              />
            </div>
          </div>

          {savings && (
            <div className="bg-primary/5 p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-2 justify-center text-xl font-semibold text-primary">
                <Calculator className="h-6 w-6" />
                Poupança Estimada
              </div>
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <span>Poupança Mensal:</span>
                  <span className="text-xl font-semibold text-primary">{savings.monthly}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poupança Anual:</span>
                  <span className="text-xl font-semibold text-primary">{savings.annual}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poupança em Percentagem:</span>
                  <span className="text-xl font-semibold text-primary">{savings.percentage}%</span>
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

export default EnergyCalculator;
