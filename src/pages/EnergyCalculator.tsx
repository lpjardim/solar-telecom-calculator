
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type CustomerType = "residential" | "business";

const EnergyCalculator = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [observations, setObservations] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!monthlyBill) {
      toast.error("Por favor, insira o valor da sua fatura mensal");
      return;
    }

    const savingsEstimate = Number(monthlyBill) * 0.15; // 15% estimated savings
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
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Simulador de Economia
          </h1>
          <p className="text-lg text-muted-foreground">
            Preencha os dados abaixo para calcular sua economia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 glass p-8 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={customerType === "residential" ? "default" : "outline"}
              className="button-hover"
              onClick={() => setCustomerType("residential")}
            >
              Residencial
            </Button>
            <Button
              type="button"
              variant={customerType === "business" ? "default" : "outline"}
              className="button-hover"
              onClick={() => setCustomerType("business")}
            >
              Empresarial
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Valor médio da fatura mensal (€)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Observações (opcional)
            </label>
            <Textarea
              placeholder="Adicione qualquer informação relevante..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="h-32"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="ghost"
              className="button-hover"
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              className="flex-1 button-hover"
            >
              Solicitar Proposta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnergyCalculator;
