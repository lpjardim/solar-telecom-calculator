
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Home } from "lucide-react";

const Energy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12 text-primary flex items-center justify-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          Escolha o Serviço
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Button
            className="glass button-hover p-12 h-auto flex flex-col gap-4 font-bold"
            variant="outline"
            onClick={() => navigate("/energy/solar")}
          >
            <span className="text-2xl font-semibold">Painéis Solares</span>
            <span className="text-muted-foreground">
              Calcule a sua poupança<br />com energia solar
            </span>
          </Button>

          <Button
            className="glass button-hover p-12 h-auto flex flex-col gap-4 font-bold"
            variant="outline"
            onClick={() => navigate("/energy/provider")}
          >
            <span className="text-2xl font-semibold">Mudar de Comercializadora</span>
            <span className="text-muted-foreground">
              Compare tarifas e<br />encontre a melhor comercializadora
            </span>
          </Button>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Button
            className="button-hover bg-primary text-white font-bold"
            onClick={() => navigate("/energy/calculator")}
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

export default Energy;
