
import { useState } from "react";
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
  Mail,
} from "lucide-react";
import AddressMap from "@/components/AddressMap";

type CustomerType = "residential" | "business";

type SystemOptions = {
  panels: number;
  hasBattery: boolean;
  production: "6300" | "8400" | "10500";
  email: string;
};

const initialSystemOptions: SystemOptions = {
  panels: 8,
  hasBattery: true,
  production: "6300",
  email: "",
};

const SolarCalculator = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [systemOptions, setSystemOptions] = useState<SystemOptions>(initialSystemOptions);
  const [submitted, setSubmitted] = useState(false);

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
    
    if (!systemOptions.email) {
      toast.error("Por favor, insira o seu email");
      return;
    }

    setSubmitted(true);
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
                <SelectContent className="bg-background border shadow-lg">
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
                <SelectContent className="bg-background border shadow-lg">
                  <SelectItem value="yes">Com Bateria</SelectItem>
                  <SelectItem value="no">Sem Bateria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monitorização */}
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

            {/* Garantia */}
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

            {/* Produção Anual */}
            <div className="p-4 rounded-xl bg

-primary/5 space-y-2">
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
                <SelectContent className="bg-background border shadow-lg">
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

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
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
