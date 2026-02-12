import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import TheSystem from "./pages/TheSystem";
import Threats from "./pages/Threats";
import HealthBalance from "./pages/HealthBalance";
import LevelArchitecture from "./pages/LevelArchitecture";
import PlayerSystems from "./pages/PlayerSystems";
import PreLaunch from "./pages/PreLaunch";
import Studio from "./pages/Studio";
import DevLogs from "./pages/DevLogs";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/the-system" element={<TheSystem />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/health" element={<HealthBalance />} />
            <Route path="/levels" element={<LevelArchitecture />} />
            <Route path="/analytics" element={<PlayerSystems />} />
            <Route path="/pre-launch" element={<PreLaunch />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/dev-logs" element={<DevLogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
