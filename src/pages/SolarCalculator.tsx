import { useState, useCallback } from "react";
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
  Check,
} from "lucide-react";
import AddressMap from "@/components/AddressMap";

type CustomerType = "residential" | "business";

const benefits = [
  {
    title: "Painéis Solares",
    description: "Equipamentos de última geração",
    included: true,
  },
  {
    title: "Serviço de Instalação",
    description: "Instalação profissional incluída",
    included: true,
  },
  {
    title: "Bateria",
    description: "Armazenamento de energia",
    included: true,
  },
  {
    title: "Garantia 25 Anos",
    description: "Garantia extendida",
    included: true,
  },
  {
    title: "6300 kWh",
    description: "Produção anual",
    included: true,
  },
  {
    title: "Aplicação de Monitorização",
    description: "Controle em tempo real",
    included: true,
  },
];

const SolarCalculator = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [monthlyConsumption, setMonthlyConsumption] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [location, setLocation] = useState("");
  const [currentBill, setCurrentBill] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);

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
              ⚡ Assine já o seu contrato e poupe até 80% na fatura de eletricidade
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
            Este é o seu sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-primary/5 space-y-2"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
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
