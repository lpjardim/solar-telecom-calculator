import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Home, Mail, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Phone } from "lucide-react";

const EnergyCalculator = () => {
  const navigate = useNavigate();
  const [consumption, setConsumption] = useState("");
  const [power, setPower] = useState("6.90");
  const [rate, setRate] = useState("0.1529");
  const [email, setEmail] = useState("");
  const [observations, setObservations] = useState("");
  const [selectedType, setSelectedType] = useState<"residential" | "business">("residential");
  const [savings, setSavings] = useState<{
    monthly: number;
    annual: number;
    percentage: number;
  } | null>(null);
  const [wantsPhoneCall, setWantsPhoneCall] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const powerOptions = [
    "1.15", "2.30", "3.45", "4.60", "5.75", "6.90", "10.35", "13.80", 
    "17.25", "20.70", "27.60", "34.50", "41.40"
  ];

  useEffect(() => {
    calculateSavings();
  }, [consumption, rate, power]); // Recalcula sempre que estes valores mudarem

  const calculateSavings = () => {
    const consumptionValue = parseFloat(consumption);
    const rateValue = parseFloat(rate);

    if (isNaN(consumptionValue) || isNaN(rateValue) || consumptionValue === 0) {
      setSavings(null);
      return;
    }

    // Cálculo da fatura atual
    const currentBill = consumptionValue * rateValue;
    
    // Nova tarifa com desconto (exemplo: 0.1147€/kWh)
    const newRate = 0.1147;
    const newBill = consumptionValue * newRate;
    
    // Cálculo das poupanças
    const monthlySavings = currentBill - newBill;
    const annualSavings = monthlySavings * 12;
    
    // Cálculo da percentagem real de poupança (arredondado a 2 casas decimais)
    const savingsPercentage = Number(((currentBill - newBill) / currentBill * 100).toFixed(2));

    setSavings({
      monthly: monthlySavings,
      annual: annualSavings,
      percentage: savingsPercentage
    });
  };

  const handleSubmitProposal = () => {
    if (!email) {
      toast.error("Por favor, insira o seu email");
      return;
    }
    navigate("/thank-you");
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
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                {powerOptions.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="text-base py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {option} kVA
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="wantsPhoneCall" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Quer ser contactado via chamada telefónica?
              </Label>
              <Switch
                id="wantsPhoneCall"
                checked={wantsPhoneCall}
                onCheckedChange={setWantsPhoneCall}
              />
            </div>

            {wantsPhoneCall && (
              <div>
                <Label htmlFor="phoneNumber">Número de Telemóvel:</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="912 345 678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="observations">Observações:</Label>
            <Textarea
              id="observations"
              placeholder="Adicione aqui qualquer observação ou pedido especial"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        {savings && (
          <div className="bg-primary/5 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold text-primary">Poupança Estimada</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">Poupança Mensal</p>
                <p className="text-2xl font-bold text-primary">
                  {savings.monthly.toFixed(2)}€
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">Poupança Anual</p>
                <p className="text-2xl font-bold text-primary">
                  {savings.annual.toFixed(2)}€
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">Percentagem</p>
                <p className="text-2xl font-bold text-primary">
                  {savings.percentage}%
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 items-center">
          <Button
            className="button-hover bg-primary text-white font-bold w-full max-w-md"
            onClick={handleSubmitProposal}
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
