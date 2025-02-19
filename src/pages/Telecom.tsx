
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const providers = [
  { id: "meo", name: "MEO" },
  { id: "nos", name: "NOS" },
  { id: "vodafone", name: "Vodafone" },
  { id: "nowo", name: "NOWO" },
  { id: "unknown", name: "Não sei" },
];

const Telecom = () => {
  const navigate = useNavigate();

  const handleProviderSelect = (providerId: string) => {
    toast.info(
      "Para receber uma proposta personalizada, envie SMS com o código 3748 para 915692400",
      {
        duration: 10000,
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12">
          Qual é o seu operador atual?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {providers.map((provider) => (
            <Button
              key={provider.id}
              className="glass button-hover p-8 h-auto"
              variant="outline"
              onClick={() => handleProviderSelect(provider.id)}
            >
              <span className="text-xl font-semibold">{provider.name}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          className="mt-8 button-hover"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Telecom;
