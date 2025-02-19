
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Home, Building2, Zap, Lightbulb, Euro, Calculator, Mail, MapPin } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [observations, setObservations] = useState("");
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

    if (!email) {
      toast.error("Por favor, insira o seu email");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
        <div className="max-w-xl w-full text-center space-y-8 glass p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-primary">Solicitar Proposta</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informações de Contacto</h3>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>jardimsolar@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Rua Principal, 123, Lisboa</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                O nosso serviço é totalmente gratuito
              </p>
              <p className="text-center text-sm text-muted-foreground">
                A proposta será enviada para o seu email
              </p>
              <p className="text-center font-semibold">
                Obrigado pela confiança!
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
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
                <SelectContent className="bg-background border shadow-lg">
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

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Observações (opcional)
              </label>
              <Textarea
                placeholder="Adicione aqui qualquer observação ou pedido especial"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

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
              variant="ghost"
              className="button-hover"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Página Inicial
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
