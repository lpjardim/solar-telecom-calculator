import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Sun,
  Home,
  Battery,
  Monitor,
  Shield,
  Sparkles,
  Lightbulb,
  Mail,
  MapPin,
  Check,
} from "lucide-react";

type CustomerType = "residential" | "business";

type SystemOptions = {
  panels: number;
  hasBattery: boolean;
  production: number;
  email: string;
  observations: string;
};

const initialSystemOptions: SystemOptions = {
  panels: 8,
  hasBattery: true,
  production: 14400,
  email: "",
  observations: "",
};

const calculateAnnualProduction = (panels: number): number => {
  const productionPer2Panels = 3600;
  return (panels / 2) * productionPer2Panels;
};

const calculateAnnualSavings = (production: number): number => {
  const pricePerKwh = 0.18;
  return production * pricePerKwh;
};

const SolarCalculator = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [systemOptions, setSystemOptions] = useState<SystemOptions>({
    ...initialSystemOptions,
    production: calculateAnnualProduction(initialSystemOptions.panels),
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error("Por favor, insira seu endereço");
      return;
    }
    setShowMap(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!systemOptions.email) {
      toast.error("Por favor, insira o seu email");
      return;
    }

    navigate("/thank-you");
  };

  const updateSystemOption = <K extends keyof SystemOptions>(
    key: K,
    value: SystemOptions[K]
  ) => {
    setSystemOptions((prev) => {
      const newOptions = {
        ...prev,
        [key]: value,
      };
      
      if (key === 'panels') {
        newOptions.production = calculateAnnualProduction(value as number);
      }
      
      return newOptions;
    });
  };

  if (!showMap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
        <div className="max-w-3xl w-full space-y-8">
          <h1 className="text-4xl font-bold tracking-tight mb-12 text-primary flex items-center justify-center gap-3">
            <Sun className="h-16 w-16 text-yellow-500" />
            Painéis Solares
          </h1>

          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold">
              aos preços mais baixos em Portugal
            </p>
            <p className="text-lg text-muted-foreground">
              ⚡ Simule já a sua proposta e poupe até 80% na fatura de eletricidade
            </p>
          </div>

          <form onSubmit={handleAddressSubmit} className="glass p-8 rounded-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Verifique o seu endereço
              </label>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Ex: Rua do Sol, 123"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-lg flex-1"
                />
                <Button type="submit" className="button-hover">
                  Continuar
                </Button>
              </div>
            </div>
          </form>

          <div className="flex gap-4 justify-center">
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
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full space-y-12">
        <h2 className="text-3xl font-bold text-center text-primary">
          Personalize o seu sistema
        </h2>

        <div className="glass p-8 rounded-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                Painéis Solares
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Número de painéis no sistema
              </p>
              <Select
                value={String(systemOptions.panels)}
                onValueChange={(value) => updateSystemOption("panels", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg">
                  <SelectItem value="2">2 Painéis</SelectItem>
                  <SelectItem value="4">4 Painéis</SelectItem>
                  <SelectItem value="6">6 Painéis</SelectItem>
                  <SelectItem value="8">8 Painéis</SelectItem>
                  <SelectItem value="10">10 Painéis</SelectItem>
                  <SelectItem value="12">12 Painéis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Battery className="h-5 w-5 text-primary" />
                Bateria
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sistema de armazenamento
              </p>
              <Select
                value={systemOptions.hasBattery ? "yes" : "no"}
                onValueChange={(value) => updateSystemOption("hasBattery", value === "yes")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg">
                  <SelectItem value="yes">Com Bateria</SelectItem>
                  <SelectItem value="no">Sem Bateria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Sistema de Monitorização
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                <span className="text-primary font-medium">Incluído no sistema</span>
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                <span className="font-medium">Monitorização em tempo real</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Garantia do Sistema
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                <span className="text-primary font-medium">25 anos de garantia incluída</span>
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                <span className="font-medium">Máxima proteção do investimento</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Produção Anual
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Estimativa de produção
              </p>
              <div className="text-primary font-medium">
                {systemOptions.production.toLocaleString('pt-PT')} kWh/ano
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Poupança Estimada
              </h3>
              <p className="text-sm text-muted-foreground">
                Até 80% na fatura
              </p>
              <p className="text-lg font-semibold text-primary">
                {Math.round(calculateAnnualSavings(systemOptions.production)).toLocaleString('pt-PT')}€ /ano
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email
            </label>
            <Input
              type="email"
              placeholder="seu.email@exemplo.com"
              value={systemOptions.email}
              onChange={(e) => updateSystemOption("email", e.target.value)}
              className="text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Observações
            </label>
            <Textarea
              placeholder="Adicione aqui quaisquer observações ou requisitos específicos..."
              value={systemOptions.observations}
              onChange={(e) => updateSystemOption("observations", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Button
              onClick={handleSubmit}
              className="button-hover bg-primary text-white font-bold"
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
    </div>
  );
};

export default SolarCalculator;
