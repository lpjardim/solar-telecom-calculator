
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const Services = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12">
          Escolha o Serviço
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Button
            className="glass button-hover p-12 h-auto flex flex-col gap-4"
            variant="outline"
            onClick={() => navigate("/energy")}
          >
            <span className="text-2xl font-semibold">Energias</span>
            <span className="text-muted-foreground">
              Otimize seus custos de energia
            </span>
          </Button>

          <Button
            className="glass button-hover p-12 h-auto flex flex-col gap-4"
            variant="outline"
            onClick={() => navigate("/telecom")}
          >
            <span className="text-2xl font-semibold">Telecomunicações</span>
            <span className="text-muted-foreground">
              Encontre o melhor plano para você
            </span>
          </Button>
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

export default Services;
