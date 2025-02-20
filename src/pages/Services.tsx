
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ListChecks } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12 text-primary flex items-center justify-center gap-3">
          <ListChecks className="h-8 w-8 text-primary" />
          Escolha a Área
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Button
            className="glass button-hover p-12 h-auto flex flex-col gap-4 font-bold"
            variant="outline"
            onClick={() => navigate("/energy")}
          >
            <span className="text-2xl font-semibold">Energias</span>
            <span className="text-muted-foreground">
              Reduza os seus custos<br />e explore soluções solares
            </span>
          </Button>

          <div className="relative">
            <Button
              className="glass button-hover p-12 h-auto flex flex-col gap-4 font-bold"
              variant="outline"
              onClick={() => navigate("/telecom")}
            >
              <span className="text-2xl font-semibold">Telecomunicações</span>
              <span className="text-muted-foreground">
                Compare planos e obtenha<br />a melhor oferta para si
              </span>
            </Button>
            <div className="absolute bottom-[5%] right-[5%] transform translate-x-[10%] translate-y-[10%] rotate-[-30deg] z-10">
              <div className="bg-[#ea384c] text-white px-2 py-0.5 rounded-sm text-xs font-bold shadow-lg">
                Oferta Especial
              </div>
            </div>
          </div>
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

export default Services;
