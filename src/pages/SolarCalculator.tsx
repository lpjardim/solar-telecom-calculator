
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Sun,
  Home,
  Building2,
  Zap,
  Calculator,
  MapPin,
  Euro,
  Check,
  Battery,
  PanelTop,
  Monitor,
  Shield,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import AddressMap from "@/components/AddressMap";

type CustomerType = "residential" | "business";

type SystemOptions = {
  panels: number;
  hasBattery: boolean;
  hasMonitoring: boolean;
  warranty: "standard" | "extended";
  production: "6300" | "8400" | "10500";
};

const initialSystemOptions: SystemOptions = {
  panels: 8,
  hasBattery: true,
  hasMonitoring: true,
  warranty: "extended",
  production: "6300",
};

const SolarCalculator = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [systemOptions, setSystemOptions] = useState<SystemOptions>(initialSystemOptions);

  const handleLocationSelect = (lat: number, lng: number) => {
    setMapLocation({ lat, lng });
  };

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
    toast.success("Proposta solicitada com sucesso!");
  };

  const updateSystemOption = <K extends keyof SystemOptions>(
    key: K,
    value: SystemOptions[K]
  ) => {
    setSystemOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!showMap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
              <Sun className="h-10 w-10 text-yellow-500" />
              Painéis Solares
            </h1>
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
                <MapPin className="h-4 w-4" />
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
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Arraste o mapa para fixar seu telhado
          </h2>
          <AddressMap onLocationSelect={handleLocationSelect} />
        </div>

        <div className="glass p-8 rounded-2xl space-y-8">
          <h2 className="text-2xl font-semibold text-center">
            Personalize o seu sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Número de Painéis */}
            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <PanelTop className="h-5 w-5 text-primary" />
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
                <SelectContent>
                  <SelectItem value="6">6 Painéis</SelectItem>
                  <SelectItem value="8">8 Painéis</SelectItem>
                  <SelectItem value="10">10 Painéis</SelectItem>
                  <SelectItem value="12">12 Painéis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bateria */}
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
                <SelectContent>
                  <SelectItem value="yes">Com Bateria</SelectItem>
                  <SelectItem value="no">Sem Bateria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monitorização */}
            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Monitorização
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sistema de monitorização
              </p>
              <Select
                value={systemOptions.hasMonitoring ? "yes" : "no"}
                onValueChange={(value) => updateSystemOption("hasMonitoring", value === "yes")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Com Monitorização</SelectItem>
                  <SelectItem value="no">Sem Monitorização</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Garantia */}
            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Garantia
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tipo de garantia
              </p>
              <Select
                value={systemOptions.warranty}
                onValueChange={(value) => updateSystemOption("warranty", value as "standard" | "extended")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">12 Anos</SelectItem>
                  <SelectItem value="extended">25 Anos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Produção Anual */}
            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Produção Anual
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Estimativa de produção
              </p>
              <Select
                value={systemOptions.production}
                onValueChange={(value) => updateSystemOption("production", value as "6300" | "8400" | "10500")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6300">6300 kWh/ano</SelectItem>
                  <SelectItem value="8400">8400 kWh/ano</SelectItem>
                  <SelectItem value="10500">10500 kWh/ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Poupança Estimada */}
            <div className="p-4 rounded-xl bg-primary/5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Poupança Estimada
              </h3>
              <p className="text-sm text-muted-foreground">
                Até 80% na fatura
              </p>
              <p className="text-lg font-semibold text-primary">
                {systemOptions.production === "6300" ? "3.780€" : 
                 systemOptions.production === "8400" ? "5.040€" : "6.300€"} /ano
              </p>
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

export default SolarCalculator;
