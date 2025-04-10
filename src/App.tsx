
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Energy from "./pages/Energy";
import EnergyProvider from "./pages/EnergyProvider";
import EnergyCalculator from "./pages/EnergyCalculator";
import Telecom from "./pages/Telecom";
import NotFound from "./pages/NotFound";
import SolarCalculator from "./pages/SolarCalculator";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/energy" element={<Energy />} />
            <Route path="/energy/provider" element={<EnergyProvider />} />
            <Route path="/energy/calculator/:providerId" element={<EnergyCalculator />} />
            <Route path="/energy/solar" element={<SolarCalculator />} />
            <Route path="/telecom" element={<Telecom />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
