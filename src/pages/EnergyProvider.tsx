
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const providers = [
  { id: "edp", name: "EDP" },
  { id: "galp", name: "Galp" },
  { id: "endesa", name: "Endesa" },
  { id: "iberdrola", name: "Iberdrola" },
  { id: "goldEnergy", name: "Gold Energy" },
  { id: "unknown", name: "Não sei" },
];

const EnergyProvider = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12 text-primary flex items-center justify-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          Qual é a sua comercializadora atual?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {providers.map((provider) => (
            <Button
              key={provider.id}
              className="glass button-hover p-8 h-auto font-bold"
              variant="outline"
              onClick={() => navigate(`/energy/calculator/${provider.id}`)}
            >
              <span className="text-xl font-semibold">{provider.name}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          className="mt-8 button-hover font-bold"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default EnergyProvider;
