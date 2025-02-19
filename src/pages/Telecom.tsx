import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  MessageSquare,
  Check,
  Smartphone,
  ArrowRight,
  Medal,
  Percent,
  Timer,
  Send,
  Home
} from "lucide-react";

const providers = [
  { id: "meo", name: "MEO" },
  { id: "nos", name: "NOS" },
  { id: "vodafone", name: "Vodafone" },
  { id: "nowo", name: "NOWO" },
  { id: "unknown", name: "Não sei" },
];

const benefits = [
  {
    icon: <Percent className="h-8 w-8" />,
    title: "Até 40% de Desconto",
    description: "Poupe significativamente na sua fatura mensal",
  },
  {
    icon: <Timer className="h-8 w-8" />,
    title: "Resposta em 2h",
    description: "Receba uma proposta personalizada rapidamente",
  },
  {
    icon: <Medal className="h-8 w-8" />,
    title: "Melhor Serviço",
    description: "Garantimos a melhor qualidade de serviço",
  },
];

const Telecom = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setShowInstructions(true);
    
    toast.success(
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Ótima escolha!</span>
        <span>Está a um passo de ter um melhor serviço.</span>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  const handleSubmit = () => {
    // Implement your logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Melhore o Seu Serviço de Telecomunicações
          </h1>
          <div className="space-y-2">
            <p className="text-xl text-muted-foreground">
              Comece a poupar ou melhore o seu serviço!
            </p>
            <p className="text-lg text-muted-foreground">
              Peça uma proposta personalizada para si em apenas 2 minutos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl space-y-4 text-center"
            >
              <div className="flex justify-center text-primary">{benefit.icon}</div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Qual é o seu operador atual?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                className={`glass button-hover p-8 h-auto flex items-center justify-center gap-3 ${
                  selectedProvider === provider.id
                    ? "border-primary border-2"
                    : ""
                }`}
                variant="outline"
                onClick={() => handleProviderSelect(provider.id)}
              >
                <Smartphone className="h-5 w-5" />
                <span className="text-xl font-semibold">{provider.name}</span>
                {selectedProvider === provider.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {showInstructions && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className="glass p-8 rounded-2xl space-y-6">
              <div className="flex items-center justify-center gap-3 text-2xl font-semibold text-primary">
                <MessageSquare className="h-8 w-8" />
                <span>Envie SMS e Melhore o Seu Serviço</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-white p-3 rounded-full">
                    <Send className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Envie SMS para 915692400</p>
                    <p className="text-muted-foreground">com o código</p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-xl">
                  <span className="text-3xl font-bold text-primary tracking-widest">
                    3748
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Após enviar o SMS, a nossa equipa entrará em contato o mais brevemente possível com sua proposta personalizada.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center px-4">
          <Button
            className="button-hover bg-primary text-white"
            onClick={handleSubmit}
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

export default Telecom;
