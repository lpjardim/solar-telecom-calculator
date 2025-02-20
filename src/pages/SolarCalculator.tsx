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
  PanelTop,
} from "lucide-react";

type SystemOptions = {
  address: string;
  panels: number;
  battery: boolean;
  charger: boolean;
  email: string;
  observations: string;
  production: number;
};

const initialSystemOptions: SystemOptions = {
  address: "",
  panels: 10,
  battery: false,
  charger: false,
  email: "",
  observations: "",
  production: 3500,
};

const calculateAnnualProduction = (panels: number) => {
  // This is a simplified calculation
  return panels * 350;
};

const SolarCalculator = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [systemOptions, setSystemOptions] = useState<SystemOptions>({
    ...initialSystemOptions,
    production: calculateAnnualProduction(initialSystemOptions.panels),
  });

  const handleAddressSubmit = () => {
    if (address.trim() !== "") {
      setSystemOptions((prev) => ({ ...prev, address: address }));
      setShowMap(true);
      toast.success(
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Localização Confirmada!</span>
          <span>Pode continuar para personalizar a sua instalação.</span>
        </div>,
        {
          duration: 5000,
        }
      );
    } else {
      toast.error("Por favor, insira uma morada válida.", {
        duration: 5000,
      });
    }
  };

  const updateSystemOption = (key: keyof SystemOptions, value: any) => {
    setSystemOptions((prev) => {
      const updatedOptions: SystemOptions = { ...prev, [key]: value };
      if (key === "panels") {
        updatedOptions.production = calculateAnnualProduction(Number(value));
      }
      return updatedOptions;
    });
  };

  if (!showMap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Sun className="h-12 w-12 text-primary" />
              Calculadora Solar
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground">
                Descubra o potencial da energia solar para a sua casa.
              </p>
              <p className="text-lg text-muted-foreground">
                Insira a sua morada para começar.
              </p>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <label htmlFor="address" className="text-sm font-medium">
                  Morada
                </label>
              </div>
              <Input
                type="text"
                id="address"
                placeholder="Rua, Código Postal, Cidade"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-lg"
              />
            </div>

            <Button
              className="button-hover bg-primary text-white font-bold"
              onClick={handleAddressSubmit}
            >
              Confirmar Localização
            </Button>
          </div>

          <div className="flex flex-col gap-4 items-center">
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
          {/* Grid de opções */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Painéis */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <PanelTop className="h-4 w-4 text-primary" />
                Painéis Solares
              </label>
              <Input
                type="number"
                placeholder="Número de painéis"
                value={systemOptions.panels}
                onChange={(e) => updateSystemOption("panels", Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Bateria */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Battery className="h-4 w-4 text-primary" />
                Bateria
              </label>
              <Select onValueChange={(value) => updateSystemOption("battery", value === "true")}>
                <SelectTrigger className="w-full text-lg">
                  <SelectValue placeholder={systemOptions.battery ? "Sim" : "Não"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Carregador */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Carregador Elétrico
              </label>
              <Select onValueChange={(value) => updateSystemOption("charger", value === "true")}>
                <SelectTrigger className="w-full text-lg">
                  <SelectValue placeholder={systemOptions.charger ? "Sim" : "Não"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Email input */}
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

          {/* Observações textarea */}
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

          {/* Botões de navegação */}
          <div className="flex flex-col gap-4 items-center">
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
