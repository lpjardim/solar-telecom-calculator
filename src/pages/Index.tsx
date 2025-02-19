
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Sun, Moon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-br from-background via-secondary/10 to-secondary/30 page-transition">
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="button-hover"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-12 max-w-4xl w-full text-center">
        <div className="space-y-6">
          <div className="w-64 h-64 mx-auto mb-8 transition-all duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/c4e58cf3-4611-4542-9a70-4e17142c6b5e.png" 
              alt="Jardim Solar Logo" 
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-muted-foreground">
            Reduza os seus custos de <span className="bg-gradient-to-r from-primary via-primary/85 to-primary/70 bg-clip-text text-transparent">Energia</span> e <span className="bg-gradient-to-r from-primary via-primary/85 to-primary/70 bg-clip-text text-transparent">Telecomunicações</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as formas de otimizar as suas despesas e calcule a sua poupança
          </p>
        </div>

        <div className="space-y-8">
          <Button
            size="lg"
            className="button-hover text-lg px-8 py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate("/services")}
          >
            Iniciar Simulação
          </Button>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-primary/20" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">2,359</span> clientes satisfeitos
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground button-hover"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground button-hover"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground button-hover"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Rua Principal, 123, Lisboa</span>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-4 px-4 text-sm text-muted-foreground md:mt-12 md:mb-0">
        Agente Autorizado EDP
      </div>
    </div>
  );
};

export default Index;
